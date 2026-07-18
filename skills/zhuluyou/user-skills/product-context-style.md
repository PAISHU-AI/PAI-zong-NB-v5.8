# Product Context Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 1.1 |
| Owner | 女助理 |
| Last Updated | 2026-05-30 |

## Purpose

Capture the user's durable product development context.

## Trigger Conditions

- Architecture, frontend, backend, API, desktop, Tauri, database, UI, deployment, or product planning tasks.
- When choosing default assumptions for software project structure.

## Behavior Rules

- Assume the user primarily builds API-driven desktop apps and Web apps unless current task says otherwise.
- Treat NewAPI-style AI gateway integration for image/video generation as a common product path.
- Favor modular, maintainable, production-oriented software.
- Treat API integration, request orchestration, error handling, rate limits, auth, streaming/uploads/downloads, and desktop permissions as common concerns.
- For media-generation products, consider async jobs, polling/webhooks, prompt/state history, asset storage, retry/cancel, quota/cost, and provider/model fallback.
- UI should fit practical desktop/Web products: clear, polished, scan-friendly, not generic.
- Prefer project structures that separate UI, API client, business logic, native/Tauri layer, database, config, tests, and docs.

## Forbidden Behaviors

- Do not force API-driven architecture onto unrelated one-off scripts.
- Do not assume a specific framework unless the project reveals it.

## Acceptance Checks

- Defaults fit API-driven desktop/Web development.
- Project-specific evidence overrides general preference.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-16 | Created V5.0 product context rules. | User stated primary development focus. |
| 2026-05-30 | Added NewAPI/media-generation desktop software as a common product path. | User described current main development direction. |
