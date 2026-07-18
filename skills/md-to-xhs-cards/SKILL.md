---
name: md-to-xhs-cards
description: Convert Markdown, outlines, articles, or structured notes into Xiaohongshu or Rednote card sequences with cover card, inner cards, page splits, visual hierarchy, and render-ready content.
---

# md-to-xhs-cards

## Purpose

Convert existing Markdown-like content into a Xiaohongshu card sequence without losing structure.

## Workflow

1. Parse the source hierarchy: title, sections, lists, quotes, data, and image references.
2. Choose card count and aspect ratio; default to 3:4 vertical cards.
3. Create a cover card with a short hook and clear promise.
4. Split content into inner cards with one concept per card.
5. Preserve ordering and source meaning; shorten text only when needed for readability.
6. Provide render instructions for HTML, design tools, or image generation tools if available.

## Required Checks

- Do not overload a card with dense text.
- Keep source claims intact; mark missing evidence.
- If no image-rendering tool is available, output render-ready Markdown and layout specs instead of claiming image files were created.

## Output

Return card list with cover, page-by-page copy, layout notes, image placeholders, and rendering checklist.
