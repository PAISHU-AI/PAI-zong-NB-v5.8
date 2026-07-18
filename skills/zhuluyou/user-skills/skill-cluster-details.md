# Skill Cluster Details

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Source | 5.8 classification staging output |

## Purpose

Cold-path full candidate list for v5.8 skill clusters. Do not read this file during normal routing. Use it only when the compact cluster index and role-level suggestion file are not enough.

## Cluster Membership

### bootstrap-context

- Category: `00-core-routing-context`
- Lead role: host
- Default skill: `router`
- Selection mode: default-first
- Use when: Per-turn bootstrap, context discovery, source grounding, terminal execution, and context budget.
- High-risk gate: None beyond normal command safety.
- Candidate skills: `content-hash-cache-pattern`, `context-engineering-pro`, `iterative-retrieval`, `openai-docs`, `project-context`, `router`, `source-driven-development`, `source-driven-development-pro`, `strategic-compact`, `terminal-ops`, `zhuluyou`

### prompt-skill-governance

- Category: `01-prompt-skill-governance`
- Lead role: rule-governor
- Default skill: `skill-governance`
- Selection mode: default-first
- Use when: Prompt, skill pack, user-skills, lifecycle, install, audit, and external skill adaptation work.
- High-risk gate: Skill install, delete, overwrite, or distribution changes require host review.
- Candidate skills: `anthropic-skill-creator`, `context7-cli`, `find-skills`, `find-skills-pro`, `plugin-creator`, `regex-vs-llm-structured-text`, `skill-creator`, `skill-distillation-pro`, `skill-governance`, `skill-installer`, `skill-pack-adaptation`, `skill-stocktake`

### project-memory-docs

- Category: `02-project-planning-docs`
- Lead role: project-assistant
- Default skill: `project-assistant`
- Selection mode: default-first
- Use when: Project memory, docs index, ADRs, project rules, roadmap, and handoff continuity.
- High-risk gate: Project AGENTS writes and durable memory updates require the project-memory rules.
- Candidate skills: `code-tour`, `docs-index-maintainer`, `docs-rules`, `documentation-and-adrs`, `git-workflow-and-versioning`, `project-assistant`, `project-evolution`, `project-maintenance`, `project-sync-audit`

### spec-planning-docs

- Category: `02-project-planning-docs`
- Lead role: project-assistant-product
- Default skill: `spec-driven-development-pro`
- Selection mode: default-first
- Use when: Requirements, planning, specs, task breakdown, and brainstorm-to-spec workflows.
- High-risk gate: Planning-only skills must not implement without user approval.
- Candidate skills: `blueprint`, `planning-and-task-breakdown`, `spark`, `spec-driven-development`, `spec-driven-development-pro`, `writing-plans`

### architecture-product

- Category: `03-architecture-product-strategy`
- Lead role: architect-product
- Default skill: `architecture-review-pro`
- Selection mode: default-first
- Use when: Architecture review, product scope, service boundaries, and API/interface strategy.
- High-risk gate: Large architecture changes need explicit execution approval.
- Candidate skills: `api-and-interface-design`, `api-design`, `api-driven-app`, `architecture-review-pro`, `backend-design`, `ralphinho-rfc-pipeline`

### frontend-ui-design

- Category: `04-frontend-ui-design`
- Lead role: design-coder
- Default skill: `frontend-design-pro`
- Selection mode: default-first
- Use when: New UI, frontend implementation, page design, redesign, mobile/web UI, UX flows, and accessibility.
- High-risk gate: Browser automation that writes external state needs confirmation.
- Candidate skills: `anthropic-frontend-design`, `frontend`, `frontend-design-pro`, `frontend-ui-engineering`, `login-flow`, `ui-design`

### control-center-ui

- Category: `04-frontend-ui-design`
- Lead role: design-coder
- Default skill: `control-center-ui-design`
- Selection mode: default-first
- Use when: AI agent control-center screens for settings, prompts, tools, memory, sessions, costs, and governance UI.
- High-risk gate: Do not treat UI mockups as runtime permission changes.
- Candidate skills: `agent-control-center-design`, `api-driven-control-center-ui`, `commercial-control-center-ui`, `control-center-ui-design`

### figma-design-system

- Category: `04-frontend-ui-design`
- Lead role: design-coder
- Default skill: `figma-use`
- Selection mode: default-first
- Use when: Figma, shadcn/ui, design system, component libraries, and design-to-code work.
- High-risk gate: Only use external design tools when exposed in the current Codex session.
- Candidate skills: `figma-code-connect-components`, `figma-create-design-system-rules`, `figma-generate-design`, `figma-generate-library`, `figma-implement-design`, `figma-to-code`, `figma-use`, `gsap-react`, `shadcn`, `shadcn-ui`

### ui-style-review

- Category: `04-frontend-ui-design`
- Lead role: design-coder
- Default skill: `design-review-pro`
- Selection mode: default-first
- Use when: UI polish, taste review, visual QA, style systems, and design guideline enforcement.
- High-risk gate: None beyond normal source verification.
- Candidate skills: `accessibility`, `adversarial-ux-test`, `design-review-pro`, `high-end-visual-design`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `soft-skill`, `stitch-design-taste`, `taste-design-frontend`, `ui-polish`, `ui-polish-pro`, `ui-taste-pro`, `ui-ux-pro-max`, `web-design-guidelines`

### application-engineering

- Category: `05-application-engineering`
- Lead role: coder
- Default skill: `incremental-implementation-pro`
- Selection mode: default-first
- Use when: Implementation, backend/fullstack/web/desktop app coding, code quality, and error handling.
- High-risk gate: Risky refactors need scoped verification.
- Candidate skills: `backend`, `clean-code`, `code-simplification-pro`, `code-wiki`, `desktop-app`, `error-handling`, `i18n`, `incremental-implementation`, `incremental-implementation-pro`, `latency-critical-systems`, `page-agent`, `rest-graphql-debug`, `runtime-tui-debugging`, `senior-backend`, `senior-fullstack`, `web-app`

### api-data-db-auth

- Category: `06-data-api-database-auth`
- Lead role: coder-architect
- Default skill: `api-client`
- Selection mode: default-first
- Use when: API clients, integrations, database, Postgres, auth, data fetching, and interface contracts.
- High-risk gate: Auth, data migration, and credential handling require host review.
- Candidate skills: `api-client`, `api-connector-builder`, `api-integration-specialist`, `auth-integration`, `data-fetching-state`, `database`, `database-pro`, `postgresql-pro`, `supabase-postgres-best-practices`

### debugging-testing

- Category: `07-debugging-quality-testing`
- Lead role: debugger-qa
- Default skill: `diagnose-pro`
- Selection mode: default-first
- Use when: Bug diagnosis, test failures, regression isolation, browser testing, and root-cause workflows.
- High-risk gate: Do not claim fixes without verification evidence.
- Candidate skills: `anthropic-webapp-testing`, `browser-testing-with-devtools`, `code-review`, `debugging-and-error-recovery`, `diagnose-pro`, `e2e-testing`, `plankton-code-quality`, `tdd-pro`, `testing`, `webapp-testing-pro`

### quality-release-readiness

- Category: `07-debugging-quality-testing`
- Lead role: debugger-qa
- Default skill: `production-readiness-pro`
- Selection mode: default-first
- Use when: QA, performance, production readiness, release confidence, and final verification.
- High-risk gate: Release claims require concrete test/build/runtime evidence.
- Candidate skills: `performance`, `performance-optimization`, `production-audit`, `production-readiness-pro`, `qa-pro`, `ship-pro`, `vercel-react-best-practices`, `verification-loop`

### security-hardening

- Category: `08-security-privacy`
- Lead role: security
- Default skill: `security-review-pro`
- Selection mode: default-first
- Use when: Security review, hardening, threat models, secrets, permissions, and sensitive flows.
- High-risk gate: Active scans, secrets, auth, payment, or permission changes need explicit confirmation.
- Candidate skills: `1password`, `security`, `security-and-hardening`, `security-best-practices`, `security-review-pro`, `security-scan`, `security-threat-model`

### security-redteam-privacy

- Category: `08-security-privacy`
- Lead role: security
- Default skill: `security-bounty-hunter`
- Selection mode: gated-default
- Use when: Pentest, bounty, OSINT, privacy removal, forensics, and adversarial security workflows.
- High-risk gate: Authorization and scope must be confirmed before active testing or external writes.
- Candidate skills: `godmode`, `oss-forensics`, `security-bounty-hunter`, `sherlock`, `unbroker`, `web-pentest`

### payments-blockchain-secrets

- Category: `08-security-privacy`
- Lead role: security
- Default skill: `security-review-pro`
- Selection mode: gated-default
- Use when: Payments, Stripe, wallets, blockchain, keys, account credentials, and finance-sensitive integrations.
- High-risk gate: Never execute payments, transactions, key use, or account changes without explicit confirmation.
- Candidate skills: `evm`, `hyperliquid`, `mpp-agent`, `security-review-pro`, `solana`, `stripe-link-cli`, `stripe-projects`

### deployment-release

- Category: `09-devops-release-deploy`
- Lead role: automation-devops
- Default skill: `deployment-patterns`
- Selection mode: gated-default
- Use when: Deployment providers, release packaging, hosting, CI/CD, migration, and publish actions.
- High-risk gate: Deploy, publish, push, or production changes require explicit confirmation.
- Candidate skills: `cloudflare-deploy`, `cloudflare-temporary-deploy`, `deployment-patterns`, `deprecation-and-migration`, `migration-deprecation-pro`, `netlify-deploy`, `openclaw-migration`, `release-packaging`, `render-deploy`, `vercel-deploy`

### automation-orchestration

- Category: `09-devops-release-deploy`
- Lead role: automation-devops
- Default skill: `ci-cd-and-automation`
- Selection mode: gated-default
- Use when: Kanban workers, webhooks, watchers, tunnels, container supervision, and operational automation.
- High-risk gate: Persistent jobs, external writes, and schedulers require confirmation.
- Candidate skills: `ci-cd-and-automation`, `container-supervision-s6`, `docker-management`, `inference-sh-cli`, `kanban-orchestrator`, `kanban-worker`, `pinggy-tunnel`, `watchers`, `webhook-subscriptions`

### devops-ops

- Category: `09-devops-release-deploy`
- Lead role: automation-devops
- Default skill: `devops`
- Selection mode: default-first
- Use when: Docker, server ops, logs, environment variables, system services, and operational troubleshooting.
- High-risk gate: Service restarts and destructive ops need host review.
- Candidate skills: `devops`

### platform-integrations

- Category: `10-platform-runtime-integrations`
- Lead role: agent-runtime-automation
- Default skill: `tauri-pro`
- Selection mode: default-first
- Use when: Tauri, NewAPI, GitHub, Sentry, Playwright, desktop automation, Windows/macOS runtime integrations.
- High-risk gate: External tool actions require current-session tool evidence.
- Candidate skills: `agent-memory-system-evaluation`, `electron-desktop-runtime-setup`, `github-ops`, `macos-computer-use`, `newapi`, `playwright`, `playwright-interactive`, `sentry`, `tauri`, `tauri-pro`, `windows-desktop-e2e`

### agent-runtime-tools

- Category: `10-platform-runtime-integrations`
- Lead role: agent-runtime-automation
- Default skill: `agent-router-lite`
- Selection mode: default-first
- Use when: Agent runtime, MCP, gateway, sub-agent/tool runtimes, agent-specific implementation and troubleshooting.
- High-risk gate: Do not assume non-Codex runtime commands exist.
- Candidate skills: `agent-gateway-troubleshooting`, `agent-project-context`, `agent-project-memory-lite`, `agent-router-lite`, `agent-runtime-api-design`, `agent-runtime-backend`, `agent-runtime-code-review`, `agent-runtime-database`, `agent-runtime-frontend`, `agent-runtime-tauri-pro`, `agent-runtime-testing`, `agent-verification-gate`, `antigravity-cli`, `blackbox`, `fastmcp`, `gbrain-integration`, `grok`, `honcho`, `layered-memory-routing`, `mcporter`, `native-mcp`, `openhands`

### ai-mlops-models

- Category: `10-platform-runtime-integrations`
- Lead role: agent-runtime-automation
- Default skill: `llm-training`
- Selection mode: default-first
- Use when: Model training, fine-tuning, inference, vector search, embeddings, GPU serving, and ML tooling.
- High-risk gate: Cloud GPU, external accounts, long-running jobs, and paid compute need confirmation.
- Candidate skills: `axolotl`, `chroma`, `clip`, `distributed-llm-pretraining-torchtitan`, `dspy`, `faiss`, `fine-tuning-with-trl`, `guidance`, `huggingface-accelerate`, `huggingface-tokenizers`, `instructor`, `lambda-labs-gpu-cloud`, `llava`, `llm-training`, `modal-serverless-gpu`, `nemo-curator`, `obliteratus`, `optimizing-attention-flash`, `outlines`, `peft-fine-tuning`, `pinecone`, `pytorch-fsdp`, `pytorch-lightning`, `qdrant-vector-search`, `simpo-training`, `slime-rl-training`, `sparse-autoencoder-training`, `tensorrt-llm`, `unsloth`

### communications-integrations

- Category: `10-platform-runtime-integrations`
- Lead role: agent-runtime-automation
- Default skill: `agentmail`
- Selection mode: gated-default
- Use when: Email, phone, SMS, LMS, agent communication channels, and runtime communication integrations.
- High-risk gate: Sending messages, calls, account access, or external writes require explicit confirmation.
- Candidate skills: `agentmail`, `telephony`

### creative-image-design

- Category: `11-creative-media-assets`
- Lead role: media-design
- Default skill: `imagegen`
- Selection mode: default-first
- Use when: Image generation, product photography, brand assets, illustrations, diagrams, memes, pixel art, and visual assets.
- High-risk gate: External generators must be available in the current session before claiming output.
- Candidate skills: `baoyu-article-illustrator`, `baoyu-comic`, `blender-mcp`, `brandkit`, `concept-diagrams`, `creative-ideation`, `ecommerce-image-workflow`, `ecommerce-product-photography`, `fal-commercial-creative`, `font-design-prompt-generator`, `frontend-slides`, `guizang-social-card`, `ideation`, `image-to-code`, `imagegen`, `imagegen-frontend-mobile`, `imagegen-frontend-web`, `infographic-generation`, `lifestyle-product-shot-plan`, `marketing-image-production`, `marketplace-image-set`, `md-to-xhs-cards`, `meme-generation`, `nano-banana-2`, `pixel-art`, `product-photography`, `screenshot`, `stable-diffusion-image-generation`, `taizhang-collage-prompter`

### video-media-production

- Category: `11-creative-media-assets`
- Lead role: media-design
- Default skill: `ai-video-generation`
- Selection mode: default-first
- Use when: Video prompts, storyboards, Seedance/Jimeng prompts, edits, image-to-video, motion direction, and audio/media tasks.
- High-risk gate: Generated media requires tool evidence; otherwise output prompts/specs only.
- Candidate skills: `ai-video-generation`, `ecommerce-video-marketing`, `ecommerce-video-prompt`, `fal-genmedia-workflow`, `fal-ugc-video`, `graphic-overlays`, `hyperframes`, `image-to-video`, `kanban-video-orchestrator`, `livestream-commerce-runbook`, `marketing-video-production`, `remotion-ad-video`, `seedance-prompt`, `seedance-prompt-en`, `seedance-prompt-zh`, `seedance-storyboard`, `shoppable-video-strategy`, `spotify`, `video-edit`, `whisper`

### creative-presentation-media

- Category: `11-creative-media-assets`
- Lead role: media-design
- Default skill: `frontend-slides`
- Selection mode: default-first
- Use when: Visual slides, animated presentations, and media-rich storytelling assets.
- High-risk gate: Office/runtime presentation tools must be exposed before claiming files were created.
- Candidate skills: `frontend-slides`

### method-packs

- Category: `12-experimental-methods`
- Lead role: host-rule-governor
- Default skill: `superpowers-writing-plans`
- Selection mode: optional-default
- Use when: Optional execution methods, planning discipline, review discipline, worktrees, and superpowers-derived workflows.
- High-risk gate: Method packs do not override Codex developer/system rules.
- Candidate skills: `subagent-driven-development`, `superpowers-brainstorming`, `superpowers-executing-plans`, `superpowers-finishing-a-development-branch`, `superpowers-receiving-code-review`, `superpowers-requesting-code-review`, `superpowers-systematic-debugging`, `superpowers-using-git-worktrees`, `superpowers-verification-before-completion`, `superpowers-writing-plans`

### gaming-leisure-explicit

- Category: `12-experimental-methods`
- Lead role: host-rule-governor
- Default skill: explicit only
- Selection mode: explicit-skill-only
- Use when: Gaming or leisure automation skills. Use only when the exact domain is requested.
- High-risk gate: Do not run emulators, accounts, or external automation without confirmation.
- Candidate skills: `minecraft-modpack-server`, `pokemon-player`

### information-research

- Category: `13-information-content-office`
- Lead role: information
- Default skill: `information-research`
- Selection mode: default-first
- Use when: Research, source synthesis, paper/repo/article analysis, local knowledge search, and evidence-backed summaries.
- High-risk gate: Use browsing only when needed and cite sources when used.
- Candidate skills: `context7-find-docs`, `darwinian-evolver`, `domain-intel`, `duckduckgo-search`, `find-nearby`, `gitnexus-explorer`, `information-research`, `one-three-one-rule`, `osint-investigation`, `parallel-cli`, `qmd`, `scrapling`, `searxng-search`

### copywriting-content

- Category: `13-information-content-office`
- Lead role: copywriting
- Default skill: `copywriting-content`
- Selection mode: default-first
- Use when: Copywriting, social posts, short-form scripts, ecommerce copy, copy editing, and content strategy.
- High-risk gate: Do not fabricate claims, metrics, testimonials, or legal/medical promises.
- Candidate skills: `abandoned-cart-winback`, `ai-social-media-content`, `amazon-aplus-content`, `amazon-listing-optimization`, `chat-commerce-script`, `copy-editing`, `copywriting`, `copywriting-content`, `ecommerce-copywriting`, `ecommerce-product-description`, `email-sms-lifecycle`, `influencer-creator-brief`, `marketplace-seo-keywords`, `meta-google-shopping-ads`, `pdp-conversion-copy`, `post-purchase-retention`, `product-comparison-chart`, `product-review-mining`, `retail-media-ad-creative`, `social-content-calendar`, `tiktok-shop-affiliate-brief`, `tiktok-shop-content-strategy`, `ugc-ad-script`, `viral-short-form`, `visual-content`, `xhs-note-creator`, `xhs-zhongcao-copywriting`

### office-productivity

- Category: `13-information-content-office`
- Lead role: office
- Default skill: `office-productivity`
- Selection mode: default-first
- Use when: Documents, spreadsheets, presentations, PDFs, notes, LMS, task trackers, and daily productivity workflows.
- High-risk gate: External writes, sharing, or account changes require confirmation.
- Candidate skills: `business-kpi-report`, `canvas`, `chart-production`, `dashboard-reporting`, `data-cleaning-table`, `excel-pivot-table`, `here.now`, `linear`, `memento-flashcards`, `monthly-business-review`, `office-productivity`, `research-slide-deck`, `siyuan`, `statistics-analysis`

### finance-business

- Category: `13-information-content-office`
- Lead role: information-office
- Default skill: `3-statement-model`
- Selection mode: gated-default
- Use when: Financial models, stocks, valuation, comps, merger/LBO models, and finance reports.
- High-risk gate: No financial advice claims; use source-backed data and state limitations.
- Candidate skills: `3-statement-model`, `accounting-bookkeeping`, `budget-forecasting`, `cashflow-reporting`, `comps-analysis`, `dcf-model`, `excel-author`, `financial-statement-analysis`, `invoice-reconciliation`, `lbo-model`, `merger-model`, `pptx-author`, `stocks`

### health-bio-research

- Category: `13-information-content-office`
- Lead role: information
- Default skill: `bioinformatics`
- Selection mode: gated-default
- Use when: Bioinformatics, drug discovery, health, nutrition, neuroscience, and biomedical research workflows.
- High-risk gate: No medical advice; use evidence and limitations.
- Candidate skills: `bioinformatics`, `drug-discovery`, `fitness-nutrition`, `neuroskill-bci`

### commerce-productivity

- Category: `13-information-content-office`
- Lead role: office
- Default skill: `shopify`
- Selection mode: gated-default
- Use when: Shopping, Shopify, catalog, order, return, and ecommerce productivity workflows.
- High-risk gate: Purchases, returns, customer/order writes, and account operations require confirmation.
- Candidate skills: `ai-personalization-brief`, `bundle-offer-strategy`, `ecommerce-growth-strategy`, `marketplace-compliance-check`, `pdp-cro-audit`, `pricing-promo-test-plan`, `product-data-feed-optimization`, `product-launch-campaign`, `seasonal-promo-calendar`, `shop`, `shopify`, `shopify-pdp-build-spec`

