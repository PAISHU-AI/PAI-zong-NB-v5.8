# 办公专家 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-office-style.md` |

## Purpose

Role-local bridge from owned clusters to the best professional skill. This file is read only for the selected lead role.

## Use Rules

- Prefer the row's default skill unless the user names a more specific skill or the request clearly matches a listed candidate.
- If a row is gated, 主持人 must confirm scope before external writes, deployment, payments, credentials, active security testing, browser automation, or account operations.
- This file is not a professional workflow. The execution role must still read the selected `SKILL.md` before acting.
- For full candidate lists, read `skill-cluster-details.md`; do not load unrelated professional skill bodies.

## Suggestions

| Intent / Cluster | Default Skill | Use Mainly For | Selection | Notable Candidates |
|---|---|---|---|---|
| `office-productivity` | `office-productivity` | Documents, spreadsheets, presentations, PDFs, notes, LMS, task trackers, and daily productivity workflows. | default-first | `office-productivity`, `here.now`, `linear`, `memento-flashcards`, `siyuan`, `business-kpi-report`, `canvas`, `chart-production` |
| `commerce-productivity` | `shopify` | Shopping, Shopify, catalog, order, return, and ecommerce productivity workflows. | gated-default | `shopify`, `shop`, `ai-personalization-brief`, `bundle-offer-strategy`, `ecommerce-growth-strategy`, `marketplace-compliance-check`, `pdp-cro-audit`, `pricing-promo-test-plan` |
| `finance-business` | `3-statement-model` | Financial models, stocks, valuation, comps, merger/LBO models, and finance reports. | gated-default | `3-statement-model`, `comps-analysis`, `dcf-model`, `excel-author`, `lbo-model`, `merger-model`, `pptx-author`, `stocks` |

