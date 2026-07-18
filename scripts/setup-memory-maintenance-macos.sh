#!/usr/bin/env bash
set -euo pipefail

CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
FORCE=0
UNINSTALL=0
DRY_RUN=0

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
    --uninstall)
      UNINSTALL=1
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

MAINTAIN_SCRIPT="$CODEX_HOME_DIR/skills/zhuluyou/scripts/maintain-memory.mjs"
LAUNCH_AGENTS="$HOME/Library/LaunchAgents"
DAILY_LABEL="com.PAI-Zong-NB.memory.daily"
WEEKLY_LABEL="com.PAI-Zong-NB.memory.weekly"
DAILY_PLIST="$LAUNCH_AGENTS/$DAILY_LABEL.plist"
WEEKLY_PLIST="$LAUNCH_AGENTS/$WEEKLY_LABEL.plist"

if [[ "$UNINSTALL" -ne 1 && "$DRY_RUN" -ne 1 && ! -f "$MAINTAIN_SCRIPT" ]]; then
  echo "Missing installed maintenance script: $MAINTAIN_SCRIPT" >&2
  exit 1
fi

write_plist() {
  local label="$1"
  local target="$2"
  local mode="$3"
  local hour="$4"
  local minute="$5"
  local weekday="${6:-}"

  if [[ -f "$target" && "$FORCE" -ne 1 ]]; then
    echo "exists:$target"
    return
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "would-write:$target"
    return
  fi

  mkdir -p "$LAUNCH_AGENTS" "$CODEX_HOME_DIR/memory-maintenance"
  {
    cat <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$label</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/env</string>
    <string>node</string>
    <string>$MAINTAIN_SCRIPT</string>
    <string>--scope</string>
    <string>global</string>
    <string>--$mode</string>
    <string>--write-report</string>
    <string>--codex-home</string>
    <string>$CODEX_HOME_DIR</string>
  </array>
  <key>StartCalendarInterval</key>
PLIST
    if [[ -n "$weekday" ]]; then
      cat <<PLIST
  <dict>
    <key>Weekday</key>
    <integer>$weekday</integer>
    <key>Hour</key>
    <integer>$hour</integer>
    <key>Minute</key>
    <integer>$minute</integer>
  </dict>
PLIST
    else
      cat <<PLIST
  <dict>
    <key>Hour</key>
    <integer>$hour</integer>
    <key>Minute</key>
    <integer>$minute</integer>
  </dict>
PLIST
    fi
    cat <<PLIST
  <key>StandardOutPath</key>
  <string>$CODEX_HOME_DIR/memory-maintenance/launchd-$label.out.log</string>
  <key>StandardErrorPath</key>
  <string>$CODEX_HOME_DIR/memory-maintenance/launchd-$label.err.log</string>
</dict>
</plist>
PLIST
  } > "$target"

  launchctl bootout "gui/$(id -u)" "$target" >/dev/null 2>&1 || true
  launchctl bootstrap "gui/$(id -u)" "$target" >/dev/null 2>&1 || true
  launchctl enable "gui/$(id -u)/$label" >/dev/null 2>&1 || true
  echo "written:$target"
}

remove_plist() {
  local label="$1"
  local target="$2"
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "would-remove:$target"
    return
  fi
  launchctl bootout "gui/$(id -u)" "$target" >/dev/null 2>&1 || true
  rm -f "$target"
  echo "removed:$target"
}

if [[ "$UNINSTALL" -eq 1 ]]; then
  daily_action="$(remove_plist "$DAILY_LABEL" "$DAILY_PLIST")"
  weekly_action="$(remove_plist "$WEEKLY_LABEL" "$WEEKLY_PLIST")"
else
  daily_action="$(write_plist "$DAILY_LABEL" "$DAILY_PLIST" "daily" 10 0)"
  weekly_action="$(write_plist "$WEEKLY_LABEL" "$WEEKLY_PLIST" "weekly" 10 30 1)"
fi

node -e 'console.log(JSON.stringify({
  ok: true,
  platform: "darwin",
  codexHome: process.argv[1],
  maintainScript: process.argv[2],
  daily: process.argv[3],
  weekly: process.argv[4],
  force: process.argv[5] === "1",
  uninstall: process.argv[6] === "1",
  dryRun: process.argv[7] === "1"
}, null, 2))' \
  "$CODEX_HOME_DIR" "$MAINTAIN_SCRIPT" "$daily_action" "$weekly_action" "$FORCE" "$UNINSTALL" "$DRY_RUN"
