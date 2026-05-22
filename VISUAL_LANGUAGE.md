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
- accent rules beneath headings
- environmental activation fields (e.g. ContactFooter poster residue on CTA hover)
- arrow icons / directional indicators

Primary calls-to-action are **hairline-anchored text links** — not filled accent buttons. Register: `11px` semibold Inter, uppercase, high tracking (`tracking-[0.26em]`), black text, separated by `border-t border-black/[0.06]`. Opacity-only hover on links.

Never use accent as a solid button fill or large opaque background block. The ContactFooter environmental field uses accent at low opacity (`~0.12`) only on CTA activation — not as a default CTA surface.

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

| Context                      | Size / register                                      |
|------------------------------|------------------------------------------------------|
| Hero display                 | `clamp(5.75rem, 20vw, 15rem)`                        |
| Contact poster heading       | `clamp(5rem, 22vw, 9.5rem)` / `leading-[0.86]` / `tracking-[-0.01em]` |
| Contact environmental field  | `clamp(3rem, 22vw, 18rem)` — accent, CTA-hover reveal |
| Contact CTA text link        | `11px` semibold / `tracking-[0.26em]` / black        |
| Contact annotations          | `11px` / `tracking-[0.18em]` / `neutral-500`         |
| Footer nav                   | `10px` / `tracking-[0.20em]` / `neutral-400`         |
| Section label                | `11px` / `tracking-[0.28em]`                         |
| Body                         | `0.9375rem` — `1.02rem`                              |

### ContactFooter epilogue (implemented)

Reference: `sections/ContactFooterSection/index.tsx`. The lower section is a poster epilogue, not a conventional footer card grid.

**Poster heading** — `font-bebas`, three-line vertical stack (“Let’s / Work / Together”), `text-[clamp(5rem,22vw,9.5rem)]`, `leading-[0.86]`, `tracking-[-0.01em]`, black. Asymmetric line widths; left-column weight, open right field.

**Contact annotations** — flat infrastructural thread: `font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500`. No border rows or card framing. Hover: `opacity` only (`hover:opacity-40`).

**Primary CTA** — hairline-anchored text link, not a button: wrapper `border-t border-black/[0.06] pt-3 md:pt-5`; link `text-[11px] font-semibold uppercase tracking-[0.26em] text-black`, label “Start a project”, `mailto:hello@oni.studio`. Hover/focus drives environmental activation — not color fill or scale on the link itself.

**Environmental activation field** — decorative `Project` mark behind content: `font-bebas text-[clamp(3rem,22vw,18rem)] text-[#FF4A1A]`, `opacity` 0 → ~0.12 on CTA hover/focus, `clip-path` + `scaleY` reveal (~700–850ms ease-out). `pointer-events-none`, `aria-hidden`.

**Footer cluster** — `border-t border-black/[0.08]` (hairline, below glassmorphism threshold). Navigation: `text-[10px] tracking-[0.20em] text-neutral-400`, slash separators. Archival layer: copyright + authorship at quietest register (`tracking-[0.14em]` / `tracking-[0.08em]`).

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
