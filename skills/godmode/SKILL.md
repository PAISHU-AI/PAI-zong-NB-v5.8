---
name: godmode
description: "Safety-bounded red-team evaluation of LLM refusal behavior, jailbreak resilience, and prompt-injection defenses. Use only for authorized defensive testing, reporting, and mitigation guidance; do not provide deployable bypasses or harmful instructions."
---

# godmode

## Purpose

Safety-bounded red-team evaluation of LLM refusal behavior, jailbreak resilience, and prompt-injection defenses. Use only for authorized defensive testing, reporting, and mitigation guidance; do not provide deployable bypasses or harmful instructions.

## Use When

- The user request matches `godmode`, `red-teaming` or the skill description.
- Safety-bounded red-team evaluation of LLM refusal behavior, jailbreak resilience, and prompt-injection defenses. Use only for authorized defensive testing, reporting, and mitigation guidance; do not provide deployable bypasses or harmful instructions.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Confirm authorization, scope, target ownership, and allowed test depth.
2. Focus on defensive review, safe simulation, policy testing, and remediation.
3. Avoid operational abuse details and refuse unauthorized exploitation.
4. Report findings with severity, evidence, impact, and safe fix guidance.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not provide malware, credential theft, stealth, persistence, evasion, or unauthorized exploitation guidance.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
