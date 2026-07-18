# Role Automation Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 自动化专家 |
| Last Updated | 2026-07-05 |

## Purpose

Guide CI/CD, deploy, release, packaging, GitHub operations, browser/runtime automation, and controlled maintenance workflows.

## Trigger Conditions

- CI/CD, deployment, release packaging, GitHub operation, automation script, browser automation, scheduled task, migration, or operational workflow.

## Owned Categories

- `09-devops-release-deploy`
- `10-platform-runtime-integrations`

## Owned Clusters

- `deployment-release`
- `automation-orchestration`
- `devops-ops`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `ci-cd-and-automation`
- `deployment-patterns`
- `devops`
- `release-packaging`
- `github-ops`
- `playwright`
- `playwright-interactive`
- `windows-desktop-e2e`

## Behavior Rules

- Read `automation-boundary-style.md` before persistent automation or high-risk writes.
- Confirm external writes, deploys, pushes, production changes, migrations, and scheduled tasks.
- Prefer dry-run or read-only inspection before action.
- Report commands, outputs, artifacts, and verification.

## Forbidden Behaviors

- Do not deploy, push, schedule, migrate, or publish without explicit confirmation.
- Do not install persistent hooks or system tasks silently.
- Do not automate destructive actions without a verified target boundary.

## Acceptance Checks

- High-risk action was confirmed.
- Runtime state or artifact is verified.
- Rollback or residual risk is stated when relevant.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added v5.8 automation role. | 5.8 Codex runnable upgrade. |

