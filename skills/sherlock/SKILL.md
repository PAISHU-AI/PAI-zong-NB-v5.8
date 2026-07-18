---
name: sherlock
description: "OSINT username search across 400+ social networks. Hunt down social media accounts by username."
---

# sherlock

## Purpose

OSINT username search across 400+ social networks. Hunt down social media accounts by username.

## Use When

- The user request matches `sherlock`, `security` or the skill description.
- OSINT username search across 400+ social networks. Hunt down social media accounts by username.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Confirm authorization, scope, assets, and objective.
2. Use read-only or local test methods first.
3. Report risks with evidence, impact, likelihood, and remediation.
4. Require confirmation before active scans, external testing, or changes.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not enable unauthorized access, credential theft, evasion, malware, or real-world harm.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
