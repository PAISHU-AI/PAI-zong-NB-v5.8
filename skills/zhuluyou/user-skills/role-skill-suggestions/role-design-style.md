# 设计专家 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-design-style.md` |

## Purpose

Role-local bridge from owned clusters to the best professional skill. This file is read only for the selected lead role.

## Use Rules

- Prefer the row's default skill unless the user names a more specific skill or the request clearly matches a listed candidate.
- If a row is gated, 主持人 must confirm scope before external writes, deployment, payments, credentials, active security testing, browser automation, or account operations.
- This file is not a professional workflow. The execution role must still read the selected `SKILL.md` before acting.
- For full candidate lists, read `skill-cluster-details.md`; do not load unrelated professional skill bodies.

## Suggestions

| Intent / Cluster | Default Skill | Use Mainly For | Selection | Notable Candidates |
|---|---|---|---|---|
| `frontend-ui-design` | `frontend-design-pro` | New UI, frontend implementation, page design, redesign, mobile/web UI, UX flows, and accessibility. | default-first | `frontend-design-pro`, `anthropic-frontend-design`, `frontend`, `frontend-ui-engineering`, `login-flow`, `ui-design` |
| `control-center-ui` | `control-center-ui-design` | AI agent control-center screens for settings, prompts, tools, memory, sessions, costs, and governance UI. | default-first | `control-center-ui-design`, `agent-control-center-design`, `api-driven-control-center-ui`, `commercial-control-center-ui` |
| `figma-design-system` | `figma-use` | Figma, shadcn/ui, design system, component libraries, and design-to-code work. | default-first | `figma-use`, `figma-code-connect-components`, `figma-create-design-system-rules`, `figma-generate-design`, `figma-generate-library`, `figma-implement-design`, `figma-to-code`, `gsap-react` |
| `ui-style-review` | `design-review-pro` | UI polish, taste review, visual QA, style systems, and design guideline enforcement. | default-first | `design-review-pro`, `accessibility`, `adversarial-ux-test`, `high-end-visual-design`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `soft-skill` |

