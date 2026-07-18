---
name: meme-generation
description: "Generate real meme images by picking a template and overlaying text with Pillow. Produces actual .png meme files."
---

# meme-generation

## Purpose

Generate real meme images by picking a template and overlaying text with Pillow. Produces actual .png meme files.

## Use When

- The user request matches `meme-generation`, `meme generation`, `creative` or the skill description.
- Generate real meme images by picking a template and overlaying text with Pillow. Produces actual .png meme files.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Clarify target artifact, audience, style, platform, dimensions, and source material.
2. Create a production-ready brief, prompt, storyboard, or asset plan before tool execution.
3. Use image/video/design tools only when available in the current session.
4. If tools are unavailable, return portable prompts/specs and state NOT RUN.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not claim media was generated unless a real artifact exists.
- Do not bypass copyright, likeness, or safety constraints.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
