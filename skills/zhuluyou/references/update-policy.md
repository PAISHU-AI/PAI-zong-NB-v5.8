# Yonghu Preference Update Policy

## Goal

Keep the user profile useful, explicit, and safe. The profile should guide future work without becoming noisy or invasive.

## Categories

| Category | Use For | Example |
|---|---|---|
| Communication | tone, language, output format | concise Chinese, explicit role title |
| Project Development | project type, architecture habits | API-driven desktop/Web apps |
| UI And Product Taste | visual taste and design constraints | avoid generic AI-looking UI |
| Engineering Standards | code, tests, docs, production rules | maintain `.ai_project.md` and docs |
| Skills And Prompt Governance | skill import/update/delete strategy | external skills first |
| Automation Preferences | memory and evolution automation | update profile for stable preferences |
| Candidate Preferences | possible future rules | observed but not confirmed |
| Superseded Preferences | old rules retained for audit | replaced by newer explicit instruction |

## Evidence Levels

### E1 Explicit

The user says a lasting rule directly:

- "以后都这样"
- "我主要开发..."
- "我不建议..."
- "需要长期..."
- "每次都..."

Action: record as Active.

### E2 Repeated

The user corrects the same behavior across separate turns.

Action: record as Active with evidence "repeated correction".

### E3 Inferred

The model notices a pattern but user did not explicitly state it.

Action: record only as Candidate, or ask for confirmation if it will materially affect future work.

### E4 Project-local

The rule only applies to one repository or product.

Action: update `AGENTS.md`, `.ai_project.md`, or `docs/`, not the user profile.

Use:
- `AGENTS.md` for project-level AI collaboration rules.
- `.ai_project.md` for project index/state.
- `docs/` for detailed design and decisions.

### E5 One-off

The instruction applies only to current task.

Action: do not record.

## Safety Rules

Never record:

- secrets, keys, credentials, tokens
- private personal identifiers
- payment or account details
- sensitive third-party information
- health, legal, financial personal data unless the user explicitly asks to store a high-level workflow preference

## Conflict Handling

When conflict exists:

1. Add new preference as Active.
2. Move old preference to Superseded or change status to Superseded.
3. Preserve evidence.
4. Do not delete unless it was recorded by mistake or contains sensitive data.

## Maintenance Cadence

Review `profile.md` when:

- Prompt version changes.
- Skill pack version changes.
- User corrects assistant behavior.
- Project direction changes.
- UI/design requirements change.

Prune or supersede when:

- Preference is obsolete.
- Preference is too broad to guide action.
- Preference conflicts with newer explicit instruction.
