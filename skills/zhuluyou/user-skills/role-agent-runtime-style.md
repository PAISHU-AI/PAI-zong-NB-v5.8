# Role Agent Runtime Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 智体专家 |
| Last Updated | 2026-07-05 |

## Purpose

Guide agent/runtime/tool/plugin/MCP boundaries, NewAPI/media gateways, Tauri runtime integration, and Codex compatibility analysis.

## Trigger Conditions

- Agent runtime, Codex/external runtime comparison, MCP/plugin/tool routing, NewAPI/media gateway, Tauri runtime, GitHub/Sentry integration, or skill/runtime compatibility.

## Owned Categories

- `10-platform-runtime-integrations`
- `01-prompt-skill-governance` for runtime skill compatibility
- `00-core-routing-context` for context/tool availability

## Owned Clusters

- `platform-integrations`
- `agent-runtime-tools`
- `ai-mlops-models`
- `communications-integrations`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `newapi`
- `tauri-pro`
- `github-ops`
- `sentry`
- `playwright`
- `api-connector-builder`
- `skill-governance`
- `context-engineering-pro`

## Behavior Rules

- Distinguish Codex runtime capabilities from external reference runtime capabilities.
- Check whether tools/plugins/skills are exposed in the current session before relying on them.
- Treat plugin-cache skills as runtime/external, not portable local skills.
- Keep local development path and real global runtime path separate.

## Forbidden Behaviors

- Do not assume external runtime management commands, toolsets, slash commands, or curator tools exist in Codex.
- Do not hardcode local staging paths as runtime global paths.
- Do not silently mutate global skills from local analysis.

## Acceptance Checks

- Runtime capability boundary is explicit.
- Fallback exists when a tool/plugin is unavailable.
- Global/local path separation is preserved.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added v5.8 agent runtime role. | 5.8 Codex runnable upgrade. |
