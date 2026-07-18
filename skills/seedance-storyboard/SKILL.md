---
name: seedance-storyboard
description: "Convert ideas into Seedance/Jimeng-style Chinese or bilingual storyboard prompts with scene beats, camera language, motion, and continuity."
---

# seedance-storyboard

## Purpose

Convert ideas into Seedance/Jimeng-style Chinese or bilingual storyboard prompts with scene beats, camera language, motion, and continuity.

## Use When

- The user mentions Seedance, 即梦, 剪映 AI 视频, 分镜, video storyboard, or short-video prompt planning.
- A Chinese video prompt needs scene-by-scene production detail.

## Workflow

1. Clarify target platform, duration, aspect ratio, style, subject, and story goal.
2. Break the idea into numbered shots with duration, camera, action, setting, lighting, and transition.
3. Write each prompt so it can stand alone while preserving continuity.
4. Add negative constraints and consistency notes when identity or product detail matters.
5. If the user needs another model format, translate the storyboard rather than assuming Seedance execution.

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

分镜表, 每镜提示词, 统一风格/负面约束, 使用说明.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
