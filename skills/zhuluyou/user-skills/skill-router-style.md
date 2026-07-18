# Skill Router Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 女助理 + 主持人 |

## Purpose

Hot-path professional skill router for Codex v5.8. It chooses the next routing layer; professional workflows stay in selected `SKILL.md` files.

## Trigger Conditions

- Any possible professional task: code, UI, API, DB, security, tests, deploy, prompt/skills, memory, research, writing, office, media, runtime, or tools.

## Hard Chain

```text
routing-core.md
-> skill-router-style.md
-> intent-matrix.md
-> role-*.md
-> role-skill-suggestions.md
-> role-skill-suggestions/<role-file>.md
-> skill-cluster-index.md
-> skill-cluster-details.md
-> skill-family-boundaries.md (only for overlap/ambiguous candidate families)
-> selected SKILL.md
```

Rules:
- 女助理 recommends task type, category, lead role, candidate cluster, and candidate skills only.
- 主持人 narrows to 1 main professional skill and at most 2 supporting skills.
- L2-lite read-only analysis may stop after the exact intent or role-level user-skills when no files, debugging, deployment, installation, or memory writes are involved.
- If `intent-matrix.md` has an exact row, its `Default Skill` is binding for L2/L3 work unless 主持人 records an explicit override or missing-skill fallback.
- If multiple plausible skills are in the same overlap family, apply `skill-overlap-governance-style.md` and the relevant `skill-family-boundaries.md` section before selecting the main skill.
- The lead role must read the default skill's `SKILL.md` before execution for L2/L3 professional-domain work.
- Supporting skills are additive and do not replace the main skill unless 主持人 explicitly says why.
- The global prompt and user-skills never copy professional workflow bodies.

## Mandatory Default Skill Contract

- `intent-matrix.md` default skills are binding for L2/L3 professional-domain work.
- The lead role must read the default skill's `SKILL.md` before execution.
- L2-lite consultation can defer the default professional `SKILL.md` unless it produces a durable technical decision, a code/config change, or a workflow rule change.
- Missing, archived, unsafe, duplicated, or unavailable default skills require an explicit fallback before work continues.
- Overlapping candidate skills require a family-boundary decision before 主持人 narrows to the final main skill.

## Progressive Disclosure

- Read `intent-matrix.md` after this file for exact intent rows.
- If the matrix is not exact, read the active `role-*.md`.
- Read `role-skill-suggestions.md` only to locate the matching `role-skill-suggestions/<role-file>.md`.
- Read only that role-local suggestion file; never bulk-load all role suggestion files.
- Read `skill-cluster-index.md` only when role-local suggestions are still too broad.
- Read `skill-cluster-details.md` only when a full candidate pool is genuinely needed.
- Read `skill-overlap-governance-style.md` and the relevant section of `skill-family-boundaries.md` only when multiple similar skills remain plausible or the user asks about duplicate/merged skills.
- Read selected professional `SKILL.md` before doing professional work.

## Category Entry Map

| Category | Cluster Family |
|---|---|
| `00-core-routing-context` | `bootstrap-context` |
| `01-prompt-skill-governance` | `prompt-skill-governance` |
| `02-project-planning-docs` | `project-memory-docs`, `spec-planning-docs` |
| `03-architecture-product-strategy` | `architecture-product` |
| `04-frontend-ui-design` | `frontend-ui-design`, `figma-design-system`, `ui-style-review`, `control-center-ui` |
| `05-application-engineering` | `application-engineering` |
| `06-data-api-database-auth` | `api-data-db-auth` |
| `07-debugging-quality-testing` | `debugging-testing`, `quality-release-readiness` |
| `08-security-privacy` | `security-hardening`, `security-redteam-privacy`, `payments-blockchain-secrets` |
| `09-devops-release-deploy` | `deployment-release`, `automation-orchestration`, `devops-ops` |
| `10-platform-runtime-integrations` | `platform-integrations`, `agent-runtime-tools`, `ai-mlops-models`, `communications-integrations` |
| `11-creative-media-assets` | `creative-image-design`, `video-media-production`, `creative-presentation-media` |
| `12-experimental-methods` | `method-packs`, `gaming-leisure-explicit` |
| `13-information-content-office` | `information-research`, `copywriting-content`, `office-productivity`, `finance-business`, `health-bio-research`, `commerce-productivity` |

## Ambiguity Rules

- UI implementation, page design, redesign, and user-facing visual work route through UI/design skills.
- Frontend behavior bugs without visual change route to debugging first; add UI only for visual changes.
- Figma work reads `figma-use` first; add `figma-to-code` only when implementation from Figma is needed.
- Design plans, architecture plans, and research summaries do not automatically imply code changes.
- Deployment plans are not permission to deploy, publish, push, or write externally.
- Research/analysis routes do not modify source unless the user asks for implementation.

## High-Risk Gates

Require explicit relevance and 主持人 review before using:

- Deployment, publishing, push, release, or production-change skills.
- Browser automation that changes external state.
- Security scanning, bounty, OSINT, or adversarial workflows.
- Skill installation, deletion, restore, overwrite, or distribution.
- Migration/deprecation changes.
- Project `AGENTS.md` write operations.
- Secrets, permissions, accounts, payments, transactions, messages, or external writes.

## Missing Tool Fallbacks

- Information: if web/source tools are unavailable, use provided/local context and state the limit.
- Office: without document/sheet/deck/PDF runtime skills, output Markdown, CSV, slide outline, or structured summary.
- Media: without generation/screenshot tools, provide prompts/specs or manual checks.
- Plugin: if a plugin skill is not exposed, do not claim use; choose a local fallback.

## Forbidden Behaviors

- Do not call UI skills for non-UI tasks.
- Do not call deployment skills unless the user requests deploy/hosting/publish/setup.
- Do not call `gsap-react` for static UI work.
- Do not use user-skills as professional skills.
- Do not route to plugin-cache skills unless the runtime exposes them in the current session.
- Do not copy external runtime semantics into Codex routing.
- Do not eagerly read unrelated professional skill bodies just because a task is broad.

## Acceptance Checks

- Selected category matches the user intent.
- `intent-matrix.md` was checked for exact default skill matches.
- `skill-family-boundaries.md` was used when overlapping skills remained ambiguous.
- Selected role owns the category or 主持人 recorded a supporting role reason.
- Missing skills/tools are reported with fallback.
- High-risk skill use is gated.
- Route changes pass `node scripts/verify-skill-routes.mjs` and v5.8 runtime validation.

## Change Log

| Change | Evidence |
|---|---|
| Split full intent table into `intent-matrix.md`; kept this file compact. | v5.8 token/cache optimization. |
