# 规则师 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-rule-governor-style.md` |

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
| `prompt-skill-governance` | `skill-governance` | Prompt, skill pack, user-skills, lifecycle, install, audit, and external skill adaptation work. | default-first | `skill-governance`, `find-skills`, `skill-pack-adaptation`, `anthropic-skill-creator`, `context7-cli`, `find-skills-pro`, `plugin-creator`, `regex-vs-llm-structured-text` |
| `bootstrap-context` | `router` | Per-turn bootstrap, context discovery, source grounding, terminal execution, and context budget. | default-first | `router`, `content-hash-cache-pattern`, `context-engineering-pro`, `iterative-retrieval`, `openai-docs`, `project-context`, `source-driven-development`, `source-driven-development-pro` |

