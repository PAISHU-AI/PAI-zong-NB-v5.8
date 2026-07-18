#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.dirname(path.dirname(__filename));
const skillsRoot = path.join(repoRoot, "skills");

function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(current, visit);
    else if (entry.isFile()) visit(current);
  }
}

function meta(text, key) {
  return (text.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"))?.[1] || "").trim().replace(/^['"]|['"]$/g, "");
}

const skillFiles = [];
walk(skillsRoot, (file) => {
  if (path.basename(file) === "SKILL.md") skillFiles.push(file);
});

const topLevelSkillDirs = fs.existsSync(skillsRoot)
  ? fs
      .readdirSync(skillsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
  : [];
const nonSkillDirectories = topLevelSkillDirs.filter(
  (dir) => !fs.existsSync(path.join(skillsRoot, dir, "SKILL.md"))
);

const records = skillFiles.map((file) => {
  const text = fs.readFileSync(file, "utf8");
  return {
    path: path.relative(repoRoot, file),
    name: meta(text, "name"),
    description: meta(text, "description"),
    bytes: fs.statSync(file).size
  };
});

const names = new Map();
for (const record of records) {
  if (!record.name) continue;
  names.set(record.name, [...(names.get(record.name) || []), record.path]);
}

const duplicateNames = [...names.entries()].filter(([, paths]) => paths.length > 1).map(([name]) => name);
const missingName = records.filter((record) => !record.name).map((record) => record.path);
const missingDescription = records.filter((record) => !record.description).map((record) => record.path);
const tinyFiles = records.filter((record) => record.bytes < 300).map((record) => record.path);
const includesAgents = fs.existsSync(path.join(repoRoot, "AGENTS.md"));
const includesSystemSkills = fs.existsSync(path.join(skillsRoot, ".system"));
const includesRuntimePrompt = false;

const runtimeSystemSkills = ["imagegen", "openai-docs", "plugin-creator", "skill-creator", "skill-installer"];

function runMemoryScript(script, scriptArgs = []) {
  const result = spawnSync(process.execPath, [path.join(skillsRoot, "zhuluyou/scripts", script), ...scriptArgs], {
    cwd: repoRoot,
    env: {
      ...process.env,
      CODEX_HOME: repoRoot,
      CODEX_RUNTIME_SYSTEM_SKILLS: runtimeSystemSkills.join(",")
    },
    encoding: "utf8"
  });
  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    parsed = { stdout: result.stdout, stderr: result.stderr };
  }
  return { ok: result.status === 0, parsed };
}

function runPackageScript(script, scriptArgs = []) {
  const result = spawnSync(process.execPath, [path.join(repoRoot, "scripts", script), ...scriptArgs], {
    cwd: repoRoot,
    env: { ...process.env, CODEX_HOME: repoRoot },
    encoding: "utf8"
  });
  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    parsed = { stdout: result.stdout, stderr: result.stderr };
  }
  return { ok: result.status === 0, parsed };
}

const memoryBootstrap = runMemoryScript("verify-memory-bootstrap.mjs");
const routeCheck = runMemoryScript("verify-skill-routes.mjs");
const lifecycle = runMemoryScript("audit-skill-lifecycle.mjs");
const projectlessCwd = fs.mkdtempSync(path.join(os.tmpdir(), "PAI-Zong-NB-verify-"));
const memorySystem = runMemoryScript("audit-memory-system.mjs", ["--cwd", projectlessCwd]);
fs.rmSync(projectlessCwd, { recursive: true, force: true });
const overlayRoot = path.join(repoRoot, "overlays/PAI-Zong-personal");
const commercialContent = runPackageScript(
  "audit-commercial-content.mjs",
  fs.existsSync(overlayRoot) ? ["--allow-owner-profile"] : ["--no-require-overlay", "--allow-owner-profile"]
);
const skillSources = runPackageScript("audit-skill-sources.mjs");

const ok =
  skillFiles.length > 0 &&
  nonSkillDirectories.length === 0 &&
  missingName.length === 0 &&
  missingDescription.length === 0 &&
  duplicateNames.length === 0 &&
  !includesAgents &&
  !includesSystemSkills &&
  memoryBootstrap.ok &&
  routeCheck.ok &&
  lifecycle.ok &&
  memorySystem.ok &&
  commercialContent.ok &&
  skillSources.ok;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      skillFiles: skillFiles.length,
      topLevelSkillDirs: topLevelSkillDirs.length,
      nonSkillDirectories,
      missingName,
      missingDescription,
      duplicateNames,
      tinyFiles,
      includesAgents,
      includesSystemSkills,
      includesRuntimePrompt,
      runtimeSystemSkills,
      memoryBootstrapOk: memoryBootstrap.ok,
      routeCheckOk: routeCheck.ok,
      lifecycleOk: lifecycle.ok,
      memorySystemOk: memorySystem.ok,
      commercialContentOk: commercialContent.ok,
      skillSourcesOk: skillSources.ok,
      memoryBootstrap: memoryBootstrap.parsed,
      routeCheck: routeCheck.parsed,
      lifecycle: lifecycle.parsed,
      commercialContent: commercialContent.parsed,
      skillSources: skillSources.parsed,
      memorySystem: memorySystem.parsed
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
