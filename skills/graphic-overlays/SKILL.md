---
name: graphic-overlays
description: "Design timed graphic overlay cards, lower thirds, data callouts, quote cards, and packaging plans for existing videos."
---

# graphic-overlays

## Purpose

Design timed graphic overlay cards, lower thirds, data callouts, quote cards, and packaging plans for existing videos.

## Use When

- The user asks to add overlays, lower thirds, graphic cards, data callouts, title cards, or visual packaging to a video.
- A transcript, timeline, or talking-head/interview video needs on-screen graphics.

## Workflow

1. Inspect available transcript, timeline, brand assets, video dimensions, and target platform.
2. Map overlay moments to timestamps, message purpose, and visual hierarchy.
3. Design overlay card content separately from implementation/rendering.
4. Use available video/render tools only when exposed; otherwise output an edit decision list and overlay specs.
5. Verify generated artifacts with file paths, screenshots, or clear NOT RUN status.

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

Timestamped overlay plan, card copy, visual specs, render status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
