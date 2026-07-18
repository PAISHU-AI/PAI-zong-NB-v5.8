#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { discoverProjectRoot, projectMarkers as markers } from "./project-root.mjs";

const args = new Set(process.argv.slice(2));
const init = args.has("--init");
const force = args.has("--force");
const knowledge = args.has("--knowledge") || args.has("--require-knowledge");
const startIndex = process.argv.indexOf("--cwd");
const startDir = startIndex >= 0 ? process.argv[startIndex + 1] : process.cwd();

const ignoredDirs = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".turbo",
  "target",
  "__pycache__",
  ".venv",
  "vendor"
]);

function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(current, visit);
    else if (entry.isFile()) visit(current);
  }
}

function normalizeRelativePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function ensureFile(filePath, content, created) {
  if (fs.existsSync(filePath)) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${content.trimEnd()}\n`, "utf8");
  created.push(filePath);
}

function initProjectMemory(projectRoot) {
  const created = [];
  const dirs = [
    "docs",
    "docs/architecture",
    "docs/features",
    "docs/api",
    "docs/database",
    "docs/desktop",
    "docs/deployment",
    "docs/decisions",
    "docs/maintenance",
    "docs/maintenance/debug-reports",
    "docs/memory",
    "docs/memory/evidence"
  ];
  for (const dir of dirs) fs.mkdirSync(path.join(projectRoot, dir), { recursive: true });

  ensureFile(
    path.join(projectRoot, ".ai_project.md"),
    `# Project Memory

## Project Identity

    - Name: Unspecified until project initialization
    - Purpose: Unspecified until project initialization

## Current Status

- Status: Active
    - Current focus: Unspecified until project initialization

## Tech Stack

- Unspecified until project initialization

## Key Commands

- Unspecified until project initialization

## Project Structure Entry

- See docs/project-structure.md

## Docs Index

- See docs/INDEX.md

## Active Work / Next Actions

    - Unspecified until project initialization

## Risks / Known Issues

- See docs/maintenance/known-issues.md

## Memory Update Rules

- Update docs/INDEX.md when adding durable docs.
- Update docs/project-structure.md when structure changes.
- Update docs/roadmap.md for plans, milestones, and future work.
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/INDEX.md"),
    `# Docs Index

| Path | Purpose | Read When | Owner | Update Trigger | Validation |
|---|---|---|---|---|---|
| docs/project-structure.md | Project directory, module, and important-file map. | Before structural changes or broad feature work. | Project Assistant | Directories, entry points, modules, or important files change. | Paths reflect current repository. |
| docs/roadmap.md | Current plan, next actions, risks, and milestones. | Before planning or resuming work. | Project Assistant | Plans, priorities, milestones, or risks change. | Next actions are current and actionable. |
| docs/maintenance/known-issues.md | Known issues and recurring problems. | Before debugging or risk review. | Debugger / Project Assistant | New recurring issue or resolved issue. | Issues include status and validation. |
| docs/maintenance/development-log.md | Durable project progress log. | Before handoff or project review. | Project Assistant | Meaningful project state changes. | Entries link to relevant docs or files. |
| docs/maintenance/technical-debt.md | Technical debt and cleanup candidates. | Before refactors or planning. | Project Assistant | Debt is found, resolved, or reprioritized. | Items have impact and owner/status. |
| docs/memory/README.md | Project memory evidence and invalidation rules. | Before adding evidence, source hashes, retrieval records, or invalidations. | Project Assistant | Evidence schema, retrieval index, or invalidation policy changes. | Evidence JSONL and invalidation JSONL parse correctly. |
| docs/memory/retrieval-index.json | Machine-readable project memory retrieval index. | Before summarizing or routing project memory reads. | Project Assistant | Durable docs, summaries, or memory routes change. | JSON parses and paths exist or are marked missing. |
| docs/memory/evidence/index.jsonl | Evidence records for durable project memory and KG entries. | Before verifying durable memory claims. | Project Assistant | New durable memory or KG evidence is recorded. | Each non-empty line is valid JSON with required fields. |
| docs/memory/invalidations.jsonl | Invalidated or superseded memory records. | Before trusting old project facts. | Project Assistant | Project facts, graph nodes, docs, APIs, or modules are superseded. | Each non-empty line is valid JSON with required fields. |
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/project-structure.md"),
    `# Project Structure

## Read When

- Before broad feature work, refactors, file moves, or onboarding.

## Owner

- Project Assistant

## Update Trigger

- Directory, module, entry point, generated output, or important file changes.

## Validation

- Paths exist or are explicitly marked removed.

## Top-Level Directories

    - Unspecified until project initialization

## Important Files

    - Unspecified until project initialization

## Module Boundaries

    - Unspecified until project initialization

## Avoid Editing Without Reason

    - Unspecified until project initialization
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/roadmap.md"),
    `# Roadmap

## Read When

- Before planning, resuming work, or deciding next actions.

## Owner

- Project Assistant

## Update Trigger

- Plans, milestones, risks, or next actions change.

## Validation

- Next actions are current, actionable, and not duplicated elsewhere.

## Current Focus

    - Unspecified until project initialization

## Next Actions

    - Unspecified until project initialization

## Risks

- Unspecified until project initialization
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/maintenance/known-issues.md"),
    `# Known Issues

## Read When

- Before debugging, regression analysis, or release checks.

## Owner

- Debugger / Project Assistant

## Update Trigger

- A recurring, complex, or resolved issue changes.

## Validation

- Each issue includes status, evidence, and verification where possible.

## Issues

- None recorded.
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/maintenance/development-log.md"),
    `# Development Log

## Read When

- Before handoff, project review, or resuming old work.

## Owner

- Project Assistant

## Update Trigger

- Meaningful project state, architecture, feature, release, or docs changes.

## Validation

- Entries are durable summaries, not raw command logs.

## Log

- None recorded.
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/maintenance/technical-debt.md"),
    `# Technical Debt

## Read When

- Before refactors, planning, quality reviews, or cleanup work.

## Owner

- Project Assistant

## Update Trigger

- Debt is found, resolved, reprioritized, or invalidated.

## Validation

- Items include impact, affected area, and status.

## Items

- None recorded.
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/memory/README.md"),
    `# Project Memory Evidence

## Read When

- Before adding evidence, source hashes, retrieval records, or invalidations.

## Owner

- Project Assistant

## Update Trigger

- Evidence schema, retrieval index, or invalidation policy changes.

## Validation

- Evidence JSONL and invalidation JSONL parse correctly.

## Purpose

- Keep project memory evidence-backed without storing raw transcripts, secrets, or noisy logs.
- Use docs/memory/evidence/index.jsonl for durable evidence records.
- Use docs/memory/invalidations.jsonl for superseded or stale memory.
`,
    created
  );

  ensureFile(
    path.join(projectRoot, "docs/memory/retrieval-index.json"),
    JSON.stringify(
      {
        version: 1,
        updatedAt: new Date().toISOString(),
        entries: []
      },
      null,
      2
    ),
    created
  );

  ensureFile(path.join(projectRoot, "docs/memory/evidence/index.jsonl"), "", created);
  ensureFile(path.join(projectRoot, "docs/memory/invalidations.jsonl"), "", created);

  return created.map((file) => normalizeRelativePath(path.relative(projectRoot, file)));
}

function initKnowledgeGraph(projectRoot) {
  const created = [];
  const knowledgeRoot = path.join(projectRoot, "docs/knowledge");
  fs.mkdirSync(knowledgeRoot, { recursive: true });

  ensureFile(
    path.join(knowledgeRoot, "graph-schema.md"),
    `# Knowledge Graph Schema

## Read When

- Before creating or updating project knowledge graph nodes or edges.

## Owner

- Project Assistant

## Update Trigger

- Knowledge graph node types, edge types, evidence rules, or validation rules change.

## Validation

- Schema matches docs/knowledge/project-graph.json.

## Node Types

- feature
- module
- file
- api
- db_table
- doc
- adr
- test
- command
- config
- risk
- issue
- task

## Edge Types

- implements
- uses
- depends_on
- documented_by
- tested_by
- configured_by
- validated_by
- changed_by
- blocked_by
- mitigates
- supersedes
- related_to

## Required Node Fields

- id
- type
- name
- summary
- evidence
- status
- valid_from
- last_verified
- source_hash

## Required Edge Fields

- from
- to
- type
- evidence
- confidence
- valid_from
- last_verified
- source_hash
`,
    created
  );

  ensureFile(
    path.join(knowledgeRoot, "project-graph.json"),
    JSON.stringify(
      {
        version: 1,
        updatedAt: new Date().toISOString(),
        schemaVersion: "1.1",
        nodes: [],
        edges: []
      },
      null,
      2
    ),
    created
  );

  ensureFile(
    path.join(knowledgeRoot, "graph-index.md"),
    `# Knowledge Graph Index

## Read When

- Before impact analysis, cross-layer development, or project relationship lookup.

## Owner

- Project Assistant

## Update Trigger

- docs/knowledge/project-graph.json changes.

## Validation

- Summary reflects current graph nodes and major relationships.

## Activation

- KG1/KG2/KG3 only. Do not use for simple consultations.

## Summary

- No graph relationships recorded yet.
`,
    created
  );

  const indexPath = path.join(projectRoot, "docs/INDEX.md");
  if (fs.existsSync(indexPath)) {
    const indexText = fs.readFileSync(indexPath, "utf8");
    const rows = [
      "| docs/knowledge/graph-schema.md | Knowledge graph node, edge, evidence, and validation schema. | Before creating or updating graph relationships. | Project Assistant | Graph schema or validation rules change. | Schema matches project-graph.json. |",
      "| docs/knowledge/project-graph.json | Machine-readable project relationship graph. | Before impact analysis or cross-layer work. | Project Assistant | Feature, module, file, API, DB, test, ADR, or risk relationships change. | All nodes and edges have evidence. |",
      "| docs/knowledge/graph-index.md | Human-readable graph summary and activation notes. | Before relationship lookup or handoff. | Project Assistant | project-graph.json changes. | Summary reflects current graph. |"
    ];
    const missingRows = rows.filter((row) => !indexText.includes(row.split(" | ")[0].replace("| ", "")));
    if (missingRows.length) {
      fs.appendFileSync(indexPath, `${missingRows.join("\n")}\n`, "utf8");
    }
  }

  return created.map((file) => normalizeRelativePath(path.relative(projectRoot, file)));
}

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function docsFiles(projectRoot) {
  const docsRoot = path.join(projectRoot, "docs");
  const files = [];
  walk(docsRoot, (filePath) => {
    if ([".md", ".json", ".jsonl"].includes(path.extname(filePath))) files.push(filePath);
  });
  return files.sort();
}

function inspectDocs(projectRoot) {
  const docsRoot = path.join(projectRoot, "docs");
  const indexPath = path.join(docsRoot, "INDEX.md");
  const indexText = readText(indexPath);
  const files = docsFiles(projectRoot);
  const docsWithoutMetadata = [];
  const docsMissingFromIndex = [];
  const requiredSections = ["## Read When", "## Owner", "## Update Trigger", "## Validation"];

  for (const file of files) {
    const rel = normalizeRelativePath(path.relative(projectRoot, file));
    if (rel === "docs/INDEX.md") continue;
    if (path.extname(file) === ".md") {
      const text = readText(file);
      const missing = requiredSections.filter((section) => !text.includes(section));
      if (missing.length) docsWithoutMetadata.push({ path: rel, missing });
    }
    if (!indexText.includes(rel)) docsMissingFromIndex.push(rel);
  }

  return { docsWithoutMetadata, docsMissingFromIndex, docsCount: files.length };
}

function inspectLargeSourceFiles(projectRoot) {
  const large = [];
  const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".py", ".rs", ".go", ".java", ".cs", ".vue", ".svelte"]);
  walk(projectRoot, (filePath) => {
    if (!extensions.has(path.extname(filePath))) return;
    const lines = readText(filePath).split(/\r?\n/).length;
    if (lines > 1000) large.push({ path: normalizeRelativePath(path.relative(projectRoot, filePath)), lines });
  });
  return large;
}

function inspectKnowledgeGraph(projectRoot) {
  const knowledgeRoot = path.join(projectRoot, "docs/knowledge");
  const exists = fs.existsSync(knowledgeRoot);
  const required = [
    "docs/knowledge/graph-schema.md",
    "docs/knowledge/project-graph.json",
    "docs/knowledge/graph-index.md"
  ];
  const missing = required.filter((file) => !fs.existsSync(path.join(projectRoot, file)));
  const invalid = [];
  const graphPath = path.join(projectRoot, "docs/knowledge/project-graph.json");

  if (fs.existsSync(graphPath)) {
    try {
      const graph = JSON.parse(fs.readFileSync(graphPath, "utf8"));
      if (!Array.isArray(graph.nodes)) invalid.push("nodes must be an array");
      if (!Array.isArray(graph.edges)) invalid.push("edges must be an array");
      for (const node of graph.nodes || []) {
        for (const field of ["id", "type", "name", "evidence"]) {
          if (!node[field] || (field === "evidence" && !Array.isArray(node[field]))) {
            invalid.push(`node ${node.id || "(missing id)"} missing ${field}`);
          }
        }
        if (node.status !== "inactive" && node.status !== "superseded") {
          for (const field of ["valid_from", "last_verified", "source_hash"]) {
            if (!node[field]) invalid.push(`node ${node.id || "(missing id)"} missing ${field}`);
          }
        }
      }
      for (const edge of graph.edges || []) {
        for (const field of ["from", "to", "type", "evidence", "confidence"]) {
          if (!edge[field] || (field === "evidence" && !Array.isArray(edge[field]))) {
            invalid.push(`edge ${edge.from || "?"}->${edge.to || "?"} missing ${field}`);
          }
        }
        if (edge.status !== "inactive" && edge.status !== "superseded") {
          for (const field of ["valid_from", "last_verified", "source_hash"]) {
            if (!edge[field]) invalid.push(`edge ${edge.from || "?"}->${edge.to || "?"} missing ${field}`);
          }
        }
      }
    } catch (error) {
      invalid.push(`project-graph.json parse error: ${error.message}`);
    }
  }

  return { exists, missing, invalid };
}

function sha256File(filePath) {
  return `sha256:${crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")}`;
}

function validateJsonl(filePath, requiredFields, options = {}) {
  const invalid = [];
  if (!fs.existsSync(filePath)) return invalid;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    try {
      const record = JSON.parse(trimmed);
      for (const field of requiredFields) {
        if (record[field] === undefined || record[field] === null || record[field] === "") {
          invalid.push(
            `${normalizeRelativePath(path.relative(path.dirname(path.dirname(filePath)), filePath))}:${
              index + 1
            } missing ${field}`
          );
        }
      }
      if (options.verifySourceHash && record.source && record.source_hash && record.source_hash !== "unknown") {
        const sourcePath = path.resolve(options.projectRoot, record.source);
        if (!fs.existsSync(sourcePath)) {
          invalid.push(
            `${normalizeRelativePath(path.relative(options.projectRoot, filePath))}:${
              index + 1
            } source missing: ${record.source}`
          );
        } else {
          const actualHash = sha256File(sourcePath);
          if (actualHash !== record.source_hash) {
            invalid.push(
              `${normalizeRelativePath(path.relative(options.projectRoot, filePath))}:${
                index + 1
              } source_hash mismatch for ${record.source}`
            );
          }
        }
      }
    } catch (error) {
      invalid.push(`${path.basename(filePath)}:${index + 1} parse error: ${error.message}`);
    }
  });
  return invalid;
}

function inspectMemoryEvidence(projectRoot) {
  const required = [
    "docs/memory/README.md",
    "docs/memory/retrieval-index.json",
    "docs/memory/evidence/index.jsonl",
    "docs/memory/invalidations.jsonl"
  ];
  const missing = required.filter((file) => !fs.existsSync(path.join(projectRoot, file)));
  const invalid = [];
  const retrievalPath = path.join(projectRoot, "docs/memory/retrieval-index.json");
  if (fs.existsSync(retrievalPath)) {
    try {
      const index = JSON.parse(fs.readFileSync(retrievalPath, "utf8"));
      if (!Array.isArray(index.entries)) invalid.push("retrieval-index.json entries must be an array");
    } catch (error) {
      invalid.push(`retrieval-index.json parse error: ${error.message}`);
    }
  }
  invalid.push(
    ...validateJsonl(path.join(projectRoot, "docs/memory/evidence/index.jsonl"), [
      "id",
      "captured_at",
      "source",
      "source_hash",
      "summary",
      "linked_ids",
      "sensitivity"
    ], { verifySourceHash: true, projectRoot })
  );
  invalid.push(
    ...validateJsonl(path.join(projectRoot, "docs/memory/invalidations.jsonl"), [
      "id",
      "invalidated_at",
      "target_id",
      "reason",
      "evidence"
    ])
  );
  return { exists: fs.existsSync(path.join(projectRoot, "docs/memory")), missing, invalid };
}

const discovered = discoverProjectRoot(startDir);
const projectless = !discovered.projectRoot;

if (projectless && init && !force) {
  process.stdout.write(
    `${JSON.stringify(
      {
        ok: false,
        projectless: true,
        message: "No project marker found. Refusing to initialize project memory without --force.",
        startDir: path.resolve(startDir)
      },
      null,
      2
    )}\n`
  );
  process.exit(1);
}

const projectRoot = discovered.projectRoot || path.resolve(startDir);
const created = init ? initProjectMemory(projectRoot) : [];
const createdKnowledge = init && knowledge ? initKnowledgeGraph(projectRoot) : [];
const coreFiles = [".ai_project.md", "docs/INDEX.md", "docs/project-structure.md", "docs/roadmap.md"];
const coreDirs = [
  "docs/architecture",
  "docs/features",
  "docs/api",
  "docs/database",
  "docs/desktop",
  "docs/deployment",
  "docs/decisions",
  "docs/maintenance",
  "docs/memory",
  "docs/memory/evidence"
];
const missingCoreFiles = coreFiles.filter((file) => !fs.existsSync(path.join(projectRoot, file)));
const missingCoreDirs = coreDirs.filter((dir) => !fs.existsSync(path.join(projectRoot, dir)));
const docs = inspectDocs(projectRoot);
const largeSourceFiles = inspectLargeSourceFiles(projectRoot);
const knowledgeGraph = inspectKnowledgeGraph(projectRoot);
const memoryEvidence = inspectMemoryEvidence(projectRoot);

const ok =
  !projectless &&
  missingCoreFiles.length === 0 &&
  docs.docsWithoutMetadata.length === 0 &&
  docs.docsMissingFromIndex.length === 0 &&
  memoryEvidence.missing.length === 0 &&
  memoryEvidence.invalid.length === 0 &&
  (!knowledge || (knowledgeGraph.missing.length === 0 && knowledgeGraph.invalid.length === 0));

process.stdout.write(
  `${JSON.stringify(
    {
      ok,
      projectless,
      projectRoot,
      projectMarker: discovered.marker,
      initialized: init,
      created,
      knowledgeRequested: knowledge,
      createdKnowledge,
      missingCoreFiles,
      missingCoreDirs,
      docsCount: docs.docsCount,
      docsWithoutMetadata: docs.docsWithoutMetadata,
      docsMissingFromIndex: docs.docsMissingFromIndex,
      memoryEvidence,
      knowledgeGraph,
      largeSourceFiles
    },
    null,
    2
  )}\n`
);

process.exit(ok || init ? 0 : 1);
