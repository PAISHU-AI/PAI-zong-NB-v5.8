---
name: linear
description: "Plan, inspect, or operate Linear issue/project/team workflows when tools or API access are available, with safe Markdown fallback otherwise."
---

# linear

## Purpose

Plan, inspect, or operate Linear issue/project/team workflows when tools or API access are available, with safe Markdown fallback otherwise.

## Use When

- The user mentions Linear issues, teams, projects, cycles, labels, triage, backlog, or GraphQL.
- A task needs issue planning, migration, reporting, or API-safe operation design.

## Workflow

1. Check whether Linear tools, API token, config, or exported data are actually available.
2. For read-only work, inspect available issue data or ask for export/context.
3. For writes, label changes, assignment, project moves, or API calls, confirm first.
4. If no tool/API is available, output Markdown issue templates, import CSV, GraphQL sketch, or triage plan.
5. Keep IDs, personal data, and tokens out of final output unless explicitly needed and safe.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, or account operation is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, or verification checklist.
- Do not claim files, videos, images, issues, API calls, or integrations were created unless there is concrete local or tool evidence.
- Keep long vendor recipes and examples out of the prompt path; load only task-relevant references when they exist.

## Avoid

- Do not import source-runtime commands, reload semantics, home-directory paths, or tool names as if they are Codex capabilities.
- Do not fabricate external state, API results, generated media, issue updates, or test outcomes.
- Do not broaden the task into unrelated setup or account configuration.

## Output

Issue/project plan, query or template, action safety status, verification.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
