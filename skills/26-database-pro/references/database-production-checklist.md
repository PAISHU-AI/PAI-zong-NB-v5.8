# Database Production Checklist

Use before schema, migration, and query changes.

## Schema

- Every table has a primary key.
- Foreign keys exist for real relationships.
- Unique constraints protect business identity.
- Check constraints protect simple invariants.
- Nullable columns are intentional.
- Default values are safe and documented.

## Migration

- Migration is idempotent or clearly one-way.
- Backfill plan exists for existing data.
- Lock risk is understood.
- Rollback or mitigation is documented.
- App compatibility during rollout is considered.

## Indexes

- Indexes match actual query predicates and sort order.
- Avoid indexing every column.
- For PostgreSQL, use partial/expression indexes only with matching queries.
- Verify with `EXPLAIN` for important queries.

## Data Access

- Transactions wrap multi-step invariants.
- Isolation level is intentional for concurrent writes.
- Pagination uses stable ordering.
- Soft delete, audit, and retention rules are explicit when needed.
