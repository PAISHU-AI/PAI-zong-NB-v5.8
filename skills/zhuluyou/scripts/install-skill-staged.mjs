#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runAntivirusScan, scanPath, summarizeFindings } from "./skill-safety-scan.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..", "..");
const LOCAL_SKILLS_ROOT = path.join(LOCAL_REPO_ROOT, "skills");
const CLASSIFICATION_DIR = path.join(LOCAL_REPO_ROOT, "5.8", "classification");
const OVERRIDES_FILE = path.join(CLASSIFICATION_DIR, "skill-category-overrides.json");
const INSTALL_LOG = path.join(LOCAL_SKILLS_ROOT, "zhuluyou", "references", "skill-install-audit-log.jsonl");

const REQUIRED_CATEGORIES = new Set([
  "00-core-routing-context",
  "01-prompt-skill-governance",
  "02-project-planning-docs",
  "03-architecture-product-strategy",
  "04-frontend-ui-design",
  "05-application-engineering",
  "06-data-api-database-auth",
  "07-debugging-quality-testing",
  "08-security-privacy",
  "09-devops-release-deploy",
  "10-platform-runtime-integrations",
  "11-creative-media-assets",
  "12-experimental-methods",
  "13-information-content-office",
]);

const OWNER_BY_CATEGORY = {
  "00-core-routing-context": "host",
  "01-prompt-skill-governance": "rule-governor",
  "02-project-planning-docs": "project-assistant",
  "03-architecture-product-strategy": "architect-product",
  "04-frontend-ui-design": "design-coder",
  "05-application-engineering": "coder",
  "06-data-api-database-auth": "coder-architect",
  "07-debugging-quality-testing": "debugger-qa",
  "08-security-privacy": "security",
  "09-devops-release-deploy": "automation-devops",
  "10-platform-runtime-integrations": "agent-runtime-automation",
  "11-creative-media-assets": "media-design",
  "12-experimental-methods": "host-rule-governor",
  "13-information-content-office": "information-copywriting-office",
};

function parseArgs(argv) {
  const parsed = {
    source: null,
    targetRoot: null,
    install: false,
    replace: false,
    global: false,
    category: null,
    cluster: null,
    routeMode: "explicit-only",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--source") parsed.source = argv[++i];
    else if (arg === "--target-root") parsed.targetRoot = argv[++i];
    else if (arg === "--category") parsed.category = argv[++i];
    else if (arg === "--cluster") parsed.cluster = argv[++i];
    else if (arg === "--route-mode") parsed.routeMode = argv[++i];
    else if (arg === "--install") parsed.install = true;
    else if (arg === "--replace") parsed.replace = true;
    else if (arg === "--global") parsed.global = true;
    else if (arg === "--help" || arg === "-h") parsed.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage:
  node install-skill-staged.mjs --source <skill-dir-or-parent> [--install] [--replace]
  node install-skill-staged.mjs --source <skill-dir-or-parent> --category <category> [--cluster <cluster>] --install

Default behavior is scan-only. Installation is blocked unless all static safety
checks and the local antivirus scan pass. New local-pack skills are classified
as explicit-only by default so they cannot become automatic default routes.

Options:
  --source <path>       Directory containing SKILL.md, or a parent of skill dirs.
  --install             Copy the approved skill into the target skills root.
  --replace             Replace an existing skill after the same gate passes.
  --target-root <path>  Target skills root. Defaults to this repo's skills/.
  --global              Target %USERPROFILE%/.codex/skills instead of local pack.
  --category <id>       Optional v5.8 category override for local-pack install.
  --cluster <id>        Optional cluster override for local-pack install.
  --route-mode <mode>   explicit-only, candidate, optional-candidate, gated-candidate.
`);
}

function resolveRealGlobalSkillsRoot() {
  const home = process.env.USERPROFILE || os.homedir();
  return path.join(home, ".codex", "skills");
}

function normalizeRelativePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function sha256File(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function hashDir(dir) {
  const entries = [];
  walkFiles(dir, (filePath) => {
    const stat = fs.statSync(filePath);
    if (stat.size > 5_000_000) return;
    entries.push(`${normalizeRelativePath(path.relative(dir, filePath))}:${sha256File(filePath)}`);
  });
  entries.sort();
  return crypto.createHash("sha256").update(entries.join("\n")).digest("hex");
}

function walkFiles(dir, visit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules", "__pycache__", ".venv", "venv"].includes(entry.name)) continue;
      walkFiles(current, visit);
    } else if (entry.isFile()) {
      visit(current);
    }
  }
}

function parseFrontmatter(skillFile) {
  const raw = fs.readFileSync(skillFile, "utf8");
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*/);
  if (!match) return { raw, frontmatter: {}, body: raw };
  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*?)\s*$/);
    if (!field) continue;
    frontmatter[field[1]] = field[2].replace(/^['"]|['"]$/g, "");
  }
  return { raw, frontmatter, body: raw.slice(match[0].length) };
}

function collectSkillDirs(source) {
  const resolved = path.resolve(source);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    throw new Error(`Source directory does not exist: ${resolved}`);
  }
  if (fs.existsSync(path.join(resolved, "SKILL.md"))) return [resolved];
  return fs.readdirSync(resolved, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(resolved, entry.name, "SKILL.md")))
    .map((entry) => path.join(resolved, entry.name))
    .sort();
}

function validateSkillMeta(skillDir) {
  const skillFile = path.join(skillDir, "SKILL.md");
  const { raw, frontmatter } = parseFrontmatter(skillFile);
  const name = String(frontmatter.name || "").trim();
  const description = String(frontmatter.description || "").trim();
  const errors = [];

  if (!name) errors.push("missing frontmatter name");
  if (name && !/^[a-z0-9][a-z0-9-]*$/.test(name)) errors.push(`invalid skill name: ${name}`);
  if (!description) errors.push("missing frontmatter description");
  if (description && description.length < 20) errors.push("description is too short to route safely");
  if (/always\s+use|use\s+for\s+every\s+task|must\s+use\s+before\s+any\s+task/i.test(description)) {
    errors.push("description has overbroad trigger language");
  }

  return { name, description, raw, skillFile, errors };
}

function inferCategory(meta, override) {
  if (override) {
    if (!REQUIRED_CATEGORIES.has(override)) throw new Error(`Unknown category: ${override}`);
    return override;
  }

  const haystack = `${meta.name} ${meta.description} ${meta.raw}`.toLowerCase();
  const checks = [
    ["13-information-content-office", /(research|source|citation|copywriting|content|document|spreadsheet|presentation|pdf|office|markdown|csv)/],
    ["08-security-privacy", /(security|threat|vulnerab|hardening|bounty|privacy|secret|token|credential)/],
    ["09-devops-release-deploy", /(deploy|deployment|release|ci|cd|cloudflare|vercel|netlify|render|devops|migration|automation|webhook)/],
    ["07-debugging-quality-testing", /(debug|diagnos|test|qa|review|performance|production|verify|audit|playwright)/],
    ["06-data-api-database-auth", /(database|postgres|supabase|api-client|api connector|auth|data fetching|interface|graphql)/],
    ["04-frontend-ui-design", /(frontend|ui|ux|figma|design|shadcn|gsap|accessibility|visual|screen|mobile)/],
    ["11-creative-media-assets", /(image|video|audio|screenshot|slide|brand|creative|media|asset|logo|moodboard|shot|scene)/],
    ["10-platform-runtime-integrations", /(tauri|desktop|github|sentry|newapi|runtime|integration|connector|browser|computer-use|mcp|agent)/],
    ["05-application-engineering", /(backend|fullstack|web app|desktop app|code|implementation|clean|error handling|latency|i18n)/],
    ["02-project-planning-docs", /(project|docs|documentation|adr|planning|spec|roadmap|workflow|git|blueprint)/],
    ["01-prompt-skill-governance", /(skill|prompt|governance|distill|plugin|creator|template)/],
    ["00-core-routing-context", /(router|context|terminal|source-driven|retrieval|memory|preference)/],
  ];
  for (const [category, pattern] of checks) {
    if (pattern.test(haystack)) return category;
  }
  return "12-experimental-methods";
}

function inferCluster(name, category, override) {
  if (override) return override;
  if (category === "00-core-routing-context") return "bootstrap-context";
  if (category === "01-prompt-skill-governance") return "prompt-skill-governance";
  if (category === "02-project-planning-docs") return /blueprint|planning|spec|spark|writing/.test(name) ? "spec-planning-docs" : "project-memory-docs";
  if (category === "03-architecture-product-strategy") return "architecture-product";
  if (category === "04-frontend-ui-design") return /figma/.test(name) ? "figma-design-system" : "frontend-ui-design";
  if (category === "05-application-engineering") return "application-engineering";
  if (category === "06-data-api-database-auth") return "api-data-db-auth";
  if (category === "07-debugging-quality-testing") return /performance|production|qa|ship|verification/.test(name) ? "quality-release-readiness" : "debugging-testing";
  if (category === "08-security-privacy") return "security-hardening";
  if (category === "09-devops-release-deploy") return "devops-ops";
  if (category === "10-platform-runtime-integrations") return "platform-integrations";
  if (category === "11-creative-media-assets") return /video|audio/.test(name) ? "video-media-production" : "creative-image-design";
  if (category === "13-information-content-office") {
    if (/copy|content|social|viral/.test(name)) return "copywriting-content";
    if (/office|spreadsheet|document|presentation|pdf/.test(name)) return "office-productivity";
    return "information-research";
  }
  return "method-packs";
}

function assertInside(parent, child) {
  const relative = path.relative(parent, child);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Path escapes target root: ${child}`);
  }
}

function copyDirStrict(source, target) {
  fs.cpSync(source, target, {
    recursive: true,
    force: false,
    errorOnExist: true,
  });
}

function backupExisting(targetRoot, targetDir) {
  if (!fs.existsSync(targetDir)) return null;
  const backupRoot = path.resolve(targetRoot, "..", ".skill-install-backups");
  fs.mkdirSync(backupRoot, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(backupRoot, `${path.basename(targetDir)}-${stamp}`);
  fs.renameSync(targetDir, backupDir);
  return backupDir;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function updateLocalClassification(entries) {
  if (!fs.existsSync(OVERRIDES_FILE)) {
    throw new Error(`Missing ${normalizeRelativePath(path.relative(LOCAL_REPO_ROOT, OVERRIDES_FILE))}; run v5.8 classification first.`);
  }
  const overrides = readJson(OVERRIDES_FILE);
  overrides.generatedAt = new Date().toISOString();
  overrides.skills ||= {};
  for (const entry of entries) {
    overrides.skills[entry.name] = {
      category: entry.category,
      cluster: entry.cluster,
      ownerRole: OWNER_BY_CATEGORY[entry.category] || "host-rule-governor",
      tier: entry.category === "12-experimental-methods" ? "Optional" : "Professional",
      routeMode: entry.routeMode,
      source: {
        manifest: "install-skill-staged.mjs",
        sourceCategory: "staged-install",
        sourceFlags: ["security-scanned", "antivirus-scanned", "explicit-only-default"],
      },
      reason: "curated-from-install-gate",
    };
  }
  writeJson(OVERRIDES_FILE, overrides);
}

function runNode(script, args = []) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: LOCAL_REPO_ROOT,
    encoding: "utf8",
    maxBuffer: 10_000_000,
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

function countLocalSkills() {
  let count = 0;
  walkFiles(LOCAL_SKILLS_ROOT, (filePath) => {
    if (path.basename(filePath) === "SKILL.md") count += 1;
  });
  return count;
}

function runLocalPostChecks() {
  const steps = [
    ["build-skill-classification", path.join(LOCAL_REPO_ROOT, "5.8", "scripts", "build-skill-classification.mjs"), []],
    ["build-skill-routing-classification", path.join(LOCAL_REPO_ROOT, "5.8", "scripts", "build-skill-routing-classification.mjs"), []],
    ["build-skill-classification-refresh", path.join(LOCAL_REPO_ROOT, "5.8", "scripts", "build-skill-classification.mjs"), []],
    ["verify-v58-runtime", path.join(LOCAL_REPO_ROOT, "5.8", "scripts", "verify-v58-runtime.mjs"), [`--expected-local-skill-count=${countLocalSkills()}`]],
  ];
  const results = [];
  for (const [name, script, args] of steps) {
    const result = runNode(script, args);
    results.push({ name, ...result });
    if (!result.ok) break;
  }
  return results;
}

function runGlobalPostChecks() {
  const steps = [
    ["verify-skill-routes", path.join(LOCAL_SKILLS_ROOT, "zhuluyou", "scripts", "verify-skill-routes.mjs"), []],
    ["verify-memory-bootstrap", path.join(LOCAL_SKILLS_ROOT, "zhuluyou", "scripts", "verify-memory-bootstrap.mjs"), []],
  ];
  const results = [];
  for (const [name, script, args] of steps) {
    const result = runNode(script, args);
    results.push({ name, ...result });
    if (!result.ok) break;
  }
  return results;
}

function appendInstallLog(record) {
  fs.mkdirSync(path.dirname(INSTALL_LOG), { recursive: true });
  fs.appendFileSync(INSTALL_LOG, `${JSON.stringify(record)}\n`, "utf8");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.source) {
    printHelp();
    process.exit(args.help ? 0 : 2);
  }

  const sourceDirs = collectSkillDirs(args.source);
  if (sourceDirs.length === 0) throw new Error("No SKILL.md files found in source.");

  const targetRoot = path.resolve(args.targetRoot || (args.global ? resolveRealGlobalSkillsRoot() : LOCAL_SKILLS_ROOT));
  const localTarget = path.resolve(targetRoot) === path.resolve(LOCAL_SKILLS_ROOT);
  if (!fs.existsSync(targetRoot) || !fs.statSync(targetRoot).isDirectory()) {
    throw new Error(`Target skills root does not exist: ${targetRoot}`);
  }

  const allowedRouteModes = new Set(["explicit-only", "candidate", "optional-candidate", "gated-candidate"]);
  if (!allowedRouteModes.has(args.routeMode)) {
    throw new Error(`Install gate does not allow route mode ${args.routeMode}. Allowed: ${[...allowedRouteModes].join(", ")}`);
  }

  const seen = new Set();
  const reports = [];
  let okForInstall = true;

  for (const sourceDir of sourceDirs) {
    const meta = validateSkillMeta(sourceDir);
    if (meta.name && seen.has(meta.name)) meta.errors.push(`duplicate skill name in source batch: ${meta.name}`);
    if (meta.name) seen.add(meta.name);

    const targetDir = meta.name ? path.join(targetRoot, meta.name) : null;
    if (targetDir) assertInside(targetRoot, targetDir);
    if (targetDir && fs.existsSync(targetDir) && !args.replace) {
      meta.errors.push(`target skill already exists: ${normalizeRelativePath(path.relative(targetRoot, targetDir))}`);
    }

    const staticScan = scanPath(sourceDir, { skillName: meta.name || path.basename(sourceDir) });
    const antivirus = runAntivirusScan(sourceDir);
    const category = meta.name ? inferCategory(meta, args.category) : null;
    const cluster = meta.name && category ? inferCluster(meta.name, category, args.cluster) : null;
    const skillHash = hashDir(sourceDir);

    const skillOk =
      meta.errors.length === 0 &&
      staticScan.ok &&
      antivirus.ok &&
      Boolean(meta.name) &&
      Boolean(category) &&
      Boolean(cluster);
    okForInstall = okForInstall && skillOk;

    reports.push({
      skill: meta.name || null,
      sourceDir,
      targetDir,
      skillHash,
      metadataErrors: meta.errors,
      staticScan,
      findingSummary: summarizeFindings(staticScan.findings),
      antivirus,
      classification: {
        category,
        cluster,
        routeMode: args.routeMode,
        ownerRole: category ? OWNER_BY_CATEGORY[category] : null,
        defaultRouteAllowed: false,
      },
      okForInstall: skillOk,
    });
  }

  const result = {
    ok: okForInstall,
    mode: args.install ? "install" : "scan-only",
    targetRoot,
    localTarget,
    skillCount: reports.length,
    reports,
    installed: [],
    postChecks: [],
  };

  if (!okForInstall) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  if (!args.install) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  const classificationEntries = [];
  for (const report of reports) {
    const backupDir = args.replace ? backupExisting(targetRoot, report.targetDir) : null;
    try {
      copyDirStrict(report.sourceDir, report.targetDir);
      result.installed.push({
        skill: report.skill,
        targetDir: report.targetDir,
        backupDir,
      });
      if (localTarget) {
        classificationEntries.push({
          name: report.skill,
          category: report.classification.category,
          cluster: report.classification.cluster,
          routeMode: report.classification.routeMode,
        });
      }
    } catch (error) {
      if (backupDir && !fs.existsSync(report.targetDir)) fs.renameSync(backupDir, report.targetDir);
      throw error;
    }
  }

  if (localTarget) {
    updateLocalClassification(classificationEntries);
    result.postChecks = runLocalPostChecks();
    result.ok = result.postChecks.every((step) => step.ok);
  } else if (args.global) {
    result.postChecks = runGlobalPostChecks();
    result.ok = result.postChecks.every((step) => step.ok);
  }

  appendInstallLog({
    installedAt: new Date().toISOString(),
    ok: result.ok,
    targetRoot: localTarget ? "$LOCAL_REPO/skills" : targetRoot,
    skills: reports.map((report) => ({
      name: report.skill,
      sourceDir: report.sourceDir,
      targetDir: localTarget ? normalizeRelativePath(path.relative(LOCAL_REPO_ROOT, report.targetDir)) : report.targetDir,
      hash: report.skillHash,
      classification: report.classification,
      antivirus: {
        engine: report.antivirus.engine,
        status: report.antivirus.status,
        ok: report.antivirus.ok,
      },
      findingSummary: report.findingSummary,
    })),
  });

  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(2);
}
