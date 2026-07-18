param(
  [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$patterns = @('migrations','migration','prisma','drizzle','db','database')
$ignoredDirPattern = '\\(node_modules|target|dist|build|\.git|external-skill-sources|codex-v\d+\.\d+-skill-pack)\\'

Get-ChildItem -Recurse -File -LiteralPath $rootPath -ErrorAction SilentlyContinue |
  Where-Object {
    $file = $_
    $pathParts = $file.FullName.ToLower().Split([char[]]@('\','/'), [System.StringSplitOptions]::RemoveEmptyEntries)
    $inDbFolder = ($patterns | Where-Object { $pathParts -contains $_ }).Count -gt 0
    $file.FullName -notmatch $ignoredDirPattern -and
    (
      $file.Extension -in '.sql','.ts','.js','.rs','.py' -and
      $inDbFolder
    )
  } |
  Select-Object FullName, Length, LastWriteTime
