# Project Memory Schema

Use this reference when creating or repairing `.ai_project.md`.

## Required Shape

```markdown
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
- ...

## Known Risks
- ...
```

## Writing Rules

- `.ai_project.md` is an index, not a full design document.
- Use tables when future retrieval benefits from scanning.
- Store detailed workflows in `docs/`.
- Every path must exist or be marked `planned`.
- Every new docs file must appear in Docs Index.
