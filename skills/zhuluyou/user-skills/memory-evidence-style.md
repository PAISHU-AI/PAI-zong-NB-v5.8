# Memory Evidence Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.0 |
| Owner | 项目助手 + 主持人 |
| Last Updated | 2026-05-30 |

## Purpose

Define evidence, source hash, verification, invalidation, and superseding rules for durable project memory and knowledge graph entries.

## Trigger Conditions

- Before writing durable project docs, debug reports, ADRs, roadmap items, or knowledge graph nodes/edges.
- Before trusting stale, conflicting, or source-dependent project memory.
- When files, APIs, modules, commands, tests, risks, or decisions are renamed, deleted, replaced, or invalidated.

## Evidence Destinations

Project evidence lives under the detected project root:

```text
docs/memory/
  README.md
  retrieval-index.json
  evidence/index.jsonl
  invalidations.jsonl
```

Do not store project evidence in global `zhuluyou`.

## Evidence Record

Use JSONL records in `docs/memory/evidence/index.jsonl`:

```json
{"id":"ev.2026-05-30.001","captured_at":"2026-05-30T00:00:00.000Z","source":"docs/api/images.md","source_hash":"sha256:...","summary":"Image API contract verified.","linked_ids":["api.generate-image"],"sensitivity":"normal"}
```

Required fields:

- `id`
- `captured_at`
- `source`
- `source_hash`
- `summary`
- `linked_ids`
- `sensitivity`

## Invalidation Record

Use JSONL records in `docs/memory/invalidations.jsonl`:

```json
{"id":"inv.2026-05-30.001","invalidated_at":"2026-05-30T00:00:00.000Z","target_id":"api.generate-image","reason":"API route renamed.","replacement_id":"api.create-image","evidence":["docs/api/images.md"]}
```

Required fields:

- `id`
- `invalidated_at`
- `target_id`
- `reason`
- `evidence`

## Behavior Rules

- Every durable project memory claim must have a source path or command evidence.
- Every knowledge graph node and edge must have `evidence`, `last_verified`, and `source_hash` when the graph is active.
- Prefer invalidating or superseding old memory over silent deletion.
- Use `confidence: confirmed` only when source, docs, tests, or commands were checked in the current project.
- Use `confidence: inferred` only for temporary candidates and review them before they become durable.
- Sensitive information, secrets, credentials, private account data, and raw transcripts must not be stored as evidence.

## Source Hash Rules

- Use SHA-256 for source files when practical.
- Use `source_hash: unknown` only when the evidence is a command result or a source that cannot be hashed.
- Recheck memory when a hash mismatch is detected.
- Do not trust stale memory over current source files.

## Forbidden Behaviors

- Do not create graph edges without evidence.
- Do not keep stale project facts active after source files or docs contradict them.
- Do not store raw terminal logs when a concise verified summary is enough.
- Do not place global user preferences in project evidence files.

## Acceptance Checks

- New durable project memory has evidence.
- Stale memory is marked invalid or superseded.
- Graph nodes and edges have temporal validity fields when KG is active.
- Audit scripts can validate evidence paths and JSONL parseability.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-30 | Created v2.2 memory evidence rules. | User requested a complete memory loop with correct writing, reading, invalidation, and verification. |
