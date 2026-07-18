# Roadmap

## Read When

- Before planning, resuming package maintenance, or deciding next v2.2 memory-system actions.

## Owner

- Project Assistant

## Update Trigger

- Plans, milestones, validation gaps, risks, or next actions change.

## Validation

- Next actions are current, actionable, and not duplicated elsewhere.

## Current Focus

- Keep the repository synchronized with the current global `zhuluyou`-based Codex skills runtime.

## Next Actions

- After any future global `zhuluyou` change, resync `skills/zhuluyou/`.
- After any local skill change, resync valid local skill directories into `skills/`, regenerate inventory, and rerun lifecycle audit.
- After any route change, verify all route target skills exist in the package or mark them explicit-only.
- After any package change, regenerate `skills-inventory.json` and rerun validation.
- Keep `skills/zhuluyou/` aligned with the separately installed `AGENTS5.8.md` prompt behavior.
- Keep macOS and Windows memory maintenance setup idempotent and optional.
- Keep lifecycle snapshot and allowlist current after accepted skill changes.
- Keep the owner profile free of secrets and private account data.
- Treat commercial/public redistribution as a separate manual review gate.
- Keep `skills-inventory.json` source-review and commercial-use metadata populated for every skill.

## Risks

- Runtime skill registry may remain stale until Codex restarts after installed skill changes.
- Runtime prompt and user-skills can drift if PAI-Zong-NB is not resynced after global updates or if `AGENTS5.8.md` is not manually installed on another computer.
- Knowledge graph and evidence layers should stay optional until a real long-lived software project needs them.
- Broad lifecycle scanner allowlists would weaken poisoning protection; accepted findings must stay exact-match with rationale.
- Public redistribution still requires manual license review for skills marked `manual-license-review-required`.
- This repository distributes skills only; adding global `AGENTS.md`, project-level `AGENTS.md`, or `AGENTS5.8.md` would violate the current distribution boundary.
- System-level maintenance setup must remain explicit; project initialization may check setup by default and configure only with setup flags.
