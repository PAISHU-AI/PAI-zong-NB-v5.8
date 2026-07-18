#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { existingDir, homeDir, resolveCodexHome } from "./project-root.mjs";

const cwdIndex = process.argv.indexOf("--cwd");
const startDir = cwdIndex >= 0 ? process.argv[cwdIndex + 1] : process.cwd();

function runNode(script, extraArgs = []) {
  const result = spawnSync(process.execPath, [script, ...extraArgs], {
    cwd: startDir,
    env: { ...process.env, CODEX_HOME: codexHome },
    encoding: "utf8"
  });
  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    parsed = { parseError: true, stdout: result.stdout, stderr: result.stderr };
  }
  return { ok: result.status === 0, status: result.status, parsed };
}

function hasAll(root, rels) {
  return rels.filter((rel) => !fs.existsSync(path.join(root, rel)));
}

const codexHome = resolveCodexHome();
const home = homeDir();
const zhuluyouRoot =
  existingDir(codexHome, "skills", "zhuluyou") ||
  (home ? existingDir(home, ".codex", "skills", "zhuluyou") : null) ||
  path.join(codexHome, "skills", "zhuluyou");
const scriptsRoot = path.join(zhuluyouRoot, "scripts");
const userSkillsRoot = path.join(zhuluyouRoot, "user-skills");

const requiredUserSkills = [
  "INDEX.md",
  "routing-core.md",
  "communication-style.md",
  "memory-reliability-style.md",
  "memory-stack-style.md",
  "memory-evidence-style.md",
  "global-memory-capture-style.md",
  "project-memory-style.md",
  "project-agents-style.md",
  "knowledge-graph-memory-style.md",
  "role-host-style.md",
  "role-project-assistant-style.md",
  "role-rule-governor-style.md"
];

const requiredScripts = [
  "verify-memory-bootstrap.mjs",
  "verify-skill-routes.mjs",
  "audit-skill-lifecycle.mjs",
  "audit-project-memory.mjs",
  "init-project-memory.mjs",
  "capture-global-memory.mjs",
  "resolve-memory-context.mjs",
  "audit-memory-system.mjs",
  "generate-project-agents.mjs",
  "audit-project-agents.mjs",
  "summarize-project-memory.mjs",
  "maintain-memory.mjs",
  "setup-project-maintenance.mjs"
];

const missingUserSkills = hasAll(userSkillsRoot, requiredUserSkills);
const missingScripts = hasAll(scriptsRoot, requiredScripts);
const bootstrap = runNode(path.join(scriptsRoot, "verify-memory-bootstrap.mjs"));
const routes = runNode(path.join(scriptsRoot, "verify-skill-routes.mjs"));
const lifecycle = runNode(path.join(scriptsRoot, "audit-skill-lifecycle.mjs"));
const memoryContext = runNode(path.join(scriptsRoot, "resolve-memory-context.mjs"), ["--cwd", startDir, "--task", "memory system audit"]);
const projectAudit = runNode(path.join(scriptsRoot, "audit-project-memory.mjs"), ["--cwd", startDir]);

const projectless = Boolean(projectAudit.parsed?.projectless);
const projectOk = projectless || projectAudit.ok;
const ok =
  fs.existsSync(zhuluyouRoot) &&
  missingUserSkills.length === 0 &&
  missingScripts.length === 0 &&
  bootstrap.ok &&
  routes.ok &&
  lifecycle.ok &&
  memoryContext.ok &&
  projectOk;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      platform: process.platform,
      codexHome,
      zhuluyouRoot,
      userSkillsRoot,
      scriptsRoot,
      missingUserSkills,
      missingScripts,
      bootstrap: bootstrap.parsed,
      routes: routes.parsed,
      lifecycle: lifecycle.parsed,
      memoryContext: memoryContext.parsed,
      projectAudit: projectAudit.parsed,
      projectAuditAcceptedProjectless: projectless
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
