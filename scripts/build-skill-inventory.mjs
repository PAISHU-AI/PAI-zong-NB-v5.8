#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.dirname(path.dirname(__filename));
const skillsRoot = path.join(repoRoot, "skills");
const inventoryPath = path.join(repoRoot, "skills-inventory.json");

function frontmatterValue(text, key) {
  const frontmatter = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/m)?.[1] || "";
  const value = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"))?.[1] || "";
  return value.trim().replace(/^['"]|['"]$/g, "");
}

const previous = fs.existsSync(inventoryPath)
  ? JSON.parse(fs.readFileSync(inventoryPath, "utf8"))
  : [];
const previousByDir = new Map(previous.map((entry) => [entry.Dir, entry]));

const records = fs
  .readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== ".system")
  .map((entry) => {
    const skillPath = path.join(skillsRoot, entry.name, "SKILL.md");
    if (!fs.existsSync(skillPath)) {
      throw new Error(`Top-level skill directory is missing SKILL.md: ${entry.name}`);
    }

    const text = fs.readFileSync(skillPath, "utf8");
    const old = previousByDir.get(entry.name) || {};
    const origin = frontmatterValue(text, "origin") || old.Origin || "global-codex-sync";

    return {
      Dir: entry.name,
      Name: frontmatterValue(text, "name"),
      Description: frontmatterValue(text, "description"),
      Origin: origin,
      SourceReview:
        old.SourceReview ||
        (origin === "global-codex-sync"
          ? "Synchronized from the current global Codex skills directory; upstream source is not recorded in frontmatter."
          : `Frontmatter origin: ${origin}; synchronized from the current global Codex skills directory.`),
      CommercialUse: old.CommercialUse || "manual-review-required",
      Redistribution: old.Redistribution || "manual-license-review-required"
    };
  })
  .sort((a, b) => a.Dir.localeCompare(b.Dir, "en"));

const invalid = records.filter((entry) => !entry.Name || !entry.Description);
if (invalid.length > 0) {
  throw new Error(`Missing name/description metadata: ${invalid.map((entry) => entry.Dir).join(", ")}`);
}

fs.writeFileSync(inventoryPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({ ok: true, skillCount: records.length, inventoryPath }, null, 2)}\n`);
