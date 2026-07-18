# 安全专家 Skill Suggestions

| Field | Value |
|---|---|
| Status | Active |
| Version | 5.8 |
| Owner | Rule Governor |
| Generated | Yes |
| Role File | `role-security-style.md` |

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
| `security-hardening` | `security-review-pro` | Security review, hardening, threat models, secrets, permissions, and sensitive flows. | default-first | `security-review-pro`, `1password`, `security`, `security-and-hardening`, `security-best-practices`, `security-scan`, `security-threat-model` |
| `security-redteam-privacy` | `security-bounty-hunter` | Pentest, bounty, OSINT, privacy removal, forensics, and adversarial security workflows. | gated-default | `security-bounty-hunter`, `godmode`, `oss-forensics`, `sherlock`, `unbroker`, `web-pentest` |
| `payments-blockchain-secrets` | `security-review-pro` | Payments, Stripe, wallets, blockchain, keys, account credentials, and finance-sensitive integrations. | gated-default | `security-review-pro`, `evm`, `hyperliquid`, `mpp-agent`, `solana`, `stripe-link-cli`, `stripe-projects` |

