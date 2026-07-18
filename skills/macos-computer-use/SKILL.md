---
name: macos-computer-use
description: "Codex-adapted macos computer use workflow for apple tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability."
---

# macos-computer-use

## Purpose

Codex-adapted macos computer use workflow for apple tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability.

## Use When

- The user request matches `macos-computer-use`, `macos computer use`, `apple` or the skill description.
- Codex-adapted macos computer use workflow for apple tasks. Use when the user request clearly matches this domain and a compact procedural guide improves reliability.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify the Apple/macOS/iOS target, local OS constraints, and available automation tools.
2. Prefer read-only inspection before changing settings, files, or app state.
3. Use platform-specific commands only after confirming they exist in the current environment.
4. Provide fallback steps when the current machine is not the target platform.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not claim macOS-only actions were performed on non-macOS systems.
- Do not change system settings, privacy permissions, or account state without confirmation.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
