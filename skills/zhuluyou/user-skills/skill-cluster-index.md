# Skill Cluster Index

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Source | 5.8 classification staging output |

## Purpose

Provide the portable v5.8 compact route layer from professional intent categories to callable skill clusters. This file lives inside `skills/zhuluyou/user-skills/` so it can be copied with the global skills pack without requiring the local `5.8/` staging folder.

## Use Rules

- Read this compact index after `role-skill-suggestions/<role-file>.md` only when the role-level suggestion is not precise enough.
- Use the cluster `Default Skill` unless the user names a more specific skill or the request clearly matches a specialized candidate.
- Read `skill-cluster-details.md` only when a full candidate list is required.
- Skills marked by a gated cluster or high-risk gate require host review before external writes, deployment, payment, credential, browser automation, active security testing, or account actions.
- `explicit-skill-only` clusters should not auto-route from vague requests. Use them only when the user names the exact domain or skill.
- This index is a routing aid only. The execution role must still read the selected professional `SKILL.md` before acting.

## Cluster Table

| Cluster | Category | Lead Role | Default Skill | Selection | Skills |
|---|---|---|---|---|---|
| `bootstrap-context` | `00-core-routing-context` | host | `router` | default-first | 11 |
| `prompt-skill-governance` | `01-prompt-skill-governance` | rule-governor | `skill-governance` | default-first | 12 |
| `project-memory-docs` | `02-project-planning-docs` | project-assistant | `project-assistant` | default-first | 9 |
| `spec-planning-docs` | `02-project-planning-docs` | project-assistant-product | `spec-driven-development-pro` | default-first | 6 |
| `architecture-product` | `03-architecture-product-strategy` | architect-product | `architecture-review-pro` | default-first | 6 |
| `frontend-ui-design` | `04-frontend-ui-design` | design-coder | `frontend-design-pro` | default-first | 6 |
| `control-center-ui` | `04-frontend-ui-design` | design-coder | `control-center-ui-design` | default-first | 4 |
| `figma-design-system` | `04-frontend-ui-design` | design-coder | `figma-use` | default-first | 10 |
| `ui-style-review` | `04-frontend-ui-design` | design-coder | `design-review-pro` | default-first | 15 |
| `application-engineering` | `05-application-engineering` | coder | `incremental-implementation-pro` | default-first | 16 |
| `api-data-db-auth` | `06-data-api-database-auth` | coder-architect | `api-client` | default-first | 9 |
| `debugging-testing` | `07-debugging-quality-testing` | debugger-qa | `diagnose-pro` | default-first | 10 |
| `quality-release-readiness` | `07-debugging-quality-testing` | debugger-qa | `production-readiness-pro` | default-first | 8 |
| `security-hardening` | `08-security-privacy` | security | `security-review-pro` | default-first | 7 |
| `security-redteam-privacy` | `08-security-privacy` | security | `security-bounty-hunter` | gated-default | 6 |
| `payments-blockchain-secrets` | `08-security-privacy` | security | `security-review-pro` | gated-default | 7 |
| `deployment-release` | `09-devops-release-deploy` | automation-devops | `deployment-patterns` | gated-default | 10 |
| `automation-orchestration` | `09-devops-release-deploy` | automation-devops | `ci-cd-and-automation` | gated-default | 9 |
| `devops-ops` | `09-devops-release-deploy` | automation-devops | `devops` | default-first | 1 |
| `platform-integrations` | `10-platform-runtime-integrations` | agent-runtime-automation | `tauri-pro` | default-first | 11 |
| `agent-runtime-tools` | `10-platform-runtime-integrations` | agent-runtime-automation | `agent-router-lite` | default-first | 22 |
| `ai-mlops-models` | `10-platform-runtime-integrations` | agent-runtime-automation | `llm-training` | default-first | 29 |
| `communications-integrations` | `10-platform-runtime-integrations` | agent-runtime-automation | `agentmail` | gated-default | 2 |
| `creative-image-design` | `11-creative-media-assets` | media-design | `imagegen` | default-first | 29 |
| `video-media-production` | `11-creative-media-assets` | media-design | `ai-video-generation` | default-first | 20 |
| `creative-presentation-media` | `11-creative-media-assets` | media-design | `frontend-slides` | default-first | 1 |
| `method-packs` | `12-experimental-methods` | host-rule-governor | `superpowers-writing-plans` | optional-default | 10 |
| `gaming-leisure-explicit` | `12-experimental-methods` | host-rule-governor | explicit only | explicit-skill-only | 2 |
| `information-research` | `13-information-content-office` | information | `information-research` | default-first | 13 |
| `copywriting-content` | `13-information-content-office` | copywriting | `copywriting-content` | default-first | 27 |
| `office-productivity` | `13-information-content-office` | office | `office-productivity` | default-first | 14 |
| `finance-business` | `13-information-content-office` | information-office | `3-statement-model` | gated-default | 13 |
| `health-bio-research` | `13-information-content-office` | information | `bioinformatics` | gated-default | 4 |
| `commerce-productivity` | `13-information-content-office` | office | `shopify` | gated-default | 12 |
