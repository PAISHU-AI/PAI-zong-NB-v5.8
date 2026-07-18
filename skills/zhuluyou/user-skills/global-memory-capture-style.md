# Global Memory Capture Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 2.2 |
| Owner | 女助理 + 主持人 |
| Last Updated | 2026-05-30 |

## Purpose

Make global memory proactive and reactive without turning it into an unsafe memory dump. This skill defines balanced global memory capture, candidate handling, superseding, and rejection for durable cross-project user preferences.

## Trigger Conditions

- Every non-trivial turn before final response.
- User says remember, 记住, 以后, 默认, 每次, 不要再, 我喜欢, 我不喜欢, 偏好, 习惯, 规则, 全局记忆, 用户画像, user-skills, or memory.
- User corrects behavior in a way that should affect future work.
- Prompt, skills, routing, UI taste, project memory, validation, safety, or workflow expectations change.

## Memory Modes

| Mode | Meaning | Default Action |
|---|---|---|
| Passive explicit | User directly asks to remember or states a durable preference. | Auto-write when non-sensitive and cross-project. |
| Active inferred | Assistant notices a likely reusable pattern without direct memory command. | Add Candidate with evidence; do not promote from one weak signal. |
| Repeated correction | Same correction appears across turns or tasks. | Promote to Active if non-sensitive and useful. |
| Project-local | Fact or rule only applies to the current repository/project. | Write project memory, not global memory. |
| Sensitive/temporary | Secret, private identity, account, credential, one-off task, transient mood. | Reject or skip; do not persist. |

## Profile Statuses

| Status | Meaning |
|---|---|
| Active | Confirmed durable cross-project preference. |
| Candidate | Useful but inferred, broad, or needs confirmation. |
| Superseded | Replaced by a newer preference or user instruction. |
| Rejected | Not stored because it is sensitive, project-local, one-off, or unsafe. |

## Capture Classifier

Before writing, classify every candidate:

1. Is it durable beyond this turn?
2. Is it cross-project rather than project-local?
3. Is it useful for future behavior?
4. Is it non-sensitive?
5. Does it conflict with higher-priority rules or existing memory?

Only write global memory when answers 1-4 are yes and answer 5 is no or can be resolved by superseding the old entry.

## Destination Rules

- Communication/tone -> `references/profile.md` Communication or `communication-style.md`.
- Stable workflow, automation, verification, memory behavior -> `references/profile.md` Automation Preferences or a matching user-skill.
- Skill/prompt governance -> `references/profile.md` Skills And Prompt Governance plus matching user-skill when executable.
- UI taste -> `references/profile.md` UI And Product Taste plus `ui-taste-style.md` when executable.
- Project-specific commands, architecture, docs, feature state, debug history -> detected project `.ai_project.md` or `docs/`.
- Candidate patterns -> Candidate Preferences in `references/profile.md` with `Status: Candidate` when supported by the writer.
- Superseded preferences -> Superseded Preferences in `references/profile.md`; do not silently delete old preferences.

## Write Gate

- A2 auto-write: explicit durable non-sensitive cross-project preference.
- A2 auto-write: repeated correction with clear future behavior and low risk.
- A3 candidate or ask: inferred broad preference from one turn.
- A4 ask first: any privacy-sensitive, destructive, account, production, or ambiguous broad-scope memory.
- A0 skip/reject: one-off task detail, temporary emotion, secret, credential, private account data, or unverifiable personal data.

## Active Capture Loop

At the end of each non-trivial turn:

1. Identify memory candidates from the user's latest message and this turn's work.
2. Classify each as global, project, candidate, sensitive, or skip.
3. For A2 global memory, write it before final response and state the update.
4. For A3 memory, add a candidate only if it is clearly reusable; otherwise ask briefly.
5. For project memory, apply `project-memory-style.md`.
6. When a new preference conflicts with an old one, mark the old preference Superseded before adding the new Active entry.
7. In the final answer, report memory updated, candidate, superseded, rejected, or intentionally skipped when memory was relevant.

## Passive Capture Loop

When the user explicitly says to remember or sets a default:

1. Treat it as E1 explicit evidence.
2. Refuse to store secrets or private sensitive data.
3. If project-local, route to project memory instead of global.
4. If global and safe, write immediately.
5. If it should affect behavior, update or create the matching user-skill.

## Forbidden Behaviors

- Do not wait for a separate "save memory" command when the user already gave an explicit durable preference.
- Do not silently ignore durable corrections.
- Do not write project facts into global profile.
- Do not store secrets, credentials, private account data, private identifiers, or one-off emotions.
- Do not store raw conversation transcripts as global memory.
- Do not create broad behavior rules from a single ambiguous hint.
- Do not overwrite or remove old profile entries without preserving a superseded trail.

## Acceptance Checks

- Every non-trivial final response considered global memory capture.
- Explicit durable preferences are written or a clear reason for not writing is stated.
- Inferred preferences are candidates or questions, not overconfident active rules.
- Conflicting preferences are superseded rather than silently overwritten.
- Global/project destinations are separated.
- The final answer includes a short memory status when memory was relevant.

## Related Profile Entries

- `AUTO-007`
- `AUTO-008`

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-30 | Created active/passive global memory capture rules. | User said global memory cannot automatically or reactively remember and called it a serious defect. |
| 2026-05-30 | Upgraded to v2.2 balanced capture statuses and superseding. | User requested a perfect memory loop with correct writing, skipping, invalidation, and verification. |
