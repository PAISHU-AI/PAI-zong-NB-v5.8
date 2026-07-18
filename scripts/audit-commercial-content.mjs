#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const defaultRoot = path.dirname(path.dirname(__filename));
const args = process.argv.slice(2);

function readArg(name, fallback = null) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] || fallback;
}

const repoRoot = path.resolve(readArg("--root", defaultRoot));
const requireOverlay = !args.includes("--no-require-overlay");
const allowOwnerProfile = args.includes("--allow-owner-profile");

const scannedRoots = [
  "README.md",
  "MANIFEST.md",
  "SOURCES.md",
  "prompts",
  "docs",
  "skills/zhuluyou"
];

const bannedPatterns = [
  { id: "personal-address", pattern: /PAI总/ },
  { id: "personal-assistant-name", pattern: /迪丽热巴/ },
  { id: "personal-ending", pattern: /PAI总牛逼/ },
  { id: "personal-cute-tone", pattern: /\bcute\b/i },
  { id: "personal-playful-tone", pattern: /\bplayful\b/i },
  { id: "placeholder-tbd", pattern: /\bTBD\b/i },
  { id: "placeholder-copy", pattern: /\bplaceholder\b/i }
];
const ownerMarkerPatterns = bannedPatterns.filter((rule) =>
  ["personal-address", "personal-assistant-name", "personal-ending"].includes(rule.id)
);

const normalized = (value) => value.split(path.sep).join("/");

const allowedPersonalPaths = new Set([
  "overlays/PAI-Zong-personal/README.md",
  "overlays/PAI-Zong-personal/skills/zhuluyou/references/profile.md",
  "overlays/PAI-Zong-personal/skills/zhuluyou/user-skills/communication-style.md",
  "overlays/PAI-Zong-personal/skills/zhuluyou/user-skills/persona-style.md"
]);

const ownerProfilePaths = new Set([
  "skills/zhuluyou/references/profile.md",
  "skills/zhuluyou/user-skills/communication-style.md",
  "skills/zhuluyou/user-skills/persona-style.md"
]);

const textExtensions = new Set([".md", ".mjs", ".json", ".ps1", ".txt"]);

function walk(target, files) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    files.push(target);
    return;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if ([".git", "node_modules", "overlays"].includes(entry.name)) continue;
    walk(path.join(target, entry.name), files);
  }
}

const files = [];
for (const rel of scannedRoots) walk(path.join(repoRoot, rel), files);
const scanned = new Set(files.map((file) => path.resolve(file)));

const findings = [];
for (const file of files) {
  const rel = normalized(path.relative(repoRoot, file));
  if (allowedPersonalPaths.has(rel)) continue;
  if (allowOwnerProfile && ownerProfilePaths.has(rel)) continue;
  if (!textExtensions.has(path.extname(file))) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const rule of bannedPatterns) {
    if (rule.pattern.test(text)) {
      findings.push({ file: rel, rule: rule.id });
    }
  }
}

const skillPersonalFiles = [];
walk(path.join(repoRoot, "skills"), skillPersonalFiles);
for (const file of skillPersonalFiles) {
  const resolved = path.resolve(file);
  if (scanned.has(resolved)) continue;
  const rel = normalized(path.relative(repoRoot, file));
  if (allowOwnerProfile && ownerProfilePaths.has(rel)) continue;
  if (!textExtensions.has(path.extname(file))) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const rule of ownerMarkerPatterns) {
    if (rule.pattern.test(text)) {
      findings.push({ file: rel, rule: rule.id });
    }
  }
}

function inspectPersonalOverlay() {
  if (!requireOverlay) {
    return {
      required: false,
      missing: [],
      invalid: [],
      markerFiles: []
    };
  }

  const missing = [...allowedPersonalPaths].filter((rel) => !fs.existsSync(path.join(repoRoot, rel)));
  const invalid = [];
  const markerFiles = [];
  for (const rel of allowedPersonalPaths) {
    const filePath = path.join(repoRoot, rel);
    if (!fs.existsSync(filePath)) continue;
    const text = fs.readFileSync(filePath, "utf8");
    if (text.includes("PAI总")) markerFiles.push(rel);
  }

  if (markerFiles.length < 2) {
    invalid.push("personal overlay must preserve owner-specific markers in multiple files");
  }

  return {
    required: true,
    missing,
    invalid,
    markerFiles
  };
}

const overlay = inspectPersonalOverlay();
const ok = findings.length === 0 && overlay.missing.length === 0 && overlay.invalid.length === 0;

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      root: repoRoot,
      allowOwnerProfile,
      scannedFiles: files.length,
      skillPersonalScannedFiles: skillPersonalFiles.length,
      findings,
      personalOverlay: overlay
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
