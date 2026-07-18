# Memory Stack Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.0 |
| Owner | 女助理 + 主持人 |
| Last Updated | 2026-05-30 |

## Purpose

Define the L0-L3 memory read stack for Codex so every turn can load the smallest useful memory context instead of preloading global user-skills, project docs, knowledge graph, or professional skills.

## Trigger Conditions

- Every non-trivial turn after `routing-core.md`.
- Before project context reads, project memory writes, knowledge graph use, debugging, architecture, prompt/skill governance, or long-running implementation.
- Whenever context is stale, missing, too large, or likely to contaminate global and project memory.

## Stack Levels

| Level | Meaning | Read By Default | Use When |
|---|---|---|---|
| L0 | Turn bootstrap | `INDEX.md`, `routing-core.md`, `communication-style.md`, minimal profile facts. | Simple answers, projectless consultation, one-off shell checks. |
| L1 | Project entry | L0 plus `.ai_project.md`, `AGENTS.md`, `docs/INDEX.md`, `docs/project-structure.md`, memory summary when present. | Resuming a project, small project edits, planning with known context. |
| L2-lite | Read-only scoped analysis | L0 plus necessary project entry files and the few matching user-skills; selected professional `SKILL.md` is optional. | Analysis, consultation, or evaluation that does not edit files, debug failures, deploy, install, or write memory. |
| L2 | Scoped task memory | L1 plus matching user-skills, task docs, selected professional `SKILL.md`, and KG index if relevant. | Normal code/docs/UI/API/debug/prompt work. |
| L3 | Deep evidence retrieval | L2 plus source search, debug reports, graph evidence, raw docs, tests, logs, and source hashes. | Complex debugging, architecture, migration, security, cross-layer impact, stale/conflicting memory. |

## Behavior Rules

- 女助理 recommends a stack level; 主持人 may downgrade or upgrade based on risk, budget, and task scope.
- Never read all user-skills, docs, or professional skills by default.
- Prefer L0/L1 for simple consultation and projectless work.
- Use L2-lite for read-only project analysis when the answer does not create durable project state.
- Use L2 for normal implementation or durable project updates.
- Use L3 only when correctness depends on deeper evidence or relationship traversal.
- When memory is missing, report the missing layer and continue with the next reliable layer.
- When context becomes too large, summarize project memory with `summarize-project-memory.mjs` before reading raw details.

## Read Decision Output

Use this shape for script output and final internal routing:

```json
{
  "readLevel": "L2",
  "globalMemoryRoot": "$HOME/.codex/skills/zhuluyou",
  "projectRoot": "/path/to/project",
  "projectless": false,
  "userSkillsToRead": [],
  "projectFilesToRead": [],
  "kgLevel": "KG1",
  "warnings": []
}
```

## Forbidden Behaviors

- Do not use L3 as the default.
- Do not hide missing memory files.
- Do not load professional `SKILL.md` bodies before role selection.
- Do not use a project memory layer when no project root is detected unless the user explicitly asks to initialize one.

## Acceptance Checks

- A stack level was selected for non-trivial work.
- The selected level is the smallest level that can answer safely.
- Missing memory is explicit, not silently ignored.
- Final delivery reports project memory sync and global memory status when relevant.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-30 | Created v2.2 memory stack rules. | User requested a complete closed-loop memory system with correct read and write behavior. |
