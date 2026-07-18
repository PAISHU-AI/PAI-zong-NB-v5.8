# 自动化专家 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-automation-style.md` |

## Purpose

Role-local bridge from owned clusters to the best professional skill. This file is read only for the selected lead role.

## Use Rules

- Prefer the row's default skill unless the user names a more specific skill or the request clearly matches a listed candidate.
- If a row is gated, 主持人 must confirm scope before external writes, deployment, payments, credentials, active security testing, browser automation, or account operations.
- This file is not a professional workflow. The execution role must still read the selected `SKILL.md` before acting.
- For full candidate lists, read `skill-cluster-details.md`; do not load unrelated professional skill bodies.

## Suggestions

| Intent / Cluster | Default Skill | Use Mainly For | Selection | Notable Candidates |
|---|---|---|---|---|
| `deployment-release` | `deployment-patterns` | Deployment providers, release packaging, hosting, CI/CD, migration, and publish actions. | gated-default | `deployment-patterns`, `cloudflare-deploy`, `cloudflare-temporary-deploy`, `deprecation-and-migration`, `migration-deprecation-pro`, `netlify-deploy`, `openclaw-migration`, `release-packaging` |
| `automation-orchestration` | `ci-cd-and-automation` | Kanban workers, webhooks, watchers, tunnels, container supervision, and operational automation. | gated-default | `ci-cd-and-automation`, `container-supervision-s6`, `docker-management`, `inference-sh-cli`, `kanban-orchestrator`, `kanban-worker`, `pinggy-tunnel`, `watchers` |
| `devops-ops` | `devops` | Docker, server ops, logs, environment variables, system services, and operational troubleshooting. | default-first | `devops` |

