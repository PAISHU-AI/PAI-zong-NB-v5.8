#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { discoverProjectRoot } from "./project-root.mjs";

const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const cwdIndex = process.argv.indexOf("--cwd");
const startDir = cwdIndex >= 0 ? process.argv[cwdIndex + 1] : process.cwd();

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function hash(text) {
  return `sha256:${crypto.createHash("sha256").update(text).digest("hex")}`;
}

function docRows(projectRoot) {
  const indexPath = path.join(projectRoot, "docs/INDEX.md");
  const text = read(indexPath);
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("| docs/"))
    .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean))
    .map((cells) => ({
      path: cells[0],
      purpose: cells[1] || "",
      readWhen: cells[2] || "",
      owner: cells[3] || "",
      updateTrigger: cells[4] || "",
      validation: cells[5] || ""
    }));
}

const discovered = discoverProjectRoot(startDir);
if (!discovered.projectRoot) {
  process.stdout.write(`${JSON.stringify({ ok: false, projectless: true, startDir: path.resolve(startDir) }, null, 2)}\n`);
  process.exit(1);
}

const projectRoot = discovered.projectRoot;
const aiProject = read(path.join(projectRoot, ".ai_project.md"));
const docs = docRows(projectRoot);
const summary = {
  version: 1,
  updatedAt: new Date().toISOString(),
  projectRoot,
  projectMarker: discovered.marker,
  aiProjectHash: aiProject ? hash(aiProject) : null,
  docsCount: docs.length,
  coreFiles: [".ai_project.md", "AGENTS.md", "docs/INDEX.md", "docs/project-structure.md", "docs/roadmap.md"].map((rel) => ({
    path: rel,
    exists: fs.existsSync(path.join(projectRoot, rel))
  })),
  docs
};

if (write) {
  const target = path.join(projectRoot, "docs/memory/retrieval-index.json");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify({ ...summary, entries: docs }, null, 2)}\n`, "utf8");
}

process.stdout.write(`${JSON.stringify({ ok: true, wrote: write, summary }, null, 2)}\n`);
