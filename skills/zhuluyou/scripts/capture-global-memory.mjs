#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { existingDir, homeDir, resolveCodexHome } from "./project-root.mjs";

const args = process.argv.slice(2);
const flags = new Set(args);

function arg(name, fallback = "") {
  const index = args.indexOf(`--${name}`);
  if (index < 0) return fallback;
  return args[index + 1] || fallback;
}

function escapeCell(value) {
  return String(value || "").replace(/\|/g, "/").replace(/\r?\n/g, " ").trim();
}

function readLines(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8").split(/\r?\n/) : [];
}

function writeLines(filePath, lines) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${lines.join("\n").replace(/\n+$/u, "")}\n`, "utf8");
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function acquireLock(lockPath) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      return fs.openSync(lockPath, "wx");
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      sleep(100);
    }
  }
  throw new Error(`Could not acquire profile lock: ${lockPath}`);
}

function ensureProfile(filePath) {
  if (fs.existsSync(filePath)) return;
  writeLines(filePath, [
    "# Yonghu Preference Profile",
    "",
    "## Purpose",
    "",
    "This file stores durable user preferences that should guide Codex across projects and future sessions.",
    "",
    "## Metadata",
    "",
    "| Field | Value |",
    "|---|---|",
    "| Profile Version | 1.0 |",
    `| Last Reviewed | ${today()} |`,
    "| Owner | User-controlled local Codex profile |",
    "| Update Rule | E1/E2 active, E3 candidate, E4 project docs, E5 no memory |",
    ""
  ]);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nextId(lines, prefix) {
  let max = 0;
  const pattern = new RegExp(`\\|\\s*${prefix}-(\\d+)\\s*\\|`);
  for (const line of lines) {
    const match = line.match(pattern);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

function categoryPrefix(category) {
  if (/communication/i.test(category)) return "COMM";
  if (/product/i.test(category)) return "PROD";
  if (/project development/i.test(category)) return "DEV";
  if (/ui|design/i.test(category)) return "UI";
  if (/engineering/i.test(category)) return "ENG";
  if (/skills|prompt/i.test(category)) return "SKILL";
  if (/automation/i.test(category)) return "AUTO";
  if (/candidate/i.test(category)) return "CAND";
  return "PREF";
}

function ensureSection(lines, category) {
  const heading = `## ${category}`;
  let index = lines.findIndex((line) => line === heading);
  if (index >= 0) return index;

  if (lines.length && lines[lines.length - 1] !== "") lines.push("");
  lines.push(heading, "");
  if (/^change log$/i.test(category)) {
    lines.push("| Date | Change | Evidence |", "|---|---|---|", "");
    return lines.findIndex((line) => line === heading);
  }
  if (/candidate/i.test(category)) {
    lines.push("| ID | Candidate | Evidence Level | Evidence | Confirmation Needed |");
  } else {
    lines.push("| ID | Preference | Evidence Level | Evidence | Status |");
  }
  lines.push("|---|---|---|---|---|", "");
  return lines.findIndex((line) => line === heading);
}

function insertIndexForSection(lines, headingIndex) {
  let nextHeading = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) {
      nextHeading = i;
      break;
    }
  }
  while (nextHeading > 0 && lines[nextHeading - 1] === "") nextHeading -= 1;
  return nextHeading;
}

function updateLastReviewed(lines) {
  const index = lines.findIndex((line) => /^\|\s*Last Reviewed\s*\|/.test(line));
  if (index >= 0) {
    lines[index] = `| Last Reviewed | ${today()} |`;
  }
}

function addChangeLog(lines, evidence) {
  const headingIndex = ensureSection(lines, "Change Log");
  const headerIndex = lines.findIndex((line, index) => index > headingIndex && /^\| Date \| Change \| Evidence \|$/.test(line));
  if (headerIndex < 0) {
    const insert = headingIndex + 2;
    lines.splice(insert, 0, "| Date | Change | Evidence |", "|---|---|---|");
  }
  const insert = insertIndexForSection(lines, headingIndex);
  const row = `| ${today()} | Captured global memory preference. | ${escapeCell(evidence || "capture-global-memory.mjs")} |`;
  if (!lines.includes(row)) lines.splice(insert, 0, row);
}

const codexHome = resolveCodexHome();
const home = homeDir();
const zhuluyouRoot =
  existingDir(codexHome, "skills", "zhuluyou") ||
  (home ? existingDir(home, ".codex", "skills", "zhuluyou") : null) ||
  path.join(codexHome, "skills", "zhuluyou");
const profilePath = arg("profile", path.join(zhuluyouRoot, "references", "profile.md"));
let category = arg("category");
const preference = arg("preference");
const evidence = arg("evidence");
const evidenceLevel = arg("evidence-level", "E1");
const confirmationNeeded = arg("confirmation-needed", "Needs confirmation or repeated evidence before promotion.");
const candidate = flags.has("--candidate");
const dryRun = flags.has("--dry-run");
const supersedeId = arg("supersede");
if (candidate && !/candidate/i.test(category)) category = "Candidate Preferences";
const status = arg("status", candidate || /candidate/i.test(category) ? "Candidate" : "Active");
const id = arg("id");

if (!category || !preference) {
  process.stderr.write("usage: capture-global-memory.mjs --category <name> --preference <text> [--evidence <text>] [--evidence-level E1] [--status Active] [--id AUTO-001] [--candidate] [--confirmation-needed <text>] [--supersede ID] [--dry-run]\n");
  process.exit(2);
}

function markSuperseded(lines, oldId, reason) {
  if (!oldId) return false;
  let changed = false;
  for (let i = 0; i < lines.length; i += 1) {
    if (!new RegExp(`^\\|\\s*${oldId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\|`).test(lines[i])) continue;
    const cells = lines[i].split("|").map((cell) => cell.trim());
    if (cells.length >= 6 && cells[cells.length - 2] !== "Superseded") {
      cells[cells.length - 2] = "Superseded";
      lines[i] = `| ${cells.slice(1, -1).map(escapeCell).join(" | ")} |`;
      changed = true;
    }
  }
  if (changed) addChangeLog(lines, `Superseded ${oldId}: ${reason || "newer global memory preference"}`);
  return changed;
}

fs.mkdirSync(path.dirname(profilePath), { recursive: true });
const lockPath = `${profilePath}.lock`;
let lockFd = null;
let output = null;

try {
  lockFd = acquireLock(lockPath);
  ensureProfile(profilePath);
  const lines = readLines(profilePath);
  const duplicate = lines.some((line) => line.includes(`| ${escapeCell(preference)} |`));
  if (duplicate) {
    output = { ok: true, changed: false, reason: "exists", profilePath, preference, dryRun };
  } else {
    const headingIndex = ensureSection(lines, category);
    const insert = insertIndexForSection(lines, headingIndex);
    const prefix = categoryPrefix(category);
    const entryId = id || nextId(lines, prefix);
    const row = /candidate/i.test(category)
      ? `| ${escapeCell(entryId)} | ${escapeCell(preference)} | ${escapeCell(evidenceLevel)} | ${escapeCell(evidence)} | ${escapeCell(confirmationNeeded)} |`
      : `| ${escapeCell(entryId)} | ${escapeCell(preference)} | ${escapeCell(evidenceLevel)} | ${escapeCell(evidence)} | ${escapeCell(status)} |`;
    const superseded = markSuperseded(lines, supersedeId, evidence);
    lines.splice(insert, 0, row);
    updateLastReviewed(lines);
    addChangeLog(lines, evidence);
    if (!dryRun) writeLines(profilePath, lines);
    output = {
      ok: true,
      changed: !dryRun,
      dryRun,
      profilePath,
      id: entryId,
      category,
      evidenceLevel,
      status,
      superseded,
      supersedeId: supersedeId || null,
      preference
    };
  }
} finally {
  if (lockFd !== null) fs.closeSync(lockFd);
  if (fs.existsSync(lockPath)) fs.unlinkSync(lockPath);
}

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
