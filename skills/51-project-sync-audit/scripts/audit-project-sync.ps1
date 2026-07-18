param(
  [string]$Root = (Get-Location).Path,
  [int]$LargeFileLines = 900
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$projectFile = Join-Path $rootPath '.ai_project.md'
$docsRoot = Join-Path $rootPath 'docs'
$findings = New-Object System.Collections.Generic.List[object]
$ignoredDirPattern = '\\(node_modules|target|dist|build|\.git|external-skill-sources|codex-v\d+\.\d+-skill-pack)\\'

function Add-Finding($Severity, $Category, $Path, $Message) {
  $script:findings.Add([pscustomobject]@{
    Severity = $Severity
    Category = $Category
    Path = $Path
    Message = $Message
  }) | Out-Null
}

function Get-RelativePathCompat($BasePath, $FullPath) {
  $base = $BasePath.TrimEnd('\','/')
  if ($FullPath.StartsWith($base, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $FullPath.Substring($base.Length).TrimStart('\','/').Replace('\','/')
  }
  return $FullPath.Replace('\','/')
}

if (!(Test-Path -LiteralPath $projectFile)) {
  Add-Finding 'P1' 'Missing Context' '.ai_project.md' 'Project memory file is missing.'
} else {
  $projectText = Get-Content -Raw -LiteralPath $projectFile
  foreach ($section in @('Stack','Commands','Directory Map','Module Boundaries','Features','Docs Index','Current Progress','Known Risks')) {
    if ($projectText -notmatch "(?m)^##\s+$([regex]::Escape($section))\s*$") {
      Add-Finding 'P2' 'Missing Section' '.ai_project.md' "Missing section: $section"
    }
  }
}

if (Test-Path -LiteralPath $docsRoot) {
  $docs = Get-ChildItem -Recurse -File -LiteralPath $docsRoot -Include *.md
  $projectText = if (Test-Path -LiteralPath $projectFile) { Get-Content -Raw -LiteralPath $projectFile } else { '' }
  foreach ($doc in $docs) {
    $rel = Get-RelativePathCompat $rootPath $doc.FullName
    if ($projectText -and $projectText -notlike "*$rel*") {
      Add-Finding 'P2' 'Stale Index' $rel 'Docs file is not referenced in .ai_project.md Docs Index.'
    }
  }
} else {
  Add-Finding 'P2' 'Missing Docs' 'docs/' 'docs directory is missing.'
}

$codeExt = '.ts','.tsx','.js','.jsx','.py','.rs','.go','.java','.cs','.vue','.svelte'
Get-ChildItem -Recurse -File -LiteralPath $rootPath -ErrorAction SilentlyContinue |
  Where-Object { $codeExt -contains $_.Extension -and $_.FullName -notmatch $ignoredDirPattern } |
  ForEach-Object {
    $lines = (Get-Content -LiteralPath $_.FullName -ErrorAction SilentlyContinue | Measure-Object -Line).Lines
    if ($lines -ge $LargeFileLines) {
      $rel = Get-RelativePathCompat $rootPath $_.FullName
      Add-Finding 'P2' 'Large File Risk' $rel "File has $lines lines; consider recording/refactoring if responsibility is mixed."
    }
  }

if ($findings.Count -eq 0) {
  [pscustomobject]@{ Severity='OK'; Category='Project Sync'; Path='.'; Message='No obvious project memory drift found.' }
} else {
  $findings | Sort-Object Severity, Category, Path
}
