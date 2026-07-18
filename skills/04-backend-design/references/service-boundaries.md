# Backend Service Boundaries

Use when designing backend modules.

## Layer Ownership

| Layer | Owns | Must Not Own |
|---|---|---|
| Route/Controller | HTTP parsing, status, auth middleware | business decisions |
| Application Service | use-case orchestration, transactions | transport details |
| Domain | invariants, policies, pure rules | database/client details |
| Repository | persistence queries | business branching |
| Integration Client | external service calls | workflow orchestration |

## Reliability Patterns

- Idempotency key for duplicate-sensitive writes.
- Outbox/queue for external side effects after DB commit.
- Timeouts for all network calls.
- Retries only for safe retryable operations.
- Structured errors and logs with request/correlation IDs.

## Design Review Questions

- Where is the transaction boundary?
- What happens if the external API succeeds but DB write fails?
- Can the operation run twice?
- Which invariant is enforced by database constraints?
- How is the failure diagnosed in logs?
