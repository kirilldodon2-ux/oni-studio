# ONI Architecture

## Core Principles

- sections own their own layout
- decorative systems never control layout
- systems are independently removable
- responsive behavior is first priority
- atmosphere over complexity
- avoid global absolute positioning

---

## Layout Tokens

### Header Height

Defined as a CSS custom property in `app/globals.css`:

```css
--oni-header-h: 4.25rem   /* mobile default */
--oni-header-h: 5.5rem    /* ≥ 1024px (lg) */
```

Source: `ControlSurface` — mobile `py-5` + `h-7` reserved identity zone = 4.25rem; desktop `lg:py-7` + `md:h-8` reserved identity zone = 5.5rem.

**Phase 5 (implemented):** `--oni-header-h` is advisory-only. The control surface is `fixed` (not in flow). Hero height is `100svh`. This token is used for safe-zone content clearance — e.g. `HeroSection` mobile top padding: `pt-[calc(var(--oni-header-h)+2.5rem)]`.

### MaxWidth Tokens (Tailwind)

Defined in `tailwind.config.ts` under `theme.extend.maxWidth`:

| Token            | Value   | Used in              |
|------------------|---------|----------------------|
| `oni-page`       | 1500px  | WorkSection          |
| `oni-showreel`   | 1100px  | ShowreelSection      |
| `oni-contact`    | 1400px  | ContactFooterSection |

### Section Padding

All sections share the same horizontal padding cadence, enforced by `SectionContainer`:

```
px-6 → md:px-10 → lg:px-14
```

---

## Interaction Layer

Cross-cutting interaction behavior is defined at the global CSS layer where possible, not per component.

### Signal selection (implemented)

| Token                 | Value                      |
|-----------------------|----------------------------|
| `--oni-selection-bg`  | `rgba(255, 98, 0, 0.14)`   |
| `--oni-selection-fg`  | `#111111`                  |

Applied via `::selection` and `::-moz-selection` in `app/globals.css`. CSS-only — no layout, animation, or JS. Colors derive from the ONI accent family at low opacity (see `VISUAL_LANGUAGE.md` → Interaction).

Philosophy: selection reads as temporary signal activation / archive inspection, not default browser highlight or accent fill.

### Broader layer (in progress)

The Interaction Layer also includes hover, focus, signal markers, dormant infra states, and archive activation behaviors. Selection is the first globally enforced piece; other states remain component-scoped where documented (e.g. opacity-only link hover in `AI_RULES.md`).

---

## Current Structure

```
app/
  globals.css       ← layout tokens + viewport safety (overflow-x: clip on html)
                       + signal selection: --oni-selection-bg/fg + ::selection rules
                       + oni-showreel-float keyframe (Phase 4 cinematic polish)
                       + atmospheric tokens: --atm-reveal/drift/breath/pulse
                       + keyframes: oni-ambient-drift, oni-breath, oni-field-pulse
                       + CSS utilities: .oni-ambient-drift, .oni-breath, .oni-field-pulse
                       + combined rule: .oni-ambient-drift.oni-breath (stacks both animations)
  layout.tsx        ← root layout, fonts
  page.tsx          ← page composition (section imports)
                       + PageBackdrop at z-0
                       + ContinuityField at z-[5] (spatial continuity pass)
                       + section stack at z-10

sections/
  HeroSection/
    index.tsx           ← cinematic hero artboard; HeroAtmosphere + FadeIn text column
    HeroAtmosphere.tsx  ← environmental field layer: rings, guide axes, depth parallax
    Scene.tsx           ← R3F / Three.js 3D scene, Hero-scoped
    ViewWorkLink.tsx
  WorkSection/
    index.tsx           ← RevealUp (heading) + FadeIn (content) + section-local cross mark
    SystemArtifact.tsx  ← territory media: node topology SVG + signal traverse (SYSTEM ARCHITECTURES)
  ShowreelSection/
    index.tsx             ← RevealUp (heading) + FadeIn (card, annotation) + section-local dot mark
    ShowreelMediaCard.tsx ← unified cinematic media artifact: transparent field,
                            media-object parallax unit, enhanced luma-matte frame,
                            media-content vignette layer, float / scale / parallax
  ContactFooterSection/
    index.tsx             ← participates in atmosphere via RevealUp (entire content block)

systems/
  layout/
    SectionContainer.tsx  ← section shell: overflow-hidden + horizontal padding
    SectionLabel.tsx      ← section heading + accent bar pattern
  backdrop/
    index.tsx             ← global ambient SVG backdrop (Phase 2 + spatial continuity pass)
                             global: spine (enhanced), spine continuity nodes, gradient defs
                             transition zones A/B/C: horizon threads + accent marks
                             section-local: geometry clusters per section
  atmosphere/
    PresenceLayer.tsx     ← scroll-driven cinematic opacity/translateY emergence
    AmbientField.tsx      ← CSS-driven ambient drift + breathing wrapper (server)
    RevealPrimitives.tsx  ← FadeIn, RevealUp atoms (built on PresenceLayer)
    useDepthField.ts      ← scroll-driven parallax depth hook
    ContinuityField.tsx   ← page-level spatial continuity layer (spatial continuity pass)
    index.ts              ← barrel export

components/
  navigation/
    index.tsx             ← ControlSurface — fixed floating nav, z-40/50 owner (Phase 5)
    NavLogo.tsx           ← Logo link
    NavTelemetry.tsx      ← Ambient annotation, desktop-only, pointer-events-none
    NavMenuTrigger.tsx    ← Menu trigger: MENU label + ONINavigationSigil (3D)
    NavOverlay.tsx        ← Adaptive menu overlay (z-50): scrim + plane full-width `< md`, right plane `md+`

public/
  frames/
    showreel_frame.png    ← metallic figurative frame overlay (1024×682, black bg,
                            composited via SVG luminance-matte → transparent)
```

---

## Layout Systems

### SectionContainer

`systems/layout/SectionContainer.tsx` — the shared section shell.

Owns:
- `relative z-10` (stacking context above backdrop)
- `overflow-hidden` (section-level overflow containment)
- horizontal padding cadence: `px-6 → md:px-10 → lg:px-14`

Each section passes its own vertical padding and additional modifiers via `className`.
HeroSection does not use SectionContainer — it owns a distinct full-viewport artboard layout.

### SectionLabel

`systems/layout/SectionLabel.tsx` — the shared section heading pattern.

Owns:
- `h2` at `11px / tracking-[0.28em] / font-semibold uppercase / text-oni-accent`
- accent rule: `h-1 w-11 bg-oni-accent` below the heading

Sections pass an `id` for `aria-labelledby` wiring back to the parent `SectionContainer`.

### HeroSection Editorial Composition

HeroSection owns a distinct full-viewport artboard and does not use `SectionContainer`.
Its desktop layout uses an overlapping 12-column field rather than a two-column split:
the editorial text block occupies columns `2 / 8`, while the WebGL scene occupies
columns `5 / 13`. This keeps the hero as one spatial composition: text and sculpture
share the same field instead of reading as left content beside right media.

The text block is intentionally offset within the grid, with compact but confident
paragraph measure and restrained CTA treatment (`View Archive`). Typography hierarchy follows the
editorial order: dominant Bebas display mark, compact anchor phrase, quieter annotation
paragraph, then infrastructural archive navigation.

The Three.js scene remains Hero-scoped. Its object motion is environmental: slow world-Y
rotation, off-axis placement, no interaction-driven spectacle, and no independent layout
authority outside the scene canvas.

---

## Backdrop System

`systems/backdrop/index.tsx` — global ambient geometric layer.

Covers the full page as a single continuous artboard (`viewBox="0 0 1440 4200"`).
Decorative only — no layout influence, no pointer events.

### Architectural boundaries

**Global ambient (permanent residents):**
- Gradient `<defs>` — reusable SVG infrastructure
- Vertical spine line — page-spanning structural thread; belongs here by design
- Floating annotation overlay (`PRSM 001 / 002 / 003`, `ONI`, `MOVEMENT BY CONNECTION`)

**Section-local (Phase 4 migration candidates):**

These elements currently live in `PageBackdrop` to preserve visual output. During
Phase 4 cinematic polish they should be extracted into each section's own atmosphere system:

| Target section              | Elements to migrate                                        |
|-----------------------------|------------------------------------------------------------|
| `HeroSection` atmosphere    | Upper diagonal lines, concentric rings, hero accent marks  |
| `WorkSection` atmosphere    | Mid-page lines, mid circle, work accent marks              |
| `ShowreelSection` atmosphere| Lower diagonal line, lower circle, showreel accent marks   |
| `ContactFooterSection` atmosphere | Deep-page lines, micro notation marks              |

**ShowreelSection — Phase 4 cinematic polish (implemented):**

The showreel section has received its Phase 4 cinematic treatment:

- `CornerLogo` decorative elements removed
- `ShowreelMediaCard` introduced as reusable cinematic media artifact
- Transparent field — page space becomes the backdrop; no dark media slab
- Video placeholder inset to the frame's inner window via named constants
- Metallic frame PNG composited via SVG luminance-matte (`#oni-luma-matte`): black bg → transparent, metallic detail preserved
- Dual-layer silhouette drop-shadow: contact shadow (tight) + atmospheric halo (wide, near-invisible)
- Three isolated transform layers: float (CSS animation), scale (hover transition), parallax (JS rAF)
- `oni-showreel-float` keyframe added to `globals.css` (md+, reduced-motion safe)

---

## Overflow Architecture

Overflow is owned at two layers:

1. **Viewport** — `overflow-x: clip` on `html` in `globals.css`. Prevents horizontal scroll from any decorative layer without creating a scroll container (safe for `position: sticky` children).

2. **Section** — `overflow-hidden` via `SectionContainer`. Each section contains its own overflow locally. Sections do not rely on a parent wrapper to manage their overflow.

---

## Atmosphere System

`systems/atmosphere/` — shared atmospheric infrastructure. Established in the Atmospheric Infrastructure phase.

### Philosophy

Atmosphere behaves like environmental conditions, not UI effects. It must feel:
environmental · cinematic · infrastructural · spatial · restrained · gallery-like

Sections **participate** in the atmosphere by adopting primitives. The infrastructure governs motion behavior; sections do not own it.

### Primitives

| Export           | Type            | Purpose                                                      |
|------------------|-----------------|--------------------------------------------------------------|
| `PresenceLayer`  | client component| Scroll-driven opacity (+ optional translateY) emergence       |
| `AmbientField`   | server component| CSS-driven ambient drift and/or breathing wrapper            |
| `FadeIn`         | client component| Pure opacity emergence — most restrained reveal atom         |
| `RevealUp`       | client component| Opacity + 10px upward emergence — editorial/heading weight   |
| `useDepthField`  | client hook     | Scroll-driven parallax depth, direct DOM write, no re-renders|

### Motion tokens (`globals.css`)

| Token            | Value   | Use                                                |
|------------------|---------|----------------------------------------------------|
| `--atm-reveal`   | 1200ms  | PresenceLayer default emerge duration              |
| `--atm-drift`    | 14000ms | AmbientField drift animation period                |
| `--atm-breath`   | 18000ms | AmbientField breathe animation period              |
| `--atm-pulse`    | 22000ms | Field ring scale pulse period (oni-field-pulse)    |

### CSS utilities

| Class                               | Keyframe               | Character                                     |
|-------------------------------------|------------------------|-----------------------------------------------|
| `.oni-ambient-drift`                | `oni-ambient-drift`    | Y ±4px, 14s, nearly invisible                 |
| `.oni-breath`                       | `oni-breath`           | opacity 1→0.78, 18s, environmental            |
| `.oni-ambient-drift.oni-breath`     | both simultaneously    | combined rule — both animations play at once  |
| `.oni-field-pulse`                  | `oni-field-pulse`      | scale 1→1.012, 22s, ring spatial breathing    |
| `.oni-signal-traverse`              | `oni-signal-traverse`  | stroke-dashoffset traversal, 28s cycle        |

All utilities respect `prefers-reduced-motion` — animation is suppressed when set.

### AmbientField delay prop

`AmbientField` accepts an optional `delay?: number` (milliseconds).
Negative values pre-start the animation at that offset into its cycle, creating
asynchronous motion across multiple field elements. Positive values delay onset.

```tsx
// Three rings at different phase offsets — never perceived as looping in sync
<AmbientField breathe delay={0}>        {/* phase: 0%       */}
<AmbientField drift breathe delay={-5800}>{/* phase: ~41%/32% */}
<AmbientField drift delay={-9500}>      {/* phase: ~68%      */}
```

### Section participation pattern

Sections participate by wrapping content (not structure) in atmosphere primitives.
Editorial headings use `RevealUp` (opacity + 10px translateY — spatial weight).
Secondary content and section bodies use `FadeIn` (pure opacity — most restrained).

```tsx
import { FadeIn, RevealUp } from "@/systems/atmosphere";

// Heading with spatial weight
<RevealUp>
  <SectionLabel>SECTION</SectionLabel>
</RevealUp>

// Content with flat emergence, slight temporal offset
<FadeIn delay={150}>
  <div className="mx-auto max-w-oni-page">
    {/* section content */}
  </div>
</FadeIn>
```

**Rules:**
- Absolute-positioned decorative elements (e.g. CTA activation field) remain outside reveal wrappers so their positioning context stays the section
- When an absolute element DOES participate (e.g. year annotation), its positioning classes move onto the `FadeIn`/`RevealUp` className prop — not a nested wrapper
- `PresenceLayer` / `FadeIn` / `RevealUp` are client components — valid inside server section components (Next.js App Router client islands)
- `AmbientField` is a server component — zero JS overhead
- `useDepthField` writes directly to DOM style — no React state, no re-renders
- `RevealUp` use: editorial headings and primary section anchors only
- `FadeIn` use: section bodies, secondary content, all other reveals

### Current section participation (Phase 4 Atmospheric Activation + Spatial Continuity Pass)

| Section                  | Primitive                   | Scope                                      |
|--------------------------|-----------------------------|--------------------------------------------|
| `HeroSection`            | `FadeIn`                    | Text column (materializes on page load; threshold=0) |
| `HeroSection`            | `HeroAtmosphere`            | Environmental field rings + depth parallax  |
| `WorkSection`            | `RevealUp`                  | SectionLabel heading                        |
| `WorkSection`            | `FadeIn delay=150`          | Content grid + archive link                 |
| `WorkSection`            | `AmbientField breathe`      | Section-local cross mark, top-right padding zone, desktop-only |
| `ShowreelSection`        | `RevealUp`                  | SectionLabel heading                        |
| `ShowreelSection`        | `FadeIn delay=200`          | Media card                                  |
| `ShowreelSection`        | `FadeIn delay=80`           | Year annotation (absolute; positioned via className) |
| `ShowreelSection`        | `AmbientField breathe`      | Section-local dot mark, top-right gutter, desktop-only |
| `ContactFooterSection`   | `RevealUp`                  | Entire content block (poster heading + footer cluster) |

---

## Spatial Continuity System

Established in the Spatial Continuity + Cinematic Section Flow pass.

### Philosophy

The site should feel like one continuous cinematic spatial field — not stacked
webpage sections. The viewer should feel they are moving through one environment,
not scrolling between independent blocks.

Spatial continuity is achieved through three complementary mechanisms:

1. **Infrastructural threads** — the global vertical spine and transition-zone
   horizon threads in the backdrop create visual landmarks at section boundaries.
   These are permanent SVG elements; they read as page-spanning geometry.

2. **Page-level continuity field** (`ContinuityField`) — atmospheric marks that
   inhabit the transition zones between sections. These elements live at z-[5]
   (between backdrop and sections) and are visible because sections have no
   background color. They are nearly invisible individually but collectively
   create the sense that the environment continues beyond each section's edge.

3. **Section-local atmospheric marks** — minimal environmental notations within
   each section's top-right padding zone. A cross mark in WorkSection and a dot
   mark in ShowreelSection create a visual thread that descends through the
   page — not a pattern, but a spatial echo.

### What this is not

- Not animated page-builder transitions
- Not startup scroll choreography
- Not motion-design showcase effects
- Not parallax gimmicks

The continuity is architectural and environmental — it reads as spatial coherence
rather than as "animation."

### ContinuityField

`systems/atmosphere/ContinuityField.tsx` — server component, zero JS.

Three zones keyed to approximate section transition depths:

| Zone | Transition            | Depth (approx.) | Elements                             |
|------|-----------------------|-----------------|--------------------------------------|
| A    | Hero → Work           | `100svh`        | Horizon thread + orange mark + dot   |
| B    | Work → Showreel       | `175svh`        | Horizon thread + orange mark         |
| C    | Showreel → Contact    | `252svh`        | Horizon thread + black dot           |

**Horizon threads** — 1px gradient dividers spanning ~80% of viewport width,
offset horizontally per zone (so each zone feels distinct). Peak opacity: ~0.05.
Use `breathe` only (not `drift`) — vertical translation on a 1px thread is visible.

**Accent marks** — 3–5px squares/dots in the ONI geometric vocabulary. Use
`breathe` or `drift breathe` depending on size. Phase offsets never synchronize
with HeroAtmosphere.

**Depth positioning** — `top: calc(Xsvh)` where X is a multiple of the viewport
height. At a 900px viewport: Zone A = 900px (hero end), Zone B ≈ 1575px (work
end), Zone C ≈ 2268px (showreel end). These are approximate and intentional —
environmental marks do not need pixel-perfect alignment with section boundaries.

### Backdrop spatial continuity enhancements

**Spine enhancement** (global ambient):
- Stroke color: `#e2e2e2` (was `#ededed`) — slightly more defined
- Opacity: `0.72` (was `0.65`) — marginally more visible as a page thread

**Spine continuity nodes** (global ambient):
Three perpendicular tick marks at the section transition y-depths. x-positions
interpolated along the spine's diagonal path:

| y     | spine x | tick range   |
|-------|---------|--------------|
| 1450  | ≈ 449   | x 439–459    |
| 2350  | ≈ 426   | x 416–436    |
| 3280  | ≈ 403   | x 393–413    |

These marks read as a ruler or spatial measuring instrument — not decoration,
but environmental notation. They reinforce the spine as a continuous structural
thread through the page.

**Transition zone threads** (global ambient):
Faint horizontal lines at each transition zone. Distinct horizontal spans per
zone (right-biased for A, left-biased for B, right-biased for C) so they feel
like organic geometry rather than a repeating pattern. Each has a small accent
mark (orange square or black dot) echoing the backdrop's existing mark language.

### Section-local marks

WorkSection: a faint cross mark (`opacity: 0.44` on `#cfcfcf`) in the top-right
padding zone. `AmbientField breathe delay={-5200}` — never in sync with hero rings.

ShowreelSection: a single dot (`opacity: 0.15` on `#000`) in the top-right gutter.
More minimal than the WorkSection mark — the environmental notation descends and
simplifies as the page deepens toward the footer.

**Descent rhythm** — cross → dot → nothing (ContactFooterSection already has the
CTA environmental activation field). The section marks tell a quiet spatial story
of reducing presence as the viewer approaches the site's conclusion.

### HeroAtmosphere

`sections/HeroSection/HeroAtmosphere.tsx` — client component, desktop-only (`hidden lg:block`).

Environmental field layer: four concentric rings, dashed guide axes, cardinal ticks,
and two environmental accent marks. Uses `AmbientField` with staggered `delay` props
(negative phase offsets) so elements drift asynchronously — never perceived as a loop.

Three `useDepthField` planes at different factors create subtle depth separation on scroll:
outer ring (0.025), guide axes (0.012), mid ring inverted (0.04), inner ring (0.018).

Self-managing opacity onset: 500ms setTimeout → 2000ms fade-in. The field materializes
after the editorial text has begun to appear. Reduced-motion: immediate onset, no transition.

z-index: `z-[1]` — below WebGL scene (`z-[5]`) and text column (`z-20`).

---

## Territory Media System

### Philosophy

Territories in WorkSection are not static text declarations. They are latent computational fields
that may carry living media behavior — not as decoration, but as environmental residue of the work
that happens inside each territory.

Territory media must:
- Feel dormant, not animated
- Read as infrastructure, not UI
- Have low duty cycles — more silence than activity
- Use ONI orange only as signal accent; all else monochrome
- Preserve whitespace and typography hierarchy

Territory media must never:
- Override or redesign the territory layout
- Introduce heavy runtime dependencies
- Break when removed (systems remain isolated)
- Respond to cursor with hacker/gamer aesthetics

### SystemArtifact — SYSTEM ARCHITECTURES territory

`sections/WorkSection/SystemArtifact.tsx` — client component, conditionally rendered in `WorkSection/index.tsx`
when `territory.id === "system-architectures"`.

**Visual form:** an 8-node sparse routing topology in a `200×50` SVG viewport. 8 infrastructure
edges form a ladder-like routing map (top chain + vertical drops + partial bottom chain). A signal
scan path traverses the top chain (N0→N1→N2→N3) via CSS `stroke-dashoffset` animation.

**Behavioral layers:**

| Layer               | Driver     | Cadence  | Character                                        |
|---------------------|------------|----------|--------------------------------------------------|
| Signal scan         | CSS        | 28s      | Traverses top routing path; ~43% visible, 57% dormant |
| Active node         | React      | 8.2s     | Orange accent (fill + ring) migrates between signal-path nodes |
| Text state readout  | React      | 5.4s     | Infrastructure state cycling (unchanged from v1) |

**Signal scan cycle (28s):**
- `0–3%` — fade in (0.84s)
- `3–38%` — path draws via stroke-dashoffset 162→0 (9.8s)
- `38–44%` — fade out (1.7s)
- `44–100%` — invisible hold / dormancy (15.7s)

`animation-delay: -4200ms` — system appears mid-cycle on page load. Computation precedes the visitor.

**Active node:** cycles through `[N1, N2, N3, N6]` (nodes on or adjacent to the signal path).
Node transition: `fill` + `opacity` via CSS transition (800ms ease-in-out). Ring: `opacity`
CSS transition (1200ms ease-in-out). Initial activation delayed 3.6s after mount.

**CSS utilities added (`globals.css`):**

| Class                  | Keyframe               | Character                              |
|------------------------|------------------------|----------------------------------------|
| `.oni-signal-traverse` | `oni-signal-traverse`  | stroke-dashoffset traversal, 28s cycle |

Reduced-motion: CSS animation suppressed + `opacity: 0` forced. React text cycling paused.

**Isolation:** `SystemArtifact` is fully removable — the `{territory.id === "system-architectures" && <SystemArtifact />}` conditional in `WorkSection/index.tsx` is the only coupling point.

---

## Target Architecture (Remaining)

```
systems/
  backdrop/         ← PageBackdrop decoupled from global (Phase 2) ✓
  atmosphere/       ← shared atmospheric infrastructure ✓
  typography/
  ornaments/

shared/
  tokens/
  hooks/
  utils/
```

---

## Navigation System

### Positioning Model

The navigation control surface uses `position: fixed` — it floats above all content and does not participate in document flow. Sections scroll beneath it.

This replaces the current `position: sticky` `SiteHeader`. As a result, **Hero no longer compensates for header height**. The `--oni-header-h` token is advisory-only once Phase 5 is implemented.

### Z-Index Ownership

All z-index values are formally owned. No undocumented or ad-hoc values.

| Layer                          | z-index       | Owner                                          |
|--------------------------------|---------------|------------------------------------------------|
| Ambient backdrop               | `0`           | `systems/backdrop/index.tsx`                   |
| Spatial continuity field       | `[5]`         | `systems/atmosphere/ContinuityField.tsx`       |
| Section content                | `10`          | `SectionContainer` (`relative z-10`)           |
| Section atmosphere             | `20`          | Phase 4 section atmosphere systems             |
| (reserved)                     | `30`          | —                                              |
| Navigation control surface     | `40` / `50`*  | `components/navigation/index.tsx`              |
| Menu overlay                   | `50`          | `components/navigation/NavOverlay.tsx` — full-viewport layer; adaptive plane (full-width `< md`, partial-width right plane `md+`) |

\* The control surface `<header>` is promoted from `z-40` to `z-50` while the overlay is
active, so the trigger button remains interactive above the overlay. `NavOverlay` renders
before the header in the DOM; at the same z-level, DOM order gives the header the higher
stack position. When the overlay is closed the header returns to `z-40`.

Rules:
- No system or section exceeds `z-20` except the navigation system
- No component uses escape-hatch values (`z-index: 9999`)
- All z-index values must appear in this table

### Control Surface Layout Zones

```
[ IDENTITY ]           [ TELEMETRY ]           [ ACTION ]
  Logo — left            Annotation (lg+)         Menu trigger — right
```

Telemetry is desktop-only (`lg+`), `pointer-events-none`, `aria-hidden`.

### Environmental Control Layer (Atmospheric Polish Layer 1 — implemented)

The closed control surface is an environmental marker layer, not a visible strip.
It carries no panel, blur, border, or full-width material treatment at any scroll position (`docs/DECISIONS.md` DEC-004).
`NavOverlay` is an **adaptive atmospheric navigation plane** (intentional): a full-viewport scrim plus a navigation plane that is full-width below `md` and a right-aligned partial-width plane on `md+` — see `NAVIGATION_ARCHITECTURE.md` §7.

**ControlSurface `<header>` (all scroll positions):**

| Property        | Value                    | Intent                                          |
|-----------------|--------------------------|-------------------------------------------------|
| Background      | none                     | No persistent navbar/panel field                |
| Backdrop filter | none                     | Hero atmosphere remains uninterrupted           |
| Border          | none                     | No full-width header edge; not a bar            |
| Pointer events  | `pointer-events-none` on header; trigger opts in | The invisible band does not behave like chrome |

**NavOverlay — scrim (full viewport):**

| Property        | Value                    | Intent                                          |
|-----------------|--------------------------|-------------------------------------------------|
| Background      | `bg-black/[0.055]`       | Light tint; page field remains readable         |
| Backdrop filter | `backdrop-blur-[1.5px]`  | Minimal depth; dismiss on pointer-down          |

**NavOverlay — navigation plane (adaptive):**

| Property        | Value                    | Intent                                          |
|-----------------|--------------------------|-------------------------------------------------|
| Width           | `w-full` below `md`; `md:w-[min(76vw,58rem)]`; `lg:w-[min(68vw,64rem)]` | Full-width on narrow viewports; right atmospheric plane on wide |
| Background      | `bg-white/[0.82]`        | Near-opaque plane; field visible beside plane on `md+` |
| Backdrop filter | `backdrop-blur-[3px]`    | Minimal atmospheric depth below legibility floor |
| Motion          | `translateX` from right + opacity | Restrained spatial reveal (~520–760ms)      |

Rules:
- Do not add background, blur, border, shadow, glow, or gradient styling to the closed control surface at any scroll position
- Do not reintroduce scroll-state (glass or hairline) without `docs/DECISIONS.md` reintroduction gate
- Blur values must remain below `6px` on overlay surfaces to stay out of glassmorphism territory
- Preserve the adaptive plane — do not revert to permanent center-nav links on the control surface

### Component Architecture (Phase 5 — implemented)

```
components/
  navigation/
    index.tsx             ← ControlSurface — fixed floating container, z-40/50 owner
    NavLogo.tsx           ← Reserved identity zone; visible sigil disabled
    NavTelemetry.tsx      ← Ambient annotation, desktop-only, pointer-events-none
    NavMenuTrigger.tsx    ← Menu trigger: MENU label + ONINavigationSigil; toggles MENU/CLOSE
    NavOverlay.tsx        ← Adaptive menu overlay (z-50): scrim + plane full-width `< md`, right plane `md+` (implemented)
```

`components/SiteHeader.tsx` has been removed. `components/navigation/index.tsx` is the active implementation.

### Navigation Sigil (`systems/spatial/ONINavigationSigil.tsx`)

Canonical 3D menu artifact — **navigation infrastructure**, not content-layer decoration.

| Concern | Owner |
|---------|--------|
| Menu open/close state | `ControlSurface` → `NavMenuTrigger` → `NavOverlay` |
| Sigil rendering + motion | `ONINavigationSigil` (local R3F canvas, 28×28px) |
| Model asset | `/public/models/ONI_3d_no_texture.glb` (shared with Hero; not duplicated) |

**Motion:** slow Y/Z drift (dormant machinery); convergence adds blended X/Z tilt; click adds a decaying Y impulse. `prefers-reduced-motion` freezes drift.

**Artifact consumption:** `ArtifactConsumptionPair` + `convergenceInteraction` — sigil inward (`−17px`, `scale(1.21)`); MENU fully absent at peak (`opacity 0`, no blur). Sigil hover: frontal reveal (rotation settles, calmer spin). `ConvergencePair` is deprecated alias.

**Material:** dark graphite `MeshStandardMaterial` — editorial-industrial, not Hero chrome.

**Rules:** no fullscreen canvas, no global render manager, no separate menu system. Sigil sits in the action zone beside `MENU` / `CLOSE` without enlarging header height.

### Hero Impact (Phase 5 — implemented)

- `calc(100svh - var(--oni-header-h))` removed from `HeroSection`
- Hero is now `min-h-[100svh]` (mobile) / `lg:h-[100svh]` (desktop)
- Mobile safe-zone: `pt-[calc(var(--oni-header-h)+2.5rem)]` in the text column
- `--oni-header-h` is advisory-only (safe-zone clearance, not structural layout)

See `NAVIGATION_ARCHITECTURE.md` for full specification.

---

## ShowreelSection Media Card Architecture

### ShowreelMediaCard — unified media stack

Frame, media surface, and play control compose as one spatial unit:

```
[group div]             ← Layer 1: hover detection context (containerRef — mouse events)
  [svg defs]            ← hidden SVG filter definition (#oni-luma-matte, enhanced)
  [float div]           ← Layer 2: CSS animation (oni-showreel-float, md+, reduced-motion safe)
    [card div]          ← Layer 3: aspect ratio + hover scale transition (containerRef)
      [media-object]    ← Layer 4: parallax target (mediaRef) — contains all sub-layers
        [media-well]    ← absolute, inset to frame inner window, overflow-hidden
          [media-content] ← dedicated layer for future video/still; vignette mask pre-applied
          [play button] ← z-[1], above media-content, unmasked
        [frame-layer]   ← z-[2], absolute inset-0, luma-matte filter + dual drop-shadow
          [Image]       ← object-fill, fills card exactly (no distortion)
```

`media-object` is the parallax target. Both `media-well` (play control) and
`frame-layer` (metallic frame) are children — they move as one spatial unit.

### Frame inner window positioning constants

Constants defined at the top of `ShowreelMediaCard.tsx` — update when the frame asset changes:

| Constant       | Default  | Maps to                          |
|----------------|----------|----------------------------------|
| `FRAME_LEFT`   | `8.2%`   | Frame left border width          |
| `FRAME_TOP`    | `13.8%`  | Frame top border height          |
| `FRAME_WIDTH`  | `83.6%`  | Frame inner window width         |

### Enhanced luminance-matte compositing

The frame PNG (1024×682) has a black background with no alpha channel.
SVG filter `#oni-luma-matte` performs a 4-step metallic rendering pipeline:

```
Step 1 — feColorMatrix matrix (contrast boost, pivot 0.5, amplitude 1.2)
         Sharpens metallic mid-tones, elevates specular highlights,
         deepens recessed areas before the matte is extracted.
         output = 1.2 × input − 0.10

Step 2 — feColorMatrix luminanceToAlpha (from contrast-boosted image)
         black → α=0  |  dark metallic → α≈0.2–0.5  |  silver → α≈0.8  |  white → α=1

Step 3 — feComponentTransfer feFuncA gamma exponent=0.5 (√)
         Sharpens alpha falloff — pushes mid-dark metallic zones toward opacity.
         Without: luma 0.4 → α=0.4 → foggy 0.76 on white.
         With √:  luma 0.4 → α=0.63 → defined 0.63 on white.

Step 4 — feComposite in=boosted in2=luma-sharp operator=in
         Composites contrast-boosted source colors through sharpened alpha mask.
         Result: metallic frame with genuine silhouette transparency.
```

CSS `filter` on the frame layer chains the SVG matte with dual drop-shadow:
```
filter: url(#oni-luma-matte)
        drop-shadow(0px 1px 4px rgba(0,0,0,0.20))   ← contact shadow
        drop-shadow(0px 6px 28px rgba(0,0,0,0.09))  ← atmospheric halo
```
Drop-shadow operates on the post-matte output — shadows trace the visible
frame silhouette rather than the rectangular bounding box.

No `isolate` or `overflow-hidden` on the card div — shadows must render beyond element bounds.

### Media-content vignette layer

A dedicated empty `<div>` inside `media-well` holds a pre-applied radial
`mask-image` (elliptical, center-full to transparent at edges). Currently
invisible — the layer has no content. When future video or still frame is
inserted into this div, its edges will dissolve softly into the metallic
frame rather than cutting hard at the window boundary. The play button
is a sibling of `media-content`, not a child — it is never masked.

### Motion system

Three transform layers on isolated elements to prevent animation/transition conflicts:

| Layer        | Owner          | Technique       | Max range  | Trigger          |
|--------------|----------------|-----------------|------------|------------------|
| Float (Y)    | float div      | CSS keyframe    | ±7px       | Always (md+)     |
| Scale        | card div       | CSS transition  | ×1.012     | hover            |
| Parallax X/Y | media-object   | JS rAF / lerp   | ±5px       | mousemove (fine) |

`media-object` is the parallax owner (previously `frame div`). By making it
the parent of both media-well and frame-layer, the full spatial object moves
together — frame and play control remain registered with each other on parallax.

The JS parallax writes `media.style.transform` (via `mediaRef`).
The frame layer's `style.filter` is a separate CSS property — no conflict.

---

## ContactFooterSection Editorial Architecture

### Composition

The lower section is an authored epilogue, not a conventional website footer.
Spatial composition descends: editorial heading → contact annotations → CTA portal → footer cluster.

**Heading:** `font-bebas` display scale, `clamp(4rem,18vw,9.5rem)`, `leading-[0.9]`, `tracking-[-0.01em]`.
3-line vertical stack — "LET'S / WORK / TOGETHER" — creates asymmetric poster silhouette.
Lines have different widths (narrow → narrow → wide), producing left-column spatial weight with open right field.
- Mobile: ~4.2rem at 375px — dense, compressed, poster-like
- Desktop: capped at 9.5rem — calmer, architectural, more breathable

**Contact annotations:** flat infrastructural thread, `font-sans text-[11px] tracking-[0.18em] text-neutral-500 uppercase`.
No border rows, no card framing. Opacity-only hover (`hover:opacity-40`).

**CTA — "START A PROJECT →":**
Hairline-anchored text-link. Wrapped in `border-t border-black/[0.06] pt-6` — thin separator gives spatial
grounding without button behavior. `font-sans text-[11px] font-semibold tracking-[0.26em] uppercase text-black`.
Mirrors the SectionLabel typographic register. `href="mailto:hello@oni.studio"`. Opacity-only hover.

**Footer cluster:** two-cluster layout — navigation left / archival right.
- Navigation layer: `text-[10px] tracking-[0.20em] text-neutral-400 uppercase` — footer nav links
- Archival layer (right, md:items-end):
  - Copyright: `text-[10px] tracking-[0.14em] text-neutral-400 uppercase`
              - Authorship: `text-[10px] tracking-[0.08em] text-neutral-300` — `built by dodon.one with ONI`
                "dodon.one" is an active link: `href="https://dodon.one"`, `target="_blank"`, `rel="noopener noreferrer"`

Border: `border-black/[0.08]` — intentionally minimal, below glassmorphism threshold.

---

## Content Architecture (Phase 6+)

The content layer sits above the frontend systems layer. It defines what material the
site holds, how it is structured, how it is rendered, and how it relates to the
atmospheric infrastructure. This section documents architectural intent — not current
implementation, which does not yet exist.

See `CONTENT_PHILOSOPHY.md` for the full editorial position and archetype definitions.
See `ARCHIVE_SYSTEM.md` for the canonical archive object model, schema direction, territorial
behavior, contributor logic, and surface layer architecture. See `ARCHIVE_OPERATING_LOGIC.md` for
layered browse/inspect authority (`mediaAspect`, masonry geometry, optics, occupancy) and masonry
integration rules. See `ROADMAP.md` Phases 6–9 for implementation sequencing.

---

### Content Layer Philosophy

Content is not fetched generically and rendered generically. Each content archetype
carries its own spatial weight and requires its own rendering treatment. The content
layer does not produce uniform output — it produces authored spatial documents.

The atmosphere system, section layout primitives, and backdrop infrastructure must extend
coherently into every content page. A visitor should not experience the archive as a
separate section of the site. They should experience it as a deeper layer of the same
environment.

---

### Archetype → Template Mapping

| Archetype            | Route Pattern          | Template              | Atmosphere Level |
|----------------------|------------------------|-----------------------|------------------|
| Works                | `/works/[slug]`        | Full spatial page     | Full             |
| Process Artifacts    | attached to Works      | Minimal grid          | Reduced          |
| Writings             | `/writing/[slug]`      | Long-form editorial   | Typographic      |
| Code Artifacts       | `/code/[slug]`         | Experiment surface    | Minimal          |
| Atmospheric Fragments| contextual embedding   | Encounter-based       | Native           |

---

### URL Architecture

URL slugs are permanent once published. Format: hyphenated lowercase title, year suffix
for disambiguation if required. No category path segments. No tag paths. No
query-string navigation.

```
/works              works index
/works/[slug]       individual work
/writing            writings index
/writing/[slug]     individual writing
/code/[slug]        code artifact (no public index — accessed by reference)
/archive            full cross-archetype index (Phase 9)
```

---

### Current Systems Supporting Content Direction

| System                        | Content Relevance                                                         |
|-------------------------------|---------------------------------------------------------------------------|
| `systems/atmosphere/`         | All content pages inherit atmospheric infrastructure without modification  |
| `systems/layout/`             | `SectionContainer` + `SectionLabel` apply directly to content page shells |
| `systems/backdrop/`           | Global backdrop extends to all routes — no per-page backdrop logic needed |
| `components/navigation/`      | Control surface + overlay apply to all routes; active states needed in Phase 6 |
| `ShowreelMediaCard`           | Reference implementation for cinematic media treatment in Work pages      |
| `systems/spatial/`            | Object grounding (`silhouetteGrounding.ts`) + `ONINavigationSigil` (nav infrastructure) |
| `RevealPrimitives`            | `FadeIn` / `RevealUp` apply to all content typography reveals             |
| `useDepthField`               | Applicable to feature imagery in Work pages                               |

---

### Infrastructure Required (Not Yet Built)

| System                        | Purpose                                                     | Phase |
|-------------------------------|-------------------------------------------------------------|-------|
| Page transition system        | Route-level cinematic reveal (opacity, continuous backdrop) | 6     |
| Content schema layer          | Typed, Zod-validated schema definitions per archetype       | 6–7   |
| `shared/content/`             | Schema definitions, content loading utilities               | 6     |
| Work page template            | Full spatial treatment: editorial heading + image + body    | 7     |
| Works index component         | Non-feed spatial surface: title, year, domain classification| 7     |
| `systems/typography/`         | Shared typographic system for long-form reading (65–75ch)   | 7–8   |
| MDX rendering pipeline        | Long-form text with component composition capability        | 8     |
| Writings index component      | Minimal editorial index: title, year, duration              | 8     |
| Experiment sandbox system     | Isolated interactive content rendering                      | 9     |
| Cross-reference system        | Associative content relationships (proximity, not tags)     | 9+    |

---

### Content Authoring Model

Content is authored in the repository — no external CMS dependency for Phases 6–9. The
repository is the source of truth.

**Static typed data** — Zod-validated TypeScript objects. Used for Work metadata,
artifact metadata, and all structured fields with fixed schemas. Version-controlled;
changes require intentional commits.

**MDX documents** — Markdown with React component composition. Used for long-form
Writings and Work body content. Supports inline atmosphere components, embedded code
blocks, and cross-references to other archetypes.

**Component-authored content** — React components that are themselves the artifact.
Used for Code Artifacts where the running work is the document.

---

### Performance Budget Constraints

Content pages must operate within a defined performance budget that accounts for existing
homepage baseline costs (Three.js + React Three Fiber + Framer Motion).

- Work pages: the Three.js scene does not carry through to content routes; atmosphere
  is CSS-only on content pages
- Code Artifact pages: generative experiments load only on their own dedicated route;
  JS budget must be defined before Phase 9 begins
- MDX parsing: static generation preferred; no client-side MDX evaluation

---

## Perception Reconciliation Workflow

Operational layer for code ↔ Figma ↔ code perception sync on the canonical landing (`/`).

- **Structural truth** — this document, `sections/`, `systems/`, `content/`
- **Perception laboratory** — Figma (composition experiments, not architecture authority)
- **Reconciliation** — AI-assisted minimal diffs back into code; not redesign

Implementation: `systems/export/` (`/?export=1` perception freeze on the live home route — no parallel export route).  
Doctrine: `docs/FIGMA_RECONCILIATION_WORKFLOW.md`. Capture mechanics: `docs/FIGMA_EXPORT.md`.

---

## Open Infrastructure Items

- No motion system — scroll-driven entrance animation (Phase 4 — partially addressed in ShowreelSection)
- Navigation control surface — floating, fixed, atmospheric (Phase 5)

---

## Section Rules

Each section must:

- be self-contained
- own its layout
- contain its own overflow (via `SectionContainer` or equivalent local ownership)
- support mobile independently
- avoid global positioning dependencies

`SectionContainer` is the standard enforcement shell for all content sections. HeroSection is the explicit exception — it owns a full-viewport artboard and does not use `SectionContainer`.

---

## System Rules

Systems are shared infrastructure. Systems must:

- never hard-control layout
- remain independently removable
- never couple to viewport height directly
- remain reusable across sections

---

## Responsive Philosophy

- mobile is equal priority, not an afterthought
- `clamp()` preferred over hard viewport breakpoint logic
- avoid giant fixed artboards unresponsive to content
- avoid uncontrolled absolute positioning
- decorative layers must scale safely on all viewports
