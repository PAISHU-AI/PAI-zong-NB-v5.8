---
name: evm
description: "Read-only EVM client: wallets, tokens, gas across 8 chains."
---

# evm

## Purpose

Read-only EVM client: wallets, tokens, gas across 8 chains.

## Use When

- The user request matches `evm`, `blockchain` or the skill description.
- Read-only EVM client: wallets, tokens, gas across 8 chains.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Clarify whether the task is conceptual, local development, contract review, wallet operation, or transaction planning.
2. Never request or expose private keys, seed phrases, or signing secrets.
3. For chain operations, distinguish read-only queries from transactions and require confirmation for any write.
4. Prefer testnet/local simulation and explain gas, slippage, custody, and irreversible-action risks.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not generate instructions for theft, evasion, phishing, draining wallets, or unauthorized access.
- Do not execute or recommend real transactions without explicit user confirmation and risk disclosure.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
