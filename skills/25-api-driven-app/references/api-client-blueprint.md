# API-Driven App Blueprint

Use for desktop and web apps driven by remote APIs.

## Required Layers

```text
UI Components
  -> View Models / Hooks
  -> Server State / Cache
  -> API Client
  -> Transport
  -> Remote API
```

## API Client Contract

- Centralize base URL, auth headers, request IDs, timeout, cancellation.
- Normalize errors into one app error shape.
- Do not scatter `fetch`/`axios` calls in UI components.
- Pagination, retry, rate limits, and stale data behavior must be explicit.
- Desktop offline behavior must be designed separately from web.

## Error Shape

```ts
export type AppError = {
  code: string;
  message: string;
  status?: number;
  retryable: boolean;
  requestId?: string;
  details?: unknown;
};
```

## State Rules

- Server state belongs in query/cache layer.
- Form draft state belongs near the form.
- Derived display state belongs in view models.
- Persistent local preferences belong in storage/native layer.
