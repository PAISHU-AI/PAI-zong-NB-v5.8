---
name: one-three-one-rule
description: "Codex-adapted one three one rule workflow for communication tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability."
---

# one-three-one-rule

## Purpose

Codex-adapted one three one rule workflow for communication tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability.

## Use When

- The user request matches `one-three-one-rule`, `one three one rule`, `communication` or the skill description.
- Codex-adapted one three one rule workflow for communication tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify audience, channel, tone, objective, constraints, and any required facts.
2. Preserve user-provided facts and label assumptions.
3. Produce concise, channel-appropriate output with next-action clarity.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not spam, impersonate, or send messages externally unless explicitly authorized.
- Do not invent personal details, commitments, or factual claims.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
