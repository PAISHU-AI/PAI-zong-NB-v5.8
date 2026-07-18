---
name: mcporter
description: "Plan, inspect, or document MCP server/tool workflows and mcporter-style CLI usage when such tools are available, with safe fallback when they are not."
---

# mcporter

## Purpose

Plan, inspect, or document MCP server/tool workflows and mcporter-style CLI usage when such tools are available, with safe fallback when they are not.

## Use When

- The user asks about MCP servers, MCP tools, mcporter, stdio/HTTP MCP connection, tool schemas, or MCP config.
- The task needs MCP capability discovery, config review, or a command plan.

## Workflow

1. Check whether an MCP or mcporter tool/CLI is actually installed or exposed before relying on it.
2. Inspect existing config and tool schemas before proposing changes.
3. For write operations, credentials, installs, or external calls, get explicit confirmation.
4. If unavailable, provide exact config shape, command plan, and verification checklist.
5. Keep generated tool schemas minimal and explain security boundaries.

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

Available capability, config/tool plan, commands or fallback checklist, risks.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
