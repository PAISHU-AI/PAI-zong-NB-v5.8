# 智体专家 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-agent-runtime-style.md` |

## Purpose

Role-local bridge from owned clusters to the best professional skill. This file is read only for the selected lead role.

## Use Rules

- Prefer the row's default skill unless the user names a more specific skill or the request clearly matches a listed candidate.
- If a row is gated, 主持人 must confirm scope before external writes, deployment, payments, credentials, active security testing, browser automation, or account operations.
- This file is not a professional workflow. The execution role must still read the selected `SKILL.md` before acting.
- For full candidate lists, read `skill-cluster-details.md`; do not load unrelated professional skill bodies.

## Suggestions

| Intent / Cluster | Default Skill | Use Mainly For | Selection | Notable Candidates |
|---|---|---|---|---|
| `platform-integrations` | `tauri-pro` | Tauri, NewAPI, GitHub, Sentry, Playwright, desktop automation, Windows/macOS runtime integrations. | default-first | `tauri-pro`, `agent-memory-system-evaluation`, `electron-desktop-runtime-setup`, `macos-computer-use`, `github-ops`, `newapi`, `playwright`, `playwright-interactive` |
| `agent-runtime-tools` | `agent-router-lite` | Agent runtime, MCP, gateway, sub-agent/tool runtimes, agent-specific implementation and troubleshooting. | default-first | `agent-router-lite`, `agent-gateway-troubleshooting`, `agent-runtime-backend`, `agent-runtime-tauri-pro`, `antigravity-cli`, `blackbox`, `fastmcp`, `grok` |
| `ai-mlops-models` | `llm-training` | Model training, fine-tuning, inference, vector search, embeddings, GPU serving, and ML tooling. | default-first | `llm-training`, `chroma`, `clip`, `distributed-llm-pretraining-torchtitan`, `dspy`, `faiss`, `fine-tuning-with-trl`, `guidance` |
| `communications-integrations` | `agentmail` | Email, phone, SMS, LMS, agent communication channels, and runtime communication integrations. | gated-default | `agentmail`, `telephony` |

