#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.dirname(path.dirname(__filename));
const inventoryPath = path.join(repoRoot, "skills-inventory.json");
const strictCommercial = process.argv.includes("--strict-commercial");
const strictRedistribution = process.argv.includes("--strict-redistribution");

function fail(message) {
  process.stdout.write(`${JSON.stringify({ ok: false, error: message }, null, 2)}\n`);
  process.exit(1);
}

if (!fs.existsSync(inventoryPath)) {
  fail(`Missing inventory: ${inventoryPath}`);
}

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
if (!Array.isArray(inventory)) {
  fail("skills-inventory.json must be a JSON array");
}

const skillsRoot = path.join(repoRoot, "skills");
const actualSkillDirs = fs.existsSync(skillsRoot)
  ? fs
      .readdirSync(skillsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
      .map((entry) => entry.name)
      .sort()
  : [];
const inventoryDirs = inventory.map((skill) => skill.Dir).filter(Boolean).sort();
const actualSet = new Set(actualSkillDirs);
const inventorySet = new Set(inventoryDirs);
const missingFromInventory = actualSkillDirs.filter((dir) => !inventorySet.has(dir));
const extraInInventory = inventoryDirs.filter((dir) => !actualSet.has(dir));

const required = ["Dir", "Name", "Description", "Origin", "SourceReview", "CommercialUse", "Redistribution"];
const missingFields = [];
const unspecifiedOrigin = [];
const commercialBlocked = [];
const redistributionWarnings = [];

for (const skill of inventory) {
  for (const field of required) {
    if (!skill[field] || String(skill[field]).trim() === "") {
      missingFields.push({ skill: skill.Name || skill.Dir || "(unknown)", field });
    }
  }

  if (skill.Origin === "unspecified") {
    unspecifiedOrigin.push(skill.Name || skill.Dir || "(unknown)");
  }

  if (skill.CommercialUse !== "allowed") {
    commercialBlocked.push({
      skill: skill.Name || skill.Dir || "(unknown)",
      commercialUse: skill.CommercialUse || "(missing)"
    });
  }

  if (skill.Redistribution !== "allowed") {
    redistributionWarnings.push({
      skill: skill.Name || skill.Dir || "(unknown)",
      redistribution: skill.Redistribution || "(missing)"
    });
  }
}

const ok =
  missingFromInventory.length === 0 &&
  extraInInventory.length === 0 &&
  missingFields.length === 0 &&
  unspecifiedOrigin.length === 0 &&
  (!strictCommercial || commercialBlocked.length === 0) &&
  (!strictRedistribution || redistributionWarnings.length === 0);

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      strictCommercial,
      strictRedistribution,
      actualSkillCount: actualSkillDirs.length,
      skillCount: inventory.length,
      missingFromInventory,
      extraInInventory,
      missingFields,
      unspecifiedOrigin,
      commercialReviewCount: commercialBlocked.length,
      commercialReview: commercialBlocked.slice(0, 20),
      redistributionWarningCount: redistributionWarnings.length,
      redistributionWarnings: redistributionWarnings.slice(0, 20)
    },
    null,
    2
  )}\n`
);

process.exit(ok ? 0 : 1);
