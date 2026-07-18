param(
  [Parameter(Mandatory=$true)][string]$Category,
  [Parameter(Mandatory=$true)][string]$Preference,
  [string]$Evidence = '',
  [ValidateSet('E1','E2','E3','E4','E5')][string]$EvidenceLevel = 'E1',
  [string]$Status = 'Active',
  [string]$Id = '',
  [string]$ProfilePath = ''
)

$ErrorActionPreference = 'Stop'

if (-not $ProfilePath) {
  $scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
  $ProfilePath = Join-Path $scriptRoot '..\references\profile.md'
}

function Escape-Cell([string]$Value) {
  if ($null -eq $Value) { return '' }
  return ($Value -replace '\|','/' -replace "`r?`n",' ')
}

function New-EntryId([string]$CategoryName) {
  $prefix = switch -Regex ($CategoryName) {
    'Communication' { 'COMM'; break }
    'Product|Project Focus' { 'PROD'; break }
    'Project Development' { 'DEV'; break }
    'UI|Design' { 'UI'; break }
    'Engineering' { 'ENG'; break }
    'Skills|Prompt' { 'SKILL'; break }
    'Automation' { 'AUTO'; break }
    'Candidate' { 'CAND'; break }
    default { 'PREF' }
  }
  return "$prefix-" + (Get-Date -Format 'yyyyMMddHHmmss')
}

$resolved = Resolve-Path -LiteralPath $ProfilePath -ErrorAction SilentlyContinue
if ($resolved) {
  $ProfilePath = $resolved.Path
} else {
  New-Item -ItemType Directory -Force -Path (Split-Path $ProfilePath -Parent) | Out-Null
  Set-Content -LiteralPath $ProfilePath -Encoding UTF8 -Value @'
# Yonghu Preference Profile

## Purpose

This file stores durable user preferences that should guide Codex across projects and future sessions.
'@
}

$lines = [System.Collections.Generic.List[string]]::new()
(Get-Content -LiteralPath $ProfilePath) | ForEach-Object { $lines.Add($_) }

$escapedPreference = [regex]::Escape($Preference)
if (($lines -join "`n") -match $escapedPreference) {
  Write-Output "exists: $Preference"
  exit 0
}

$heading = "## $Category"
$headingIndex = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -eq $heading) {
    $headingIndex = $i
    break
  }
}

if ($headingIndex -lt 0) {
  if ($lines.Count -gt 0 -and $lines[$lines.Count - 1] -ne '') { $lines.Add('') }
  $lines.Add($heading)
  $lines.Add('')
  if ($Category -match 'Candidate') {
    $lines.Add('| ID | Candidate | Evidence Level | Evidence | Confirmation Needed |')
    $lines.Add('|---|---|---|---|---|')
  } else {
    $lines.Add('| ID | Preference | Evidence Level | Evidence | Status |')
    $lines.Add('|---|---|---|---|---|')
  }
  $headingIndex = $lines.Count - 4
}

$insertIndex = $lines.Count
for ($i = $headingIndex + 1; $i -lt $lines.Count; $i++) {
  if ($lines[$i] -match '^##\s+') {
    $insertIndex = $i
    break
  }
}

while ($insertIndex -gt 0 -and $lines[$insertIndex - 1] -eq '') {
  $insertIndex--
}

$safeId = if ($Id) { Escape-Cell $Id } else { New-EntryId $Category }
$safePreference = Escape-Cell $Preference
$safeEvidence = Escape-Cell $Evidence
$safeStatus = Escape-Cell $Status

if ($Category -match 'Candidate') {
  $row = "| $safeId | $safePreference | $EvidenceLevel | $safeEvidence | $safeStatus |"
} else {
  $row = "| $safeId | $safePreference | $EvidenceLevel | $safeEvidence | $safeStatus |"
}

$lines.Insert($insertIndex, $row)
Set-Content -LiteralPath $ProfilePath -Encoding UTF8 -Value $lines
Write-Output "added: $Preference"
