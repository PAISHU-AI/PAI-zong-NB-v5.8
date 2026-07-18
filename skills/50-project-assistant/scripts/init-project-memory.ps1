param(
  [string]$Root = (Get-Location).Path,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$projectFile = Join-Path $rootPath '.ai_project.md'

if ((Test-Path -LiteralPath $projectFile) -and -not $Force) {
  Write-Output "exists: $projectFile"
  exit 0
}

$docs = @(
  'docs/architecture',
  'docs/features',
  'docs/api',
  'docs/database',
  'docs/desktop',
  'docs/deployment',
  'docs/decisions',
  'docs/maintenance',
  'docs/roadmap',
  'docs/changelog'
)

foreach ($d in $docs) {
  New-Item -ItemType Directory -Force -Path (Join-Path $rootPath $d) | Out-Null
}

$template = @'
# Project Context

## Stack
- Runtime:
- Framework:
- Package Manager:
- Database:
- Desktop/Web:

## Commands
| Task | Command | Notes |
|---|---|---|
| Install |  |  |
| Dev |  |  |
| Test |  |  |
| Build |  |  |

## Directory Map
| Path | Owner/Purpose | Notes |
|---|---|---|

## Module Boundaries
| Module | Owns | Must Not Own |
|---|---|---|

## Features
| Feature | Status | Key Files | Docs | Verification |
|---|---|---|---|---|

## APIs
| Area | Contract Docs | Client/Server Files |
|---|---|---|

## Database
| Object | Docs/Migration | Notes |
|---|---|---|

## Desktop / Native Capabilities
| Capability | Files | Permissions | Docs |
|---|---|---|---|

## Decisions
| Decision | ADR/Doc | Status |
|---|---|---|

## Docs Index
| Path | Purpose | Read When | Area |
|---|---|---|---|

## Current Progress
- Initial context created.

## Known Risks
- Documentation may be incomplete until the first project sync audit.
'@

Set-Content -LiteralPath $projectFile -Value $template -Encoding UTF8
Write-Output "created: $projectFile"
