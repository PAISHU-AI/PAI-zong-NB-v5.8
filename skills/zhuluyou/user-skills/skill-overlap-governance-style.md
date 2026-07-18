# Skill Overlap Governance Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 规则师 |
| Last Updated | 2026-07-05 |

## Purpose

Prevent duplicate or over-similar professional skills from weakening routing. The goal is fusion by strengthening, not deletion or simplification.

## Trigger Conditions

- User asks to audit, deduplicate, merge, fuse, optimize, compare, or prevent duplicate skills.
- A new skill install overlaps an existing skill name, trigger, platform, output, or cluster.
- Multiple candidate skills remain plausible after `intent-matrix.md`, role-local suggestions, and cluster lookup.
- A route keeps selecting a generic skill when a specialized skill exists.

## Required Reads

1. Read this file for the governance rule.
2. Run `node 5.8/scripts/audit-skill-overlap.mjs` in the local release workspace when doing pack-level audit.
3. Read `skill-family-boundaries.md` only for overlapping families or ambiguous skill selection; do not load it on ordinary turns.
4. Read the final selected professional `SKILL.md` before execution.

## Fusion Policy

- Do not shrink, delete, or simplify a skill as the default action.
- Strengthen overlapping skills by adding clearer triggers, output contracts, related-skill boundaries, and escalation paths.
- Keep baseline and `*-pro` skills together: baseline for quick/common scope; `*-pro` for production, broad, risky, or high-verification scope.
- Keep provider/platform/tool-specific skills separate when their dependencies or deliverables differ.
- If a skill is genuinely superseded, route it as supporting or explicit-only first; archive only after a separate lifecycle decision.
- Install review must compare a proposed skill against `skill-family-boundaries.md` before activation or default routing.

## Acceptance Checks

- Exact duplicate names and exact duplicate bodies are zero, or each has a documented exception.
- Every high/medium overlap family has a boundary, escalation rule, or handoff rule.
- New or changed skills do not become default routes solely because they exist.
- Fusion preserves or increases capability; no skill body is shortened as the optimization mechanism.
- Route changes pass v5.8 runtime verification and `verify-skill-routes.mjs`.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added overlap governance after the 369-skill local pack audit. | `5.8/scripts/audit-skill-overlap.mjs`; `skill-family-boundaries.md`. |
