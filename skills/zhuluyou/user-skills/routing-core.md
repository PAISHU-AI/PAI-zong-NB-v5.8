# Routing Core

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 女助理 |
| Last Updated | 2026-07-05 |

## Purpose

Define the per-turn Codex v5.8 bootstrap route: read minimal user-skills, choose memory depth, choose KG level, choose lead role, then use category-first professional skill routing only when needed.

## Trigger Conditions

- Read every turn after `INDEX.md`.
- Use before selecting roles, professional skills, project memory files, global preference files, or external tools.

## Global User-Skills Location

`user-skills` is global user memory and routing context. It is not project-local.

Canonical root:

```text
$CODEX_HOME/skills/zhuluyou/
```

Default Windows root:

```text
%USERPROFILE%\.codex\skills\zhuluyou\
```

Default macOS/Linux root:

```text
$HOME/.codex/skills/zhuluyou/
```

Resolve in this order:

1. `$CODEX_HOME/skills/zhuluyou/`
2. `$HOME/.codex/skills/zhuluyou/`
3. `%USERPROFILE%\.codex\skills\zhuluyou\`
4. A currently accessible `.codex/skills/zhuluyou/` only when the real global paths are unavailable

If `$CODEX_HOME` is unset, empty, or only whitespace, skip the first path without reporting a missing install.
Do not use a local skills development repository as `CODEX_HOME`. Local edits become runtime rules only after merging into the real global Codex skills directory and restarting Codex.

## Read Failure Recovery

If `user-skills/INDEX.md` is missing or incomplete:

1. Try the global paths above.
2. Read existing `routing-core.md`, `communication-style.md`, `memory-reliability-style.md`, and `references/profile.md` directly when present.
3. Run `node scripts/verify-memory-bootstrap.mjs --repair` from the resolved `zhuluyou` root when available.
4. On Windows, `scripts/verify-memory-bootstrap.ps1 -Repair` may be used as fallback.
5. Rebuild only from existing files; never invent preferences.

## Behavior Rules

- Always read `communication-style.md`.
- Read `persona-style.md` unless the turn is purely mechanical and short.
- Read `memory-reliability-style.md` when memory, project root discovery, write destination, or bootstrap repair is involved.
- Read `memory-stack-style.md` on every non-trivial turn to choose L0-L3.
- Read `global-memory-capture-style.md` only when the user asks to remember, forget, set a default, correct future behavior, or when the turn produced a concrete cross-project global-memory candidate. Do not read it for ordinary project-local work with no global memory candidate.
- Read `memory-evidence-style.md` before durable project memory, ADRs, debug reports, roadmap changes, evidence records, invalidations, or KG updates.
- Read `knowledge-graph-memory-style.md` when project work may need relationship lookup, impact analysis, cross-layer continuity, or long-term continuity.
- Read `skill-router-style.md` before any task that may need professional skills. It is the v5.8 hot-path category router.
- Read `intent-matrix.md` after `skill-router-style.md` for exact intent-to-default-skill rows.
- Read the active role file only after 主持人 accepts or narrows the route.
- Read `role-skill-suggestions.md` after the active role file when `intent-matrix.md` is not exact, when the request targets a specialized cluster, or when multiple skills in the owned cluster could apply.
- Then read only the matching `role-skill-suggestions/<role-file>.md`; do not read every role suggestion file.
- Read `skill-cluster-index.md` only when role-level suggestions are still too broad.
- Read `skill-cluster-details.md` only when the full candidate pool is genuinely needed.
- Read `skill-overlap-governance-style.md` and the relevant `skill-family-boundaries.md` section only for duplicate/merge/fusion work or when multiple similar professional skills remain plausible.
- Do not load professional `SKILL.md` bodies during 女助理 routing.

## Memory Stack

| Level | Use When | Minimum Reads |
|---|---|---|
| L0 | Simple consultation, one-off answer, no durable project effect. | `INDEX.md`, `routing-core.md`, `communication-style.md` |
| L1 | Project context recovery or small project work. | L0 + `.ai_project.md`, `docs/INDEX.md`, `docs/project-structure.md` when present |
| L2-lite | Read-only analysis with project relevance but no source changes, debugging, deploy, install, or memory writes. | L0 + necessary project entry files + only the matching user-skills. Professional `SKILL.md` is optional unless the result makes a durable technical decision. |
| L2 | Code/docs/prompt/skills/UI/API/DB/deploy work. | L1 + task docs, relevant user-skills, selected professional skills |
| L3 | Debugging, architecture, security, migrations, cross-layer impact, durable evidence. | L2 + source search, tests, logs, ADRs, evidence, KG as needed |

## KG Gate

| Level | Meaning |
|---|---|
| KG0 | Skip; default for simple or one-off tasks. |
| KG1 | Read existing project graph for impact or relationship lookup. |
| KG2 | Initialize project graph when a long-lived project lacks it and user/project rules permit. |
| KG3 | Update graph with evidence after meaningful relationship changes. |

## v5.8 Role Set

Core roles:
- 女助理
- 主持人
- 规则师
- 项目助手

Professional roles:
- 架构师
- 编码师
- 调试师
- 产品专家
- 设计专家
- 安全专家
- 自动化专家
- 智体专家
- 多媒体专家

Daily-use roles:
- 信息专家
- 文案专家
- 办公专家

## Routing Output

女助理 internally prepares:

```text
Task type:
User-skills to read:
Memory stack level:
KG level:
Lead role:
Supporting roles:
Primary category:
Candidate professional skills:
Candidate clusters:
Role skill suggestions needed:
Project memory to read:
Risk/clarification:
Fallback if missing skill/tool:
```

主持人 accepts, narrows, or corrects the route before execution.

## Required Role Reads

- Prompt, skills, user-skills, lifecycle, distribution: `role-rule-governor-style.md`, `skill-lifecycle-governance-style.md`.
- Project files, docs, memory, project `AGENTS.md`: `role-project-assistant-style.md`, `project-memory-style.md`; add `project-agents-style.md` for project `AGENTS.md`.
- Architecture/product/API/module decisions: `role-architect-style.md`; add `role-product-style.md` for product scope.
- Code/config/tests: `role-coder-style.md`.
- Bugs/failures/regressions: `role-debugger-style.md`, `debug-reuse-style.md`.
- UI/design/visual QA: `role-design-style.md`, `ui-taste-style.md`.
- Security/secrets/permissions: `role-security-style.md`.
- Deploy/release/automation: `role-automation-style.md`, `automation-boundary-style.md`.
- Runtime/tool/MCP/plugin/NewAPI/Tauri: `role-agent-runtime-style.md`.
- Research/source synthesis: `role-information-style.md`.
- Copy/content: `role-copywriting-style.md`.
- Documents/spreadsheets/presentations/PDFs: `role-office-style.md`.
- Images/slides/screenshots/assets: `role-media-style.md`.

## Forbidden Behaviors

- Do not read every user-skill by default.
- Do not let user preferences override explicit user instructions, project rules, facts, or safety.
- Do not treat project-local `zhuluyou` as global memory.
- Do not use user-skills as a replacement for professional `SKILL.md`.
- Do not assume plugin-cache skills are portable local skills.
- Do not silently use base-model behavior when v5.8 marks a missing skill/tool gap; state the fallback.

## Acceptance Checks

- Minimum user-skills were read.
- L0-L3 and KG0-KG3 were selected for non-trivial work.
- Global and project memory destinations stayed separate.
- `skill-router-style.md` was used before professional-skill selection.
- `intent-matrix.md` was checked for exact default skill rows when professional skills may be needed.
- Active role file was read before execution.
- Missing skill/tool fallback was explicit.
- Role-owned clusters and the matching role-local skill suggestion file were used before broad cluster lookup when professional routing was ambiguous.
- Overlap family boundaries were checked when similar skills remained plausible.
- Final response reports verification and memory/KG status when relevant.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-04 | Upgraded routing core to v5.8 category-first routing and expanded role set. | 5.8 Codex runnable upgrade. |
| 2026-07-05 | Added role-skill suggestions and owned-cluster routing step before broad cluster lookup. | v5.8 role-to-skill selection upgrade. |
| 2026-07-05 | Reduced routing token use by switching from all-role suggestion reads to role-local suggestion files and cold-path cluster details. | v5.8 routing token optimization. |
| 2026-07-05 | Split exact default routes into `intent-matrix.md` so `skill-router-style.md` remains a compact hot-path file. | v5.8 cache and token optimization. |
| 2026-07-05 | Added cold-path skill overlap governance for duplicate/fusion audits and ambiguous similar skills. | 369-skill local-pack optimization. |
