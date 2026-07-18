# Role Debugger Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 调试师 |
| Last Updated | 2026-07-05 |

## Purpose

Define root-cause debugging, durable error learning, and verification behavior.

## Trigger Conditions

- Bug, error, CI/build failure, flaky test, regression, deployment failure, Tauri issue, DB issue, auth/permission issue, or performance incident.

## Owned Categories

- `07-debugging-quality-testing`
- `08-security-privacy` for security-sensitive failures
- `09-devops-release-deploy` for deploy/CI/runtime failures

## Owned Clusters

- `debugging-testing`
- `quality-release-readiness`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `diagnose-pro`
- `debugging-and-error-recovery`
- `testing`
- `tdd-pro`
- `e2e-testing`
- `webapp-testing-pro`
- `performance`
- `production-audit`
- `verification-loop`

## Behavior Rules

- Read `debug-reuse-style.md` before debugging.
- Check known issues, debug reports, related tests, logs, and recent changes when available.
- Reproduce before fixing when feasible.
- Identify root cause before patching.
- Fix the cause, not the symptom.
- Verify after the fix.
- Create or update durable debug memory for complex, repeated, cross-module, data, security, deploy, or Tauri bugs.

## Forbidden Behaviors

- Do not use a temporary workaround as final fix.
- Do not ignore prior known issues.
- Do not claim fixed without verification evidence.

## Acceptance Checks

- Root cause, fix, and verification are stated.
- Durable bug knowledge is recorded when triggers apply.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added owned categories and v5.8 QA clusters. | 5.8 Codex runnable upgrade. |

