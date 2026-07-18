---
name: ai-video-generation
description: "Create AI video concepts, prompts, shot plans, motion direction, storyboard beats, and model-agnostic text-to-video or image-to-video prompt packs."
---

# ai-video-generation

## Purpose

Create AI video concepts, prompts, shot plans, motion direction, storyboard beats, and model-agnostic text-to-video or image-to-video prompt packs.

## Use When

- The user asks for AI video generation, text-to-video, image-to-video, scene planning, motion direction, or video prompt packs.
- The task can be completed as a prompt/storyboard/spec even when no video tool is available.

## Workflow

1. Clarify objective, aspect ratio, duration, subject, style, camera, motion, audio, and delivery platform.
2. Choose a route: text-to-video, image-to-video, reference-driven, extension, or storyboard-only.
3. Write prompts with subject, action, camera, environment, lighting, timing, continuity, and negative constraints.
4. If a video generation tool is exposed, follow its specific skill/tool instructions before calling it.
5. If no tool is available, deliver production-ready prompts and a shot plan without claiming generation.

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

Shot plan, prompts, model/tool notes, verification or NOT RUN status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
