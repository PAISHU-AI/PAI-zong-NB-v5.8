---
name: stripe-projects
description: "Provision SaaS services + sync creds via Stripe Projects."
---

# stripe-projects

## Purpose

Provision SaaS services + sync creds via Stripe Projects.

## Use When

- The user request matches `stripe-projects`, `stripe projects`, `payments` or the skill description.
- Provision SaaS services + sync creds via Stripe Projects.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify payment provider, mode, account boundary, credentials, and requested operation.
2. Prefer test mode, read-only inspection, and local docs first.
3. Require explicit confirmation for live payments, refunds, links, customer changes, or secret handling.
4. Document idempotency, audit logs, rollback limits, and verification.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not process payments, expose secrets, or alter live billing state without confirmation.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
