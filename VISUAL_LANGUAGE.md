# ONI Visual Language

## Keywords

- cinematic
- architectural
- restrained
- atmospheric
- editorial
- gallery-like
- premium minimalism

---

## Avoid

- startup aesthetics
- glossy SaaS visuals
- random gradients
- visual overload
- motion spam
- over-Awwwards chaos
- dashboard UI feeling
- excessive shadows
- decorative elements that compete for attention

---

## Color

| Role        | Value     |
|-------------|-----------|
| Background  | `#ffffff` |
| Foreground  | `#000000` |
| Accent      | `#FF4A1A` |
| Muted text  | `#737373` (neutral-500) |
| Rule lines  | `#e5e5e5` (neutral-200) |
| Geometric   | `#ededed` — `#f2f2f2` range |

Accent (`#FF4A1A`) is reserved for:
- section labels
- CTA buttons
- accent rules beneath headings
- arrow icons / directional indicators

Never use accent as a background fill beyond the CTA button.

Selection uses a separate, lower-intensity accent residue (`rgba(255, 98, 0, 0.14)`) — related to the accent family but not interchangeable with `#FF4A1A` fills or rules.

---

## Interaction

ONI interaction states are infrastructural and atmospheric — not playful, gamified, neon cyberpunk, or aggressively animated.

### Text selection (signal activation)

Browser default selection is replaced globally. Selecting text should feel like:

- signal activation inside the ONI field
- archive inspection
- temporary metadata exposure
- a restrained system response

It should **not** read as a generic web highlight, UI accent block, or saturated orange fill.

| Property   | Value                         |
|------------|-------------------------------|
| Background | `rgba(255, 98, 0, 0.14)`      |
| Foreground | `#111111`                     |

Implemented in `app/globals.css` via `::selection` and `::-moz-selection` only (no component or JS changes). Typography clarity and contrast are preserved; edge softening is limited to a minimal `text-shadow` on the selection itself.

### Interaction layer (direction)

Selection is one piece of the broader **ONI Interaction Layer**, alongside:

- hover states (opacity-first)
- focus states
- signal markers
- dormant infrastructure states
- archive activation behaviors

All of these share the same register: restrained, infrastructural, atmospheric.

---

## Typography

### Typefaces

| Variable        | Font       | Usage                         |
|-----------------|------------|-------------------------------|
| `--font-bebas`  | Bebas Neue | Hero display, decorative type |
| `--font-inter`  | Inter      | All body copy, UI, labels     |

### Feel

Typography should feel:

- oversized and editorial in display contexts
- calm and spacious
- architectural — letterforms as structural elements
- high tracking in labels (`tracking-[0.22em]` — `tracking-[0.28em]`)
- tight or zero tracking in display headings

### Scale reference

| Context         | Size                        |
|-----------------|-----------------------------|
| Hero display    | `clamp(5.75rem, 20vw, 15rem)` |
| Contact heading | `clamp(3rem, 13vw, 9rem)`   |
| Section label   | `11px` / `tracking-[0.28em]` |
| Body            | `0.9375rem` — `1.02rem`     |

---

## Motion

Motion should feel:

- slow
- cinematic
- ambient
- intentional
- spatial

Avoid:

- aggressive easing curves
- excessive particle effects
- loud entrance animations
- constant movement / looping animations that distract
- motion that blocks interaction

---

## Layout

Layouts should feel:

- gallery-like and breathable
- balanced with generous whitespace
- cinematic — wide, horizontal compositions
- modular — each section a contained world

Avoid:

- cramped card grids
- generic dashboard rhythm
- uniform small gutters
- content touching viewport edges on mobile

---

## PageBackdrop

The backdrop is a single geometric SVG artboard spanning the full page.

Rules:
- it is purely decorative — `pointer-events-none`, `aria-hidden`
- it must never affect layout or create overflow
- geometric lines use neutral tones (`#e5e5e5` range)
- orange anchors (`#FF4A1A`) are accent punctuation, used sparingly
- annotative labels (`PRSM 001`, `ONI`) reinforce the editorial register
