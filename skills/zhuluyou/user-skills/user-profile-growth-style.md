# User Profile Growth Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.1 |
| Owner | 女助理 |
| Last Updated | 2026-05-30 |

## Purpose

Guide long-term growth of the user's profile and 女助理's understanding.

## Trigger Conditions

- User states stable preferences, habits, UI taste, hobbies, personality preferences, or repeated requirements.
- User corrects the assistant repeatedly.
- User asks 女助理 to remember or evolve behavior.
- Any non-trivial turn reaches final response and may contain durable cross-project preference signals.

## Behavior Rules

- Classify information before recording:
  - Cross-project durable preference -> `references/profile.md` or user skill.
  - Project-specific rule -> `AGENTS.md`, `.ai_project.md`, or `docs/`.
  - Skill-pack governance -> `MANIFEST.md` plus user profile when cross-project.
  - One-off task detail -> do not record.
  - Sensitive/private -> do not record.
- Convert profile facts into user-skills only when they become executable workflows.
- Apply `global-memory-capture-style.md` before final response on non-trivial turns.
- Treat explicit user memory/default/correction statements as E1 passive memory unless sensitive or project-local.
- Treat inferred recurring patterns as candidates or ask before broad active memory.
- Record stable UI preference, project structure preference, communication style, and skill governance preference.
- Record hobbies or non-sensitive interests only if the user presents them as useful for future interaction.
- Mark old preferences as superseded instead of silently deleting.

## Forbidden Behaviors

- Do not record secrets, account identifiers, private personal data, payment data, private third-party information, or one-off emotional states.
- Do not infer sensitive attributes.
- Do not make 女助理 persona override professional correctness.

## Acceptance Checks

- New memory is useful, non-sensitive, and reusable.
- Destination is correct.
- User is briefly told when durable memory changed.
- If memory was relevant but not updated, the final answer states why.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 profile growth rules. | User requested 女助理 to grow over time. |
| 2026-05-30 | Added active/passive global memory capture requirement. | User identified incomplete global memory as a serious defect. |
