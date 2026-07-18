# Role Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Source | v5.8 role cluster map + skill cluster index |

## Purpose

Compact index from selected role to its role-local skill suggestion file. This file is read only after `skill-router-style.md` and the active `role-*.md` when the Intent Matrix is not precise enough.

## Use Rules

- Use only the row that matches the lead execution role selected by 主持人.
- Then read the matching `role-skill-suggestions/<role-file>.md` file, not every role file.
- Read `skill-cluster-index.md` only if the role-local suggestion file is still too broad.
- Read `skill-cluster-details.md` only when a full candidate list is required.
- The execution role must still read the selected professional `SKILL.md` before acting.

## Role Files

| Role | Role File | Suggestion File | Owned Clusters |
|---|---|---|---|
| 主持人 | `role-host-style.md` | `role-skill-suggestions/role-host-style.md` | `bootstrap-context`, `method-packs`, `gaming-leisure-explicit` |
| 规则师 | `role-rule-governor-style.md` | `role-skill-suggestions/role-rule-governor-style.md` | `prompt-skill-governance`, `bootstrap-context` |
| 项目助手 | `role-project-assistant-style.md` | `role-skill-suggestions/role-project-assistant-style.md` | `project-memory-docs`, `spec-planning-docs` |
| 产品专家 | `role-product-style.md` | `role-skill-suggestions/role-product-style.md` | `spec-planning-docs`, `architecture-product` |
| 架构师 | `role-architect-style.md` | `role-skill-suggestions/role-architect-style.md` | `architecture-product`, `api-data-db-auth` |
| 编码师 | `role-coder-style.md` | `role-skill-suggestions/role-coder-style.md` | `application-engineering`, `api-data-db-auth`, `frontend-ui-design` |
| 调试师 | `role-debugger-style.md` | `role-skill-suggestions/role-debugger-style.md` | `debugging-testing`, `quality-release-readiness` |
| 设计专家 | `role-design-style.md` | `role-skill-suggestions/role-design-style.md` | `frontend-ui-design`, `control-center-ui`, `figma-design-system`, `ui-style-review` |
| 安全专家 | `role-security-style.md` | `role-skill-suggestions/role-security-style.md` | `security-hardening`, `security-redteam-privacy`, `payments-blockchain-secrets` |
| 自动化专家 | `role-automation-style.md` | `role-skill-suggestions/role-automation-style.md` | `deployment-release`, `automation-orchestration`, `devops-ops` |
| 智体专家 | `role-agent-runtime-style.md` | `role-skill-suggestions/role-agent-runtime-style.md` | `platform-integrations`, `agent-runtime-tools`, `ai-mlops-models`, `communications-integrations` |
| 多媒体专家 | `role-media-style.md` | `role-skill-suggestions/role-media-style.md` | `creative-image-design`, `video-media-production`, `creative-presentation-media` |
| 信息专家 | `role-information-style.md` | `role-skill-suggestions/role-information-style.md` | `information-research`, `finance-business`, `health-bio-research` |
| 文案专家 | `role-copywriting-style.md` | `role-skill-suggestions/role-copywriting-style.md` | `copywriting-content` |
| 办公专家 | `role-office-style.md` | `role-skill-suggestions/role-office-style.md` | `office-productivity`, `commerce-productivity`, `finance-business` |
