# Skill Family Boundaries

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 规则师 |
| Source | Generated from local-pack overlap audit |

## Purpose

Prevent duplicate or over-similar skills from confusing routing. This file does not delete, shrink, or replace professional skills. It defines how similar skills fuse by boundary, escalation, or handoff.

## Read When

- Installing, importing, merging, archiving, restoring, or auditing skills.
- The user asks whether skills are duplicate or too similar.
- `intent-matrix.md`, role-local suggestions, or `skill-cluster-details.md` leave more than one plausible professional skill.
- A new skill overlaps an existing family in name, trigger, output, platform, or route cluster.

## Fusion Rules

- Do not delete, shrink, or simplify an existing skill as the default fusion action.
- Strengthen by clarifying triggers, output contracts, escalation paths, related skills, and handoff order.
- Keep baseline and `*-pro` skills together: baseline handles quick/common work; `*-pro` handles production, risky, broad, or high-verification work.
- Keep platform/provider-specific skills together when their tool, account, or output format differs.
- If a skill is fully superseded, make it explicit-only or supporting through routing governance before any archive decision.
- The final selected professional skill still requires reading its own `SKILL.md` before L2/L3 work.

## Audit Summary

- Total skills audited: 369
- Duplicate names: 0
- Exact duplicate bodies: 0
- High overlap families: 33
- Medium overlap families: 19
- Direct-edit quality holds: 0

## Direct Edit Holds

These skills need direct quality-contract review but must not be mechanically edited if lifecycle scanning flags reference-heavy packages. Keep them active, use family/cluster routing boundaries, and only edit the skill body after staged safety review.

| Skill | Cluster | Missing | Action |
|---|---|---|---|

## Family Index

| Family | Severity | Clusters | Skills | Fusion |
|---|---|---|---|---|
| family-5b2ae5bea1 | high | `api-data-db-auth` | `database`, `database-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-bb24ede919 | high | `ui-style-review` | `ui-polish`, `ui-polish-pro`, `ui-taste-pro`, `ui-ux-pro-max` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-639b881efa | high | `spec-planning-docs` | `spec-driven-development`, `spec-driven-development-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-0ce7b57973 | high | `bootstrap-context` | `source-driven-development`, `source-driven-development-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-48a67fae52 | high | `agent-runtime-tools`, `platform-integrations` | `agent-runtime-api-design`, `agent-runtime-backend`, `agent-runtime-code-review`, `agent-runtime-database`, `agent-runtime-frontend`, `agent-runtime-tauri-pro`, `agent-runtime-testing`, `tauri`, `tauri-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-4288c33ebc | high | `application-engineering` | `incremental-implementation`, `incremental-implementation-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-5f9b3e2c72 | high | `ui-style-review` | `high-end-visual-design`, `soft-skill` | Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting. |
| family-c66d0a9be3 | high | `control-center-ui`, `frontend-ui-design`, `ui-style-review` | `agent-control-center-design`, `anthropic-frontend-design`, `api-driven-control-center-ui`, `commercial-control-center-ui`, `control-center-ui-design`, `design-review-pro`, `frontend-design-pro`, `stitch-design-taste`, `taste-design-frontend`, `ui-design` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-900af6a8f3 | high | `creative-image-design` | `creative-ideation`, `ideation` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-8d0d2936c6 | high | `prompt-skill-governance` | `find-skills`, `find-skills-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-77e0e05f89 | high | `creative-image-design` | `ecommerce-image-workflow`, `nano-banana-2` | Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs. |
| family-049a38658a | high | `security-redteam-privacy` | `oss-forensics`, `web-pentest` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-367e83719c | high | `health-bio-research` | `drug-discovery`, `fitness-nutrition`, `neuroskill-bci` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-2e5c2cf2ce | high | `video-media-production` | `seedance-prompt`, `seedance-prompt-en`, `seedance-prompt-zh` | Fuse by routing boundary: keep `seedance-prompt` as the complete default, keep language/storyboard variants as supporting skills, and make each file state when to escalate or defer. |
| family-8eef0f7831 | high | `creative-image-design` | `ecommerce-product-photography`, `lifestyle-product-shot-plan`, `product-photography` | Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs. |
| family-ac641ee4e6 | high | `figma-design-system` | `figma-code-connect-components`, `figma-create-design-system-rules`, `figma-generate-design`, `figma-generate-library`, `figma-implement-design`, `figma-to-code`, `figma-use` | Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting. |
| family-ed3fdd4be6 | high | `application-engineering` | `backend`, `senior-backend`, `senior-fullstack` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-12b786c017 | high | `ai-mlops-models` | `fine-tuning-with-trl`, `peft-fine-tuning` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-3a3d4190e1 | high | `deployment-release` | `cloudflare-deploy`, `cloudflare-temporary-deploy`, `netlify-deploy`, `render-deploy`, `vercel-deploy` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-ef837b96f4 | high | `architecture-product` | `api-and-interface-design`, `api-design` | Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting. |
| family-d7470c25e8 | high | `deployment-release` | `deprecation-and-migration`, `migration-deprecation-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-20eb758574 | high | `copywriting-content` | `copywriting`, `copywriting-content`, `ecommerce-copywriting` | Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs. |
| family-12f6b50ca3 | high | `debugging-testing` | `anthropic-webapp-testing`, `webapp-testing-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-4bdafe387c | high | `security-hardening` | `security`, `security-and-hardening`, `security-review-pro`, `security-scan` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-09c692ab36 | high | `creative-image-design` | `imagegen-frontend-mobile`, `imagegen-frontend-web` | Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting. |
| family-3596fee47b | high | `prompt-skill-governance` | `anthropic-skill-creator`, `plugin-creator`, `skill-creator` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-baef63d105 | high | `creative-image-design`, `video-media-production` | `ecommerce-video-marketing`, `ecommerce-video-prompt`, `marketing-image-production`, `marketing-video-production` | Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs. |
| family-178126a565 | high | `platform-integrations` | `playwright`, `playwright-interactive` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-55ca784b32 | high | `quality-release-readiness` | `performance`, `performance-optimization` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-6220300b35 | high | `method-packs` | `superpowers-executing-plans`, `superpowers-writing-plans` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-13b57d1c9f | high | `debugging-testing` | `e2e-testing`, `testing` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-4141bde068 | high | `method-packs` | `superpowers-receiving-code-review`, `superpowers-requesting-code-review` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-76e73918a1 | high | `figma-design-system` | `shadcn`, `shadcn-ui` | Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting. |
| family-902f5a6b63 | medium | `finance-business` | `3-statement-model`, `dcf-model`, `lbo-model`, `merger-model` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-a09d72620a | medium | `automation-orchestration` | `kanban-orchestrator`, `kanban-worker` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-b0126773a9 | medium | `information-research` | `duckduckgo-search`, `searxng-search` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-6b0f833a4c | medium | `quality-release-readiness` | `production-readiness-pro`, `qa-pro`, `ship-pro` | Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow. |
| family-43191bb8df | medium | `ai-mlops-models` | `distributed-llm-pretraining-torchtitan`, `llm-training`, `simpo-training`, `slime-rl-training`, `sparse-autoencoder-training`, `tensorrt-llm` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-87ffef067d | medium | `finance-business` | `excel-author`, `pptx-author` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-ae546c73b9 | medium | `ai-mlops-models` | `pytorch-fsdp`, `pytorch-lightning` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-274e397fad | medium | `project-memory-docs` | `project-assistant`, `project-evolution`, `project-maintenance`, `project-sync-audit` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-36bfb873c6 | medium | `video-media-production` | `ai-video-generation`, `image-to-video`, `video-edit` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-e38ddcf750 | medium | `payments-blockchain-secrets` | `stripe-link-cli`, `stripe-projects` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-1f82aadde2 | medium | `agent-runtime-tools` | `agent-project-context`, `agent-project-memory-lite`, `agent-router-lite` | Fuse by scope: keep `*-lite` for projectless/low-context tasks and point durable or cross-project work to the fuller skill. |
| family-e8c1ee6bc5 | medium | `ai-mlops-models` | `lambda-labs-gpu-cloud`, `modal-serverless-gpu` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-1d442839c0 | medium | `ai-mlops-models` | `huggingface-accelerate`, `huggingface-tokenizers` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-b2647807a8 | medium | `copywriting-content` | `influencer-creator-brief`, `tiktok-shop-affiliate-brief`, `tiktok-shop-content-strategy` | Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs. |
| family-83d545fea9 | medium | `creative-image-design` | `infographic-generation`, `meme-generation` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-b2ef8a082c | medium | `copywriting-content` | `ai-social-media-content`, `social-content-calendar` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-11092503ed | medium | `creative-image-design` | `baoyu-article-illustrator`, `baoyu-comic` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-7f5f4fb1bc | medium | `application-engineering` | `desktop-app`, `web-app` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |
| family-d7ba66fd39 | medium | `copywriting-content` | `abandoned-cart-winback`, `email-sms-lifecycle` | Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills. |

## Detailed Families

### family-5b2ae5bea1

- Severity: high
- Max similarity score: 0.754
- Clusters: `api-data-db-auth`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `database`, `database-pro`
- Strongest evidence:
  - `database` <> `database-pro`: 0.754 (high; shared hints: database, model)

### family-bb24ede919

- Severity: high
- Max similarity score: 0.75
- Clusters: `ui-style-review`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `ui-polish`, `ui-polish-pro`, `ui-taste-pro`, `ui-ux-pro-max`
- Strongest evidence:
  - `ui-polish` <> `ui-polish-pro`: 0.75 (high; shared hints: ui, desktop)
  - `ui-polish-pro` <> `ui-taste-pro`: 0.444 (high; shared hints: frontend, ui, project)
  - `ui-polish-pro` <> `ui-ux-pro-max`: 0.316 (medium; shared hints: ui)
  - `ui-taste-pro` <> `ui-ux-pro-max`: 0.306 (medium; shared hints: ui)

### family-639b881efa

- Severity: high
- Max similarity score: 0.742
- Clusters: `spec-planning-docs`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `spec-driven-development`, `spec-driven-development-pro`
- Strongest evidence:
  - `spec-driven-development` <> `spec-driven-development-pro`: 0.742 (high; shared hints: docs)

### family-0ce7b57973

- Severity: high
- Max similarity score: 0.714
- Clusters: `bootstrap-context`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `source-driven-development`, `source-driven-development-pro`
- Strongest evidence:
  - `source-driven-development` <> `source-driven-development-pro`: 0.714 (high; shared hints: project, docs)

### family-48a67fae52

- Severity: high
- Max similarity score: 0.697
- Clusters: `agent-runtime-tools`, `platform-integrations`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `agent-runtime-api-design`, `agent-runtime-backend`, `agent-runtime-code-review`, `agent-runtime-database`, `agent-runtime-frontend`, `agent-runtime-tauri-pro`, `agent-runtime-testing`, `tauri`, `tauri-pro`
- Strongest evidence:
  - `tauri` <> `tauri-pro`: 0.697 (high; shared hints: frontend, backend, security, tauri, desktop)
  - `agent-runtime-code-review` <> `agent-runtime-testing`: 0.457 (medium; shared hints: project, memory, docs)
  - `agent-runtime-backend` <> `agent-runtime-frontend`: 0.456 (medium; shared hints: project, memory, docs)
  - `agent-runtime-database` <> `agent-runtime-testing`: 0.444 (medium; shared hints: project, memory, docs)
  - `agent-runtime-backend` <> `agent-runtime-testing`: 0.441 (medium; shared hints: project, memory, docs)

### family-4288c33ebc

- Severity: high
- Max similarity score: 0.688
- Clusters: `application-engineering`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `incremental-implementation`, `incremental-implementation-pro`
- Strongest evidence:
  - `incremental-implementation` <> `incremental-implementation-pro`: 0.688 (high; shared hints: ui)

### family-5f9b3e2c72

- Severity: high
- Max similarity score: 0.636
- Clusters: `ui-style-review`
- Fusion: Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting.
- Skills: `high-end-visual-design`, `soft-skill`
- Strongest evidence:
  - `high-end-visual-design` <> `soft-skill`: 0.636 (high; shared hints: ui, ux, image)

### family-c66d0a9be3

- Severity: high
- Max similarity score: 0.605
- Clusters: `control-center-ui`, `frontend-ui-design`, `ui-style-review`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `agent-control-center-design`, `anthropic-frontend-design`, `api-driven-control-center-ui`, `commercial-control-center-ui`, `control-center-ui-design`, `design-review-pro`, `frontend-design-pro`, `stitch-design-taste`, `taste-design-frontend`, `ui-design`
- Strongest evidence:
  - `agent-control-center-design` <> `control-center-ui-design`: 0.605 (high; shared hints: frontend, backend, ui)
  - `commercial-control-center-ui` <> `control-center-ui-design`: 0.565 (high; shared hints: ui)
  - `api-driven-control-center-ui` <> `control-center-ui-design`: 0.493 (high; shared hints: frontend, backend, ui)
  - `stitch-design-taste` <> `taste-design-frontend`: 0.438 (high; shared hints: frontend, ui, project, image)
  - `api-driven-control-center-ui` <> `commercial-control-center-ui`: 0.424 (high; shared hints: ui)

### family-900af6a8f3

- Severity: high
- Max similarity score: 0.604
- Clusters: `creative-image-design`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `creative-ideation`, `ideation`
- Strongest evidence:
  - `creative-ideation` <> `ideation`: 0.604 (high; shared hints: image, video)

### family-8d0d2936c6

- Severity: high
- Max similarity score: 0.59
- Clusters: `prompt-skill-governance`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `find-skills`, `find-skills-pro`
- Strongest evidence:
  - `find-skills` <> `find-skills-pro`: 0.59 (high)

### family-77e0e05f89

- Severity: high
- Max similarity score: 0.534
- Clusters: `creative-image-design`
- Fusion: Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs.
- Skills: `ecommerce-image-workflow`, `nano-banana-2`
- Strongest evidence:
  - `ecommerce-image-workflow` <> `nano-banana-2`: 0.534 (high; shared hints: image, video)

### family-049a38658a

- Severity: high
- Max similarity score: 0.533
- Clusters: `security-redteam-privacy`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `oss-forensics`, `web-pentest`
- Strongest evidence:
  - `oss-forensics` <> `web-pentest`: 0.533 (high; shared hints: security, testing)

### family-367e83719c

- Severity: high
- Max similarity score: 0.521
- Clusters: `health-bio-research`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `drug-discovery`, `fitness-nutrition`, `neuroskill-bci`
- Strongest evidence:
  - `fitness-nutrition` <> `neuroskill-bci`: 0.521 (high; shared hints: research)
  - `drug-discovery` <> `fitness-nutrition`: 0.45 (high; shared hints: research)
  - `drug-discovery` <> `neuroskill-bci`: 0.45 (high; shared hints: research)

### family-2e5c2cf2ce

- Severity: high
- Max similarity score: 0.517
- Clusters: `video-media-production`
- Fusion: Fuse by routing boundary: keep `seedance-prompt` as the complete default, keep language/storyboard variants as supporting skills, and make each file state when to escalate or defer.
- Skills: `seedance-prompt`, `seedance-prompt-en`, `seedance-prompt-zh`
- Strongest evidence:
  - `seedance-prompt` <> `seedance-prompt-zh`: 0.517 (high; shared hints: image, video, seedance)
  - `seedance-prompt` <> `seedance-prompt-en`: 0.503 (high; shared hints: image, video, seedance)
  - `seedance-prompt-en` <> `seedance-prompt-zh`: 0.415 (high; shared hints: image, video, seedance)

### family-8eef0f7831

- Severity: high
- Max similarity score: 0.499
- Clusters: `creative-image-design`
- Fusion: Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs.
- Skills: `ecommerce-product-photography`, `lifestyle-product-shot-plan`, `product-photography`
- Strongest evidence:
  - `ecommerce-product-photography` <> `product-photography`: 0.499 (high; shared hints: image)
  - `ecommerce-product-photography` <> `lifestyle-product-shot-plan`: 0.367 (medium; shared hints: image, ecommerce)
  - `lifestyle-product-shot-plan` <> `product-photography`: 0.288 (low; shared hints: image)

### family-ac641ee4e6

- Severity: high
- Max similarity score: 0.48
- Clusters: `figma-design-system`
- Fusion: Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting.
- Skills: `figma-code-connect-components`, `figma-create-design-system-rules`, `figma-generate-design`, `figma-generate-library`, `figma-implement-design`, `figma-to-code`, `figma-use`
- Strongest evidence:
  - `figma-generate-design` <> `figma-implement-design`: 0.48 (high; shared hints: ui, figma)
  - `figma-generate-library` <> `figma-use`: 0.407 (high; shared hints: figma, docs)
  - `figma-generate-design` <> `figma-use`: 0.403 (high; shared hints: figma, docs)
  - `figma-create-design-system-rules` <> `figma-generate-design`: 0.397 (high; shared hints: ui, figma)
  - `figma-code-connect-components` <> `figma-to-code`: 0.394 (high; shared hints: figma, project)

### family-ed3fdd4be6

- Severity: high
- Max similarity score: 0.46
- Clusters: `application-engineering`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `backend`, `senior-backend`, `senior-fullstack`
- Strongest evidence:
  - `senior-backend` <> `senior-fullstack`: 0.46 (medium; shared hints: frontend, backend, database, security, docker, project, cloud)
  - `backend` <> `senior-backend`: 0.383 (high; shared hints: backend)

### family-12b786c017

- Severity: high
- Max similarity score: 0.454
- Clusters: `ai-mlops-models`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `fine-tuning-with-trl`, `peft-fine-tuning`
- Strongest evidence:
  - `fine-tuning-with-trl` <> `peft-fine-tuning`: 0.454 (high; shared hints: model, training, cloud)

### family-3a3d4190e1

- Severity: high
- Max similarity score: 0.438
- Clusters: `deployment-release`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `cloudflare-deploy`, `cloudflare-temporary-deploy`, `netlify-deploy`, `render-deploy`, `vercel-deploy`
- Strongest evidence:
  - `cloudflare-deploy` <> `cloudflare-temporary-deploy`: 0.438 (high; shared hints: project, browser)
  - `cloudflare-deploy` <> `render-deploy`: 0.413 (medium; shared hints: database, auth, project, image)
  - `cloudflare-deploy` <> `netlify-deploy`: 0.367 (medium; shared hints: auth, project, browser)
  - `netlify-deploy` <> `vercel-deploy`: 0.343 (medium; shared hints: auth, project)
  - `netlify-deploy` <> `render-deploy`: 0.338 (low; shared hints: auth, project)

### family-ef837b96f4

- Severity: high
- Max similarity score: 0.438
- Clusters: `architecture-product`
- Fusion: Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting.
- Skills: `api-and-interface-design`, `api-design`
- Strongest evidence:
  - `api-and-interface-design` <> `api-design`: 0.438 (high)

### family-d7470c25e8

- Severity: high
- Max similarity score: 0.434
- Clusters: `deployment-release`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `deprecation-and-migration`, `migration-deprecation-pro`
- Strongest evidence:
  - `deprecation-and-migration` <> `migration-deprecation-pro`: 0.434 (high)

### family-20eb758574

- Severity: high
- Max similarity score: 0.43
- Clusters: `copywriting-content`
- Fusion: Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs.
- Skills: `copywriting`, `copywriting-content`, `ecommerce-copywriting`
- Strongest evidence:
  - `copywriting` <> `ecommerce-copywriting`: 0.43 (high; shared hints: copywriting)
  - `copywriting` <> `copywriting-content`: 0.388 (high; shared hints: copywriting)
  - `copywriting-content` <> `ecommerce-copywriting`: 0.303 (low; shared hints: copywriting)

### family-12f6b50ca3

- Severity: high
- Max similarity score: 0.43
- Clusters: `debugging-testing`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `anthropic-webapp-testing`, `webapp-testing-pro`
- Strongest evidence:
  - `anthropic-webapp-testing` <> `webapp-testing-pro`: 0.43 (high; shared hints: frontend, ui, testing, browser)

### family-4bdafe387c

- Severity: high
- Max similarity score: 0.419
- Clusters: `security-hardening`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `security`, `security-and-hardening`, `security-review-pro`, `security-scan`
- Strongest evidence:
  - `security` <> `security-review-pro`: 0.419 (high; shared hints: security)
  - `security` <> `security-and-hardening`: 0.376 (high; shared hints: security)
  - `security` <> `security-scan`: 0.363 (high; shared hints: security)
  - `security-and-hardening` <> `security-review-pro`: 0.299 (low; shared hints: database, security)
  - `security-review-pro` <> `security-scan`: 0.298 (low; shared hints: security, project, model)

### family-09c692ab36

- Severity: high
- Max similarity score: 0.419
- Clusters: `creative-image-design`
- Fusion: Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting.
- Skills: `imagegen-frontend-mobile`, `imagegen-frontend-web`
- Strongest evidence:
  - `imagegen-frontend-mobile` <> `imagegen-frontend-web`: 0.419 (high; shared hints: frontend, ui, desktop, image)

### family-3596fee47b

- Severity: high
- Max similarity score: 0.408
- Clusters: `prompt-skill-governance`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `anthropic-skill-creator`, `plugin-creator`, `skill-creator`
- Strongest evidence:
  - `anthropic-skill-creator` <> `skill-creator`: 0.408 (high; shared hints: docs, model)
  - `plugin-creator` <> `skill-creator`: 0.368 (high; shared hints: ui)

### family-baef63d105

- Severity: high
- Max similarity score: 0.407
- Clusters: `creative-image-design`, `video-media-production`
- Fusion: Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs.
- Skills: `ecommerce-video-marketing`, `ecommerce-video-prompt`, `marketing-image-production`, `marketing-video-production`
- Strongest evidence:
  - `ecommerce-video-marketing` <> `marketing-video-production`: 0.407 (high; shared hints: video)
  - `ecommerce-video-marketing` <> `ecommerce-video-prompt`: 0.339 (high; shared hints: video, ecommerce)
  - `marketing-image-production` <> `marketing-video-production`: 0.307 (medium)

### family-178126a565

- Severity: high
- Max similarity score: 0.403
- Clusters: `platform-integrations`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `playwright`, `playwright-interactive`
- Strongest evidence:
  - `playwright` <> `playwright-interactive`: 0.403 (high; shared hints: ui, debug, browser)

### family-55ca784b32

- Severity: high
- Max similarity score: 0.399
- Clusters: `quality-release-readiness`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `performance`, `performance-optimization`
- Strongest evidence:
  - `performance` <> `performance-optimization`: 0.399 (high; shared hints: frontend, backend, database, memory)

### family-6220300b35

- Severity: high
- Max similarity score: 0.392
- Clusters: `method-packs`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `superpowers-executing-plans`, `superpowers-writing-plans`
- Strongest evidence:
  - `superpowers-executing-plans` <> `superpowers-writing-plans`: 0.392 (high; shared hints: project)

### family-13b57d1c9f

- Severity: high
- Max similarity score: 0.366
- Clusters: `debugging-testing`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `e2e-testing`, `testing`
- Strongest evidence:
  - `e2e-testing` <> `testing`: 0.366 (high; shared hints: testing)

### family-4141bde068

- Severity: high
- Max similarity score: 0.359
- Clusters: `method-packs`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `superpowers-receiving-code-review`, `superpowers-requesting-code-review`
- Strongest evidence:
  - `superpowers-receiving-code-review` <> `superpowers-requesting-code-review`: 0.359 (high)

### family-76e73918a1

- Severity: high
- Max similarity score: 0.347
- Clusters: `figma-design-system`
- Fusion: Fuse by UI phase: separate design generation, implementation, polish, style review, and design-system import; cross-link instead of deleting.
- Skills: `shadcn`, `shadcn-ui`
- Strongest evidence:
  - `shadcn` <> `shadcn-ui`: 0.347 (high; shared hints: ui, project)

### family-902f5a6b63

- Severity: medium
- Max similarity score: 0.454
- Clusters: `finance-business`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `3-statement-model`, `dcf-model`, `lbo-model`, `merger-model`
- Strongest evidence:
  - `3-statement-model` <> `lbo-model`: 0.454 (medium; shared hints: excel, finance, model)
  - `dcf-model` <> `lbo-model`: 0.435 (medium; shared hints: excel, finance, model)
  - `3-statement-model` <> `merger-model`: 0.427 (medium; shared hints: excel, finance, model)
  - `dcf-model` <> `merger-model`: 0.423 (medium; shared hints: excel, finance, model)
  - `lbo-model` <> `merger-model`: 0.422 (medium; shared hints: excel, finance, model)

### family-a09d72620a

- Severity: medium
- Max similarity score: 0.447
- Clusters: `automation-orchestration`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `kanban-orchestrator`, `kanban-worker`
- Strongest evidence:
  - `kanban-orchestrator` <> `kanban-worker`: 0.447 (medium; shared hints: cloud)

### family-b0126773a9

- Severity: medium
- Max similarity score: 0.438
- Clusters: `information-research`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `duckduckgo-search`, `searxng-search`
- Strongest evidence:
  - `duckduckgo-search` <> `searxng-search`: 0.438 (medium; shared hints: research)

### family-6b0f833a4c

- Severity: medium
- Max similarity score: 0.429
- Clusters: `quality-release-readiness`
- Fusion: Fuse by escalation: keep baseline skills as quick/default candidates and point production or complex work to the `*-pro` skill without removing either workflow.
- Skills: `production-readiness-pro`, `qa-pro`, `ship-pro`
- Strongest evidence:
  - `qa-pro` <> `ship-pro`: 0.429 (medium; shared hints: release, project, memory, docs, desktop)
  - `production-readiness-pro` <> `ship-pro`: 0.361 (medium; shared hints: release, project, memory, docs, desktop)
  - `production-readiness-pro` <> `qa-pro`: 0.318 (low; shared hints: auth, security, release, project, memory, docs, desktop)

### family-43191bb8df

- Severity: medium
- Max similarity score: 0.418
- Clusters: `ai-mlops-models`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `distributed-llm-pretraining-torchtitan`, `llm-training`, `simpo-training`, `slime-rl-training`, `sparse-autoencoder-training`, `tensorrt-llm`
- Strongest evidence:
  - `llm-training` <> `tensorrt-llm`: 0.418 (medium; shared hints: model, training, cloud)
  - `llm-training` <> `simpo-training`: 0.394 (medium; shared hints: model, training, cloud)
  - `llm-training` <> `slime-rl-training`: 0.368 (medium; shared hints: model, training, cloud)
  - `slime-rl-training` <> `sparse-autoencoder-training`: 0.365 (medium; shared hints: model, training, cloud)
  - `simpo-training` <> `slime-rl-training`: 0.362 (medium; shared hints: model, training, cloud)

### family-87ffef067d

- Severity: medium
- Max similarity score: 0.412
- Clusters: `finance-business`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `excel-author`, `pptx-author`
- Strongest evidence:
  - `excel-author` <> `pptx-author`: 0.412 (medium; shared hints: excel, finance, model)

### family-ae546c73b9

- Severity: medium
- Max similarity score: 0.41
- Clusters: `ai-mlops-models`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `pytorch-fsdp`, `pytorch-lightning`
- Strongest evidence:
  - `pytorch-fsdp` <> `pytorch-lightning`: 0.41 (medium; shared hints: model, training, cloud)

### family-274e397fad

- Severity: medium
- Max similarity score: 0.406
- Clusters: `project-memory-docs`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `project-assistant`, `project-evolution`, `project-maintenance`, `project-sync-audit`
- Strongest evidence:
  - `project-assistant` <> `project-maintenance`: 0.406 (medium; shared hints: ui, database, auth, project, docs, tauri, desktop)
  - `project-assistant` <> `project-sync-audit`: 0.382 (medium; shared hints: ui, database, security, release, project, memory, docs, desktop)
  - `project-evolution` <> `project-maintenance`: 0.359 (medium; shared hints: ui, database, auth, project, docs)
  - `project-maintenance` <> `project-sync-audit`: 0.357 (medium; shared hints: ui, database, project, docs, desktop)
  - `project-assistant` <> `project-evolution`: 0.331 (low; shared hints: ui, database, auth, security, release, project, docs)

### family-36bfb873c6

- Severity: medium
- Max similarity score: 0.406
- Clusters: `video-media-production`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `ai-video-generation`, `image-to-video`, `video-edit`
- Strongest evidence:
  - `ai-video-generation` <> `image-to-video`: 0.406 (medium; shared hints: image, video)
  - `image-to-video` <> `video-edit`: 0.371 (medium; shared hints: video)
  - `ai-video-generation` <> `video-edit`: 0.347 (medium; shared hints: video)

### family-e38ddcf750

- Severity: medium
- Max similarity score: 0.397
- Clusters: `payments-blockchain-secrets`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `stripe-link-cli`, `stripe-projects`
- Strongest evidence:
  - `stripe-link-cli` <> `stripe-projects`: 0.397 (medium; shared hints: docs)

### family-1f82aadde2

- Severity: medium
- Max similarity score: 0.394
- Clusters: `agent-runtime-tools`
- Fusion: Fuse by scope: keep `*-lite` for projectless/low-context tasks and point durable or cross-project work to the fuller skill.
- Skills: `agent-project-context`, `agent-project-memory-lite`, `agent-router-lite`
- Strongest evidence:
  - `agent-project-context` <> `agent-project-memory-lite`: 0.394 (medium; shared hints: project, memory, docs)
  - `agent-project-memory-lite` <> `agent-router-lite`: 0.372 (medium; shared hints: project, memory, docs)
  - `agent-project-context` <> `agent-router-lite`: 0.254 (low; shared hints: project, memory, docs)

### family-e8c1ee6bc5

- Severity: medium
- Max similarity score: 0.387
- Clusters: `ai-mlops-models`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `lambda-labs-gpu-cloud`, `modal-serverless-gpu`
- Strongest evidence:
  - `lambda-labs-gpu-cloud` <> `modal-serverless-gpu`: 0.387 (medium; shared hints: model, training, cloud)

### family-1d442839c0

- Severity: medium
- Max similarity score: 0.377
- Clusters: `ai-mlops-models`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `huggingface-accelerate`, `huggingface-tokenizers`
- Strongest evidence:
  - `huggingface-accelerate` <> `huggingface-tokenizers`: 0.377 (medium; shared hints: model, training, cloud)

### family-b2647807a8

- Severity: medium
- Max similarity score: 0.374
- Clusters: `copywriting-content`
- Fusion: Fuse by funnel stage: keep each ecommerce skill, but document the stage boundary and default handoff chain to avoid duplicate installs.
- Skills: `influencer-creator-brief`, `tiktok-shop-affiliate-brief`, `tiktok-shop-content-strategy`
- Strongest evidence:
  - `tiktok-shop-affiliate-brief` <> `tiktok-shop-content-strategy`: 0.374 (medium; shared hints: video)
  - `influencer-creator-brief` <> `tiktok-shop-affiliate-brief`: 0.311 (medium)

### family-83d545fea9

- Severity: medium
- Max similarity score: 0.374
- Clusters: `creative-image-design`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `infographic-generation`, `meme-generation`
- Strongest evidence:
  - `infographic-generation` <> `meme-generation`: 0.374 (medium; shared hints: image, video)

### family-b2ef8a082c

- Severity: medium
- Max similarity score: 0.36
- Clusters: `copywriting-content`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `ai-social-media-content`, `social-content-calendar`
- Strongest evidence:
  - `ai-social-media-content` <> `social-content-calendar`: 0.36 (medium; shared hints: copywriting)

### family-11092503ed

- Severity: medium
- Max similarity score: 0.346
- Clusters: `creative-image-design`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `baoyu-article-illustrator`, `baoyu-comic`
- Strongest evidence:
  - `baoyu-article-illustrator` <> `baoyu-comic`: 0.346 (medium; shared hints: image, video)

### family-7f5f4fb1bc

- Severity: medium
- Max similarity score: 0.346
- Clusters: `application-engineering`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `desktop-app`, `web-app`
- Strongest evidence:
  - `desktop-app` <> `web-app`: 0.346 (medium; shared hints: ui, ux, auth, desktop)

### family-d7ba66fd39

- Severity: medium
- Max similarity score: 0.299
- Clusters: `copywriting-content`
- Fusion: Fuse by trigger clarification: keep the stronger/specialized skill as default candidate and add related-skill boundaries to overlapping skills.
- Skills: `abandoned-cart-winback`, `email-sms-lifecycle`
- Strongest evidence:
  - `abandoned-cart-winback` <> `email-sms-lifecycle`: 0.299 (medium; shared hints: ecommerce)

