#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { discoverProjectRoot } from "./project-root.mjs";

const args = process.argv.slice(2);

function arg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

function has(name) {
  return args.includes(`--${name}`);
}

function normalizeRel(filePath) {
  return filePath.replace(/\\/g, "/");
}

function existsRel(root, rel) {
  return fs.existsSync(path.join(root, rel));
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function lineCount(text) {
  return text.trimEnd().split(/\r?\n/).filter(Boolean).length;
}

function pointerLine(root, rel, label) {
  return existsRel(root, rel) ? `- Read \`${normalizeRel(rel)}\` for ${label}.` : null;
}

function contextPointers(root) {
  return [
    pointerLine(root, ".ai_project.md", "project identity, status, risks, and canonical command pointers"),
    pointerLine(root, "docs/INDEX.md", "the durable documentation map"),
    pointerLine(root, "docs/project-structure.md", "directory, module, and ownership boundaries"),
    pointerLine(root, "docs/roadmap.md", "planning, next actions, and technical debt routing"),
    pointerLine(root, "docs/maintenance/known-issues.md", "known recurring issues"),
    pointerLine(root, "docs/maintenance/technical-debt.md", "cleanup and refactor candidates"),
    pointerLine(root, "docs/memory/README.md", "evidence and invalidation rules")
  ].filter(Boolean);
}

function packageScriptPointers(root) {
  const packagePath = path.join(root, "package.json");
  if (!fs.existsSync(packagePath)) return [];
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    const scripts = pkg.scripts || {};
    return ["test", "lint", "typecheck", "build"]
      .filter((name) => scripts[name])
      .map((name) => `- If this project requires \`${name}\`, use the canonical package script \`npm run ${name}\` or the package manager documented in project memory.`);
  } catch {
    return ["- `package.json` exists but could not be parsed; verify commands from project memory before running them."];
  }
}

function buildManagedBlock(root) {
  const projectName = path.basename(root);
  const pointers = contextPointers(root);
  const commandPointers = packageScriptPointers(root);
  const contextLines = pointers.length
    ? pointers
    : ["- No project memory pointers were found yet; initialize project memory before adding long-lived rules."];
  const verificationLines = commandPointers.length
    ? commandPointers
    : ["- Use canonical verification commands from `.ai_project.md` or `docs/`; do not invent commands."];

  return `<!-- BEGIN MANAGED PROJECT AGENTS RULES -->
## Rule Scope

- These rules apply only to \`${projectName}\`.
- Keep this file as project-local AI collaboration rules only.
- Store project facts, structure, planning, command catalogs, and evidence in \`.ai_project.md\` or \`docs/\`.

## Context Entry Points

${contextLines.join("\n")}

## User Requirements

- Preserve explicit user-authored project rules unless the user approves a change.
- Ask before changing behavior that affects safety, billing, auth, deployment, migrations, permissions, or production data.

## Working Rules

- Make scoped changes and follow the existing project style.
- Do not edit generated files unless project memory says they are source files.
- Prefer project docs and source evidence over assumptions.
- Keep reusable findings in project memory instead of adding long explanations here.

## Safety And Confirmation Gates

- Confirm before destructive filesystem operations, dependency rewrites, migrations, deploys, credential handling, or external writes.
- Do not commit, push, publish, deploy, delete, or rotate secrets without explicit user approval.
- Do not store secrets, tokens, private account data, raw logs, or temporary task notes in project memory.

## Verification Gates

${verificationLines.join("\n")}
- For UI or browser-visible changes, run the smallest useful manual or browser verification available.
- Report any verification that could not be run.

## Project Memory Sync

- Update \`.ai_project.md\` for compact status, risks, command pointers, or active focus changes.
- Update \`docs/INDEX.md\` when durable docs are added, moved, or removed.
- Update \`docs/project-structure.md\` when modules, entry points, or ownership boundaries change.
- Update \`docs/roadmap.md\` or \`docs/maintenance/*\` for plans, known issues, technical debt, or recurring bugs.
- Add evidence or invalidation records when durable memory claims depend on source state.

## Do Not Include / Do Not Do

- Do not copy global runtime prompts, role definitions, full skill routing, or \`SKILL.md\` workflows into this file.
- Do not include global skills paths; if a project truly needs one, add a short Global Skills Path Exception and re-run audit.
- Do not duplicate project structure maps, roadmap bodies, architecture docs, API docs, database docs, deployment docs, raw logs, or long history.
- Do not create project-local \`zhuluyou\`.
- Do not present guessed commands, project facts, or architecture as confirmed rules.
<!-- END MANAGED PROJECT AGENTS RULES -->`;
}

function mergeContent(existing, fullContent, managedBlock, options) {
  const begin = "<!-- BEGIN MANAGED PROJECT AGENTS RULES -->";
  const end = "<!-- END MANAGED PROJECT AGENTS RULES -->";
  if (!existing.trim()) return { mode: "create", content: fullContent };
  if (options.force) return { mode: "replace", content: fullContent };
  const start = existing.indexOf(begin);
  const stop = existing.indexOf(end);
  if (start >= 0 && stop > start) {
    const before = existing.slice(0, start).trimEnd();
    const after = existing.slice(stop + end.length).trimStart();
    return {
      mode: "replace-managed-block",
      content: `${before}\n\n${managedBlock}${after ? `\n\n${after}` : ""}\n`
    };
  }
  if (options.refresh) {
    return {
      mode: "append-managed-block",
      content: `${existing.trimEnd()}\n\n${managedBlock}\n`
    };
  }
  return { mode: "refuse-existing-unmanaged", content: existing };
}

const startDir = arg("cwd", process.cwd());
const dryRun = has("dry-run");
const refresh = has("refresh");
const force = has("force");
const printContent = has("print");
const discovered = discoverProjectRoot(startDir);
const projectless = !discovered.projectRoot;

if (projectless && !force) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: false,
        wrote: false,
        projectless: true,
        message: "No project root marker found. Refusing to generate project AGENTS.md without --force.",
        startDir: path.resolve(startDir)
      },
      null,
      2
    )}\n`
  );
  process.exit(1);
}

const projectRoot = discovered.projectRoot || path.resolve(startDir);
const agentsPath = path.join(projectRoot, "AGENTS.md");
const existing = readText(agentsPath);
const managedBlock = buildManagedBlock(projectRoot);
const fullContent = `# AGENTS.md instructions for ${path.basename(projectRoot)}\n\n${managedBlock}\n`;
const merged = mergeContent(existing, fullContent, managedBlock, { refresh, force });
const refused = merged.mode === "refuse-existing-unmanaged";
const dryRunPlan = dryRun && refused;
const resultContent = dryRunPlan ? fullContent : merged.content;
const resultMode = dryRunPlan ? "plan-existing-unmanaged" : merged.mode;
const changed = resultContent !== existing;
const warnings = [];

if (refused) {
  warnings.push(
    dryRun
      ? "Existing AGENTS.md has no managed block. Dry-run shows the generated plan; write with --refresh to append or --force after host approval to replace."
      : "Existing AGENTS.md has no managed block. Use --dry-run to inspect, --refresh to append, or --force after host approval to replace."
  );
}
if (lineCount(resultContent) > 100) {
  warnings.push("Generated result exceeds the 100-line target; audit-project-agents.mjs should review it.");
}

if (!dryRun && changed && !refused) {
  fs.writeFileSync(agentsPath, merged.content, "utf8");
}

const result = {
  ok: dryRun ? true : !refused,
  wrote: !dryRun && changed && !refused,
  dryRun,
  mode: resultMode,
  projectRoot,
  projectMarker: discovered.marker,
  target: agentsPath,
  changed,
  lineCount: lineCount(resultContent),
  warnings
};

if (printContent || dryRun) result.content = resultContent;

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exit(result.ok ? 0 : 1);
