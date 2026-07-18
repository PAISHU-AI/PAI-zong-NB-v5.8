---
name: find-skills
description: "Helps users discover and install agent skills when they ask questions like 'how do I do X', 'find a skill for X', 'is there a skill that can...', or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill."
---

# find-skills

## Purpose

Helps users discover and install agent skills when they ask questions like 'how do I do X', 'find a skill for X', 'is there a skill that can...', or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.

## Use When

- The user request matches `find-skills`, `find skills`, `skill-creator` or the skill description.
- Helps users discover and install agent skills when they ask questions like 'how do I do X', 'find a skill for X', 'is there a skill that can...', or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify the repeated task, trigger terms, required context, workflow, checks, and output contract.
2. Keep the skill concise and procedural.
3. Avoid overlap with existing skills unless this skill has a distinct trigger and workflow.
4. Add source and maintenance notes when adapting external material.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not create broad vague skills or duplicate existing ones without a route distinction.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
