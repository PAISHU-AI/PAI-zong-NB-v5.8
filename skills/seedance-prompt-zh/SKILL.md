---
name: seedance-prompt-zh
description: "为即梦 Seedance 2.0 多模态AI视频生成模型撰写高质量提示词。当用户需要使用文本、图片、视频、音频等多模态输入创作视频提示词时触发。涵盖@引用语法、运镜复刻、特效模仿、视频延长、视频编辑、音乐卡点、电商广告、短剧创作、科普教育等场景。"
---

# seedance-prompt-zh

## Purpose

为即梦 Seedance 2.0 多模态AI视频生成模型撰写高质量提示词。当用户需要使用文本、图片、视频、音频等多模态输入创作视频提示词时触发。涵盖@引用语法、运镜复刻、特效模仿、视频延长、视频编辑、音乐卡点、电商广告、短剧创作、科普教育等场景。

## Use When

- The user request matches `seedance-prompt-zh`, `seedance prompt zh`, `media` or the skill description.
- 为即梦 Seedance 2.0 多模态AI视频生成模型撰写高质量提示词。当用户需要使用文本、图片、视频、音频等多模态输入创作视频提示词时触发。涵盖@引用语法、运镜复刻、特效模仿、视频延长、视频编辑、音乐卡点、电商广告、短剧创作、科普教育等场景。
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
