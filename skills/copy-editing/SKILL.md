---
name: copy-editing
description: "Edit, proofread, tighten, refresh, or critique existing copy while preserving facts, intent, and required tone."
---

# copy-editing

## Purpose

Edit, proofread, tighten, refresh, or critique existing copy while preserving facts, intent, and required tone.

## Use When

- The user supplies existing copy and asks to polish, shorten, improve, proofread, refresh, or review it.
- The work is an edit rather than writing new copy from scratch.

## Workflow

1. Identify the target audience, channel, tone, and edit depth.
2. Preserve factual claims unless the user asks for strategic rewriting.
3. Improve clarity, specificity, hierarchy, rhythm, and CTA strength.
4. Remove fluff, unsupported claims, repetition, mixed metaphors, and unclear pronouns.
5. When helpful, show a short issue list after the revised copy.

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

Revised copy, optional change notes, unresolved factual questions.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
