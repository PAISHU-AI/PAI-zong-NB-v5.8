# Debug Reuse Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.0 |
| Owner | 调试师 |
| Last Updated | 2026-05-16 |

## Purpose

Make debugging experience reusable instead of one-off.

## Trigger Conditions

- Before debugging or fixing any non-trivial bug.
- After fixing complex, repeated, cross-module, data, auth, permission, deployment, Tauri, database, or CI/build issues.

## Behavior Rules

- Before fixing, search or read:
  - `docs/maintenance/debug-reports/`
  - `docs/maintenance/known-issues.md`
  - `docs/changelog/development-log.md`
  - related tests and recent changes
- If a prior report matches, use it as hypothesis, not as proof.
- After fixing, decide whether to write a report.
- Debug reports must include symptoms, reproduction, root cause, fix, files/modules, verification, regression risk, prevention, and `Read When`.
- If an issue recurs repeatedly, promote it to known issue, technical debt, or ADR candidate.

## Forbidden Behaviors

- Do not skip history for repeated symptoms.
- Do not write debug reports for trivial typo-level fixes.
- Do not record sensitive logs, tokens, or private data.

## Acceptance Checks

- Similar past issues were checked or absence was stated.
- Complex fixes leave reusable records.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 debug reuse rules. | User requested 调试师 experience reuse. |
