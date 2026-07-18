---
name: spotify
description: "Spotify: play, search, queue, manage playlists and devices."
---

# spotify

## Purpose

Spotify: play, search, queue, manage playlists and devices.

## Use When

- The user request matches `spotify`, `media` or the skill description.
- Spotify: play, search, queue, manage playlists and devices.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Clarify artifact type, source assets, target platform, style, aspect ratio, and tool availability.
2. Produce prompts, edit plans, storyboards, or asset specs before tool execution.
3. Use exposed media tools only when available and suitable.
4. If tools are unavailable, return portable production specs and mark execution NOT RUN.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not claim audio/video/image output exists without artifact evidence.
- Do not bypass rights, likeness, or safety constraints.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
