#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existingDir, homeDir } from "./project-root.mjs";

const __filename = fileURLToPath(import.meta.url);
const scriptsRoot = path.dirname(__filename);
const args = process.argv.slice(2);

function arg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] || fallback : fallback;
}

function has(name) {
  return args.includes(`--${name}`);
}

function resolveCodexHome() {
  const explicit = arg("codex-home").trim();
  if (explicit) return path.resolve(explicit);
  const configured = typeof process.env.CODEX_HOME === "string" ? process.env.CODEX_HOME.trim() : "";
  if (configured && existingDir(configured)) return path.resolve(configured);
  const home = homeDir();
  const defaultHome = home ? existingDir(home, ".codex") : null;
  return defaultHome || path.join(home || process.cwd(), ".codex");
}

function runNode(scriptName, extraArgs = []) {
  const scriptPath = path.join(scriptsRoot, scriptName);
  const result = spawnSync(process.execPath, [scriptPath, ...extraArgs], {
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
  return {
    script: scriptName,
    ok: result.status === 0,
    status: result.status,
    parsed
  };
}

const startDir = path.resolve(arg("cwd", process.cwd()));
const codexHome = resolveCodexHome();
const scope = arg("scope", "all");
const trigger = arg("trigger", has("daily") ? "daily" : has("weekly") ? "weekly" : "manual");
const writeSummary = has("write-summary");
const writeReport = has("write-report");

const checks = [];

if (scope === "global" || scope === "all") {
  checks.push(runNode("verify-memory-bootstrap.mjs"));
  checks.push(runNode("verify-skill-routes.mjs"));
  if (has("weekly") || trigger === "manual") {
    checks.push(runNode("audit-skill-lifecycle.mjs"));
    checks.push(runNode("audit-memory-system.mjs", ["--cwd", startDir]));
  }
}

if (scope === "project" || scope === "all") {
  const audit = runNode("audit-project-memory.mjs", ["--cwd", startDir]);
  checks.push(audit);
  if (writeSummary && audit.ok && !audit.parsed?.projectless) {
    checks.push(runNode("summarize-project-memory.mjs", ["--cwd", audit.parsed.projectRoot || startDir, "--write"]));
  }
}

const ok = checks.every((check) => check.ok || check.parsed?.projectless);
const report = {
  ok,
  platform: process.platform,
  trigger,
  scope,
  cwd: startDir,
  codexHome,
  writeSummary,
  checks,
  wroteReport: false,
  reportPath: null
};

if (writeReport) {
  const reportDir = path.join(codexHome, "memory-maintenance", "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportPath = path.join(reportDir, `${stamp}-${trigger}-${scope}.json`);
  fs.writeFileSync(reportPath, `${JSON.stringify({ ...report, wroteReport: true, reportPath }, null, 2)}\n`, "utf8");
  report.wroteReport = true;
  report.reportPath = reportPath;
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exit(ok ? 0 : 1);
