#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverProjectRoot, existingDir, homeDir, resolveCodexHome } from "./project-root.mjs";

const __filename = fileURLToPath(import.meta.url);

const args = new Set(process.argv.slice(2));
const repair = args.has("--repair") || args.has("-r");

function filePurpose(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const purpose = text.match(/## Purpose\s+([\s\S]*?)(?:\n## |\s*$)/);
  if (purpose) {
    const value = purpose[1].replace(/\s+/g, " ").trim();
    return value.length > 180 ? `${value.slice(0, 177)}...` : value;
  }
  const heading = text.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : "User routing and behavior rule.";
}

function readWhen(fileName) {
  const rules = {
    "routing-core.md": "Every turn after this index.",
    "communication-style.md": "Every turn before responding.",
    "memory-reliability-style.md": "When resolving global/project memory, project roots, or memory bootstrap repair.",
    "memory-stack-style.md": "Every non-trivial turn before project docs, knowledge graph, or professional skill reads.",
    "memory-evidence-style.md": "Before writing durable project memory, docs, debug reports, ADRs, roadmap items, or KG nodes/edges.",
    "global-memory-capture-style.md": "Every non-trivial turn before final response; always when user asks to remember or sets defaults.",
    "knowledge-graph-memory-style.md": "When project work may need relationship lookup, impact analysis, long-term continuity, or cross-layer memory.",
    "persona-style.md": "Every turn where tone/persona matters; always before emotionally sensitive replies.",
    "emotion-support-style.md": "When user sounds upset, tired, frustrated, discouraged, or asks for comfort/fun.",
    "user-profile-growth-style.md": "When user states stable preferences or repeated corrections.",
    "role-host-style.md": "Before multi-step work, high-risk tasks, or final delivery checks.",
    "role-architect-style.md": "Before architecture, refactor, module split, tech selection, or major feature planning.",
    "role-coder-style.md": "Before writing or modifying code/config/tests.",
    "role-debugger-style.md": "Before debugging, fixing bugs, CI/build failures, regressions, or flaky tests.",
    "role-project-assistant-style.md": "Before/after project file changes, docs changes, or project memory audits.",
    "role-rule-governor-style.md": "Before modifying prompts, skills, user-skills, install docs, manifests, or distribution zips.",
    "project-memory-style.md": "Before software project changes or project memory maintenance.",
    "project-agents-style.md": "When creating, refreshing, auditing, or maintaining project AGENTS.md, or when project-local rules, user requirements, safety gates, or verification gates change.",
    "debug-reuse-style.md": "Before debugging or after fixing durable/complex bugs.",
    "skill-router-style.md": "Before any task that may need professional skills.",
    "skill-lifecycle-governance-style.md": "Before installing, deleting, archiving, restoring, updating, auditing, or routing skills.",
    "ui-taste-style.md": "Before UI design, redesign, beautification, frontend screens, or visual QA.",
    "automation-boundary-style.md": "Before actions that write files, update memory, run high-risk commands, or change persistent rules.",
    "product-context-style.md": "Before architecture, UI, API, Tauri, backend, database, or product planning."
  };
  return rules[fileName] || "When selected by routing-core.md.";
}

function buildIndex(skillFiles) {
  const always = ["routing-core.md", "communication-style.md", "memory-reliability-style.md"];
  const lines = [
    "# User Skills Index",
    "",
    "This directory stores evolved user skills: durable, executable preferences and routing rules that help Codex work in the user's preferred way.",
    "",
    "User skills are global user memory and routing context. They live under `$CODEX_HOME/skills/zhuluyou/user-skills/`, not inside an individual project.",
    "",
    "## Core Rules",
    "",
    "- Every turn starts by reading this index, `routing-core.md`, and `communication-style.md`.",
    "- Use `memory-reliability-style.md` as the single managed memory gateway whenever memory or project context is involved.",
    "- Then read only the matching user-skill files by `Read When`; do not bulk-load every file.",
    "- User skills guide behavior and routing; they do not replace source code, project docs, official docs, or professional `SKILL.md` files.",
    "- If this index is missing or incomplete, rebuild or complete it from existing global `user-skills/*.md` files.",
    "- Do not infer user preferences that are not present in files.",
    "",
    "## Always Read",
    "",
    "| Skill | Status | Purpose | Read When |",
    "|---|---|---|---|"
  ];

  for (const file of skillFiles.filter((f) => always.includes(f.name))) {
    lines.push(`| \`${file.name}\` | Active | ${filePurpose(file.path)} | ${readWhen(file.name)} |`);
  }

  lines.push("", "## User Skills", "", "| Skill | Status | Purpose | Read When |", "|---|---|---|---|");

  for (const file of skillFiles.filter((f) => !always.includes(f.name) && f.name !== "INDEX.md")) {
    lines.push(`| \`${file.name}\` | Active | ${filePurpose(file.path)} | ${readWhen(file.name)} |`);
  }

  lines.push(
    "",
    "## Change Log",
    "",
    "| Date | Change | Evidence |",
    "|---|---|---|",
    "| 2026-05-30 | Rebuilt user-skills index from existing global user-skill files. | verify-memory-bootstrap.mjs --repair |",
    ""
  );

  return `${lines.join("\n")}\n`;
}

const codexHome = resolveCodexHome();
const home = homeDir();
const basePath =
  existingDir(codexHome, "skills", "zhuluyou") ||
  (home ? existingDir(home, ".codex", "skills", "zhuluyou") : null) ||
  path.join(codexHome, "skills", "zhuluyou");
const userSkillsDir = path.join(basePath, "user-skills");
const indexPath = path.join(userSkillsDir, "INDEX.md");
const required = [
  basePath,
  userSkillsDir,
  path.join(basePath, "references", "profile.md"),
  path.join(userSkillsDir, "routing-core.md"),
  path.join(userSkillsDir, "communication-style.md"),
  path.join(userSkillsDir, "memory-reliability-style.md")
];

const missingRequired = required.filter((p) => !fs.existsSync(p));
const skillFiles = fs.existsSync(userSkillsDir)
  ? fs
      .readdirSync(userSkillsDir)
      .filter((name) => name.endsWith(".md"))
      .map((name) => ({ name, path: path.join(userSkillsDir, name) }))
      .filter((file) => file.name !== "INDEX.md")
      .sort((a, b) => a.name.localeCompare(b.name))
  : [];

let indexExists = fs.existsSync(indexPath);
let missingSections = [];
let missingIndexEntries = [];

function inspectIndex() {
  indexExists = fs.existsSync(indexPath);
  missingSections = [];
  missingIndexEntries = [];
  if (!indexExists) return;
  const text = fs.readFileSync(indexPath, "utf8");
  for (const section of ["# User Skills Index", "## Core Rules", "## Always Read", "## Change Log"]) {
    if (!text.includes(section)) missingSections.push(section);
  }
  for (const file of skillFiles) {
    if (!text.includes(`\`${file.name}\``)) missingIndexEntries.push(file.name);
  }
}

inspectIndex();
let repaired = false;
const messages = [];

if (repair && fs.existsSync(userSkillsDir) && (!indexExists || missingSections.length || missingIndexEntries.length)) {
  if (indexExists) {
    const backup = `${indexPath}.bak-${new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14)}`;
    fs.copyFileSync(indexPath, backup);
    messages.push(`Backed up index to: ${backup}`);
  }
  fs.writeFileSync(indexPath, buildIndex(skillFiles), "utf8");
  repaired = true;
  messages.push(`Rebuilt index: ${indexPath}`);
  inspectIndex();
}

const project = discoverProjectRoot(process.cwd());
const ok = missingRequired.length === 0 && indexExists && missingSections.length === 0 && missingIndexEntries.length === 0;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      repaired,
      platform: process.platform,
      codexHome,
      globalMemoryRoot: basePath,
      indexPath,
      indexExists,
      userSkillFiles: skillFiles.length,
      missingRequired,
      missingSections,
      missingIndexEntries,
      projectRoot: project.projectRoot,
      projectMarker: project.marker,
      messages
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
