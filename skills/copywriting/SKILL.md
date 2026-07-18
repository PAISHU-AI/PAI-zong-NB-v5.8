---
name: copywriting
description: "Write marketing, product, landing-page, homepage, launch, and ad copy with clear audience, offer, proof, and call-to-action structure."
---

# copywriting

## Purpose

Write marketing, product, landing-page, homepage, launch, and ad copy with clear audience, offer, proof, and call-to-action structure.

## Use When

- The user asks for new marketing copy, landing page copy, homepage text, ad copy, naming, slogans, or campaign messaging.
- The task needs audience, positioning, benefits, proof, and conversion-focused structure.

## Workflow

1. Identify audience, product, channel, offer, desired action, tone, and constraints.
2. Separate facts provided by the user from assumptions that need labeling.
3. Draft in a structure suited to the channel: headline, subhead, benefits, proof, objections, CTA.
4. Keep unsupported metrics, guarantees, legal claims, customer names, and awards out unless sourced.
5. Provide variants only when useful for positioning, tone, or testing.

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

Final copy first, then optional variants and assumptions.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
