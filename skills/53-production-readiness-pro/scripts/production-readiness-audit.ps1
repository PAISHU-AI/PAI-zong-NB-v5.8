param(
  [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$checks = New-Object System.Collections.Generic.List[object]

function Add-Check($Gate, $Status, $Evidence) {
  $script:checks.Add([pscustomobject]@{ Gate=$Gate; Status=$Status; Evidence=$Evidence }) | Out-Null
}

Add-Check 'Project Memory' ($(if(Test-Path (Join-Path $rootPath '.ai_project.md')){'OK'}else{'MISSING'})) '.ai_project.md'
Add-Check 'Docs' ($(if(Test-Path (Join-Path $rootPath 'docs')){'OK'}else{'MISSING'})) 'docs/'

$packageJson = Join-Path $rootPath 'package.json'
if (Test-Path $packageJson) {
  $pkg = Get-Content -Raw -LiteralPath $packageJson | ConvertFrom-Json
  $scripts = $pkg.scripts.PSObject.Properties.Name
  foreach ($s in @('test','build','lint','typecheck')) {
    Add-Check "npm:$s" ($(if($scripts -contains $s){'AVAILABLE'}else{'MISSING'})) "package.json scripts.$s"
  }
}

$tauri = Join-Path $rootPath 'src-tauri'
if (Test-Path $tauri) {
  Add-Check 'Desktop/Tauri' 'PRESENT' 'src-tauri/'
  $cap = Get-ChildItem -Recurse -File -LiteralPath $tauri -Include '*.json','*.toml' | Where-Object { $_.Name -match 'capabilities|tauri\.conf' }
  Add-Check 'Tauri Config' ($(if($cap){'AVAILABLE'}else{'CHECK'})) 'capabilities or tauri config'
}

$envSamples = Get-ChildItem -File -LiteralPath $rootPath -ErrorAction SilentlyContinue | Where-Object { $_.Name -match '^\.env(\.example|\.sample)?$' }
Add-Check 'Env Docs' ($(if($envSamples){'AVAILABLE'}else{'CHECK'})) '.env.example/.env.sample'

$checks
