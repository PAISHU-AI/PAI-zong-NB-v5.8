---
name: image-to-video
description: "Turn still-image concepts into image-to-video prompts, motion plans, camera moves, continuity notes, and tool-ready generation specs."
---

# image-to-video

## Purpose

Turn still-image concepts into image-to-video prompts, motion plans, camera moves, continuity notes, and tool-ready generation specs.

## Use When

- The user wants to animate a still image, make an image move, create i2v prompts, or plan image-to-video production.
- The work needs motion, identity preservation, camera, timing, and artifact-control guidance.

## Workflow

1. Identify source image, subject identity constraints, desired motion, duration, aspect ratio, and platform.
2. Define camera movement, subject action, environmental motion, and continuity constraints.
3. Write image-to-video prompts with explicit motion and negative constraints.
4. If an i2v tool is available, use its current instructions; otherwise provide prompt pack and settings checklist.
5. State limitations around identity, hands, text, logos, and temporal consistency.

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

I2V prompt, motion spec, settings checklist, verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
