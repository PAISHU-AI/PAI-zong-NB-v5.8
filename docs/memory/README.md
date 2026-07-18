# Project Memory Evidence

## Read When

- Before adding evidence, source hashes, retrieval records, or invalidations.

## Owner

- Project Assistant

## Update Trigger

- Evidence schema, retrieval index, or invalidation policy changes.

## Validation

- Evidence JSONL and invalidation JSONL parse correctly.

## Purpose

- Keep project memory evidence-backed without storing raw transcripts, secrets, or noisy logs.
- Use docs/memory/evidence/index.jsonl for durable evidence records.
- Use docs/memory/invalidations.jsonl for superseded or stale memory.
