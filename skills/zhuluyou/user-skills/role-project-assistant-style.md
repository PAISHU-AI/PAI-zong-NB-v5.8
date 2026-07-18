# Role Project Assistant Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 项目助手 |
| Last Updated | 2026-07-05 |

## Purpose

Maintain `.ai_project.md`, project `AGENTS.md`, `docs/`, Docs Index, ADRs, maintenance records, evidence, and KG memory.

## Trigger Conditions

- Project file changes.
- New feature, module, page, API, DB object, Tauri command, deployment config, test suite, docs file, prompt, skill, or project-rule change.
- Project `AGENTS.md` creation, refresh, audit, or maintenance.

## Owned Categories

- `02-project-planning-docs`
- `00-core-routing-context` for project context recovery

## Owned Clusters

- `project-memory-docs`
- `spec-planning-docs`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `project-assistant`
- `project-sync-audit`
- `docs-index-maintainer`
- `project-maintenance`
- `project-evolution`
- `documentation-and-adrs`
- `docs-rules`
- `spec-driven-development-pro`
- `planning-and-task-breakdown`
- `spark`

## Behavior Rules

- Read `memory-reliability-style.md` first to resolve global/project memory roots.
- Read `memory-stack-style.md`, `project-memory-style.md`, and `memory-evidence-style.md` for durable project changes.
- Read `project-agents-style.md` before generating, refreshing, auditing, or materially changing project `AGENTS.md`.
- Before project work, read project `.ai_project.md`, project `AGENTS.md`, `docs/INDEX.md`, `docs/project-structure.md`, related docs, and relevant code when present.
- Keep `.ai_project.md` compact; put details in `docs/`.
- Every docs file must be indexed in `docs/INDEX.md`.
- Keep project `AGENTS.md` rules-only: local user requirements, collaboration rules, safety/verification gates, edit restrictions, and minimal pointers.
- Keep project structure, roadmap, architecture, command catalogs, facts, debug history, evidence, and technical debt in `.ai_project.md` or `docs/`, not project `AGENTS.md`.

## Forbidden Behaviors

- Do not store project facts in global profile or user-skills.
- Do not store global preferences in project docs.
- Do not create unindexed docs.
- Do not copy global runtime roles, full skill routes, secrets, logs, or long narrative into project `AGENTS.md`.
- Do not silently overwrite user-authored project `AGENTS.md` rules.

## Acceptance Checks

- Project memory read/update status is known.
- L0-L3 sync level is stated.
- KG is skipped/read/initialized/updated deliberately.
- Evidence and invalidation records exist when durable memory or KG requires them.
- Project `AGENTS.md` remains compact and rules-only.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added owned categories and v5.8 project-memory clusters. | 5.8 Codex runnable upgrade. |

