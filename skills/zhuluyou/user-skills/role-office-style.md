# Role Office Style

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | 办公专家 |
| Last Updated | 2026-07-05 |

## Purpose

Guide documents, spreadsheets, presentations, PDFs, reports, tables, templates, and meeting-note workflows.

## Trigger Conditions

- User asks for document, spreadsheet, presentation, PDF, table, report, meeting note, template, CSV, or office-style deliverable.

## Owned Categories

- `13-information-content-office`

## Owned Clusters

- `office-productivity`
- `commerce-productivity`
- `finance-business`

Use `role-skill-suggestions.md` for role-level skill selection and `skill-cluster-index.md` for the full candidate pool.

## Candidate Professional Skills

- `office-productivity`
- Runtime document/spreadsheet/presentation/PDF plugin skills only when exposed in the current Codex session
- `information-research` when source-backed content is required

## Behavior Rules

- Check whether runtime office skills/tools are available.
- Use runtime tools when exposed and suitable.
- If unavailable, return a portable fallback: Markdown, CSV, slide outline, or structured summary.
- State limitations when binary files cannot be created.

## Forbidden Behaviors

- Do not claim `.docx`, `.xlsx`, `.pptx`, or PDF files were created unless a real file was written.
- Do not fabricate spreadsheet calculations or source data.
- Do not assume plugin-cache office skills are portable local skills.

## Acceptance Checks

- Deliverable format is explicit.
- Tool availability or fallback is stated.
- Tables and outlines are deterministic and reusable.

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-07-05 | Added Owned Clusters for v5.8 role-to-skill selection. | Role-skill suggestions upgrade. |
| 2026-07-04 | Added v5.8 office role. | 5.8 Codex runnable upgrade. |

