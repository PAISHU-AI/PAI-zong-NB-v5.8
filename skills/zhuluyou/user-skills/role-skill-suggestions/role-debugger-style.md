# 调试师 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-debugger-style.md` |

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
| `debugging-testing` | `diagnose-pro` | Bug diagnosis, test failures, regression isolation, browser testing, and root-cause workflows. | default-first | `diagnose-pro`, `anthropic-webapp-testing`, `browser-testing-with-devtools`, `code-review`, `debugging-and-error-recovery`, `e2e-testing`, `plankton-code-quality`, `tdd-pro` |
| `quality-release-readiness` | `production-readiness-pro` | QA, performance, production readiness, release confidence, and final verification. | default-first | `production-readiness-pro`, `performance`, `performance-optimization`, `production-audit`, `qa-pro`, `ship-pro`, `vercel-react-best-practices`, `verification-loop` |

