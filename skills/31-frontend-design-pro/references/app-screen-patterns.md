# App Screen Patterns

Use when designing web/desktop product screens.

## Dashboard

- Lead with user decision, not decoration.
- Separate overview metrics, work queue, and recent activity.
- Provide empty/error/loading states for each data region.
- Use tables for dense comparable data; cards for distinct objects.

## CRUD Workspace

- List: filters, search, sort, pagination, bulk actions.
- Detail: summary, status, metadata, activity, destructive actions.
- Form: validation, dirty state, save conflict, permission denied.

## API Tooling / Developer App

- Show request state, last sync, request ID, and raw error details behind disclosure.
- Keep secrets masked by default.
- Provide copy buttons only where copy value is stable and safe.
- Make retry/cancel explicit.

## Desktop App

- Account for small windows, offline state, local file permissions, update prompts.
- Keep long-running tasks cancellable and observable.
