---
name: honcho
description: "Configure and use Honcho memory with agent runtime -- cross-session user modeling, multi-profile peer isolation, observation config, dialectic reasoning, session summaries, and context budget enforcement. Use when setting up Honcho, troubleshooting memory, managing profiles with Honcho peers, or tuning observation, recall, and dialectic settings."
---

# honcho

## Purpose

Configure and use Honcho memory with agent runtime -- cross-session user modeling, multi-profile peer isolation, observation config, dialectic reasoning, session summaries, and context budget enforcement. Use when setting up Honcho, troubleshooting memory, managing profiles with Honcho peers, or tuning observation, recall, and dialectic settings.

## Use When

- The user request matches `honcho`, `autonomous-ai-agents` or the skill description.
- Configure and use Honcho memory with agent runtime -- cross-session user modeling, multi-profile peer isolation, observation config, dialectic reasoning, session summaries, and context budget enforcement. Use when setting up Honcho, troubleshooting memory, managing profiles with Honcho peers, or tuning observation, recall, and dialectic settings.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify the agent/runtime boundary, inputs, outputs, persistence, and tool availability.
2. Separate portable workflow knowledge from source-runtime commands, paths, and memory assumptions.
3. Use only currently exposed Codex tools or local files; otherwise produce a design or verification checklist.
4. For writes, installs, external services, credentials, or automation, request explicit confirmation first.
5. Report what was verified and what remains a runtime assumption.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not assume external agent runtimes, hidden memory providers, or source-specific commands exist in Codex.
- Do not auto-install agents, run autonomous loops, or mutate external systems without confirmation.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
