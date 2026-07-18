#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.dirname(path.dirname(__filename));
const args = process.argv.slice(2);

function readArg(name, fallback = null) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] || fallback;
}

const outArg = readArg("--out", path.join(repoRoot, "dist/PAI-Zong-NB-commercial"));
const outDir = path.resolve(outArg);
const force = args.includes("--force");
const exclude = new Set([
  ".git",
  ".DS_Store",
  "Thumbs.db",
  "node_modules",
  "dist",
  "overlays",
  "skills-backup"
]);

function shouldSkip(entryName) {
  return exclude.has(entryName) || entryName.endsWith(".tmp") || entryName.endsWith(".bak");
}

function copyTree(source, destination) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
      if (shouldSkip(entry.name)) continue;
      copyTree(path.join(source, entry.name), path.join(destination, entry.name));
    }
    return;
  }

  if (stat.isFile()) {
    fs.copyFileSync(source, destination);
  }
}

if (outDir === repoRoot || repoRoot.startsWith(`${outDir}${path.sep}`)) {
  throw new Error(`Refusing to build release into parent of repository: ${outDir}`);
}

if (fs.existsSync(outDir)) {
  if (!force) {
    throw new Error(`Output already exists: ${outDir}. Re-run with --force to replace it.`);
  }
  fs.rmSync(outDir, { recursive: true, force: true });
}

copyTree(repoRoot, outDir);

const releaseManifest = {
  name: "PAI-Zong-NB-commercial",
  createdAt: new Date().toISOString(),
  sourceRoot: repoRoot,
  outputRoot: outDir,
  personalOverlayExcluded: true,
  runtimePromptTemplateIncluded: false,
  runtimePromptTemplate: "external AGENTS5.8.md, not distributed",
  projectAgentsIncluded: false,
  excludedTopLevel: [...exclude].sort(),
  verify: [
    "node scripts/verify-skills.mjs",
    "node scripts/audit-commercial-content.mjs --no-require-overlay",
    "node scripts/audit-skill-sources.mjs"
  ]
};

fs.writeFileSync(
  path.join(outDir, "COMMERCIAL_RELEASE.json"),
  `${JSON.stringify(releaseManifest, null, 2)}\n`,
  "utf8"
);

process.stdout.write(
  `${JSON.stringify(
    {
      ok: true,
      outDir,
      personalOverlayExcluded: true,
      runtimePromptTemplateIncluded: false,
      projectAgentsIncluded: false,
      manifest: "COMMERCIAL_RELEASE.json"
    },
    null,
    2
  )}\n`
);
