#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { discoverProjectRoot } from "./project-root.mjs";

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

function run(command, commandArgs, cwd) {
  return spawnSync(command, commandArgs, { cwd, encoding: "utf8" });
}

function shellQuote(value) {
  return `'${String(value).replace(/\\/g, "/").replace(/'/g, "'\\''")}'`;
}

function maintenanceDefaults() {
  return {
    version: 1,
    enabled: true,
    daily: {
      mode: "light-audit",
      autoWriteGlobalMemory: false,
      autoDeleteMemory: false
    },
    weekly: {
      mode: "deep-audit",
      autoWriteGlobalMemory: false,
      autoDeleteMemory: false
    },
    prePushHook: {
      enabled: true,
      blockPushOnFailure: true,
      command: "node <zhuluyou>/scripts/maintain-memory.mjs --scope project --cwd . --trigger pre-push"
    },
    generatedBy: "PAI-Zong-NB memory maintenance",
    updatedAt: new Date().toISOString()
  };
}

function mergeDefaults(existing) {
  const defaults = maintenanceDefaults();
  const merged = {
    ...defaults,
    ...existing,
    daily: { ...defaults.daily, ...(existing.daily || {}) },
    weekly: { ...defaults.weekly, ...(existing.weekly || {}) },
    prePushHook: { ...defaults.prePushHook, ...(existing.prePushHook || {}) },
    updatedAt: existing.updatedAt || defaults.updatedAt
  };
  if (
    merged.prePushHook.command ===
    "node <zhuluyou>/scripts/maintain-memory.mjs --scope project --cwd . --write-summary --trigger pre-push"
  ) {
    merged.prePushHook.command = defaults.prePushHook.command;
  }
  return merged;
}

function resolveHookPath(projectRoot) {
  const result = run("git", ["rev-parse", "--git-path", "hooks/pre-push"], projectRoot);
  if (result.status !== 0) return null;
  const output = result.stdout.trim();
  return output ? path.resolve(projectRoot, output) : null;
}

function buildHookBlock(maintainScript) {
  return `# PAI-Zong-NB memory maintenance start
if command -v node >/dev/null 2>&1; then
  project_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  node ${shellQuote(maintainScript)} --scope project --cwd "$project_root" --trigger pre-push
  status=$?
  if [ "$status" -ne 0 ]; then
    echo "PAI-Zong-NB memory maintenance failed. Fix project memory audit errors before pushing." >&2
    exit "$status"
  fi
else
  echo "PAI-Zong-NB memory maintenance skipped: node not found." >&2
fi
# PAI-Zong-NB memory maintenance end`;
}

const startDir = path.resolve(arg("cwd", process.cwd()));
const setup = has("setup");
const repair = has("repair");
const force = has("force");
const dryRun = has("dry-run") || (!setup && !repair);
const discovered = discoverProjectRoot(startDir);
const projectless = !discovered.projectRoot;
const maintainScript = path.join(scriptsRoot, "maintain-memory.mjs");

const result = {
  ok: true,
  mode: setup ? "setup" : repair ? "repair" : "check",
  dryRun,
  cwd: startDir,
  projectless,
  projectRoot: discovered.projectRoot,
  projectMarker: discovered.marker,
  maintainScript,
  configPath: null,
  configExists: false,
  configAction: "skipped",
  hookPath: null,
  hookExists: false,
  hookInstalled: false,
  hookAction: "skipped",
  warnings: []
};

if (projectless) {
  result.ok = false;
  result.warnings.push("No project marker found. Refusing to configure project maintenance.");
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(1);
}

const projectRoot = discovered.projectRoot;
const configPath = path.join(projectRoot, "docs/memory/maintenance.json");
result.configPath = configPath;
result.configExists = fs.existsSync(configPath);

let existingConfig = {};
let configParseFailed = false;
if (result.configExists) {
  try {
    existingConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    configParseFailed = true;
    result.ok = false;
    result.warnings.push(`maintenance.json parse error: ${error.message}`);
  }
}

const nextConfig = mergeDefaults(existingConfig);
const needsConfigWrite = !result.configExists || force || JSON.stringify(existingConfig) !== JSON.stringify(nextConfig);
if (configParseFailed && !force) {
  result.configAction = "parse-error";
} else if (needsConfigWrite) {
  result.configAction = dryRun ? "would-write" : result.configExists ? "updated" : "created";
  if (!dryRun) {
    nextConfig.updatedAt = new Date().toISOString();
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, `${JSON.stringify(nextConfig, null, 2)}\n`, "utf8");
  }
} else {
  result.configAction = "exists";
}

const hookPath = resolveHookPath(projectRoot);
result.hookPath = hookPath;
if (!hookPath) {
  result.warnings.push("Git hook path is unavailable; pre-push maintenance hook was not configured.");
} else {
  result.hookExists = fs.existsSync(hookPath);
  const hookText = result.hookExists ? fs.readFileSync(hookPath, "utf8") : "";
  const hasBlock = hookText.includes("PAI-Zong-NB memory maintenance start");
  if (hasBlock && !force) {
    result.hookAction = "exists";
    result.hookInstalled = true;
  } else if (dryRun) {
    result.hookAction = hasBlock ? "would-rewrite" : "would-install";
  } else {
    const shebang = result.hookExists && hookText.trim() ? "" : "#!/usr/bin/env sh\n";
    const cleaned = hasBlock
      ? hookText.replace(
          /# PAI-Zong-NB memory maintenance start[\s\S]*?# PAI-Zong-NB memory maintenance end\n?/m,
          ""
        )
      : hookText;
    const nextHook = `${shebang}${cleaned.trimEnd()}\n\n${buildHookBlock(maintainScript)}\n`;
    fs.mkdirSync(path.dirname(hookPath), { recursive: true });
    fs.writeFileSync(hookPath, nextHook, "utf8");
    fs.chmodSync(hookPath, 0o755);
    result.hookAction = hasBlock ? "rewritten" : "installed";
    result.hookInstalled = true;
  }
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exit(result.ok ? 0 : 1);
