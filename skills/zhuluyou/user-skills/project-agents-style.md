# Project Agents Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.0 |
| Owner | 项目助手 + 规则师 |
| Last Updated | 2026-05-31 |

## Purpose

Define how global skills create, refresh, and audit project-root `AGENTS.md` as a compact project-local rules file.

## Trigger Conditions

- User asks to create, generate, refresh, audit, or maintain a project `AGENTS.md`.
- Project memory initialization finds project `AGENTS.md` missing, stale, or overgrown.
- Project-local user requirements, safety gates, verification gates, generated-file rules, edit restrictions, or collaboration rules change.
- Existing project `AGENTS.md` contains project structure, roadmap bodies, long docs, global runtime content, full skill routing, secrets, raw logs, or long narrative.

## Behavior Rules

- Resolve the active project root first with `memory-reliability-style.md` or `resolve-memory-context.mjs`.
- Treat a skills-pack staging workspace root `AGENTS.md` as a runtime prompt artifact only when project memory explicitly identifies it that way; do not hard-code local development paths in global rules.
- Project `AGENTS.md` is rules-only: project-local user requirements, working rules, safety/confirmation gates, verification gates, and minimal context pointers.
- Project facts, structure, command catalogs, planning, decisions, evidence, known issues, and technical debt belong in `.ai_project.md` or `docs/`.
- Target 40-100 lines. Prefer bullets and paths over narrative.
- Preserve user-authored local rules. Prefer a diff or explicit confirmation for behavior-changing edits.
- Include commands only when they are mandatory verification gates; otherwise point to `.ai_project.md` or docs.
- Do not write global skills paths into project `AGENTS.md` by default. If a project rule truly needs a global command pointer, add `## Global Skills Path Exception` or `<!-- ALLOW GLOBAL SKILLS PATH -->` with a one-line project-local justification, then audit it.
- Generated or maintained sections should be refreshable without silently overwriting custom user rules.
- Use `scripts/generate-project-agents.mjs --cwd <project>` to create or refresh managed project rules after host gating.
- Use `scripts/audit-project-agents.mjs --cwd <project>` to verify project `AGENTS.md` stays short, local, and rules-only.
- Host must gate overwrite, destructive, production, deployment, security, auth, billing, migration, permission, and secret-related rule changes.

## Recommended Project AGENTS.md Shape

- Rule Scope
- Context Entry Points
- User Requirements
- Working Rules
- Safety And Confirmation Gates
- Verification Gates
- Project Memory Sync
- Do Not Include / Do Not Do

## Forbidden Behaviors

- Do not copy global runtime role definitions, global user preferences, full professional skill routing, or `SKILL.md` workflows.
- Do not duplicate project structure maps, roadmap bodies, architecture/API/database/deployment docs, raw logs, long history, or command catalogs.
- Do not write secrets, tokens, accounts, private identifiers, production credentials, or sensitive personal data.
- Do not create project-local `zhuluyou`.
- Do not silently overwrite an existing project `AGENTS.md`.
- Do not present guessed commands, project facts, or architecture as confirmed rules.
- Do not write global skills paths into a project `AGENTS.md` unless the project rule explicitly needs a global command pointer and includes the exception marker above.

## Acceptance Checks

- Project `AGENTS.md` contains project-local rules only and stays short.
- `.ai_project.md` and `docs/` remain the source of truth for structure, planning, facts, and memory.
- Existing user-authored rules are preserved or reported in a diff.
- Global user memory and project memory destinations remain distinct.
- Generator and audit scripts can enforce this contract.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-31 | Created project `AGENTS.md` rules-only governance skill. | User clarified project `AGENTS.md` should store rules/user requirements only, while project structure and planning remain in `.ai_project.md` and `docs/`. |
