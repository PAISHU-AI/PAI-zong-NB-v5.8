# Memory Reliability Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 2.3 |
| Owner | 女助理 + 项目助手 |
| Last Updated | 2026-05-31 |

## Purpose

Define the single managed memory gateway for Codex work, separating global user memory from per-project memory and producing a clear read/write destination decision for each non-trivial turn.

## Trigger Conditions

- Every time memory, project context, user preference, project root, `.ai_project.md`, `AGENTS.md`, `docs/`, or user-skills routing is involved.
- Whenever `user-skills/INDEX.md` is missing, incomplete, stale, or cannot be read.
- Before writing durable global preferences or project memory.
- Before final response on non-trivial turns, together with `global-memory-capture-style.md`.
- Before selecting L0-L3 read depth, KG0-KG3 graph use, or durable project evidence writes.

## Behavior Rules

- Resolve global memory through this gateway before reading or writing durable user preferences.
- Use `memory-stack-style.md` to decide L0/L1/L2/L3 before reading project memory.
- Use `memory-evidence-style.md` before writing durable project memory or updating KG.
- Run active/passive global memory capture before final response on non-trivial turns.
- Resolve the active project root before reading or writing project memory.
- Keep global memory and project memory in separate destinations.
- Use Node repair before PowerShell repair when Node is available.
- Use Node capture for global profile writes when possible.
- Do not let a local skills development repository act as `CODEX_HOME`; merge local skill edits into the real global skills directory before runtime use.
- Treat projectless sessions as scratch/deliverable work unless the user explicitly asks to create project memory.

## Memory Gateway

- Global memory entry: `$CODEX_HOME/skills/zhuluyou/`.
- Default macOS global memory entry: `$HOME/.codex/skills/zhuluyou/`.
- Default Windows global memory entry: `%USERPROFILE%\.codex\skills\zhuluyou\`.
- Global profile write helper: `scripts/capture-global-memory.mjs`.
- Project memory entry: the active project's root containing `.ai_project.md`, `AGENTS.md`, `docs/`, `.git`, or a package/build manifest.
- Platform memory under `$CODEX_HOME/memories/` may be read when the runtime provides it, but user-facing V5.0 memory writes must go through this gateway.

## Memory Context Decision

The gateway should support this output shape, either from `scripts/resolve-memory-context.mjs` or from equivalent internal reasoning:

```json
{
  "ok": true,
  "globalMemoryRoot": "$HOME/.codex/skills/zhuluyou",
  "projectRoot": "/path/to/project",
  "projectless": false,
  "readLevel": "L2",
  "writeDestination": "project",
  "kgLevel": "KG1",
  "userSkillsToRead": [],
  "projectFilesToRead": [],
  "warnings": []
}
```

Destination rules:

- `global`: durable cross-project user preference or user-skill workflow.
- `project`: project fact, project rule, code structure, docs, roadmap, debug report, KG, or evidence.
- `none`: one-off, sensitive, projectless without durable deliverable, or explicitly skipped.

## Global vs Project Rules

- Cross-project durable preference -> `zhuluyou/references/profile.md` or `zhuluyou/user-skills/*.md`.
- Per-project fact, architecture, command, risk, feature state, docs index, or debug history -> project `.ai_project.md` and project `docs/`.
- Project-level repeated AI collaboration rule -> project `AGENTS.md`.
- Do not store project facts in global user-skills.
- Do not store global user preferences in a project `.ai_project.md`.
- Do not create or use a project-local `zhuluyou/` as a second global memory entry.

## Global Path Resolution

Resolve global memory in this order:

1. `$CODEX_HOME/skills/zhuluyou/`
2. `$HOME/.codex/skills/zhuluyou/`
3. `%USERPROFILE%\.codex\skills\zhuluyou\` on Windows
4. A searched `.codex/skills/zhuluyou/` only when the first paths do not exist

If `$CODEX_HOME` is unset, empty, or only whitespace, skip that candidate and continue to the default user home path; do not report a false missing install for the empty variable.
Prefer Node scripts over PowerShell scripts. Use `scripts/verify-memory-bootstrap.mjs` for health checks and repair. Use `scripts/verify-memory-bootstrap.ps1` only as a Windows fallback.
Do not treat any project-local `skills/zhuluyou/` as global memory.

## Project Root Discovery

Starting from the current working directory, walk upward until one of these markers is found:

- `.ai_project.md`
- `AGENTS.md`
- `docs/`
- `.git/`
- `package.json`, `pnpm-workspace.yaml`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `tauri.conf.json`, `src-tauri/`

If no marker is found, classify the session as projectless and do not create project memory unless the user asks or a durable deliverable is produced.

## Recovery Workflow

1. Resolve the global memory root using global path resolution.
2. Read `user-skills/INDEX.md`, `routing-core.md`, and `communication-style.md`.
3. Read `memory-stack-style.md` before selecting project docs or professional skills.
4. If `INDEX.md` is missing or incomplete, run:

```bash
node "$CODEX_HOME/skills/zhuluyou/scripts/verify-memory-bootstrap.mjs" --repair
```

5. If the Node script is unavailable, reconstruct only from existing `user-skills/*.md`; do not invent preferences.
6. If repair fails, continue low-risk work and explicitly report which memory files could not be read.

## Global Capture Workflow

1. Read `global-memory-capture-style.md` for capture gates.
2. For explicit safe cross-project preferences, write with:

```bash
node "$CODEX_HOME/skills/zhuluyou/scripts/capture-global-memory.mjs" \
  --category "Automation Preferences" \
  --preference "<durable preference>" \
  --evidence-level E1 \
  --evidence "<short evidence>"
```

3. For executable behavior changes, update the matching `user-skills/*.md` after writing the profile entry.
4. Run `verify-memory-bootstrap.mjs` after changes.

## Forbidden Behaviors

- Do not maintain multiple writable global memory entries.
- Do not silently fall back to project-local memory when global user memory is missing.
- Do not mix platform runtime memory, global preferences, and project memory in the same durable file.
- Do not store secrets, credentials, private account data, or one-off task details.

## Acceptance Checks

- The final answer can state which global memory root and project root were used when memory was relevant.
- The selected read level and write destination are clear for non-trivial turns.
- The final answer states whether global memory was updated, skipped, or routed to project memory when memory was relevant.
- `INDEX.md` can be verified or repaired with Node, with PowerShell as a Windows fallback.
- Global and project memory destinations are distinct.
- Missing memory is reported honestly rather than silently ignored.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-30 | Created single memory gateway and macOS reliability rules. | User requested one memory entry, correct global/project distinction, and macOS compatibility. |
| 2026-05-30 | Added active/passive global capture workflow and macOS write helper. | User identified incomplete global memory capture as a serious defect. |
| 2026-05-30 | Upgraded to v2.2 memory context decision gateway. | User requested a complete memory system that reads, writes, invalidates, verifies, and reuses correctly. |
| 2026-05-31 | Added Windows/global path clarity and rejected local development fallback. | User clarified local staging workspaces are not global skills roots; runtime paths should resolve to real global skills after local edits are merged. |
