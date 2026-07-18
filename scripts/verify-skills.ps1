[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$RepoRoot = Split-Path -Parent $PSScriptRoot
$SkillsRoot = Join-Path $RepoRoot 'skills'
$AgentsPath = Join-Path $RepoRoot 'AGENTS.md'
$SystemPath = Join-Path $SkillsRoot '.system'
$Node = Get-Command node -ErrorAction SilentlyContinue

if ($Node) {
  $nodeResult = & $Node.Source (Join-Path $PSScriptRoot 'verify-skills.mjs')
  $exitCode = $LASTEXITCODE
  $nodeResult
  if ($exitCode -ne 0) {
    exit $exitCode
  }
  exit 0
}

if (-not (Test-Path -LiteralPath $SkillsRoot)) {
  throw "Missing skills directory: $SkillsRoot"
}

$skillFiles = @(Get-ChildItem -LiteralPath $SkillsRoot -Recurse -Filter 'SKILL.md' -File -Force)
$records = foreach ($file in $skillFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw
  $name = ([regex]::Match($text, '(?m)^name:\s*(.+?)\s*$')).Groups[1].Value.Trim(' "')
  $description = ([regex]::Match($text, '(?m)^description:\s*(.+?)\s*$')).Groups[1].Value.Trim(' "')
  [pscustomobject]@{
    path = $file.FullName.Substring($RepoRoot.Length + 1)
    name = $name
    hasName = -not [string]::IsNullOrWhiteSpace($name)
    hasDescription = -not [string]::IsNullOrWhiteSpace($description)
    bytes = $file.Length
  }
}

$duplicateNames = @($records | Where-Object hasName | Group-Object name | Where-Object Count -gt 1 | ForEach-Object Name)
$missingName = @($records | Where-Object { -not $_.hasName })
$missingDescription = @($records | Where-Object { -not $_.hasDescription })
$tiny = @($records | Where-Object { $_.bytes -lt 300 })

$bootstrapScript = Join-Path $SkillsRoot 'zhuluyou\scripts\verify-memory-bootstrap.ps1'
$bootstrapOk = $false
$bootstrap = $null
if (Test-Path -LiteralPath $bootstrapScript) {
  $bootstrapJson = powershell -NoProfile -ExecutionPolicy Bypass -File $bootstrapScript -CodexHome $RepoRoot
  $bootstrap = $bootstrapJson | ConvertFrom-Json
  $bootstrapOk = [bool]$bootstrap.ok
}

$ok = (
  $skillFiles.Count -gt 0 -and
  $missingName.Count -eq 0 -and
  $missingDescription.Count -eq 0 -and
  $duplicateNames.Count -eq 0 -and
  -not (Test-Path -LiteralPath $AgentsPath) -and
  -not (Test-Path -LiteralPath $SystemPath) -and
  $bootstrapOk
)

[pscustomobject]@{
  ok = $ok
  skillFiles = $skillFiles.Count
  missingName = @($missingName | ForEach-Object { $_.path })
  missingDescription = @($missingDescription | ForEach-Object { $_.path })
  duplicateNames = $duplicateNames
  tinyFiles = @($tiny | ForEach-Object { $_.path })
  includesAgents = Test-Path -LiteralPath $AgentsPath
  includesSystemSkills = Test-Path -LiteralPath $SystemPath
  nodeVerifierAvailable = $false
  reason = 'Node.js is required for full v2.2 route, lifecycle, memory, and commercial-content verification.'
  memoryBootstrapOk = $bootstrapOk
  memoryBootstrap = $bootstrap
} | ConvertTo-Json -Depth 6

exit 1
