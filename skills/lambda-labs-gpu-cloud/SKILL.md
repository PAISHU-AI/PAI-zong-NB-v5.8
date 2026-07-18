---
name: lambda-labs-gpu-cloud
description: "Reserved and on-demand GPU cloud instances for ML training and inference. Use when you need dedicated GPU instances with simple SSH access, persistent filesystems, or high-performance multi-node clusters for large-scale training."
---

# lambda-labs-gpu-cloud

## Purpose

Reserved and on-demand GPU cloud instances for ML training and inference. Use when you need dedicated GPU instances with simple SSH access, persistent filesystems, or high-performance multi-node clusters for large-scale training.

## Use When

- The user request matches `lambda-labs-gpu-cloud`, `lambda labs gpu cloud`, `mlops` or the skill description.
- Reserved and on-demand GPU cloud instances for ML training and inference. Use when you need dedicated GPU instances with simple SSH access, persistent filesystems, or high-performance multi-node clusters for large-scale training.
- The task benefits from domain-specific workflow, checks, output structure, or safe fallback behavior.

## Workflow

1. Identify model/task, dataset, environment, compute, dependencies, and expected artifact.
2. Prefer local inspection and minimal reproducible commands before expensive training or cloud use.
3. Require confirmation for GPU spend, cloud resources, downloads, uploads, or long-running jobs.
4. Report metrics, checkpoints, configs, and limitations clearly.

## Codex Runtime Rules

- Use only tools, plugins, MCP servers, files, commands, and credentials that are actually available in the current Codex session.
- If an external write, install, publish, deploy, paid action, credential use, account operation, physical-device action, or production action is needed, ask for explicit confirmation first.
- If the required tool is unavailable, return a portable fallback such as Markdown, CSV, prompt pack, implementation plan, config sketch, or verification checklist.
- Do not claim files, media, issues, API calls, payments, deployments, transactions, messages, or integrations were created unless there is concrete local or tool evidence.
- Treat source repository runtime details as historical source context, not active Codex capabilities.

## Avoid

- Do not start paid compute, large downloads, training jobs, or data uploads without confirmation.
- Do not claim model quality without evaluation evidence.

## Output

Return the useful artifact first, then evidence and verification status.

For non-trivial work, include:

```markdown
Result: ...
Evidence: ...
Verification: PASS/FAIL/NOT RUN
Risks / Next Steps: ...
```
