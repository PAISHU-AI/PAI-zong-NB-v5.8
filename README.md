# PAI-Zong-NB Skills Pack

This repository is a Codex skills distribution package.

It includes the owner's current global Codex `skills/`, installation scripts, verification scripts, project memory docs, and an optional compatibility overlay. The runtime prompt is not distributed in this repository. Install the skills from this repository, then set your separately provided `AGENTS5.8.md` as the Codex global built-in prompt on each computer.

This repository does not distribute global `AGENTS.md`, project-level `AGENTS.md`, or `AGENTS5.8.md`. The `zhuluyou` directory mirrors the owner's current global user-skill layer.

## Contents

- `skills/` - packaged Codex user skills and professional skills.
- `skills/zhuluyou/` - global user-skill routing, memory bootstrap, memory stack, evidence rules, communication rules, and preference governance.
- `scripts/install-macos.sh` - macOS installer for copying skills into `$CODEX_HOME/skills`.
- `scripts/install.ps1` - Windows PowerShell installer for copying skills into `$CODEX_HOME\skills`.
- `scripts/setup-memory-maintenance-macos.sh` - macOS `launchd` setup for daily light checks and weekly deep audits.
- `scripts/setup-memory-maintenance.ps1` - Windows Task Scheduler setup for daily light checks and weekly deep audits.
- `scripts/verify-skills.mjs` - package verifier for skill metadata, route targets, lifecycle audit, source audit, commercial content, and memory checks.
- `scripts/verify-skills.ps1` - Windows wrapper for package verification.
- `overlays/PAI-Zong-personal/` - optional owner-specific overlay, not applied by default.
- `docs/` - project memory for maintaining this skills pack repository.
- `skills-inventory.json` - generated inventory of packaged skills.

## macOS Usage

Clone the repository:

```bash
git clone https://github.com/396001000/PAI-Zong-NB.git
cd PAI-Zong-NB
```

Install all packaged skills into the default Codex home:

```bash
bash scripts/install-macos.sh --force
```

Then manually apply your separately provided `AGENTS5.8.md` as the Codex global built-in prompt for that computer.

Install skills and enable global memory maintenance:

```bash
bash scripts/install-macos.sh --force --setup-maintenance
```

Default destination:

```text
$HOME/.codex/skills
```

Use a custom Codex home when needed:

```bash
bash scripts/install-macos.sh --codex-home "$HOME/.codex" --force
```

Apply the optional personal overlay only when this install is for the owner:

```bash
bash scripts/install-macos.sh --force --overlay PAI-Zong-personal
```

Owner quick install with the personal overlay:

```bash
git clone https://github.com/396001000/PAI-Zong-NB.git
cd PAI-Zong-NB
bash scripts/install-macos.sh --force --overlay PAI-Zong-personal
```

Verify the package and installed memory layer:

```bash
node scripts/verify-skills.mjs
node ~/.codex/skills/zhuluyou/scripts/verify-memory-bootstrap.mjs
node ~/.codex/skills/zhuluyou/scripts/verify-skill-routes.mjs
node ~/.codex/skills/zhuluyou/scripts/audit-memory-system.mjs
```

Restart Codex after installing or replacing skills so the runtime skill registry refreshes.

## Windows Usage

Clone the repository in PowerShell:

```powershell
git clone https://github.com/396001000/PAI-Zong-NB.git
cd PAI-Zong-NB
```

Install all packaged skills into the default Codex home:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -Force
```

Then manually apply your separately provided `AGENTS5.8.md` as the Codex global built-in prompt for that computer.

Install skills and enable global memory maintenance with Windows Task Scheduler:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -Force -SetupMaintenance
```

Default destination:

```text
$HOME\.codex\skills
```

Use a custom Codex home when needed:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -CodexHome "$HOME\.codex" -Force
```

Apply the optional personal overlay only when this install is for the owner:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -Force -Overlay PAI-Zong-personal
```

Owner quick install with the personal overlay:

```powershell
git clone https://github.com/396001000/PAI-Zong-NB.git
cd PAI-Zong-NB
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\install.ps1 -Force -Overlay PAI-Zong-personal
```

Verify the package and installed memory layer:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verify-skills.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\skills\zhuluyou\scripts\verify-memory-bootstrap.ps1
```

Restart Codex after installing or replacing skills so the runtime skill registry refreshes.

## Project Memory Initialization

In a Codex conversation inside a software project, say:

```text
初始化本项目
```

The assistant should route that to the installed initializer:

```bash
node ~/.codex/skills/zhuluyou/scripts/init-project-memory.mjs --cwd .
```

The command self-checks the project, creates only missing project memory files, writes `docs/memory/retrieval-index.json`, and re-runs the project memory audit. Use `--dry-run` to inspect gaps, `--with-kg` to initialize `docs/knowledge/`, and `--force` only when the current projectless directory should become the project root.

To initialize project memory and set up idempotent project maintenance in one pass:

```bash
node ~/.codex/skills/zhuluyou/scripts/init-project-memory.mjs --cwd . --setup-maintenance
```

This creates `docs/memory/maintenance.json` when missing and installs a project `pre-push` audit hook when the project uses Git. The hook is read-only and does not rewrite project memory during push. Re-running the command skips existing setup; use `--repair-maintenance` to fill gaps without replacing custom config, and `--force` only when a deliberate rewrite is required.

## Package Verification

Run the full repository verification before publishing changes:

```bash
node scripts/verify-skills.mjs
node skills/zhuluyou/scripts/audit-project-memory.mjs --cwd .
node skills/zhuluyou/scripts/setup-project-maintenance.mjs --cwd . --dry-run
bash scripts/setup-memory-maintenance-macos.sh --codex-home /tmp/PAI-Zong-NB-install-test --dry-run
node scripts/build-commercial-release.mjs --out /tmp/PAI-Zong-NB-commercial --force
node scripts/audit-commercial-content.mjs --root /tmp/PAI-Zong-NB-commercial --no-require-overlay
```

## Notes

- `.system` skills are not included because Codex provides them separately.
- Plugin cache folders are not included.
- Empty local directories without `SKILL.md` are not distributed as skills.
- Runtime prompt files are not distributed here; set `AGENTS5.8.md` manually on each computer.
- The default `zhuluyou` files mirror the owner's current global preferences; review them before public redistribution.
- The compatibility overlay remains available for older installation workflows.
- Memory system v2.2 is file-first: Markdown, JSON, JSONL, and Node scripts. MemPalace, ChromaDB, SQLite, and MCP memory servers are not required dependencies.
- Maintenance setup is idempotent: existing project config, hooks, launchd jobs, or Windows scheduled tasks are skipped unless force options are used.
- `skills-inventory.json` records source-review and commercial-use status for every packaged skill. Public redistribution still requires manual license review where marked.
