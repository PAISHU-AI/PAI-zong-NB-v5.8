# Seedance 2.0 — Craft: capabilities · motion axis · camera meaning · sound · conflicts · iteration (English)

> On-demand module. Hard limits and the loop live in SKILL.md; the `@` table and camera glossary live in syntax.md.
> This file holds the director-level judgments: choosing a motion axis, giving each camera move a motive, layering sound, arbitrating asset conflicts, handling iteration, and auto-completing an abstract brief. Open it when the call is a craft decision, not just wording.

## Two entry modes (decide first, every time)

- **First/last-frame mode** — only 1–2 images as opening/closing frame plus text. No video, no audio, no multi-asset reference, no edit/extend/beat-sync. Just provide the image(s) and write. (Smart multi-frame and subject-reference are unavailable here.)
- **Omni-reference mode** — anything needing `@`: multiple images, any video/audio, camera/motion replication, extend, edit, fusion, beat-sync, multi-character dialogue, comic adaptation, MV, documentary, ads.
- **Pure text, no assets** — defaults to omni-reference, for tighter control.
- **The test**: the moment the request outgrows "one image + one line of text," go omni-reference.

## The ten core capabilities (C1–C10 · name them before you use them)

| ID | Capability | One line | Maps to patterns |
|----|-----------|----------|------------------|
| C1 | Consistency | faces / clothing / product / type / scene style stay stable | 1 |
| C2 | Camera & motion replication | drop a ref video, replicate blocking/camera/complex action | 2 |
| C3 | Effect/template replication | replicate transitions, edits, the visual structure of a reference | 3 |
| C4 | Story completion | a few images + one line → full beats and plot | 10, 11 |
| C5 | Extension | extend forward/back; **output length = the new piece only** | 4 |
| C6 | Sound control | BGM / SFX / narration / dialogue / song / dialect / opera | 7 |
| C7 | Oner | traverse multiple spaces with no cut | 8 |
| C8 | Edit | swap character, change wardrobe, invert plot, tweak local action | 5 |
| C9 | Beat-sync | cuts land on the reference audio/video beat | 6 |
| C10 | Emotion | expression / body / breath / outburst / transformation arc | 1, 7 |

## One motion axis per clip (pick one)

- **Spatial traversal** — camera or subject physically moves through space: macro to wide, street up to rooftop, cabin out to the clouds, through a door into another space.
- **State transformation** — the subject shifts form, material, colour, identity, or mood: ice melting, metal rusting, a flower opening, a character morphing, a city turning from day to night.
- **Emotional drift** — the whole atmosphere moves irreversibly: tender to unhinged, order to chaos, restraint to outburst, calm to dread.

Given several ideas, take the one with the biggest visual punch that can close inside 15s; the rest become variants or get cut. One idea per clip — never cram competing themes into 15 seconds.

## What each camera move *means* (motive, not just term)

The glossary sits in syntax.md; here is *why* you'd use each. Camera serves story — don't pile up terms.

- **Push in** — closing on the truth, pressure, intimacy, rising heat.
- **Pull back** — reveal, distance, afterglow, reversal.
- **Orbit** — scrutiny, fascination, entrapment, ritual.
- **Follow** — companionship, pursuit, vérité, immersion.
- **Low angle** — power, heroism, oppression.
- **High angle** — loneliness, smallness, fate.
- **Whip / fast pan** — surprise, turn, beat-cut, comic contrast.
- **Locked-off** — restraint, cold observation, absurdity, documentary truth.

## Light & material (answer before you roll)

- **Light is the first actor** — state source, direction, colour temperature, shadow, occlusion, or how light changes. No light note = a flat picture.
- **Material carries emotion** — metal/glass/water/fire/skin/cloth/dust/mist/concrete all serve the mood; they aren't set dressing.
- **One anti-cliché detail** — plant at least one high-entropy beat: an off light flare, particle drift, material fracture, an unexpected motion, a sound/image mismatch. This is what makes it memorable.

## Sound is the second picture (five layers + silence)

Audio is generated — either steer it or accept the default. **Even with no audio asset, give at least one sound layer.**

- **Ambience** — builds the space: wind, rain, city low-end, room hum, footsteps, fabric rustle.
- **Score** — drives the emotion curve: style, tempo, swell, whether it references `@Audio`/`@Video`.
- **Voice** — write the line, language/dialect, tone, emotion; if there's a voice reference, name the source (`voice like @VideoX / @AudioX`).
- **SFX** — transitions, impacts, appearances, exits, beat hits, dramatic stops.
- **Silence** — for pressure, reversal, an emotional break. Silence is part of the design, not an absence.

When layers stack, state a **priority** so they don't mask each other (e.g. "voice over score, ambience underneath").

## On-screen text protocol (all five when text appears)

Full text content + when it appears + where + how it animates + how it leaves.

- Animation: fade in / pop from centre / reveal by mask / pop then fade.
- Position: middle of frame / lower third / behind the subject.
- Multiple lines written line by line. Short phrases first; lines past ~10 characters distort — split them. English type renders more reliably than complex Chinese glyphs, which may need retries.

## Asset-priority tiers (when near the cap, cut weak, keep strong)

Combined ceiling is 12 files. The per-type caps (img ≤9 / video ≤3 / audio ≤3) sum to 15 but the floor is 12 — you can't fill all three. A reliable split: 3–5 images + 1–2 videos + 1 audio. Near the cap, triage by priority:

1. **Lock identity** (highest): faces, product appearance, brand logo.
2. **Lock motion/tempo**: reference video, reference audio.
3. **Lock mood/style** (lowest): scene image, palette image, poster — cut these first.

Note: input reference video pixel range is 640×640 to 834×1112; on an extension task, output length **must** equal the new piece's length.

## Conflict arbitration (flag it, never decide in silence)

On a conflict, name it in the reply and give an arbitration suggestion — don't quietly pick for the user.

| Conflict | Default arbitration |
|----------|--------------------|
| First-frame composition vs reference-video composition | first frame wins; take only the motion tempo from the video |
| Video tempo vs audio tempo | pick one as lead; the other is ambience-only |
| Multiple images clash in style | name one style source; other images contribute only character or props |
| Text brief vs visual asset | state which parts of the asset are used, which ignored |
| Edit goal vs original continuity | keep original shots/light/tempo; change only the named local part |

## Iteration triage (when the user isn't happy, diagnose before acting)

- **Whole direction wrong** → rewrite the prompt (swap the motion axis or the narrative entry).
- **Local problem** → use edit: `change [object/clip section] in @Video1 to [new], leave shots/light/tempo/background intact`.
- **Too short** → use extension (output length = the new piece).
- **Pacing off** → adjust the motion axis, the sound layers, the timed-beat splits.

## Abstract-brief auto-completion (don't ask "what style do you want?")

When the user gives only a short word or abstract mood ("out of control", "the weight of time", "a gentle explosion"), **default to one fully-realized cinematic treatment**, with a second direction as a variant. Completion rules:

- Subject: the visual symbol that best carries the word.
- Scene: the space that amplifies the emotion.
- Camera: one clean motion axis.
- Sound: a design that sharpens the contrast.
- Ending: leave an afterglow or a reversal.

## When to offer variants (not every time)

Only output variants when: (1) the brief is highly abstract (above); (2) the commercial need has multiple positionings (premium / youthful / experimental / realist); (3) the assets can credibly go different ways; (4) the user asks for multiple versions. A variant changes only the narrative entry, camera strategy, or sound/image relationship — it does not restate the main take.

## Optional · full delivery structure (attach when the user wants a "treatment", not just the prompt)

The skill defaults to handing over only the copy-paste prompt block (users want the instruction, not a lecture). If the user explicitly wants a full treatment, wrap the block with:

- **Plan overview**: entry mode / creation type / capabilities used (C1–C10) / suggested length / asset allocation (mark use · reference · edit) / conflict flags.
- **Director's notes**: energy arc (how the visual weight migrates, the pacing curve) / anti-cliché detail / sound-image relationship (sync · counterpoint · silence · beat) / generation tips (2–3 operational notes; for iteration tasks, add adjustment notes).

## Pre-ship default check

Copy-paste ready · every asset is `@`-referenced · first frame / process / ending all specified · sound designed · no contradictory orders · exactly one motion axis · time progression present · on-screen text has all five fields · extension states "output = new piece" · no empty words standing in for concrete shots · the user's intended *effect* is translated into executable shots. If any fails, rewrite the prompt section.
