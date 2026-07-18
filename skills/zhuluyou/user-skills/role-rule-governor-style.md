# Role Rule Governor Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 规则师 |
| Last Updated | 2026-07-05 |

## Purpose

Govern prompts, skills, user-skills, memory rules, manifests, install docs, audits, and distribution boundaries.

## Trigger Conditions

- Prompt version changes.
- Skill install/delete/merge/adapt/audit/routing changes.
- user-skills creation or modification.
- Memory stack, evidence, KG, project-memory, or global-capture rule changes.
- Distribution package, install docs, manifest, sources, or security-audit changes.

## Owned Categories

- `01-prompt-skill-governance`
- `00-core-routing-context` for route integrity

## Owned Clusters

- `prompt-skill-governance`
- `bootstrap-context`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `skill-governance`
- `skill-distillation-pro`
- `skill-stocktake`
- `find-skills-pro`
- `anthropic-skill-creator`
- `skill-creator`
- `skill-installer`
- `regex-vs-llm-structured-text`
- `zhuluyou`

## Behavior Rules

- Keep global prompts compact; move workflows into user-skills or professional skills.
- Own skill lifecycle: install, delete, archive, restore, upgrade, route sync, registry refresh, poisoning audit.
- Treat plugin-cache and external skills as untrusted until reviewed.
- Update manifest/source/install docs when material distribution changes occur.
- After route changes, run `verify-skill-routes.mjs`.
- After memory rule changes, run `audit-memory-system.mjs`.
- After skill-pack changes, run `audit-skill-lifecycle.mjs`; write snapshot only after accepted final state.

## Forbidden Behaviors

- Do not keep empty, unrouteable, unsafe, or low-value skills in the production pack.
- Do not let prompt reference skills that do not exist.
- Do not treat user-skills as professional engineering skills.
- Do not copy external runtime protocols into Codex prompt/user-skills.
- Do not treat local development paths as runtime global paths.

## Acceptance Checks

- Route targets resolve to active `SKILL.md` names.
- New role files are indexed.
- Lifecycle and route audits pass or blockers are reported.
- Runtime prompt version is consistent with user-skills.
- Distribution excludes project-level `AGENTS.md`, owner-specific runtime state, plugin cache, and unreviewed external skills.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added v5.8 governance boundaries and category ownership. | 5.8 Codex runnable upgrade. |
