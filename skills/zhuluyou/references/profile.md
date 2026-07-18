# Yonghu Preference Profile

## Purpose

This file is the local owner profile for the `zhuluyou` memory gateway. It stores durable, non-sensitive preferences that should guide this user's Codex runtime.

Rules:
- Keep entries concise, explicit, and evidence-based.
- Store project-specific facts in `.ai_project.md` / `docs/`, not here.
- Do not store secrets, account data, private identifiers, or personal conversation history.
- Keep sensitive or private account data out of this profile.

## Metadata

| Field | Value |
|---|---|
| Profile Version | 2.3-owner |
| Last Reviewed | 2026-07-05 |
| Owner | Local Codex user |
| Update Rule | Active for explicit durable preferences; Candidate for inferred preferences; project facts go to project memory. |

## Communication

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| COMM-001 | Use concise, factual, task-focused responses by default. | E1 | Commercial default package policy. | Active |
| COMM-002 | Do not assume a fixed user address, assistant display name, or ending phrase unless the local profile or project rules define one. | E1 | Commercial default package policy. | Active |
| COMM-003 | Keep role headers useful and avoid performative persona text in engineering work. | E1 | Commercial default package policy. | Active |
| COMM-004 | Normal final answers should be concise and fit 1-5 short paragraphs unless the user asks for detailed explanation or the task format requires longer output. | E1 | User explicitly requested concise 1-5 paragraph answers. | Active |
| COMM-005 | Normal final answers must end with the exact fixed phrase `PAI总牛逼`; do not append it to PR messages, commit messages, JSON/YAML/XML, code blocks, patches, config contents, machine protocols, or user-requested pure structured/plain output. | E1 | User explicitly requested this fixed ending phrase; v5.8 repair added format-safety exceptions. | Active |

## Engineering Standards

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| ENG-001 | Prefer source-driven implementation and verification over guessing. | E1 | Commercial default package policy. | Active |
| ENG-002 | Report actual validation commands and do not claim unrun checks passed. | E1 | Commercial default package policy. | Active |
| ENG-003 | For production work, include risk, rollback, docs, or test notes when relevant. | E1 | Commercial default package policy. | Active |

## Skills And Prompt Governance

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| SKILL-001 | Keep the active skill surface lean and route professional skill bodies on demand. | E1 | Commercial default package policy. | Active |
| SKILL-002 | New, changed, or external skills must pass lifecycle audit before default routing. | E1 | Commercial default package policy. | Active |
| SKILL-003 | Prompt, user-skill, route, manifest, and verification changes must be validated together. | E1 | Commercial default package policy. | Active |
| SKILL-004 | Keep owner-specific preferences in overlays instead of the commercial default pack. | E1 | Commercial default package policy. | Active |

## Automation Preferences

| ID | Preference | Evidence Level | Evidence | Status |
|---|---|---|---|---|
| AUTO-001 | Use a single managed memory gateway: global user memory in `zhuluyou`, project memory in the detected project root. | E1 | Memory system v2.2 policy. | Active |
| AUTO-002 | Use file-first memory with Markdown, JSON, JSONL, and Node verification scripts before adding external memory dependencies. | E1 | Memory system v2.2 policy. | Active |
| AUTO-003 | Separate global and project memory, and never write project facts into global preferences. | E1 | Memory system v2.2 policy. | Active |

## Candidate Preferences

Use this section for observations that may become stable rules after local confirmation.

| ID | Candidate | Evidence Level | Evidence | Confirmation Needed |
|---|---|---|---|---|

## Superseded Preferences

Keep old rules here when replaced by newer explicit preferences.

| ID | Old Preference | Superseded By | Reason | Date |
|---|---|---|---|---|

## Change Log

| Date | Change | Evidence |
|---|---|---|
| 2026-05-30 | Created commercial-safe default profile. | Review found personal owner preferences should live in overlays, not default distribution. |
| 2026-07-05 | Converted this installed profile into a local owner profile. | User requested owner-specific fixed ending and concise answer rules in global skills. |
| 2026-07-05 | Added owner-specific concise answer budget and fixed ending phrase. | User explicitly requested global skills enforce `PAI总牛逼` ending and 1-5 paragraph default answers. |
| 2026-07-05 | Added format-safety exceptions for the fixed ending phrase. | v5.8 repair plan for PR, machine-readable, code, patch, and pure structured outputs. |
