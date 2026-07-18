---
name: api-driven-app
description: Architecture and implementation for API-driven desktop and web applications. Use when the app depends heavily on remote APIs, model/API gateways, auth, request orchestration, server state, offline/slow-network handling, streaming, uploads/downloads, rate limits, and API-backed UI workflows.
---

# API Driven App

## Workflow

1. Map the app into UI state, server state, local persisted state, auth state, and transient operation state.
2. Define API client boundaries: base URL, auth, timeout, retry, cancellation, error normalization.
3. Design server-state strategy: cache keys, invalidation, stale data, optimistic updates, pagination, polling/streaming.
4. Handle failure modes: offline, timeout, 401, 403, 404, 409, 422, 429, 5xx, partial data, and API schema drift.
5. Make UI states explicit for loading, refreshing, saving, queued, failed, retrying, empty, and permission-limited views.

## Architecture Rules

- Do not call raw endpoints from scattered components.
- Keep API DTOs at the boundary; map to view models when UI needs differ.
- Treat auth expiry and rate limits as first-class UX states.
- Use idempotency keys for repeated mutating operations when supported.
- Separate local drafts from committed server state.
- Preserve user work during network failure when feasible.

## Desktop-Specific Checks

- Handle proxy, certificate, OS network changes, and app sleep/wake.
- Store credentials in secure OS storage when possible.
- Avoid blocking the UI thread on long requests or local processing.

## Web-Specific Checks

- Keep shareable state in the URL when useful.
- Avoid leaking secrets into frontend bundles.
- Consider CORS, cookies, CSRF, and SameSite behavior.

## Output

State data/state model, API boundary, failure states, caching strategy, and verification cases.

## Bundled Resources

- `references/api-client-blueprint.md`: desktop/web API-driven architecture, API client contract, app error shape, state ownership.
- `assets/api-client.ts`: minimal typed API client seed with timeout, auth header, JSON errors, and normalized `AppError`.
