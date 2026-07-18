[CmdletBinding()]
param(
  [switch]$Repair,
  [string]$CodexHome = $env:CODEX_HOME
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($CodexHome)) {
  $CodexHome = Join-Path $HOME '.codex'
}

$BasePath = Join-Path $CodexHome 'skills\zhuluyou'
$KnownWindowsPath = Join-Path $HOME '.codex\skills\zhuluyou'

if (-not (Test-Path -LiteralPath $BasePath) -and (Test-Path -LiteralPath $KnownWindowsPath)) {
  $BasePath = $KnownWindowsPath
}

$UserSkillsDir = Join-Path $BasePath 'user-skills'
$IndexPath = Join-Path $UserSkillsDir 'INDEX.md'
$ProfilePath = Join-Path $BasePath 'references\profile.md'
$RoutingPath = Join-Path $UserSkillsDir 'routing-core.md'
$CommunicationPath = Join-Path $UserSkillsDir 'communication-style.md'

function Get-FilePurpose {
  param([string]$Path)

  $text = Get-Content -LiteralPath $Path -Raw
  $purpose = [regex]::Match($text, '(?s)## Purpose\s+(.+?)(\r?\n##|\z)')
  if ($purpose.Success) {
    $value = ($purpose.Groups[1].Value -replace '\s+', ' ').Trim()
    if ($value.Length -gt 180) {
      return $value.Substring(0, 177) + '...'
    }
    return $value
  }

  $heading = [regex]::Match($text, '(?m)^#\s+(.+)$')
  if ($heading.Success) {
    return $heading.Groups[1].Value.Trim()
  }

  return 'User routing and behavior rule.'
}

function Get-ReadWhen {
  param([string]$FileName)

  switch ($FileName) {
    'routing-core.md' { return 'Every turn after this index.' }
    'communication-style.md' { return 'Every turn before responding.' }
    'memory-reliability-style.md' { return 'When resolving global/project memory, project roots, or memory bootstrap repair.' }
    'memory-stack-style.md' { return 'Every non-trivial turn before project docs, knowledge graph, or professional skill reads.' }
    'memory-evidence-style.md' { return 'Before writing durable project memory, docs, debug reports, ADRs, roadmap items, or KG nodes/edges.' }
    'global-memory-capture-style.md' { return 'Every non-trivial turn before final response; always when user asks to remember or sets defaults.' }
    'knowledge-graph-memory-style.md' { return 'When project work may need relationship lookup, impact analysis, long-term continuity, or cross-layer memory.' }
    'persona-style.md' { return 'Every turn where tone/persona matters; always before emotionally sensitive replies.' }
    'emotion-support-style.md' { return 'When user sounds upset, tired, frustrated, discouraged, or asks for comfort/fun.' }
    'user-profile-growth-style.md' { return 'When user states stable preferences or repeated corrections.' }
    'role-host-style.md' { return 'Before multi-step work, high-risk tasks, or final delivery checks.' }
    'role-architect-style.md' { return 'Before architecture, refactor, module split, tech selection, or major feature planning.' }
    'role-coder-style.md' { return 'Before writing or modifying code/config/tests.' }
    'role-debugger-style.md' { return 'Before debugging, fixing bugs, CI/build failures, regressions, or flaky tests.' }
    'role-project-assistant-style.md' { return 'Before/after project file changes, docs changes, or project memory audits.' }
    'role-rule-governor-style.md' { return 'Before modifying prompts, skills, user-skills, install docs, manifests, or distribution zips.' }
    'project-memory-style.md' { return 'Before software project changes or project memory maintenance.' }
    'debug-reuse-style.md' { return 'Before debugging or after fixing durable/complex bugs.' }
    'skill-router-style.md' { return 'Before any task that may need professional skills.' }
    'skill-lifecycle-governance-style.md' { return 'Before installing, deleting, archiving, restoring, updating, auditing, or routing skills.' }
    'ui-taste-style.md' { return 'Before UI design, redesign, beautification, frontend screens, or visual QA.' }
    'automation-boundary-style.md' { return 'Before actions that write files, update memory, run high-risk commands, or change persistent rules.' }
    'product-context-style.md' { return 'Before architecture, UI, API, Tauri, backend, database, or product planning.' }
    default { return 'When selected by routing-core.md.' }
  }
}

function New-IndexContent {
  param([System.IO.FileInfo[]]$SkillFiles)

  $alwaysNames = @('routing-core.md', 'communication-style.md')
  $always = $SkillFiles | Where-Object { $alwaysNames -contains $_.Name } | Sort-Object Name
  $others = $SkillFiles | Where-Object { $alwaysNames -notcontains $_.Name -and $_.Name -ne 'INDEX.md' } | Sort-Object Name

  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add('# User Skills Index')
  $lines.Add('')
  $lines.Add('This directory stores evolved user skills: durable, executable preferences and routing rules that help Codex work in the user''s preferred way.')
  $lines.Add('')
  $lines.Add('User skills are global user memory and routing context. They live under `$CODEX_HOME/skills/zhuluyou/user-skills/`, not inside an individual project.')
  $lines.Add('')
  $lines.Add('## Core Rules')
  $lines.Add('')
  $lines.Add('- Every turn starts by reading this index, `routing-core.md`, and `communication-style.md`.')
  $lines.Add('- Use `memory-reliability-style.md` as the single managed memory gateway whenever memory or project context is involved.')
  $lines.Add('- Then read only the matching user-skill files by `Read When`; do not bulk-load every file.')
  $lines.Add('- User skills guide behavior and routing; they do not replace source code, project docs, official docs, or professional `SKILL.md` files.')
  $lines.Add('- If this index is missing or incomplete, rebuild or complete it from existing global `user-skills/*.md` files.')
  $lines.Add('- Do not infer user preferences that are not present in files.')
  $lines.Add('')
  $lines.Add('## Always Read')
  $lines.Add('')
  $lines.Add('| Skill | Status | Purpose | Read When |')
  $lines.Add('|---|---|---|---|')
  foreach ($file in $always) {
    $lines.Add("| `$($file.Name)` | Active | $(Get-FilePurpose -Path $file.FullName) | $(Get-ReadWhen -FileName $file.Name) |")
  }
  $lines.Add('')
  $lines.Add('## User Skills')
  $lines.Add('')
  $lines.Add('| Skill | Status | Purpose | Read When |')
  $lines.Add('|---|---|---|---|')
  foreach ($file in $others) {
    $lines.Add("| `$($file.Name)` | Active | $(Get-FilePurpose -Path $file.FullName) | $(Get-ReadWhen -FileName $file.Name) |")
  }
  $lines.Add('')
  $lines.Add('## Change Log')
  $lines.Add('')
  $lines.Add('| Date | Change | Evidence |')
  $lines.Add('|---|---|---|')
  $lines.Add('| 2026-05-30 | Rebuilt user-skills index from existing global user-skill files. | verify-memory-bootstrap.ps1 -Repair |')

  return ($lines -join [Environment]::NewLine) + [Environment]::NewLine
}

function New-AutoIndexBlock {
  param([System.IO.FileInfo[]]$MissingFiles)

  $lines = New-Object System.Collections.Generic.List[string]
  $lines.Add('<!-- BEGIN AUTO-INDEXED USER-SKILLS -->')
  $lines.Add('')
  $lines.Add('## Auto-Indexed User Skills')
  $lines.Add('')
  $lines.Add('These entries were added by `scripts/verify-memory-bootstrap.ps1 -Repair` because existing global user-skill files were not referenced in this index.')
  $lines.Add('')
  $lines.Add('| Skill | Status | Purpose | Read When |')
  $lines.Add('|---|---|---|---|')
  foreach ($file in ($MissingFiles | Sort-Object Name)) {
    $lines.Add("| `$($file.Name)` | Active | $(Get-FilePurpose -Path $file.FullName) | $(Get-ReadWhen -FileName $file.Name) |")
  }
  $lines.Add('')
  $lines.Add('<!-- END AUTO-INDEXED USER-SKILLS -->')
  return ($lines -join [Environment]::NewLine) + [Environment]::NewLine
}

$messages = New-Object System.Collections.Generic.List[string]
$repaired = $false

$MemoryReliabilityPath = Join-Path $UserSkillsDir 'memory-reliability-style.md'
$requiredPaths = @($BasePath, $UserSkillsDir, $ProfilePath, $RoutingPath, $CommunicationPath, $MemoryReliabilityPath)
$missingRequired = $requiredPaths | Where-Object { -not (Test-Path -LiteralPath $_) }

if ($missingRequired.Count -gt 0) {
  foreach ($path in $missingRequired) {
    $messages.Add("Missing required path: $path")
  }
}

$skillFiles = @()
if (Test-Path -LiteralPath $UserSkillsDir) {
  $skillFiles = @(Get-ChildItem -LiteralPath $UserSkillsDir -Filter '*.md' -File -Force | Where-Object { $_.Name -ne 'INDEX.md' })
}

$indexExists = Test-Path -LiteralPath $IndexPath
$missingSections = @()
$missingEntries = @()

if ($indexExists) {
  $indexText = Get-Content -LiteralPath $IndexPath -Raw
  foreach ($section in @('# User Skills Index', '## Core Rules', '## Always Read', '## Change Log')) {
    if ($indexText -notmatch [regex]::Escape($section)) {
      $missingSections += $section
    }
  }
  foreach ($file in $skillFiles) {
    if ($indexText -notmatch [regex]::Escape($file.Name)) {
      $missingEntries += $file
    }
  }
} else {
  $messages.Add("Missing index: $IndexPath")
}

$incomplete = (-not $indexExists) -or $missingSections.Count -gt 0 -or $missingEntries.Count -gt 0

if ($Repair -and (Test-Path -LiteralPath $UserSkillsDir)) {
  if (-not $indexExists -or $missingSections.Count -gt 0) {
    if ($indexExists) {
      $backup = "$IndexPath.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
      Copy-Item -LiteralPath $IndexPath -Destination $backup
      $messages.Add("Backed up incomplete index to: $backup")
    }
    Set-Content -LiteralPath $IndexPath -Value (New-IndexContent -SkillFiles $skillFiles) -Encoding UTF8
    $messages.Add("Rebuilt index: $IndexPath")
    $repaired = $true
  } elseif ($missingEntries.Count -gt 0) {
    $indexText = Get-Content -LiteralPath $IndexPath -Raw
    $block = New-AutoIndexBlock -MissingFiles $missingEntries
    $start = '<!-- BEGIN AUTO-INDEXED USER-SKILLS -->'
    $end = '<!-- END AUTO-INDEXED USER-SKILLS -->'
    $pattern = "(?s)$([regex]::Escape($start)).*?$([regex]::Escape($end))\s*"
    if ($indexText -match $pattern) {
      $indexText = [regex]::Replace($indexText, $pattern, $block)
    } else {
      $indexText = $indexText.TrimEnd() + [Environment]::NewLine + [Environment]::NewLine + $block
    }
    Set-Content -LiteralPath $IndexPath -Value $indexText -Encoding UTF8
    $messages.Add("Added missing index entries: $($missingEntries.Name -join ', ')")
    $repaired = $true
  }
}

if ($Repair -and $repaired) {
  $indexText = Get-Content -LiteralPath $IndexPath -Raw
  $missingSections = @()
  $missingEntries = @()
  foreach ($section in @('# User Skills Index', '## Core Rules', '## Always Read', '## Change Log')) {
    if ($indexText -notmatch [regex]::Escape($section)) {
      $missingSections += $section
    }
  }
  foreach ($file in $skillFiles) {
    if ($indexText -notmatch [regex]::Escape($file.Name)) {
      $missingEntries += $file
    }
  }
  $indexExists = Test-Path -LiteralPath $IndexPath
  $incomplete = (-not $indexExists) -or $missingSections.Count -gt 0 -or $missingEntries.Count -gt 0
}

[pscustomobject]@{
  ok = ($missingRequired.Count -eq 0 -and -not $incomplete)
  repaired = $repaired
  basePath = $BasePath
  indexPath = $IndexPath
  indexExists = $indexExists
  userSkillFiles = $skillFiles.Count
  missingRequired = @($missingRequired)
  missingSections = @($missingSections)
  missingIndexEntries = @($missingEntries | ForEach-Object { $_.Name })
  messages = @($messages)
} | ConvertTo-Json -Depth 5
