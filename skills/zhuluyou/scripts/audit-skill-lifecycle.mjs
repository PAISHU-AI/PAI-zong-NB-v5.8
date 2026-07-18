#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { scanPath } from "./skill-safety-scan.mjs";
import { existingDir, homeDir, resolveCodexHome } from "./project-root.mjs";

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const writeSnapshot = args.has("--write-snapshot");
const skillsRootArgIndex = rawArgs.indexOf("--skills-root");
const explicitSkillsRoot = skillsRootArgIndex >= 0 ? rawArgs[skillsRootArgIndex + 1] : null;

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", ".system", "node_modules", "__pycache__"].includes(entry.name)) continue;
      walk(current, visit);
    } else if (entry.isFile()) {
      visit(current);
    }
  }
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function normalizeRelativePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function skillFileHashes(skillDir) {
  const files = [];
  walk(skillDir, (filePath) => {
    const rel = normalizeRelativePath(path.relative(skillDir, filePath));
    if (rel === "references/skill-inventory-snapshot.json") return;
    const stat = fs.statSync(filePath);
    if (stat.size > 5_000_000) return;
    files.push({ rel, hash: sha256(fs.readFileSync(filePath)) });
  });
  return files.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
}

function hashSkillFiles(files) {
  const hashes = files.map((file) => `${file.rel}:${file.hash}`).sort();
  return sha256(Buffer.from(hashes.join("\n"), "utf8"));
}

function readSkillMeta(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const name = (text.match(/^name:\s*(.+?)\s*$/m)?.[1] || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  const description = (text.match(/^description:\s*(.+?)\s*$/m)?.[1] || "").trim();
  return { name, description };
}

function collectSkills(skillsRoot) {
  const skills = [];
  walk(skillsRoot, (filePath) => {
    if (path.basename(filePath) !== "SKILL.md") return;
    const skillDir = path.dirname(filePath);
    const meta = readSkillMeta(filePath);
    const files = skillFileHashes(skillDir);
    skills.push({
      name: meta.name,
      description: meta.description,
      skillDir,
      skillPath: filePath,
      relativeDir: normalizeRelativePath(path.relative(skillsRoot, skillDir)),
      hash: hashSkillFiles(files),
      files
    });
  });
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function loadSnapshot(snapshotPath) {
  if (!fs.existsSync(snapshotPath)) return null;
  return JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
}

function diffInventory(current, snapshot) {
  const previousByName = new Map((snapshot?.skills || []).map((skill) => [skill.name, skill]));
  const currentByName = new Map(current.map((skill) => [skill.name, skill]));
  const added = current.filter((skill) => !previousByName.has(skill.name)).map((skill) => skill.name);
  const removed = (snapshot?.skills || []).filter((skill) => !currentByName.has(skill.name)).map((skill) => skill.name);
  const changed = current
    .filter((skill) => previousByName.has(skill.name) && previousByName.get(skill.name).hash !== skill.hash)
    .map((skill) => skill.name);
  const changedFilesByName = {};
  for (const skill of current) {
    const previous = previousByName.get(skill.name);
    if (!previous || previous.hash === skill.hash) continue;
    const previousFiles = Array.isArray(previous.files) ? previous.files : null;
    if (!previousFiles) {
      changedFilesByName[skill.name] = null;
      continue;
    }
    const previousByRel = new Map(previousFiles.map((file) => [file.rel, file.hash]));
    const currentByRel = new Map(skill.files.map((file) => [file.rel, file.hash]));
    const changedFiles = [];
    for (const file of skill.files) {
      if (previousByRel.get(file.rel) !== file.hash) changedFiles.push(file.rel);
    }
    for (const file of previousFiles) {
      if (!currentByRel.has(file.rel)) changedFiles.push(file.rel);
    }
    changedFilesByName[skill.name] = [...new Set(changedFiles)].sort();
  }
  return { added, removed, changed, changedFilesByName };
}

const suspiciousRules = [
  {
    id: "instruction-override",
    pattern: /ignore\s+(all\s+)?(previous|prior|system|developer)\s+instructions/i
  },
  {
    id: "hidden-prompt-disclosure",
    pattern: /(reveal|print|dump|show).{0,80}(system prompt|developer message|hidden instructions)/i
  },
  {
    id: "secret-exfiltration",
    pattern: /(steal|exfiltrate|upload|send).{0,100}(token|secret|api key|ssh key|private key|password|credential)/i
  },
  {
    id: "remote-shell-pipe",
    pattern: /(curl|wget)[^\n|]{0,120}\|\s*(sh|bash|zsh|powershell|pwsh)/i
  },
  {
    id: "destructive-home-or-root-delete",
    pattern: /rm\s+-rf\s+(\/|\$HOME|~)/i
  },
  {
    id: "world-writable-recursive",
    pattern: /chmod\s+(-R\s+)?777/i
  },
  {
    id: "macos-persistence-hook",
    pattern: /\b(launchctl|LaunchAgents|LaunchDaemons|crontab)\b/i
  },
  {
    id: "shell-profile-modification",
    pattern: /\.(zshrc|bashrc|bash_profile|profile)\b/i
  }
];

const textExtensions = new Set([
  ".md",
  ".txt",
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
  ".py",
  ".sh",
  ".ps1",
  ".json",
  ".yaml",
  ".yml",
  ".toml"
]);

function scanSkill(skill, changedFiles = null) {
  const result = scanPath(skill.skillDir, { skillName: skill.name });
  const changedFileSet = Array.isArray(changedFiles) ? new Set(changedFiles) : null;
  return result.findings
    .filter((finding) => !changedFileSet || changedFileSet.has(finding.file))
    .map((finding) => ({
      skill: skill.name,
      file: finding.file,
      rule: finding.rule,
      severity: finding.severity,
      message: finding.message,
      line: finding.line
    }));
}

const codexHome = resolveCodexHome();
const skillsRoot = explicitSkillsRoot ? path.resolve(explicitSkillsRoot) : path.join(codexHome, "skills");
const home = homeDir();
const zhuluyouRoot =
  existingDir(skillsRoot, "zhuluyou") ||
  (home ? existingDir(home, ".codex", "skills", "zhuluyou") : null) ||
  path.join(skillsRoot, "zhuluyou");
const referencesDir = path.join(zhuluyouRoot, "references");
const snapshotPath = path.join(referencesDir, "skill-inventory-snapshot.json");
const allowlistPath = path.join(referencesDir, "skill-lifecycle-allowlist.json");

function loadAllowlist(filePath) {
  if (!fs.existsSync(filePath)) {
    return { findings: [] };
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function findingKey(finding) {
  return `${finding.skill}\0${normalizeRelativePath(finding.file)}\0${finding.rule}`;
}

const current = fs.existsSync(skillsRoot) ? collectSkills(skillsRoot) : [];
const snapshot = loadSnapshot(snapshotPath);
const allowlist = loadAllowlist(allowlistPath);
const allowedKeys = new Set((allowlist.findings || []).map(findingKey));
const diff = diffInventory(current, snapshot);
const changedOrAddedNames = new Set([...diff.added, ...diff.changed]);
const skillsToScan = snapshot ? current.filter((skill) => changedOrAddedNames.has(skill.name)) : current;
const scannedFindings = skillsToScan.flatMap((skill) => {
  const changedFiles = diff.added.includes(skill.name) ? null : diff.changedFilesByName[skill.name];
  return scanSkill(skill, changedFiles);
});
const acceptedFindings = scannedFindings.filter((finding) => allowedKeys.has(findingKey(finding)));
const suspiciousFindings = scannedFindings.filter((finding) => !allowedKeys.has(findingKey(finding)));

let snapshotWritten = false;
let snapshotWriteBlocked = false;
if (writeSnapshot && suspiciousFindings.length > 0) {
  snapshotWriteBlocked = true;
}

if (writeSnapshot && !snapshotWriteBlocked) {
  fs.mkdirSync(referencesDir, { recursive: true });
  fs.writeFileSync(
    snapshotPath,
    `${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        skillsRoot: "$CODEX_HOME/skills",
        skillCount: current.length,
        allowlistPath: "$CODEX_HOME/skills/zhuluyou/references/skill-lifecycle-allowlist.json",
        skills: current.map((skill) => ({
          name: skill.name,
          description: skill.description,
          relativeDir: skill.relativeDir,
          hash: skill.hash,
          files: skill.files
        }))
      },
      null,
      2
    )}\n`,
    "utf8"
  );
  snapshotWritten = true;
}

const cleanCurrentState =
  Boolean(snapshot) &&
  diff.added.length === 0 &&
  diff.removed.length === 0 &&
  diff.changed.length === 0 &&
  suspiciousFindings.length === 0;
const acceptedSnapshotWrite = writeSnapshot && snapshotWritten && suspiciousFindings.length === 0;
const ok = cleanCurrentState || acceptedSnapshotWrite;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      snapshotExists: Boolean(snapshot),
      snapshotWritten,
      snapshotWriteBlocked,
      snapshotPath,
      activeSkillCount: current.length,
      added: diff.added,
      removed: diff.removed,
      changed: diff.changed,
      changedFilesByName: diff.changedFilesByName,
      scannedSkillCount: skillsToScan.length,
      acceptedFindings,
      suspiciousFindings
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
