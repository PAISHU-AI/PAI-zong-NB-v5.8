#!/usr/bin/env bash
set -euo pipefail

CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
FORCE=0
OVERLAY=""
SETUP_MAINTENANCE=0
MAINTENANCE_FORCE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --codex-home)
      CODEX_HOME_DIR="$2"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    --overlay)
      OVERLAY="$2"
      shift 2
      ;;
    --setup-maintenance)
      SETUP_MAINTENANCE=1
      shift
      ;;
    --maintenance-force)
      MAINTENANCE_FORCE=1
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_SKILLS="$REPO_ROOT/skills"
DEST_SKILLS="$CODEX_HOME_DIR/skills"
BACKUP_ROOT="$CODEX_HOME_DIR/skills-backup"
STAMP="$(date +%Y%m%d%H%M%S)"

if [[ ! -d "$SOURCE_SKILLS" ]]; then
  echo "Missing source skills directory: $SOURCE_SKILLS" >&2
  exit 1
fi

mkdir -p "$DEST_SKILLS"

installed=0
skipped=0
backed_up=0
overlay_backed_up=0

for source_dir in "$SOURCE_SKILLS"/*; do
  [[ -d "$source_dir" ]] || continue
  name="$(basename "$source_dir")"
  dest_dir="$DEST_SKILLS/$name"

  if [[ ! -f "$source_dir/SKILL.md" ]]; then
    echo "Skip non-skill directory: $name. Missing SKILL.md."
    skipped=$((skipped + 1))
    continue
  fi

  if [[ -e "$dest_dir" ]]; then
    if [[ "$FORCE" -ne 1 ]]; then
      echo "Skip existing skill: $name. Use --force to replace with backup."
      skipped=$((skipped + 1))
      continue
    fi

    mkdir -p "$BACKUP_ROOT"
    mv "$dest_dir" "$BACKUP_ROOT/$name-$STAMP"
    backed_up=$((backed_up + 1))
  fi

  cp -R "$source_dir" "$DEST_SKILLS/"
  installed=$((installed + 1))
done

overlay_applied=false
if [[ -n "$OVERLAY" ]]; then
  if [[ "$FORCE" -ne 1 ]]; then
    echo "Overlay installs can overwrite profile and user-skill files. Re-run with --force before applying overlay '$OVERLAY'." >&2
    exit 1
  fi

  overlay_skills="$REPO_ROOT/overlays/$OVERLAY/skills"
  if [[ ! -d "$overlay_skills" ]]; then
    echo "Missing overlay skills directory: $overlay_skills" >&2
    exit 1
  fi

  for overlay_dir in "$overlay_skills"/*; do
    [[ -d "$overlay_dir" ]] || continue
    name="$(basename "$overlay_dir")"
    dest_dir="$DEST_SKILLS/$name"
    if [[ -e "$dest_dir" ]]; then
      mkdir -p "$BACKUP_ROOT"
      cp -R "$dest_dir" "$BACKUP_ROOT/$name-overlay-preapply-$STAMP"
      overlay_backed_up=$((overlay_backed_up + 1))
    fi
    cp -R "$overlay_dir" "$DEST_SKILLS/"
  done
  overlay_applied=true
fi

maintenance_json="null"
if [[ "$SETUP_MAINTENANCE" -eq 1 ]]; then
  maintenance_args=(--codex-home "$CODEX_HOME_DIR")
  if [[ "$MAINTENANCE_FORCE" -eq 1 ]]; then
    maintenance_args+=(--force)
  fi
  maintenance_json="$(bash "$REPO_ROOT/scripts/setup-memory-maintenance-macos.sh" "${maintenance_args[@]}")"
fi

node -e 'console.log(JSON.stringify({
  codexHome: process.argv[1],
  destination: process.argv[2],
  installed: Number(process.argv[3]),
  skipped: Number(process.argv[4]),
  backedUp: Number(process.argv[5]),
  overlay: process.argv[6] || null,
  overlayApplied: process.argv[7] === "true",
  overlayBackedUp: Number(process.argv[8]),
  force: process.argv[9] === "1",
  maintenance: JSON.parse(process.argv[10]),
  restartRequired: true
}, null, 2))' \
  "$CODEX_HOME_DIR" "$DEST_SKILLS" "$installed" "$skipped" "$backed_up" "$OVERLAY" "$overlay_applied" "$overlay_backed_up" "$FORCE" "$maintenance_json"
