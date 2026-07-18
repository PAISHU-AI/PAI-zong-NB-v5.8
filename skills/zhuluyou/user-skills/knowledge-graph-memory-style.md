# Knowledge Graph Memory Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.1 |
| Owner | 女助理 + 项目助手 |
| Last Updated | 2026-05-30 |

## Purpose

Define when and how to use a normalized, temporal project knowledge graph as an enhancement layer over project memory. The graph should improve relationship lookup, impact analysis, invalidation, and long-term project continuity without replacing docs or creating unverified memory.

## Trigger Conditions

- User asks about knowledge graph memory, project memory retrieval, impact analysis, dependency relationships, or long-term project continuity.
- User is developing software in a repository and the task is more than a simple consultation.
- A task touches multiple layers, such as UI + API + backend + database + tests + deployment.
- A long-lived project has recurring updates, many docs, repeated debugging, or frequent "what is affected by this change" questions.
- A graph node or edge may be stale because a source file, API, module, test, ADR, or doc was renamed, deleted, or superseded.

## Activation Owner

- 女助理 decides whether knowledge graph should be skipped, read, initialized, or updated.
- 主持人 confirms cost/risk and prevents unnecessary graph work.
- 项目助手 owns graph files, schema, index, validation, and updates.
- 架构师 contributes module, boundary, ADR, dependency, and architecture edges.
- 编码师 contributes feature, file, API, config, test, and command edges.
- 调试师 contributes issue, risk, debug report, regression, and validation edges.

## Activation Levels

| Level | Meaning | Use When | Action |
|---|---|---|---|
| KG0 Skip | Do not use graph. | Simple consultation, one-off answer, translation, small isolated command, no project root, or no durable project effect. | Answer normally; do not create graph files. |
| KG1 Read | Read existing graph only. | Project has `docs/knowledge/project-graph.json` and the question needs relationships or impact context. | Read graph summary/index and relevant docs. |
| KG2 Initialize | Create graph skeleton. | Long-lived software project is missing graph and task is L2/L3, cross-layer, or repeated retrieval is likely. | Create `docs/knowledge/` files through project memory workflow. |
| KG3 Update | Update graph. | Work changes feature/module/API/DB/test/config/ADR/risk relationships. | Update graph, graph index, docs index, and validation evidence. |

## 女助理 Decision Rules

Use KG0 when:

- The user asks a simple conceptual question.
- The task is projectless or does not depend on project files.
- The task only needs one local file and has no durable relationship impact.
- The project is small and `docs/INDEX.md` plus `docs/project-structure.md` is enough.

Use KG1/KG2/KG3 when:

- The user asks to develop software, continue a project, or make long-term project updates.
- The task involves impact analysis: "what files/modules/features/tests are affected".
- The task touches two or more architectural layers.
- The project has more than about 8-10 durable docs or multiple active modules.
- The project repeatedly suffers from memory lookup misses, stale docs, or unclear dependencies.
- L2/L3 project memory sync is required and relationships changed.

If uncertain, 女助理 should recommend KG1 read-only when a graph exists, or defer KG2 initialization until the current task clearly benefits.

## Required Files

```text
docs/knowledge/
  graph-schema.md
  project-graph.json
  graph-index.md
```

## Graph Schema Rules

Use stable IDs:

```text
feature.image-generation
module.frontend.gallery
file.app-src-pages-home
api.generate-image
db_table.generations
test.image-generation-e2e
adr.2026-05-image-pipeline
risk.api-rate-limit
```

Every node must include:

```json
{
  "id": "feature.image-generation",
  "type": "feature",
  "name": "Image generation",
  "summary": "User-facing image generation flow.",
  "evidence": ["docs/features/image-generation.md"],
  "status": "active",
  "valid_from": "2026-05-30",
  "valid_to": null,
  "last_verified": "2026-05-30",
  "source_hash": "sha256:..."
}
```

Every edge must include:

```json
{
  "from": "feature.image-generation",
  "to": "api.generate-image",
  "type": "uses",
  "evidence": ["docs/api/image-generation.md"],
  "confidence": "confirmed",
  "valid_from": "2026-05-30",
  "valid_to": null,
  "last_verified": "2026-05-30",
  "source_hash": "sha256:..."
}
```

## Allowed Node Types

- `feature`
- `module`
- `file`
- `api`
- `db_table`
- `doc`
- `adr`
- `test`
- `command`
- `config`
- `risk`
- `issue`
- `task`

## Allowed Edge Types

- `implements`
- `uses`
- `depends_on`
- `documented_by`
- `tested_by`
- `configured_by`
- `validated_by`
- `changed_by`
- `blocked_by`
- `mitigates`
- `supersedes`
- `related_to`

## Normalization Rules

- No edge without `evidence`.
- No node without `type`, `name`, and `evidence`.
- No active node or edge without `valid_from`, `last_verified`, and `source_hash` once v1.1 graph is enabled.
- Prefer specific relations over `related_to`.
- Do not store raw conversation transcripts.
- Do not store secrets, credentials, private identifiers, or speculative personal data.
- Do not duplicate full docs content inside the graph; link to docs and source files.
- Use `confidence: confirmed` only when backed by current source/docs/tests.
- Use `confidence: inferred` only for clearly marked temporary graph candidates; promote or remove after validation.

## Temporal And Invalidation Rules

- Use `valid_from` for the date a node or edge became true.
- Use `valid_to` when a relation is no longer true; do not silently delete historical relations.
- Use `superseded_by` when a node or edge is replaced by a newer ID.
- Use `invalidation_reason` when a stale item is closed.
- Use `last_verified` whenever a source file, doc, command, or test is checked.
- Use `source_hash` to detect stale graph facts when source files change.
- Record detailed invalidations in `docs/memory/invalidations.jsonl` when `memory-evidence-style.md` is active.

## Project Memory Integration

- `docs/INDEX.md` must include `docs/knowledge/graph-schema.md`, `docs/knowledge/project-graph.json`, and `docs/knowledge/graph-index.md` when KG2/KG3 is active.
- `.ai_project.md` should link to `docs/knowledge/graph-index.md` only when the graph exists.
- L2/L3 changes should consider whether graph relationships changed.
- Graph updates should be validated by file existence, doc index coverage, and evidence paths.
- Graph updates should also validate temporal fields, source hashes, and invalidation records.

## Forbidden Behaviors

- Do not initialize a graph for simple consultations.
- Do not make the graph the only source of truth; docs and source remain primary.
- Do not create broad, unverified relationship edges.
- Do not leave stale relationships active after source evidence contradicts them.
- Do not add every file in the repository as a node unless it is important for project understanding.
- Do not let graph maintenance slow down small or local tasks.

## Acceptance Checks

- 女助理 states KG0/KG1/KG2/KG3 internally or in final memory status when relevant.
- Graph files exist only when activation criteria are met.
- All nodes and edges have evidence.
- Active nodes and edges have temporal validity and source verification fields.
- `docs/INDEX.md` indexes graph files when graph is active.
- Project memory final report says whether graph was skipped, read, initialized, or updated.

## Related Profile Entries

- `DEV-009`

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-30 | Created normalized project knowledge graph activation and governance rules. | User requested 女助理 to decide whether knowledge graph is needed based on simple consultation versus long-term software development. |
| 2026-05-30 | Added temporal validity, source hashes, and invalidation rules. | User requested a complete memory system that can invalidate stale memory and verify reuse. |
