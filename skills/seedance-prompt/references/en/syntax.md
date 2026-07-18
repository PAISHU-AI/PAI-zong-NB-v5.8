# Seedance 2.0 — @ Syntax, Shot Language & Skeleton (English)

> On-demand module. Hard limits and the loop live in SKILL.md.

## Addressing assets with @

Each provided asset is named in order: images become `@Image1 … @Image9`, videos `@Video1 … @Video3`, audio `@Audio1 … @Audio3`. The skill of prompting Seedance is almost entirely about telling the model what role each named asset plays. State the role out loud — the model does not guess well from a bare mention.

| What you want the asset to do | Phrasing that works |
|---|---|
| Open on this frame | `start on @Image1` |
| End on this frame | `land the final frame on @Image2` |
| Be the character | `the lead is @Image1's character` |
| Set the location | `place it in @Image3's setting` |
| Drive the camera path | `borrow the camera path of @Video1` |
| Drive the motion | `copy the body movement in @Video1` |
| Drive effects & cuts | `match @Video1's transitions and effects exactly` |
| Set the pacing | `cut to the tempo of @Video1` |
| Set the voice | `voice the narration like @Video1` |
| Set the music | `score it with @Audio1` |
| Set sound effects | `pull the foley from @Video2` |
| Dress the character | `dress the lead in @Image2's outfit` |
| Define the product look | `keep the product faithful to @Image3` |
| Define on-screen type | `match the title style in @Image2` |

Stack several in one line when needed:
```
lead is @Image1's character, borrow @Video1's camera path and timing,
score with @Audio1, place it in @Image2's setting
```

## Shot-language glossary

These are standard cinematography terms; use them verbatim and the model honors them.

**Camera moves** — push in / pull out; pan left-right; tilt up-down; track (follow the subject); orbit (circle the subject); locked-off (no movement); oner (one unbroken take).

**Specialty moves** — dolly zoom (the "vertigo" push-and-zoom); fisheye; low angle (looking up, makes a subject loom); high angle / top-down; first-person POV; whip pan (a blurred snap sideways); jib/crane (rising or falling arc); rig-mounted multi-angle follow.

**Framing** — extreme detail (an eye, a hand); tight on the face; head-and-shoulders; mid (waist up); full body; wide / establishing (the whole space).

## The skeleton, expanded

Build outward from the subject:
```
[who or what is on screen]
[the space around them]
[the action, in plain verbs]
[the camera move]
[timed beats if over 8s]
[any cut or effect]
[music, foley, voice]
[overall look and mood]
```
For anything past eight seconds, slice it into beats so the model controls pace rather than rushing:
```
0–3s   establish, set the camera in motion
3–7s   the main action develops
7–11s  the turn or the peak
11–15s settle, last frame, any title card
```

## Where it breaks

- A reference with no job ("use @Video1") — say which layer to take: path? motion? cut? beat?
- Orders that contradict inside one beat — "locked-off" and "orbit" cannot both be true at 0–3s.
- Too much packed into too little — a four-second slot holds one clear action, not four scenes.
- An orphan asset — if you bring nine images, every one needs a stated job.
- No sound plan — the audio is generated; steer it or take what you get.
- Complexity that outruns the runtime — match how much you ask for to the seconds you selected.
- A real, identifiable face in the provided assets — it will be refused; use a generated character instead.
