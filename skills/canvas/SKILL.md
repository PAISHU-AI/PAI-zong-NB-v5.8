---
name: canvas
description: "Canvas LMS integration — fetch enrolled courses and assignments using API token authentication."
---

# canvas

## Purpose

Canvas LMS integration — fetch enrolled courses and assignments using API token authentication.

## Use When

- The user request matches `canvas`, `productivity` or the skill description.
- Canvas LMS integration — fetch enrolled courses and assignments using API token authentication.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify tool, workspace, requested artifact, data access, and write boundary.
2. Use available tools only when exposed; otherwise provide Markdown, CSV, templates, or import plans.
3. Require confirmation for external writes, sharing, deletion, or permission changes.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not claim external tasks, docs, records, or workspace changes were made without tool evidence.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
