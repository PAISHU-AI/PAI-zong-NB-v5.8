# Production Gates

Use this reference for commercial go/no-go decisions.

## Gate Definitions

| Gate | No-Go Condition |
|---|---|
| UX | Critical path unclear, missing error/empty/loading states, unusable on target viewport |
| Reliability | Expected failures crash, duplicate operations corrupt state, no recovery path |
| API | Contract undocumented, incompatible change hidden, inconsistent errors |
| Data | Invariant only enforced in UI, unsafe migration, no rollback/mitigation |
| Security | Authz unclear, secrets exposed, unsafe uploads/IPC, sensitive logs |
| Performance | Critical flow obviously slow, unbounded queries/renders, no budget for known hotspot |
| Observability | Failures cannot be diagnosed, important errors lack context |
| Delivery | Build/test/package not verified, release notes wrong, rollback unknown |
| Project Memory | `.ai_project.md`/docs stale after meaningful change |

## Output Severity

- P0: must block release.
- P1: must fix or explicitly defer with risk owner.
- P2: record and schedule.

## Minimum Evidence

For each gate, prefer concrete evidence:
- command output
- screenshot
- test name
- changed file path
- doc path
- API route/schema
- migration file
- rollback instruction
