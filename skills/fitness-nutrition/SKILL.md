---
name: fitness-nutrition
description: "Codex-adapted fitness nutrition workflow for health tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability."
---

# fitness-nutrition

## Purpose

Codex-adapted fitness nutrition workflow for health tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability.

## Use When

- The user request matches `fitness-nutrition`, `fitness nutrition`, `health` or the skill description.
- Codex-adapted fitness nutrition workflow for health tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Clarify whether the user wants general wellness information, planning, or source-backed research.
2. Use reputable sources when current or medical accuracy matters.
3. State uncertainty and recommend professional care for diagnosis, treatment, or urgent symptoms.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not diagnose, prescribe, or replace professional medical advice.
- Do not create unsafe diet, drug, or treatment instructions.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
