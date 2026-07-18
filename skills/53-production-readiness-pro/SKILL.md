---
name: production-readiness-pro
description: Use when a feature, desktop/web app, API, database change, release, or refactor must meet commercial production quality, including reliability, security, performance, UX, observability, rollback, supportability, tests, docs, and go/no-go decisions.
---

# Production Readiness Pro

## Purpose

Gate work against commercial software quality. Production-ready means users can rely on it, operators can diagnose it, and the team can safely evolve it.

Use with `qa-pro` for validation, `ship-pro` for release, `security-review-pro` for sensitive changes, and `project-assistant` for durable documentation.

## Gate Levels

| Level | Meaning | Required Outcome |
|---|---|---|
| P0 Blocker | Data loss, security risk, broken critical flow, no rollback | Do not ship |
| P1 High | Major UX/reliability/performance gap or undocumented contract | Fix or explicitly defer with owner/risk |
| P2 Medium | Maintainability, observability, polish, or edge-case gap | Record before ship if not fixed |

## Checklist

### Product And UX
- Primary user flow is clear and complete.
- Loading, empty, error, disabled, success, permission-denied states exist where relevant.
- UI is readable, responsive, and not generic template output.
- Copy is actionable; destructive actions have confirmation/undo when needed.

### Reliability
- Expected failures are handled, not swallowed.
- Retries/backoff/cancellation are used only where appropriate.
- State cannot silently desync between UI, API, cache, and local persistence.
- Critical operations are idempotent or guarded against duplicate execution.

### API And Data
- API contracts, status codes, errors, pagination/filtering, and compatibility are documented.
- Database constraints protect invariants; migrations have rollback or mitigation notes.
- Transaction boundaries and consistency expectations are clear.

### Security And Privacy
- Auth/authz is checked server-side or trusted boundary-side.
- Secrets are not logged or hardcoded.
- Input validation exists at boundaries.
- Sensitive logs, files, IPC, tokens, and permissions are reviewed.

### Performance
- Expensive UI renders, network calls, SQL queries, startup costs, and bundle size are considered.
- Meaningful budgets or observed timings exist for critical flows when practical.

### Observability And Support
- Errors have enough context to diagnose without leaking secrets.
- Logs/metrics/traces or equivalent diagnostics exist for important backend/desktop flows.
- Known issues and troubleshooting notes are documented when relevant.

### Delivery
- Tests, type checks, lint, build, or manual verification run where feasible.
- Rollback or recovery path is known.
- `.ai_project.md`, relevant docs, changelog, and roadmap are updated when triggers apply.

## Bundled Resources

- `references/production-gates.md`: detailed commercial go/no-go gates and evidence expectations.
- `scripts/production-readiness-audit.ps1`: lightweight local audit for project memory, docs, package scripts, Tauri presence, and env samples.

Run example:

```powershell
.\codex-v5.0-skill-pack\53-production-readiness-pro\scripts\production-readiness-audit.ps1 -Root .
```

The script finds obvious gaps only. Use the reference gate list for the final production judgment.

## Output

```markdown
生产就绪：
- 判断：Go | No-Go | Conditional Go
- P0：...
- P1：...
- P2：...
- 需要补齐：...
```

## Avoid

- Calling work production-ready because it “runs locally”.
- Ignoring docs, rollback, observability, or supportability.
- Treating UI polish as decoration instead of usability and trust.


