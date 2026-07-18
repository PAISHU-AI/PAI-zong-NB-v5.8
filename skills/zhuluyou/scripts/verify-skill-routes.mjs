#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { existingDir, homeDir, resolveCodexHome } from "./project-root.mjs";

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function readSkillMeta(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const name = (text.match(/^name:\s*(.+?)\s*$/m)?.[1] || "")
    .trim()
    .replace(/^['"]|['"]$/g, "");
  const description = (text.match(/^description:\s*(.+?)\s*$/m)?.[1] || "").trim();
  return { name, description };
}

function walk(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(current, visit);
    } else if (entry.isFile()) {
      visit(current);
    }
  }
}

function collectSkills(skillsRoot) {
  const byName = new Map();
  const invalid = [];
  walk(skillsRoot, (filePath) => {
    if (path.basename(filePath) !== "SKILL.md") return;
    const meta = readSkillMeta(filePath);
    if (!meta.name || !meta.description) {
      invalid.push({ path: filePath, name: meta.name, hasDescription: Boolean(meta.description) });
    }
    if (meta.name) {
      const paths = byName.get(meta.name) || [];
      paths.push(filePath);
      byName.set(meta.name, paths);
    }
  });
  const duplicateSkillNames = [...byName.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([name, paths]) => ({ name, paths }));
  return { byName, invalid, duplicateSkillNames };
}

function userSkillIgnoreSet(userSkillsDir) {
  const names = new Set([
    "SKILL.md",
    "AGENTS.md",
    "INDEX.md",
    "README",
    "docs",
    "user-skills",
    "zhuluyou",
    ".ai_project.md",
    "known-issues.md",
    "development-log.md",
    "CHANGELOG.md",
    "package.json",
    "pnpm-workspace.yaml",
    "Cargo.toml",
    "pyproject.toml",
    "go.mod",
    "tauri.conf.json",
    "src-tauri",
    "Read When",
    "Owner",
    "Update Trigger",
    "Validation",
    "L0",
    "L1",
    "L2",
    "L3",
    "V5.0",
    "CODEX_HOME",
    "HOME",
    "KG0",
    "KG1",
    "KG2",
    "KG3",
    "feature",
    "module",
    "file",
    "api",
    "db_table",
    "doc",
    "adr",
    "test",
    "command",
    "config",
    "risk",
    "issue",
    "task",
    "implements",
    "uses",
    "depends_on",
    "documented_by",
    "tested_by",
    "configured_by",
    "validated_by",
    "changed_by",
    "blocked_by",
    "mitigates",
    "supersedes",
    "related_to",
    "evidence",
    "id",
    "type",
    "name",
    "source",
    "source_hash",
    "last_verified",
    "valid_from",
    "valid_to",
    "superseded_by",
    "invalidation_reason",
    "captured_at",
    "invalidated_at",
    "target_id",
    "reason",
    "linked_ids",
    "sensitivity",
    "global",
    "project",
    "none",
    "summary",
    "status",
    "confidence",
    "confirmed",
    "inferred"
  ]);

  for (const name of [
    "bootstrap-context",
    "prompt-skill-governance",
    "project-memory-docs",
    "spec-planning-docs",
    "architecture-product",
    "frontend-ui-design",
    "control-center-ui",
    "figma-design-system",
    "ui-style-review",
    "application-engineering",
    "api-data-db-auth",
    "debugging-testing",
    "quality-release-readiness",
    "security-hardening",
    "security-redteam-privacy",
    "payments-blockchain-secrets",
    "deployment-release",
    "automation-orchestration",
    "devops-ops",
    "platform-integrations",
    "agent-runtime-tools",
    "ai-mlops-models",
    "communications-integrations",
    "creative-image-design",
    "video-media-production",
    "creative-presentation-media",
    "method-packs",
    "gaming-leisure-explicit",
    "information-research",
    "copywriting-content",
    "office-productivity",
    "commerce-productivity",
    "finance-business",
    "health-bio-research",
    "explicit-only",
    "explicit-skill-only",
    "candidate",
    "default",
    "gated-candidate",
    "gated-default",
    "optional-candidate",
  ]) {
    names.add(name);
  }

  if (fs.existsSync(userSkillsDir)) {
    for (const fileName of fs.readdirSync(userSkillsDir)) {
      if (fileName.endsWith(".md")) {
        names.add(fileName);
        names.add(fileName.replace(/\.md$/, ""));
      }
    }
  }
  return names;
}

function extractBacktickSkillRefs(filePath, ignoreSet) {
  const text = fs.readFileSync(filePath, "utf8");
  const refs = [];
  const ignorePatterns = [
    /^[./~$%]/,
    /\//,
    /\.(md|json|ps1|mjs|yaml|yml|toml|ts|tsx|js|jsx|py|rs|sh|txt|log)$/,
    /^[A-Z0-9_]+$/,
    /^\d/,
    /^docs\//,
    /^scripts\//
  ];

  for (const match of text.matchAll(/`([^`\n]{2,80})`/g)) {
    const ref = match[1].trim();
    if (ignoreSet.has(ref)) continue;
    if (ignorePatterns.some((pattern) => pattern.test(ref))) continue;
    if (/^[a-z0-9][a-z0-9-]+$/.test(ref)) refs.push(ref);
  }

  return refs;
}

function inspectUserSkillRefs(userSkillsDir, skillNames) {
  const ignoreSet = userSkillIgnoreSet(userSkillsDir);
  const unresolved = [];
  if (!fs.existsSync(userSkillsDir)) return unresolved;

  for (const fileName of fs.readdirSync(userSkillsDir).filter((name) => name.endsWith(".md"))) {
    const filePath = path.join(userSkillsDir, fileName);
    for (const ref of extractBacktickSkillRefs(filePath, ignoreSet)) {
      if (!skillNames.has(ref)) unresolved.push({ file: fileName, ref });
    }
  }

  return unresolved;
}

function inspectRouterTargets(routerPath, skillNames) {
  if (!fs.existsSync(routerPath)) {
    return [{ file: routerPath, ref: "(missing skill-router-style.md)" }];
  }
  const ignoreSet = userSkillIgnoreSet(path.dirname(routerPath));
  return extractBacktickSkillRefs(routerPath, ignoreSet)
    .filter((ref) => !skillNames.has(ref))
    .map((ref) => ({ file: path.basename(routerPath), ref }));
}

const codexHome = resolveCodexHome();
const explicitSkillsRoot = argValue("--skills-root");
const skillsRoot = explicitSkillsRoot ? path.resolve(explicitSkillsRoot) : path.join(codexHome, "skills");
const home = homeDir();
const zhuluyouRoot =
  existingDir(skillsRoot, "zhuluyou") ||
  (home ? existingDir(home, ".codex", "skills", "zhuluyou") : null) ||
  path.join(skillsRoot, "zhuluyou");
const userSkillsDir = path.join(zhuluyouRoot, "user-skills");
const routerPath = path.join(userSkillsDir, "skill-router-style.md");

const missingRequired = [skillsRoot, zhuluyouRoot, userSkillsDir, routerPath].filter((target) => !fs.existsSync(target));
const skills = fs.existsSync(skillsRoot)
  ? collectSkills(skillsRoot)
  : { byName: new Map(), invalid: [], duplicateSkillNames: [] };
const skillNames = new Set(skills.byName.keys());
for (const name of (process.env.CODEX_RUNTIME_SYSTEM_SKILLS || "").split(",")) {
  const trimmed = name.trim();
  if (trimmed) skillNames.add(trimmed);
}
const missingRouterTargets = inspectRouterTargets(routerPath, skillNames);
const unresolvedUserSkillRefs = inspectUserSkillRefs(userSkillsDir, skillNames);

const ok =
  missingRequired.length === 0 &&
  skills.invalid.length === 0 &&
  skills.duplicateSkillNames.length === 0 &&
  missingRouterTargets.length === 0 &&
  unresolvedUserSkillRefs.length === 0;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      platform: process.platform,
      codexHome,
      skillsRoot,
      zhuluyouRoot,
      userSkillsDir,
      skillNameCount: skillNames.size,
      missingRequired,
      invalidSkills: skills.invalid,
      duplicateSkillNames: skills.duplicateSkillNames,
      missingRouterTargets,
      unresolvedUserSkillRefs
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
