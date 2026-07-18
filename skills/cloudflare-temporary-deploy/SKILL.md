---
name: cloudflare-temporary-deploy
description: "Deploy a Worker live, no account, via wrangler --temporary."
---

# cloudflare-temporary-deploy

## Purpose

Deploy a Worker live, no account, via wrangler --temporary.

## Use When

- The user request matches `cloudflare-temporary-deploy`, `cloudflare temporary deploy`, `web-development` or the skill description.
- Deploy a Worker live, no account, via wrangler --temporary.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Inspect stack, routes, components, APIs, styling, and test commands.
2. Use existing project conventions and verify with lint, build, tests, or browser checks as appropriate.
3. Handle external services, deploys, and credentials only with confirmation.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not introduce unnecessary frameworks or dependencies.
- Do not skip UI/browser verification when visual behavior changes and tools are available.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
