---
name: video-edit
description: "Plan AI-assisted video edits, restyles, background swaps, motion transfer, outfit/product changes, and edit prompts for existing videos."
---

# video-edit

## Purpose

Plan AI-assisted video edits, restyles, background swaps, motion transfer, outfit/product changes, and edit prompts for existing videos.

## Use When

- The user asks to edit video, restyle footage, swap background, transfer motion, change outfit/product, or produce AI video edit prompts.
- The task needs a structured edit plan even if no rendering tool is available.

## Workflow

1. Identify source video, desired transformation, preserved elements, forbidden changes, duration, and output format.
2. Choose edit type: restyle, object/product swap, background change, motion transfer, cleanup, or extension.
3. Write precise edit prompts with preservation constraints and failure-risk notes.
4. Use a video tool only when available and confirmed for external actions.
5. If unavailable, provide edit decision list, prompt pack, and verification checklist.

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

Edit plan, prompts, preservation constraints, tool/fallback status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
