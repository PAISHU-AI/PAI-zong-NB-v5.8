# Manifest

| Field | Value |
|---|---|
| Name | PAI-Zong-NB |
| Type | Codex skills pack |
| Created | 2026-05-30 |
| Includes AGENTS.md | No |
| Includes runtime prompt template | No |
| Includes `.system` skills | No |
| Includes plugin cache | No |
| Includes personal overlay | Optional compatibility overlay, `overlays/PAI-Zong-personal/` |
| Skill count | 364 top-level skill directories / 364 top-level `SKILL.md` files |
| Runtime prompt | External, user-supplied `AGENTS5.8.md` |
| Primary macOS install path | `$HOME/.codex/skills` |
| Primary Windows install path | `$HOME\.codex\skills` |
| Memory system | v2.2 file-first closed loop |
| Memory maintenance | Optional idempotent setup for macOS launchd, Windows Task Scheduler, and project pre-push hooks |
| Owner profile | Included in `skills/zhuluyou/` to mirror the current global install |
| Commercial clearance | Not implied; review `skills-inventory.json` warnings before redistribution |
| Skill source audit | `skills-inventory.json` includes source review, commercial use, and redistribution status |

## Required Validation

Run:

```bash
node scripts/verify-skills.mjs
```

macOS installer smoke check:

```bash
bash scripts/install-macos.sh --codex-home /tmp/PAI-Zong-NB-install-test --force
```

Windows fallback:

```powershell
.\scripts\verify-skills.ps1
```

And for v2.2 memory governance:

```bash
node skills/zhuluyou/scripts/verify-memory-bootstrap.mjs
node skills/zhuluyou/scripts/verify-skill-routes.mjs
node skills/zhuluyou/scripts/audit-skill-lifecycle.mjs
node skills/zhuluyou/scripts/audit-memory-system.mjs --cwd .
node skills/zhuluyou/scripts/audit-project-memory.mjs --cwd .
node skills/zhuluyou/scripts/init-project-memory.mjs --cwd . --dry-run
node skills/zhuluyou/scripts/setup-project-maintenance.mjs --cwd . --dry-run
bash scripts/setup-memory-maintenance-macos.sh --codex-home /tmp/PAI-Zong-NB-install-test --dry-run
node scripts/audit-commercial-content.mjs
node scripts/audit-skill-sources.mjs
node scripts/build-commercial-release.mjs --out /tmp/PAI-Zong-NB-commercial --force
node scripts/audit-commercial-content.mjs --root /tmp/PAI-Zong-NB-commercial --no-require-overlay
```

Expected result:

```json
{
  "ok": true
}
```
