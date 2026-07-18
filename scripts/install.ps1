[CmdletBinding()]
param(
  [string]$CodexHome = $env:CODEX_HOME,
  [string]$Overlay,
  [switch]$Force,
  [switch]$SetupMaintenance,
  [switch]$MaintenanceForce
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($CodexHome)) {
  $CodexHome = Join-Path $HOME '.codex'
}

$RepoRoot = Split-Path -Parent $PSScriptRoot
$SourceSkills = Join-Path $RepoRoot 'skills'
$DestSkills = Join-Path $CodexHome 'skills'
$BackupRoot = Join-Path $CodexHome 'skills-backup'
$OverlaysRoot = Join-Path $RepoRoot 'overlays'
$Stamp = Get-Date -Format 'yyyyMMddHHmmss'

if (-not (Test-Path -LiteralPath $SourceSkills)) {
  throw "Missing source skills directory: $SourceSkills"
}

New-Item -ItemType Directory -Path $DestSkills -Force | Out-Null

$installed = 0
$skipped = 0
$backedUp = 0
$overlayBackedUp = 0

Get-ChildItem -LiteralPath $SourceSkills -Directory -Force | ForEach-Object {
  $sourceDir = $_.FullName
  $destDir = Join-Path $DestSkills $_.Name

  if (-not (Test-Path -LiteralPath (Join-Path $sourceDir 'SKILL.md'))) {
    Write-Host "Skip non-skill directory: $($_.Name). Missing SKILL.md."
    $script:skipped += 1
    return
  }

  if (Test-Path -LiteralPath $destDir) {
    if (-not $Force) {
      Write-Host "Skip existing skill: $($_.Name). Use -Force to replace with backup."
      $script:skipped += 1
      return
    }

    New-Item -ItemType Directory -Path $BackupRoot -Force | Out-Null
    $backupDir = Join-Path $BackupRoot "$($_.Name)-$Stamp"
    Move-Item -LiteralPath $destDir -Destination $backupDir
    $script:backedUp += 1
  }

  Copy-Item -LiteralPath $sourceDir -Destination $DestSkills -Recurse -Force
  $script:installed += 1
}

$overlayApplied = $false
if (-not [string]::IsNullOrWhiteSpace($Overlay)) {
  if (-not $Force) {
    throw "Overlay installs can overwrite profile and user-skill files. Re-run with -Force so existing skills are backed up before applying overlay '$Overlay'."
  }

  $overlayRoot = Join-Path $OverlaysRoot $Overlay
  $overlaySkills = Join-Path $overlayRoot 'skills'
  if (-not (Test-Path -LiteralPath $overlaySkills)) {
    throw "Missing overlay skills directory: $overlaySkills"
  }
  Get-ChildItem -LiteralPath $overlaySkills -Force | ForEach-Object {
    $destOverlayDir = Join-Path $DestSkills $_.Name
    if (Test-Path -LiteralPath $destOverlayDir) {
      New-Item -ItemType Directory -Path $BackupRoot -Force | Out-Null
      $overlayBackupDir = Join-Path $BackupRoot "$($_.Name)-overlay-preapply-$Stamp"
      Copy-Item -LiteralPath $destOverlayDir -Destination $overlayBackupDir -Recurse -Force
      $script:overlayBackedUp += 1
    }

    Copy-Item -LiteralPath $_.FullName -Destination $DestSkills -Recurse -Force
  }
  $overlayApplied = $true
}

$maintenance = $null
if ($SetupMaintenance) {
  $setupScript = Join-Path $RepoRoot 'scripts\setup-memory-maintenance.ps1'
  if (-not (Test-Path -LiteralPath $setupScript)) {
    throw "Missing maintenance setup script: $setupScript"
  }
  $maintenanceArgs = @('-CodexHome', $CodexHome)
  if ($MaintenanceForce) {
    $maintenanceArgs += '-Force'
  }
  $maintenanceRaw = & $setupScript @maintenanceArgs
  $maintenance = $maintenanceRaw | ConvertFrom-Json
}

[pscustomobject]@{
  codexHome = $CodexHome
  destination = $DestSkills
  installed = $installed
  skipped = $skipped
  backedUp = $backedUp
  overlayBackedUp = $overlayBackedUp
  overlay = $Overlay
  overlayApplied = $overlayApplied
  force = [bool]$Force
  maintenance = $maintenance
  restartRequired = $true
} | ConvertTo-Json -Depth 3
