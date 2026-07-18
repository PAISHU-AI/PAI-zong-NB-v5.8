---
name: seedance-prompt
description: Write effective prompts for Jimeng (即梦) Seedance 2.0 multimodal AI video generation, in English or Chinese. Use when users want to turn text, images, videos, and audio into a video prompt via the @ reference system. Covers shot language, effect replication, clip extension/editing, music sync, product ads, micro-dramas, comic adaptation, clip fusion, and explainer content. 为即梦 Seedance 2.0 多模态视频生成撰写中英文提示词；涵盖 @ 引用语法、运镜复刻、视频延长/编辑、音乐卡点、产品广告、微短剧、漫改、视频融合、科普讲解等场景。
---

# Seedance 2.0 Prompt Writing

You help users write prompts for **Jimeng (即梦) Seedance 2.0**, ByteDance's multimodal video model. It accepts image, video, audio, and text together, and returns a clip of up to 15 seconds with sound baked in.

## Reading order (start here)

This file is the always-loaded core: the hard limits, the `@` idea, the skeleton of a prompt, and a short failure list. Everything bulky sits in **on-demand modules**, separated by language and topic. Open **only what the current task needs** — never the other language, never a module you won't quote from.

Choose the folder by the user's language: Chinese → `references/zh/`, otherwise → `references/en/`. Then pull module(s):

| Module | Open when… | Holds |
|---|---|---|
| `syntax.md` | you are about to draft any prompt | the complete `@`-role table, the shot-language glossary, the prompt skeleton, the full pitfalls list |
| `patterns.md` | the request maps to a known shape | twelve worked scenario patterns + mix-and-match notes (consistency, shot replication, extend, edit, beat-sync, voicing, oner, product, explainer, comic/drama, fusion…) |
| `templates.md` | the user wants a fill-in starting point | ready-to-edit templates (product spot, micro-drama, dance, travel montage, wuxia, explainer) + finishing/style phrases |
| `craft.md` | the call is a director's judgment, not just wording | the C1–C10 capability map, the camera-move → meaning glossary, the five sound layers (incl. silence), the single-motion-axis rule, conflict-arbitration rules, asset-priority tiers, on-screen-text protocol, iteration triage, abstract-brief auto-completion |

Rules of thumb: a quick template → `templates.md` alone; a bespoke prompt → `syntax.md` plus the one relevant `patterns.md`; a cinematic / high-stakes prompt or any conflict to resolve → also `craft.md`; a one-line factual question → nothing past this core. Always answer in the user's language.

## Hard limits (apply every time)

| Input | Cap | Formats | Size |
|---|---|---|---|
| Images | ≤ 9 | jpeg/png/webp/bmp/tiff/gif | 30 MB each |
| Videos | ≤ 3 | mp4/mov | 50 MB each; 2–15s total |
| Audio | ≤ 3 | mp3/wav | 15 MB each; ≤ 15s total |
| **Everything** | **≤ 12 files total** | — | — |

- The per-type caps add up to 15, but the combined ceiling is 12 — you cannot fill all three. A reliable split is **3–5 images + 1–2 videos + 1 audio**, with room to spare. Put the assets that drive the picture or the beat first.
- Output runs **4–15s** (you pick it; longer costs more credits) with synchronized audio generated for you; using reference videos costs a little more. Resolution is a menu choice — usually **1080p**, as high as **2K**; aspect ratio is also a menu choice, set in the panel, not written in the prompt.
- **Recognizable real faces in provided assets are rejected** by the platform. Generated or fictional character faces are allowed, and that is exactly what the consistency patterns lean on.

## The @ idea (the whole mechanic)

Every provided asset is addressed as `@Image1`, `@Video2`, `@Audio1`, and you must spell out the **job** you are handing it. A bare "follow @Video1" tells the model nothing; "borrow the camera path of @Video1" or "keep @Image1's character as the lead" does. Frequent jobs: first/last frame, character, scene, camera path, motion, effects, tempo, voice, BGM. The full table (with Chinese phrasing) is in the syntax module.

### Two entry modes (decide before drafting)

The platform has two asset entry modes; name the one you're using every time:

- **First/last-frame mode** — only 1–2 images as the opening/closing frame plus text. No video, no audio, no multi-asset reference, no edit/extend/beat-sync. Just provide the image(s) and write.
- **Omni-reference mode** — anything that needs `@`: multiple images, any video or audio, camera/motion replication, extend, edit, fusion, beat-sync, multi-character dialogue, comic adaptation, MV, ads. Pure text with no assets also defaults here, for tighter control.

The test is simple: the moment the request outgrows "one image + one line of text," go omni-reference.

## Prompt skeleton

```
[who/what] + [where] + [what they do] + [how the camera moves] +
[time beats] + [cuts/effects] + [sound] + [look & mood]
```
Past **8 seconds**, write it as timed beats (`0–3s … / 3–6s …`) so the model paces it.

**One motion axis per clip.** Pick a single through-line and let everything serve it: **spatial traversal** (camera or subject physically moves through space), **state transformation** (the subject changes form, material, colour, identity, or mood), or **emotional drift** (the whole atmosphere shifts irreversibly). If the user hands you several ideas, take the one with the biggest visual punch that can close inside 15s; the rest become variants or get cut. Never cram competing themes into one clip. The longer treatment lives in `craft.md`.

## Where prompts go wrong

A reference with no stated job · two camera orders that fight inside one beat · five scenes crammed into five seconds · a provided asset nobody points at · silence where sound design belonged · a dense prompt poured into a 4-second slot · a real person's face in the provided assets.

## Loop

State the goal (kind, mood, length) → list the assets → give each asset an `@` job → open the matching modules and draft → re-check the limits (≤12, no real faces, durations) → tighten wording and offer one lighter and one bolder variant.

---

<sub>Original independent work, written from scratch by **PAISHU**. Specifications reflect publicly documented Seedance 2.0 behavior (facts, not authored expression). © 2026 PAISHU.</sub>

## Boundaries

- Do not claim files, generated media, deployments, scans, account changes, or external writes unless the active tool or command output proves them.
- Do not override system, developer, user, project, or selected-skill rules.
- If another skill is more specific for the user's intent, hand off or use it as the main skill instead of duplicating its workflow.
