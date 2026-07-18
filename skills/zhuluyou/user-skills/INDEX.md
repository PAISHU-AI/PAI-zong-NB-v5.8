# User Skills Index

This directory stores global user routing and behavior rules for Codex v5.8.

User skills are not professional market skills. They decide how Codex routes roles, context, memory, and professional `SKILL.md` usage.

## Core Rules

- This index is global user memory and routing context. It lives under `$CODEX_HOME/skills/zhuluyou/user-skills/`, not inside a project.
- Every turn starts by reading this index, `routing-core.md`, and `communication-style.md`.
- Read only matching user-skills by `Read When`; do not bulk-load every file.
- Use `memory-reliability-style.md` as the single global/project memory gateway.
- Use `memory-stack-style.md` to choose L0-L3 on non-trivial turns.
- Use `skill-router-style.md` before any task that may need professional skills.
- User-skills guide behavior and routing; they do not replace project source, official docs, or professional `SKILL.md`.
- If this index is missing or incomplete, rebuild it only from existing `user-skills/*.md`.

## Always Read

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `routing-core.md` | Active | v5.8 bootstrap, L0-L3, KG0-KG3, role and category routing. | Every turn after this index. |
| `communication-style.md` | Active | User-facing communication style and tone. | Every turn before responding. |

## Memory And Project Context

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `memory-reliability-style.md` | Active | Single gateway for global/project memory root resolution. | When resolving memory, project roots, bootstrap repair, or write destination. |
| `memory-stack-style.md` | Active | L0-L3 read depth and context budget. | Every non-trivial turn. |
| `memory-evidence-style.md` | Active | Evidence, source hash, invalidation, durable project memory rules. | Before durable docs, ADRs, debug reports, roadmap, KG, or evidence writes. |
| `global-memory-capture-style.md` | Active | Global preference capture and final memory status. | Every non-trivial turn before final response; always when user asks to remember. |
| `knowledge-graph-memory-style.md` | Active | KG0-KG3 activation and project graph maintenance. | When relationship lookup, impact analysis, or long-term continuity may apply. |
| `project-memory-style.md` | Active | Project memory docs, `.ai_project.md`, docs index, L0-L3 sync. | Before software project changes or project memory maintenance. |
| `project-agents-style.md` | Active | Project `AGENTS.md` rules-only generation, refresh, and audit. | When creating, refreshing, auditing, or maintaining project `AGENTS.md`. |
| `debug-reuse-style.md` | Active | Known issue and debug report reuse. | Before debugging or after fixing durable/complex bugs. |

## Routing And Governance

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `skill-router-style.md` | Active | v5.8 hot-path professional skill routing. | Before any task that may need professional skills. |
| `intent-matrix.md` | Active | Compact exact-intent table from task intent to role, category, cluster, and default professional skill. | After `skill-router-style.md` for professional tasks; use exact rows before role-local fallback. |
| `role-skill-suggestions.md` | Active | Compact index from selected role to its role-local skill suggestion file. | After the active `role-*.md` when `intent-matrix.md` is not exact or a role must choose among owned clusters. |
| `role-skill-suggestions/<role-file>.md` | Active | Generated role-local cluster/default-skill suggestions. | Read only the file matching the selected lead role; do not bulk-load every role suggestion file. |
| `skill-cluster-index.md` | Active | Compact v5.8 category-to-cluster index generated from the local-pack classification. | Only when role-local suggestions are still too broad. |
| `skill-cluster-details.md` | Active | Cold-path full candidate lists for every skill cluster. | Only when a full candidate pool is genuinely needed. |
| `skill-lifecycle-governance-style.md` | Active | Skill install/delete/archive/restore/update/audit route safety, including mandatory staged install scanning. | Before skill lifecycle or routing changes. |
| `skill-overlap-governance-style.md` | Active | Duplicate/similar skill audit and fusion-by-strengthening rules. | Before skill dedupe, merge, fusion, overlap review, or ambiguous multi-skill selection. |
| `skill-family-boundaries.md` | Active | Cold-path generated high/medium overlap family boundaries. | Only after `skill-overlap-governance-style.md` when a specific family or ambiguous candidate set needs disambiguation. |
| `automation-boundary-style.md` | Active | Persistent write, automation, and high-risk action boundary. | Before file writes, persistent rules, automation, or high-risk commands. |
| `user-profile-growth-style.md` | Active | Durable user preference evolution. | When user states stable preferences, habits, style, or repeated corrections. |

## Persona And Product Context

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `persona-style.md` | Active | Lightweight 女助理 persona. | When tone/persona matters. |
| `emotion-support-style.md` | Active | Handle frustration, fatigue, anxiety, or support requests. | When user emotion signals appear. |
| `product-context-style.md` | Active | User's recurring product/software context. | Before architecture, UI, API, Tauri, backend, DB, or product planning. |
| `ui-taste-style.md` | Active | UI taste, anti-generic design, visual QA expectations. | Before UI design, redesign, frontend screens, or visual QA. |

## Core Roles

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `role-host-style.md` | Active | 主持人 route narrowing, risk gate, final closure. | Before multi-step work, high-risk actions, or final delivery checks. |
| `role-rule-governor-style.md` | Active | Prompt, skills, user-skills, manifests, lifecycle, distribution. | Before modifying prompts, skills, user-skills, install docs, manifests, or bundles. |
| `role-project-assistant-style.md` | Active | `.ai_project.md`, project `AGENTS.md`, docs, ADRs, project memory. | Before/after project file changes, docs changes, or project memory audits. |

## Professional Roles

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `role-architect-style.md` | Active | Architecture, module boundaries, API/data design, ADRs. | Before architecture, refactor, module split, tech selection, or major planning. |
| `role-coder-style.md` | Active | Code/config/test implementation. | Before writing or modifying code/config/tests. |
| `role-debugger-style.md` | Active | Root-cause debugging, verification, debug memory. | Before debugging, fixing failures, regressions, or flaky tests. |
| `role-product-style.md` | Active | Product intent, flows, scope, acceptance criteria. | Before product/feature planning or unclear requirements. |
| `role-design-style.md` | Active | UI/UX, design system, frontend visual quality. | Before UI/design/frontend screen work. |
| `role-security-style.md` | Active | Security, permissions, secrets, threat model. | Before security-sensitive work. |
| `role-automation-style.md` | Active | CI/CD, deploy, release, GitHub/browser automation. | Before deploy/release/automation work. |
| `role-agent-runtime-style.md` | Active | Agent runtime, MCP/plugin/tool, NewAPI/Tauri compatibility. | Before runtime/tool/plugin/NewAPI/Tauri work. |
| `role-media-style.md` | Active | Images, screenshots, slides, visual assets. | Before image/media/screenshot/slide work. |

## Daily-Use Roles

| Skill | Status | Purpose | Read When |
|---|---|---|---|
| `role-information-style.md` | Active | Research, source discovery, citation-aware synthesis. | Before research, external source analysis, or current information tasks. |
| `role-copywriting-style.md` | Active | Copywriting, tone, product text, release notes, social content. | Before writing or rewriting user-facing content. |
| `role-office-style.md` | Active | Documents, spreadsheets, presentations, PDFs, tables. | Before office-style deliverables or file-format work. |

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-04 | Rebuilt index for v5.8 expanded role set and category-first routing. | 5.8 Codex runnable upgrade. |
| 2026-07-04 | Added portable `skill-cluster-index.md` so global skills overlays can route the 306-skill pack without reading local `5.8/` staging files. | v5.8 classification rebuild. |
| 2026-07-05 | Added `role-skill-suggestions.md` as the role-level skill selection layer before full cluster lookup. | v5.8 role-to-skill selection upgrade. |
| 2026-07-05 | Added mandatory staged skill install gate: static scan, antivirus scan, explicit-only default classification, and direct-copy rejection. | Skill install safety hardening. |
| 2026-07-05 | Split role suggestions into a compact index plus role-local files, and moved full cluster membership to cold-path `skill-cluster-details.md`. | v5.8 token reduction pass. |
| 2026-07-05 | Split exact default routes into generated `intent-matrix.md`, keeping `skill-router-style.md` under the hot-path budget. | v5.8 cache and token optimization. |
| 2026-07-05 | Added skill overlap governance and generated family boundaries for the 369-skill local pack. | v5.8 duplicate/fusion audit. |
