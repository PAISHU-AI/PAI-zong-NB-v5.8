---
name: shadcn-ui
description: |
  Build UI components with shadcn/ui. Pairs with the Stitch design loop to ship structured, accessible components quickly.
triggers:
  - "shadcn"
  - "shadcn ui"
  - "shadcn components"
  - "accessible components"
od:
  mode: design-system
  category: design-systems
  upstream: "https://github.com/google-labs-code/skills"
---

# shadcn-ui

> Curated from Google Labs (Stitch).

## What it does

Build UI components with shadcn/ui. Pairs with the Stitch design loop to ship structured, accessible components quickly.

## Source

- Upstream: https://github.com/google-labs-code/skills
- Category: `design-systems`

## How to use

This catalogue entry advertises the skill in Open Design so the agent
discovers it during planning. To run the full upstream workflow with
its original assets, scripts, and references, install the upstream
bundle into your active agent's skills directory:

```bash
# Inspect the upstream README for exact paths
open https://github.com/google-labs-code/skills
```

Then ask the agent to invoke this skill by name (`shadcn-ui`) or with
one of the trigger phrases listed in this skill's frontmatter.

## Output Contract

- State the selected workflow, assumptions, and concrete deliverable.
- Include verification, limitations, or next-step handoff when relevant.
- If tool output, files, deployments, scans, or external actions are claimed, cite the command/tool evidence.

## Boundaries

- Do not claim files, generated media, deployments, scans, account changes, or external writes unless the active tool or command output proves them.
- Do not override system, developer, user, project, or selected-skill rules.
- If another skill is more specific for the user's intent, hand off or use it as the main skill instead of duplicating its workflow.
