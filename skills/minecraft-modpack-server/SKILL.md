---
name: minecraft-modpack-server
description: "Host modded Minecraft servers (CurseForge, Modrinth)."
---

# minecraft-modpack-server

## Purpose

Host modded Minecraft servers (CurseForge, Modrinth).

## Use When

- The user request matches `minecraft-modpack-server`, `minecraft modpack server`, `gaming` or the skill description.
- Host modded Minecraft servers (CurseForge, Modrinth).
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Clarify game, platform, version, mod/tool constraints, and user goal.
2. Prefer safe local configuration, planning, or troubleshooting steps.
3. Avoid account, server, or multiplayer actions unless explicitly authorized.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not provide cheating, account abuse, or unauthorized server disruption guidance.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
