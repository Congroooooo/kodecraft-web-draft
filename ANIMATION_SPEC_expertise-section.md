# Animation Spec — "Expertise / Scaling Infrastructure" Section

This section is a **scroll-driven, pinned sequence**: the section locks to the
viewport while the user scrolls, and scroll progress (not time) drives every
animation. The user scrolls "through" two connected statements before the page
continues. On touch / reduced-motion devices it should degrade to a simple
stacked layout with autoplaying muted video (see *Fallbacks* at the end).

Total scroll length of the pinned scene: roughly **2–2.5 viewport heights** of
scroll, split across the two phases below.

---

## Overall behaviour

- The section **pins** (sticks) to the screen as it enters. While pinned, the
  page does not visually scroll — instead the user's scroll input is mapped to a
  0→100% timeline that plays the choreography below. Once the timeline finishes,
  the section unpins and normal scrolling resumes.
- A single **media frame** (a video clip inside a rounded-corner container) is
  the hero element. It is reused across both phases — it grows, repositions, and
  swaps its footage rather than being two separate elements.
- A faint **background grid** (thin vertical + horizontal guide lines) sits
  behind everything on the dark background and stays static. It reinforces a
  technical / blueprint feel.
- Background is near-black throughout; text is light grey/white.

---

## Phase 1 — "Cipher brings together…" (scroll 0% → ~55%)

**Start state (0%)**
- The media frame is a **small square**, centered horizontally and vertically in
  the viewport. Nothing else is visible — no text, no button.
- Inside the frame, a **drone time-lapse of the data-center construction site**
  is already playing.

**As the user scrolls (0% → ~30%)**
- The frame **scales up** and **translates to the right**, settling into the
  right half of the screen as a larger square. Movement is smooth and eased
  (slow-out), not linear — it should feel like it glides into place and settles.
- As the frame clears the left side, the paragraph text **fades in and rises
  slightly** (a few pixels of upward travel) on the left:
  > *"Cipher brings together deep expertise across power sourcing,
  > construction, engineering, operations, real estate, and technology to
  > deliver high-quality data centers purpose built for HPC workloads."*
- The text reveal is staggered/eased so it feels like it "arrives" just after
  the frame docks, not at the same instant.

**Continuing (~30% → ~50%)**
- The **"Our Expertise" button** fades in below the paragraph (slight upward
  rise, same easing as the text — it lands last).
- The frame continues to **grow taller**, expanding toward the top and bottom
  edges of its column so it reads as a tall portrait panel by the end.
- Throughout, the **construction time-lapse keeps progressing** inside the frame
  — bare ground → foundations → poured slabs → the building taking shape. This
  sells the "we build, fast" story. The footage should advance with scroll
  (scrubbed) for the premium feel, or autoplay on loop as a simpler option.

**End of Phase 1 (~50–55%)**
- Frame is a large panel on the right; full paragraph + button visible on the
  left. Layout holds briefly (a small "dwell" in the scroll timeline) so the
  reader can absorb the copy before the transition begins.

---

## Phase 2 — "Rapidly scaling…" full-bleed reveal (scroll ~55% → 100%)

**Transition (~55% → ~75%)**
- The left-side text and button **fade out** (and drift slightly) as the frame
  takes over.
- The media frame **re-centers and scales up dramatically toward full screen**,
  moving from the right column back to the middle and expanding outward in all
  directions.
- At the same time the footage **cross-fades / swaps** from the construction
  time-lapse to a **cinematic wide desert-and-mountains landscape clip** (warm,
  golden-hour). The swap should be a soft cross-dissolve, not a hard cut.

**Climax (~75% → ~95%)**
- The frame reaches **full-bleed** — it fills the entire viewport edge to edge,
  corners squared off (the rounded container effectively becomes the whole
  screen).
- A new centered caption **fades in** over the video:
  > *"Rapidly scaling data center infrastructure today, to power the potential
  > of tomorrow."*
- The caption fades up gently and sits centered; the landscape footage continues
  to play (slow drifting clouds) behind it.

**End (95% → 100%)**
- Full-screen video + caption hold for a beat, then the section **unpins** and
  the page scrolls on to whatever follows.

---

## Easing & timing notes (for the developer)

- Use **eased** motion everywhere (e.g. `cubic-bezier(0.4, 0, 0.2, 1)` style /
  "ease-out" feel). Avoid linear scroll-mapping — it feels mechanical.
- Tie animations to **scroll progress**, not fixed durations, so the speed
  always matches how fast the user scrolls. Library suggestion: GSAP
  ScrollTrigger with `scrub`, or Lenis + a scroll-progress timeline.
- Elements should reveal in a **staggered order**: frame docks → paragraph →
  button. Same on exit: text/button leave before the frame goes full-bleed.
- Keep transforms on `transform` (scale/translate) and `opacity` only, for
  GPU-smooth 60fps performance. Don't animate width/height/top/left directly.
- The two video clips should be **preloaded** so the cross-fade in Phase 2 has
  no stall.

## Fallbacks (mobile / reduced motion)

- On small screens, drop the pin-and-scrub. Stack vertically: video on top,
  copy below, button below that, for each statement. Videos autoplay muted,
  loop, `playsinline`.
- Respect `prefers-reduced-motion`: show final states with simple fades only —
  no scaling, no pinning, no scroll-scrubbing.

---

## One-paragraph summary (for the client)

As the visitor scrolls into this section, the page locks in place and a small
centered video of the construction site glides to the right and grows while the
"Cipher brings together…" copy and an "Our Expertise" button fade in on the
left. The construction time-lapse plays as the frame expands. Continuing to
scroll, the copy fades away and the video re-centers and expands to fill the
whole screen, cross-fading into a cinematic desert landscape, with the headline
"Rapidly scaling data center infrastructure today, to power the potential of
tomorrow." fading in over it. The whole thing is choreographed to scroll
position, so the visitor controls the pace.
