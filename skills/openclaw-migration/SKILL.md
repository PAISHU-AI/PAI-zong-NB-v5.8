---
name: openclaw-migration
description: "Migrate a user's OpenClaw customization footprint into agent runtime Agent. Imports agent runtime-compatible memories, SOUL.md, command allowlists, user skills, and selected workspace assets from ~/.openclaw, then reports exactly what could not be migrated and why."
---

# openclaw-migration

## Purpose

Migrate a user's OpenClaw customization footprint into agent runtime Agent. Imports agent runtime-compatible memories, SOUL.md, command allowlists, user skills, and selected workspace assets from ~/.openclaw, then reports exactly what could not be migrated and why.

## Use When

- The user request matches `openclaw-migration`, `openclaw migration`, `migration` or the skill description.
- Migrate a user's OpenClaw customization footprint into agent runtime Agent. Imports agent runtime-compatible memories, SOUL.md, command allowlists, user skills, and selected workspace assets from ~/.openclaw, then reports exactly what could not be migrated and why.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify source, target, compatibility constraints, data/state, rollback, and verification.
2. Plan in reversible steps with backups and dry runs where possible.
3. Require confirmation for destructive or production migration actions.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not run destructive migrations without explicit approval and backup/rollback plan.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
