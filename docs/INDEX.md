# Docs Index

| Path | Purpose | Read When | Owner | Update Trigger | Validation |
|---|---|---|---|---|---|
| docs/project-structure.md | Project directory, module, and important-file map. | Before structural changes or broad feature work. | Project Assistant | Directories, entry points, modules, or important files change. | Paths reflect current repository. |
| docs/roadmap.md | Current plan, next actions, risks, and milestones. | Before planning or resuming work. | Project Assistant | Plans, priorities, milestones, or risks change. | Next actions are current and actionable. |
| docs/maintenance/known-issues.md | Known issues and recurring problems. | Before debugging or risk review. | Debugger / Project Assistant | New recurring issue or resolved issue. | Issues include status and validation. |
| docs/maintenance/development-log.md | Durable project progress log. | Before handoff or project review. | Project Assistant | Meaningful project state changes. | Entries link to relevant docs or files. |
| docs/maintenance/technical-debt.md | Technical debt and cleanup candidates. | Before refactors or planning. | Project Assistant | Debt is found, resolved, or reprioritized. | Items have impact and owner/status. |
| docs/memory/README.md | Project memory evidence and invalidation rules. | Before adding evidence, source hashes, retrieval records, or invalidations. | Project Assistant | Evidence schema, retrieval index, or invalidation policy changes. | Evidence JSONL and invalidation JSONL parse correctly. |
| docs/memory/retrieval-index.json | Machine-readable project memory retrieval index. | Before summarizing or routing project memory reads. | Project Assistant | Durable docs, summaries, or memory routes change. | JSON parses and paths exist or are marked missing. |
| docs/memory/maintenance.json | Project memory maintenance setup and safety policy. | Before changing project maintenance hooks or schedules. | Project Assistant / Rule Governor | Maintenance setup, hook policy, or schedule assumptions change. | JSON parses and setup remains idempotent. |
| docs/memory/evidence/index.jsonl | Evidence records for durable project memory and KG entries. | Before verifying durable memory claims. | Project Assistant | New durable memory or KG evidence is recorded. | Each non-empty line is valid JSON with required fields. |
| docs/memory/invalidations.jsonl | Invalidated or superseded memory records. | Before trusting old project facts. | Project Assistant | Project facts, graph nodes, docs, APIs, or modules are superseded. | Each non-empty line is valid JSON with required fields. |
