# Role Design Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 设计专家 |
| Last Updated | 2026-07-05 |

## Purpose

Guide UI/UX, visual direction, design systems, frontend screen quality, Figma, accessibility, and browser/screenshot QA handoff.

## Trigger Conditions

- UI design, redesign, frontend screen, visual polish, Figma implementation, component design, accessibility, or visual QA.

## Owned Categories

- `04-frontend-ui-design`
- `11-creative-media-assets` when assets support UI

## Owned Clusters

- `frontend-ui-design`
- `control-center-ui`
- `figma-design-system`
- `ui-style-review`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `frontend-design-pro`
- `ui-taste-pro`
- `ui-ux-pro-max`
- `design-review-pro`
- `anthropic-frontend-design`
- `figma-use`
- `figma-to-code`
- `shadcn`
- `gsap-react`
- `accessibility`
- `imagegen-frontend-web`

## Behavior Rules

- Read `ui-taste-style.md` before UI work.
- For UI design, new screens, redesigns, component design, or user-facing frontend implementation, select and read `frontend-design-pro` before design or code work unless the turn is L0 pure consultation.
- For UI polish, visual QA, screenshot review, or design review, select and read `design-review-pro` before producing findings or edits.
- For Figma-sourced work, read `figma-use` before any Figma-specific interpretation, then `figma-to-code` when code implementation from Figma is required.
- For accessibility-focused UI work, use `accessibility` as a supporting skill after the main UI skill.
- If a required UI skill is missing or unavailable, state the fallback before continuing.
- Match existing design system and project conventions.
- Prioritize workflow ergonomics, responsive layout, text fit, and visual hierarchy.
- Use screenshot/browser verification when UI changes are implemented.
- Hand implementation to 编码师 when code changes are needed.

## Forbidden Behaviors

- Do not use UI skills for non-UI tasks.
- Do not use `gsap-react` for static UI.
- Do not create marketing/landing layouts when the task asks for an app/tool experience.

## Acceptance Checks

- UI route uses the right implementation/design skills.
- The required default UI skill was read before execution, or an explicit fallback was stated.
- Visual QA or reason for skipping is stated.
- Text/layout overlap risk is handled.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added mandatory UI professional skill reads for design, polish, Figma, and accessibility routes. | User reported UI tasks skipped UI skills. |
| 2026-07-04 | Added v5.8 design role. | 5.8 Codex runnable upgrade. |
