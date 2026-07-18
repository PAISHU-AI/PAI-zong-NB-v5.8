# Sources

This pack is synchronized from the owner's global Codex skills directory on 2026-07-14.

The repository distributes skills only. The compatible runtime prompt is supplied separately by the owner as `AGENTS5.8.md` and should be installed manually on each computer.

The repository does not distribute global `AGENTS.md`, project-level `AGENTS.md`, `AGENTS5.8.md`, or other system prompts.

Included skill sources are mixed:

- locally authored or adapted skills with no explicit `origin` field
- skills with `origin: ECC`
- skills with `origin: community`
- skills with `origin: ECC direct-port adaptation`

The generated `skills-inventory.json` lists every included skill directory, frontmatter name, description, source review, commercial-use status, and redistribution status.

Memory, routing, and role files are maintained under `skills/zhuluyou/` and distributed as a file-first Codex user-skill layer.

The default `skills/zhuluyou/` files mirror the owner's current global profile. They are suitable for restoring the owner's environment, but do not imply commercial or public-redistribution clearance.

Lifecycle scanner findings that are accepted as documentation false positives are recorded in `skills/zhuluyou/references/skill-lifecycle-allowlist.json` with exact skill/file/rule matches and rationale.

Commercial package checks:

- `node scripts/audit-skill-sources.mjs` fails if any packaged skill is missing from `skills-inventory.json` or lacks source-review metadata, and reports manual-review warnings.
- `node scripts/audit-skill-sources.mjs --strict-commercial` requires every skill to be explicitly cleared for commercial use.
- `node scripts/audit-skill-sources.mjs --strict-redistribution` additionally requires every skill to be manually cleared for public redistribution.
- `node scripts/build-commercial-release.mjs --out /tmp/PAI-Zong-NB-commercial --force` creates a skills release directory without owner-specific overlays.

Before redistributing this repository outside the owner's intended audience, review each included skill's license and source permissions and update `Redistribution` from `manual-license-review-required` to `allowed` only after that review.
