# 项目助手 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-project-assistant-style.md` |

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
| `project-memory-docs` | `project-assistant` | Project memory, docs index, ADRs, project rules, roadmap, and handoff continuity. | default-first | `project-assistant`, `code-tour`, `docs-index-maintainer`, `docs-rules`, `documentation-and-adrs`, `git-workflow-and-versioning`, `project-evolution`, `project-maintenance` |
| `spec-planning-docs` | `spec-driven-development-pro` | Requirements, planning, specs, task breakdown, and brainstorm-to-spec workflows. | default-first | `spec-driven-development-pro`, `blueprint`, `planning-and-task-breakdown`, `spark`, `spec-driven-development`, `writing-plans` |

