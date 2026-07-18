param(
  [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$docsRoot = Join-Path $rootPath 'docs'

function Get-RelativePathCompat($BasePath, $FullPath) {
  $base = $BasePath.TrimEnd('\','/')
  if ($FullPath.StartsWith($base, [System.StringComparison]::OrdinalIgnoreCase)) {
    return $FullPath.Substring($base.Length).TrimStart('\','/').Replace('\','/')
  }
  return $FullPath.Replace('\','/')
}

if (!(Test-Path -LiteralPath $docsRoot)) {
  Write-Output 'No docs directory found.'
  exit 0
}

function Infer-Area($path) {
  if ($path -match '^docs/architecture/') { 'Architecture' }
  elseif ($path -match '^docs/features/') { 'Feature' }
  elseif ($path -match '^docs/api/') { 'API' }
  elseif ($path -match '^docs/database/') { 'Database' }
  elseif ($path -match '^docs/desktop/') { 'Desktop' }
  elseif ($path -match '^docs/deployment/') { 'Deployment' }
  elseif ($path -match '^docs/decisions/') { 'Decision' }
  elseif ($path -match '^docs/maintenance/') { 'Maintenance' }
  elseif ($path -match '^docs/roadmap/') { 'Roadmap' }
  elseif ($path -match '^docs/changelog/') { 'Changelog' }
  else { 'Docs' }
}

function Infer-ReadWhen($area) {
  switch ($area) {
    'Architecture' { 'Changing architecture, modules, or data flow' }
    'Feature' { 'Changing feature behavior or user flow' }
    'API' { 'Changing API contracts, auth, schemas, or errors' }
    'Database' { 'Changing schema, migrations, indexes, or transactions' }
    'Desktop' { 'Changing Tauri/native commands, permissions, updater, or packaging' }
    'Deployment' { 'Changing env vars, build, deploy, release, or rollback' }
    'Decision' { 'Reviewing major technical decisions or tradeoffs' }
    'Maintenance' { 'Debugging recurring issues, debt, or refactor candidates' }
    'Roadmap' { 'Planning or changing feature lifecycle' }
    'Changelog' { 'Reviewing durable development history' }
    default { 'Working on related project documentation' }
  }
}

Write-Output '## Docs Index'
Write-Output ''
Write-Output '| Path | Purpose | Read When | Area |'
Write-Output '|---|---|---|---|'
Get-ChildItem -Recurse -File -LiteralPath $docsRoot -Include *.md | Sort-Object FullName | ForEach-Object {
  $rel = Get-RelativePathCompat $rootPath $_.FullName
  $area = Infer-Area $rel
  $title = (Get-Content -LiteralPath $_.FullName -TotalCount 5 | Where-Object { $_ -match '^#\s+' } | Select-Object -First 1) -replace '^#\s+',''
  if (!$title) { $title = [IO.Path]::GetFileNameWithoutExtension($_.Name) -replace '[-_]',' ' }
  $readWhen = Infer-ReadWhen $area
  Write-Output "| ``$rel`` | $title | $readWhen | $area |"
}
