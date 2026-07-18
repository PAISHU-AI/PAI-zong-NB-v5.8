# Project Memory Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 2.3 |
| Owner | 项目助手 |
| Last Updated | 2026-05-31 |

## Purpose

Define durable project memory as a structured, continuously maintained project brain: project index, docs index, file/module map, evolution plan, risks, decisions, evidence, knowledge graph, and reusable maintenance knowledge.

## Trigger Conditions

- Before and after software project changes.
- When `.ai_project.md`, `AGENTS.md`, `docs/`, ADRs, debug reports, or development logs may need updates.
- When starting work in a repository whose project memory is missing, incomplete, stale, or unstructured.

## Behavior Rules

- Use `memory-reliability-style.md` before reading or writing project memory.
- Use `memory-stack-style.md` to choose L0/L1/L2/L3 before reading project memory.
- Use `memory-evidence-style.md` before durable project memory, debug report, ADR, roadmap, or knowledge graph writes.
- Use `project-agents-style.md` before creating, refreshing, auditing, or changing project `AGENTS.md`.
- Detect the active project root by walking upward from the current working directory until a marker is found.
- Favor structured, modular project development.
- Keep files preferably under 1000 lines.
- Maintain project-root `.ai_project.md` as project index.
- Maintain project-root `docs/` as the structured long-form memory layer.
- Maintain `docs/INDEX.md` as the authoritative docs map.
- Maintain `docs/project-structure.md` as the human/agent-readable folder, module, and important-file map.
- Use `knowledge-graph-memory-style.md` when 女助理 determines the task needs relationship lookup, impact analysis, or long-term project continuity.
- Maintain project-root `AGENTS.md` only for project-local AI collaboration rules, user requirements, safety gates, verification gates, edit restrictions, and minimal context pointers.
- Classify changes as L0/L1/L2/L3.
- Every durable record must include a future read path.
- New docs must be reflected in `docs/INDEX.md`; `.ai_project.md` links to the docs index rather than duplicating all detail.
- Project memory should support future planning: roadmap, next actions, risks, technical debt, known issues, and decision records.
- Project memory should support evidence-backed retrieval: durable claims have evidence paths, stale facts can be invalidated, and current source wins over stale memory.
- Run `audit-project-memory.mjs` when project memory structure is uncertain or after major docs changes.
- When the user says `初始化本项目`, run `init-project-memory.mjs --cwd .` as the single entrypoint: pre-audit, initialize missing memory skeleton, write retrieval summary, then re-audit.
- When project `AGENTS.md` is missing, stale, or overgrown, run `generate-project-agents.mjs --cwd . --dry-run` first and `audit-project-agents.mjs --cwd .` after any accepted write.
- If no project marker exists, classify the session as projectless and do not create project memory unless the user asks or a durable deliverable is produced.

## Project Memory Architecture

| Layer | File/Directory | Purpose | Keep It |
|---|---|---|---|
| Entry index | `.ai_project.md` | Compact project entrypoint: identity, stack, commands, active status, key docs, risks, current focus. | Short and scannable. |
| Collaboration rules | `AGENTS.md` | Project-local AI behavior, user requirements, constraints, safety rules, verification gates, and minimal context pointers. | Rules only; not structure, roadmap, or memory. |
| Docs map | `docs/INDEX.md` | Structured index of all durable project docs. | Authoritative map. |
| Structure map | `docs/project-structure.md` | Directory/module/file explanations and ownership boundaries. | Updated when structure changes. |
| Architecture | `docs/architecture/` | System design, boundaries, data flow, important tradeoffs. | Durable design context. |
| Features | `docs/features/` | Feature behavior, UI flows, product states, acceptance notes. | User-facing behavior. |
| API | `docs/api/` | API contracts, clients, auth, errors, retries, webhooks. | Interface memory. |
| Database | `docs/database/` | Schema, migrations, indexes, transactions, data lifecycle. | Data memory. |
| Desktop/native | `docs/desktop/` | Tauri/native permissions, commands, updater, packaging, OS notes. | Desktop memory. |
| Deployment | `docs/deployment/` | Build, env, release, rollback, hosting, CI/CD. | Operational memory. |
| Decisions | `docs/decisions/` | ADRs for architecture/security/data/deploy/rule changes. | Why decisions were made. |
| Maintenance | `docs/maintenance/` | Known issues, debug reports, technical debt, development log. | Reuse and continuity. |
| Roadmap | `docs/roadmap.md` | Current plan, next actions, risks, milestones. | Living plan. |
| Knowledge graph | `docs/knowledge/` | Relationship graph for features, modules, files, APIs, DB, tests, risks, docs, and ADRs. | Only when KG activation criteria are met. |
| Evidence layer | `docs/memory/` | Retrieval index, evidence records, source hashes, and invalidations for durable project memory. | Required for v2.2 initialized project memory. |

## Required Docs Metadata

Every durable doc except `docs/INDEX.md` should contain:

```markdown
## Read When

## Owner

## Update Trigger

## Validation
```

Use concise bullets. Do not write long narrative unless it improves future reuse.

## Docs Index Schema

`docs/INDEX.md` should use this table:

```markdown
| Path | Purpose | Read When | Owner | Update Trigger | Validation |
|---|---|---|---|---|---|
```

Every durable doc under `docs/` should appear in this index unless it is generated output, an archived note, or a raw artifact.

## `.ai_project.md` Shape

Keep `.ai_project.md` compact. Recommended sections:

- Project Identity
- Current Status
- Tech Stack
- Key Commands
- Project Structure Entry
- Docs Index
- Active Work / Next Actions
- Risks / Known Issues
- Memory Update Rules

Do not turn `.ai_project.md` into the full documentation body. Link to `docs/INDEX.md` and the relevant docs.

## Project Structure Memory

`docs/project-structure.md` should describe:

- Top-level directories and what owns them.
- Important source modules and their responsibilities.
- Entry points, routing files, config files, and generated outputs.
- Files or directories agents should avoid editing without reason.
- Update triggers when modules are added, split, renamed, or deleted.

## Knowledge Graph Layer

Knowledge graph is optional and normalized. It should be activated by 女助理 using `knowledge-graph-memory-style.md`.

Use KG0 skip for simple consultation, projectless questions, or isolated local tasks.
Use KG1 read when a graph exists and relationship context may help.
Use KG2 initialize for long-lived software projects with L2/L3 changes, cross-layer work, or repeated retrieval misses.
Use KG3 update when project relationships change.

When active, use:

```text
docs/knowledge/
  graph-schema.md
  project-graph.json
  graph-index.md
```

The graph is a relationship index, not a replacement for docs. Every node and edge must have evidence.

## Evidence Layer

Initialized v2.2 project memory should include:

```text
docs/memory/
  README.md
  retrieval-index.json
  evidence/index.jsonl
  invalidations.jsonl
```

Use `memory-evidence-style.md` for schema and validation. The evidence layer does not store raw transcripts or secrets; it stores concise source-backed records that future agents can verify.

## Continuous Optimization Loop

Before work:

1. Resolve project root with `memory-reliability-style.md`.
2. Read `.ai_project.md`, `AGENTS.md`, `docs/INDEX.md`, `docs/project-structure.md`, and task-specific docs if they exist.
3. Select L0/L1/L2/L3 with `memory-stack-style.md`.
4. Let 女助理 decide KG0/KG1/KG2/KG3 when project relationship context may matter.
5. Read `project-agents-style.md` when project `AGENTS.md` may be generated, refreshed, audited, or changed.
6. If core memory is missing, note the gap and decide whether initialization is appropriate.

After work:

1. Classify L0-L3.
2. Update `.ai_project.md` only for compact status/index changes.
3. Update or create the relevant `docs/` file for durable details.
4. Update `docs/INDEX.md`.
5. For project structure changes, update `docs/project-structure.md`.
6. For plans, risks, recurring issues, or future work, update `docs/roadmap.md` or `docs/maintenance/*`.
7. For project-local rule changes, update project `AGENTS.md` under `project-agents-style.md` rather than copying docs content into it; use `generate-project-agents.mjs` and `audit-project-agents.mjs` when available.
8. For cross-layer relationship changes, update `docs/knowledge/*` when KG is active.
9. For durable memory writes, add evidence or invalidation records when needed.
10. Run project-memory audit when docs structure changed.

## Conversational Initialization

When the user asks to initialize the current project, use:

```bash
node "$CODEX_HOME/skills/zhuluyou/scripts/init-project-memory.mjs" --cwd .
```

Supported options:

- `--dry-run`: inspect current memory gaps without writing.
- `--with-kg`: initialize `docs/knowledge/` together with core project memory.
- `--setup-maintenance`: create missing `docs/memory/maintenance.json` and install a project Git pre-push memory audit hook.
- `--repair-maintenance`: fill missing maintenance setup without replacing existing custom configuration.
- `--force`: allow initialization in a projectless directory only when the user explicitly intends the current directory to become the project root.

Default behavior should refuse projectless initialization, preserve existing docs, create only missing files, check maintenance setup, update `docs/memory/retrieval-index.json`, and re-run the project memory audit. Maintenance setup must be idempotent: existing config, hooks, and user edits are skipped unless force is explicit.

## Project Root Markers

Search upward from the current working directory for:

- `.ai_project.md`
- `AGENTS.md`
- `docs/`
- `.git/`
- `package.json`, `pnpm-workspace.yaml`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `tauri.conf.json`, `src-tauri/`

Use the first directory containing a marker as the active project root. Do not write project memory outside that root.

## Global vs Project Memory

- Global user preferences and routing rules go to `$CODEX_HOME/skills/zhuluyou/`.
- Project facts, module status, commands, architecture notes, feature docs, debug history, and project risks go to the detected project root.
- Project-level repeated AI collaboration rules, local user requirements, safety gates, and verification gates go to project `AGENTS.md`.
- Project structure, planning, command catalogs, facts, decisions, evidence, and debug history stay in `.ai_project.md` or `docs/`.
- Never store project-specific facts in global user-skills.
- Never create a second global memory entry inside a project.

## L0-L3 Sync

| Level | Meaning | Action |
|---|---|---|
| L0 | No long-term project knowledge changed | State no update needed. |
| L1 | Small file/module/test/progress change | Update `.ai_project.md` or roadmap only when it helps future work. |
| L2 | Feature/API/DB/Tauri/UI/test/docs/structure addition | Update `.ai_project.md`, `docs/INDEX.md`, and matching docs. |
| L3 | Architecture/security/deployment/permission/data migration/rule change | Update `.ai_project.md`, `docs/INDEX.md`, matching docs, ADR, and evidence/invalidation records. |

## Task-Specific Memory Rules

| Task | Minimum Sync | Required Memory |
|---|---|---|
| UI screen or visual redesign | L2 | `.ai_project.md` feature/status entry; `docs/features/` or UI/design doc when behavior or design system changes |
| API route, API client, webhook, OAuth | L2 | `docs/api/` contract, errors, auth, pagination/retry notes as relevant |
| Database schema, migration, index, transaction | L3 | `docs/database/` plus ADR if model, consistency, or migration strategy changes |
| Tauri command, permission, updater, native capability | L2/L3 | `docs/desktop/` and security/permission notes; ADR for permission model changes |
| Build, deploy, packaging, environment | L2/L3 | `docs/deployment/`, commands, rollback, env requirements |
| Bug fix | L1 | `.ai_project.md` risk/progress if useful; debug report for complex/repeated/cross-module issues |
| New module or directory | L2 | Directory/module boundary in `.ai_project.md`; docs if future developers need design context |
| Project structure change | L2 | `docs/project-structure.md`, `docs/INDEX.md`, compact `.ai_project.md` link/status |
| Cross-layer impact or relationship change | L2/L3 | `docs/knowledge/` when KG is active; otherwise record why KG0/KG2 was skipped |
| Durable memory evidence or stale context | L1/L2 | `docs/memory/` evidence or invalidation records |
| Roadmap, plan, milestone, technical debt | L1/L2 | `docs/roadmap.md` or `docs/maintenance/technical-debt.md` |
| Prompt, skill, user-skill, install package | L2 | `MANIFEST.md`/`SOURCES.md`/install docs as applicable; `.ai_project.md` current progress |
| Security/auth/permission change | L3 | Security notes, threat/risk record, ADR when model changes |

## Project Memory Final Report

For code, prompt, skill, docs, or project-file changes, final answer should include:

```markdown
项目记忆：
- 读取：...
- 更新：...
- 同步等级：L0/L1/L2/L3
- 复用入口：...
```

If no update is needed, state the reason:

```markdown
项目记忆：
- 未更新：L0，本次未改变可复用项目知识。
```

## Forbidden Behaviors

- Do not write meaningless logs.
- Do not create docs without `Read When`.
- Do not let `.ai_project.md` become a full documentation dump.
- Do not create docs that are not indexed in `docs/INDEX.md`.
- Do not create or update knowledge graph without evidence.
- Do not write durable project claims without a reusable evidence path.
- Do not enable knowledge graph for simple consultations.
- Do not mix project-specific rules into cross-project user preferences.
- Do not use project `AGENTS.md` as a project structure map, roadmap, architecture summary, command catalog, evidence store, debug log, or long-form memory file.

## Acceptance Checks

- Project memory status is reported in final answer when relevant.
- Docs Index has correct paths and read conditions.
- Core project memory files are present when a project is long-lived: `.ai_project.md`, `docs/INDEX.md`, `docs/project-structure.md`, `docs/roadmap.md`.
- v2.2 initialized project memory includes `docs/memory/README.md`, `docs/memory/retrieval-index.json`, `docs/memory/evidence/index.jsonl`, and `docs/memory/invalidations.jsonl`.
- Knowledge graph decision is explicit when project work involves long-term development, impact analysis, or cross-layer relationships.
- Missing updates are explained.
- Task-specific memory rule was applied.
- Final answer includes sync level and reuse entry for meaningful changes.
- Project `AGENTS.md` remains rules-only when it is touched.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 project memory style. | User requested stronger `.ai_project.md` / AGENTS / docs rules. |
| 2026-05-16 | Added task-specific memory rules and final report template. | User asked how to strengthen the automated closed loop. |
| 2026-05-30 | Added project root discovery, projectless handling, and strict global/project memory separation. | User requested reliable multi-project memory distinction on macOS. |
| 2026-05-30 | Replanned project memory as structured project brain with docs index, structure map, roadmap, and audit loop. | User asked whether project memory should be redesigned for project indexes, file explanations, structured docs, sustainable memory, optimization, and planning. |
| 2026-05-30 | Added optional normalized knowledge graph layer with 女助理 activation decision. | User asked 女助理 to decide when knowledge graph is needed and avoid messy graphs. |
| 2026-05-30 | Upgraded to v2.2 evidence-backed project memory. | User requested a complete memory loop with correct writing, reading, invalidation, verification, and reuse. |
| 2026-05-31 | Clarified project `AGENTS.md` as rules-only project memory layer. | User clarified project structure and planning belong in `.ai_project.md` and `docs/`, not in project `AGENTS.md`. |
