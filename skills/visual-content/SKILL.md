---
name: visual-content
description: "Plan social images, infographics, content visuals, post graphics, image specs, and visual repurposing across channels."
---

# visual-content

## Purpose

Plan social images, infographics, content visuals, post graphics, image specs, and visual repurposing across channels.

## Use When

- The user asks for social post visuals, infographic plans, image specs, visual content calendars, or repurposing written content into visuals.
- The task needs creative direction but may not require actual image generation.

## Workflow

1. Clarify channel, audience, message, source material, brand constraints, dimensions, and output format.
2. Define the visual hierarchy: headline, supporting data, proof, CTA, and layout sections.
3. Write concise on-image text and alt/caption text separately.
4. If image tools are unavailable, provide a production-ready prompt or designer brief.
5. Keep factual visuals source-backed; do not invent numbers or quotes.

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

Visual brief, on-image copy, layout notes, generation/design prompt.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
