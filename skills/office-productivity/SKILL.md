---
name: office-productivity
description: Use for documents, spreadsheets, presentations, PDFs, reports, templates, tables, CSV-style outputs, slide outlines, meeting notes, and office-productivity workflows. Use runtime document/spreadsheet/presentation/PDF skills when exposed; otherwise provide Markdown, CSV, or structured outlines and state the limitation.
---

# Office Productivity

## Purpose

Create and transform office-style deliverables while staying honest about available tools.

Use this for:
- Word/Markdown documents, reports, and templates.
- Spreadsheet tables, CSV, formulas, and analysis-ready layouts.
- Presentation outlines, slide copy, speaker notes.
- PDF extraction, summary, inspection, or report preparation.
- Meeting notes, action lists, and structured office outputs.

## Workflow

1. Determine deliverable type: document, sheet, presentation, PDF, table, or notes.
2. Check whether runtime office skills or tools are available for the requested format.
3. If available, use the matching runtime capability.
4. If unavailable, produce a portable fallback:
   - Markdown for documents/reports.
   - CSV or Markdown table for spreadsheets.
   - Slide-by-slide outline for presentations.
   - Structured summary for PDFs.
5. State any limitation when the requested binary file cannot be created in the current runtime.

## Required Checks

- Do not claim a `.docx`, `.xlsx`, `.pptx`, or PDF was created unless a real file was written or a runtime tool produced it.
- Keep tables deterministic and labeled.
- For extracted or summarized source documents, identify the source and any inaccessible pages/sections.
- For business reports, separate source data, assumptions, and conclusions.

## Avoid

- Do not silently fabricate spreadsheet calculations or source data.
- Do not promise file conversion when only text output is possible.
- Do not embed sensitive personal or credential data in reusable templates.

## Output

Prefer the requested office format. If tools are unavailable, return a clear fallback:

```markdown
当前运行时未暴露可写入该格式的工具；以下为可复制到目标文件的结构化内容。
```

