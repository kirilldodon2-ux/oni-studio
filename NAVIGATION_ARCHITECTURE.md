# ONI Navigation Architecture

## Planning Status

**Phase:** Navigation control surface (Phase 5 — implemented) + artifact interaction grammar (implemented)
**Runtime:** `components/navigation/` — `ControlSurface`, `NavOverlay`, `NavMenuTrigger`
**Artifact semantics:** `systems/spatial/` — §9 below; see also `ARCHITECTURE.md` (Navigation Sigil)

---

## 1. SiteHeader Audit — Current Limitations

Current implementation: `components/SiteHeader.tsx`

### Structural Issues

- `sticky top-0` means the header participates in document flow and displaces all content below it
- `bg-white` creates a fully opaque bar that severs the atmospheric backdrop from the upper viewport — the ambient SVG system is invisible behind a white wall at the top of every page
- Hero height is compensated via `calc(100svh - var(--oni-header-h))`, coupling the Hero layout directly to the header's existence and dimensions
- `absolute left-1/2 -translate-x-1/2` nav centering is fragile — depends on the container being wide enough; breaks at unusual widths or if items change
- No safe-zone for content scrolling beneath a fixed surface — currently unnecessary only because the header is sticky (in-flow)

### Interaction Issues

- MENU button has no state and no interaction logic — it is decorative
- `MenuGlyph` switches between a 4-dot matrix (desktop, `lg:grid`) and a 3-bar hamburger (mobile) — inconsistent control language with no documented reason for the distinction
- No scroll awareness — the header never reacts to page position
- No concept of transparency or surface compositing against the atmospheric backdrop

### Identity and Aesthetic Issues

- A solid white bar is the opposite of a floating control surface — it creates a hard horizontal seam at the viewport top
- Navigation links permanently visible in the center (WORK, STUDIO, SERVICES, CONTACT) is the signature visual pattern of startup and SaaS sites; misaligned with ONI visual language
- `z-40` is undocumented and informal — there is no z-index ownership system

### Summary

The current SiteHeader is a functional structural placeholder. It does not express the ONI visual language, severs the atmospheric system, couples Hero layout to its own dimensions, and reads as a conventional sticky navbar. It must be replaced — not refined.

---

## 2. Target Navigation Architecture

### Philosophy

Navigation should be a **floating control surface** — an instrument panel hovering above the page, not a structural band that divides header from content.

The control surface does not claim territory. It does not compete with the atmospheric layer beneath it. It is present without being dominant. It belongs to the same visual register as the backdrop annotation system: thin, tracked, precise.

The language of the control surface is the same as the ONI backdrop vocabulary — thin letterforms, high tracking, neutral tone, minimal punctuation. It reads like an instrument, not a menu bar.

### Positioning Model

`position: fixed` — not sticky.

The control surface floats above all content layers. Sections scroll beneath it. The surface never moves. This is an architectural departure from the current implementation and has a critical structural consequence:

**Hero no longer compensates for header height.** Hero returns to `100svh` or `100dvh`. The `--oni-header-h` CSS token transitions from a structural dependency to an advisory-only value for safe-zone content planning.

### Layout Zones

The control surface is divided into three horizontal zones:

```
[ IDENTITY ]           [ TELEMETRY ]           [ ACTION ]
  Reserved zone          System annotation        Menu trigger — right
  no visible sigil       Desktop only
```

- **Identity zone** — reserved left-side spatial zone. The visible mini-logo/sigil is disabled until a more legible identity treatment is approved.
- **Telemetry zone** — center. Desktop only (`lg+`). Subtle system annotation (Section 4). Hidden on mobile.
- **Action zone** — `NavMenuTrigger`: temporary `MENU` label + ONI navigation sigil (artifact revelation — §9)

### Visual Character

- Background: transparent at top of page. The atmospheric backdrop composites through the surface naturally.
- On scroll: no closed-state material strip unless a future scroll-state pass explicitly re-approves it.
- Height: slim. `~56px` desktop, `~48px` mobile.
- No shadow. No border. No visual frame. The surface is a set of positioned elements that share a horizontal band — not a "bar."
- The control surface is part of the atmospheric world, not separate from it.

---

## 3. Desktop vs Mobile Behavior Philosophy

### Desktop (≥ 1024px)

- All three zones active: identity, telemetry, action
- Nav links (WORK, STUDIO, SERVICES, CONTACT) are **not** permanently visible in the control surface — permanent center-nav is the startup pattern
- Links live inside the menu overlay, opened via the action zone trigger
- The control surface is clean, slim, and atmospheric by default
- Horizontal insets follow the section padding cadence: `lg:px-14`

### Mobile (< 1024px)

- Telemetry zone absent — identity and action zones only
- Same floating behavior and visual character as desktop
- Horizontal insets: `px-6` → `md:px-10`
- No bottom navigation bar — bottom nav is a mobile-app and dashboard pattern, incompatible with ONI visual language
- Menu trigger opens `NavOverlay` — full-width navigation plane below `md`; right atmospheric plane at partial width on `md+` (see §7 `NavOverlay`)

### Scroll Behavior — Both Breakpoints

- At page top: control surface is present and visually minimal — transparent, atmospheric
- On scroll: subtle surface character shift (Phase 5 motion)
- **No hide-on-scroll behavior** for Phase 5 — adds complexity without clear benefit for a single-page scrolling site. Revisit if multi-page routing is introduced in future phases.
- The control surface is ambient infrastructure — it does not perform or react dramatically

---

## 4. Telemetry Placement and Interaction

### Purpose

Telemetry is atmospheric annotation — it reinforces the editorial and instrument character of the control surface without adding functional complexity. It is not a feature. It is part of the visual identity language.

The register is identical to the backdrop annotation system: `PRSM 001`, `ONI`, `MOVEMENT BY CONNECTION` — same weight, same scale, same neutrality.

### Content Options

**Option A — Static identity thread (recommended for Phase 5 baseline)**
```
ONI.STUDIO / MMXXVI
```
Simple. Never changes. Consistent with backdrop annotation vocabulary. Zero implementation risk.

**Option B — Live timestamp**
```
14:32:07
```
Minimal, clock-like. Adds ambient life to the surface. Risk: may be distracting if it catches the eye during reading.

**Option C — Coordinate marker**
```
49°N 32°E
```
Studio location coordinates. Geographical anchor. Architectural and specific. Implies precision and place.

**Option D — Scroll position annotation**
```
— 042 —
```
A section-indexed position indicator that advances as the user scrolls between sections. Reinforces the instrument/HUD character. More complex to implement — deferred to later Phase 5 iteration.

**Recommendation:** Option A for Phase 5 baseline. Options B and C are atmosphere variants to evaluate visually during implementation. Option D is a future refinement.

### Typography

- `11px` / `tracking-[0.22em]` / Inter
- `text-neutral-400` — muted and ambient, never competing with identity or action zones
- No interaction states — `pointer-events-none`
- `aria-hidden="true"` — decorative, not announced by screen readers

### Placement

- Centered in the control surface horizontal band, or right-of-center (left of the action zone)
- A right-weighted composition (telemetry slightly right of center, action at right edge) creates a natural visual balance against the left-anchored logo
- Exact placement decided during visual implementation in Phase 5

---

## 5. Layering and Z-Index Ownership

### Formal Z-Index Architecture

| Layer                      | z-index | Owner                                    | Notes                                   |
|----------------------------|---------|------------------------------------------|-----------------------------------------|
| Ambient backdrop           | `0`     | `systems/backdrop/index.tsx`             | Fixed, decorative, pointer-events-none  |
| Section content            | `10`    | `SectionContainer` (`relative z-10`)     | Each section creates its own context    |
| Section atmosphere         | `20`    | Phase 4 section atmosphere systems       | Reserved for per-section ambient layers |
| (reserved)                 | `30`    | —                                        | Available for future system             |
| Navigation control surface | `40`    | `components/navigation/index.tsx`        | Fixed, floats above all content         |
| Menu overlay               | `50`    | `components/navigation/NavOverlay.tsx`   | Fixed full-viewport layer; adaptive navigation plane (full-width `< md`, partial-width right plane `md+`) |

### Rules

- No system or section may use z-index values above `20` except the navigation system
- Navigation control surface formally owns `z-40` — this is documented intent, not an ad-hoc value
- Menu overlay formally owns `z-50` — the highest value in the page; nothing appears above it
- Backdrop never exceeds `z-0`
- No component uses `z-index: 9999` or any escape-hatch value — all z-index values must appear in this table

### Stacking Context Awareness

- The control surface (`fixed`, `z-40`) creates its own stacking context — content within it cannot exceed `z-50`
- The menu overlay (`fixed`, `z-50`) creates its own stacking context — highest context in the page
- Section stacking contexts (`SectionContainer`, `relative z-10`) are entirely below the navigation system
- The backdrop has no z-index declaration — it sits at document natural stacking order (below `z-10`)

---

## 6. Motion Principles for Navigation

### The control surface does not animate on page load

It is present. It does not entrance-animate. It does not fade in, slide down, or draw itself into existence. Structural ambient infrastructure appears — it does not perform. This is consistent with the ONI principle that systems support atmosphere rather than demand attention.

### Menu Open / Close

- Slow, spatial reveal — ~500–760ms range on plane and links
- **Adaptive plane (intentional):** below `md`, the navigation plane is full-width; at `md+`, a right-aligned partial-width atmospheric plane (`md:w-[min(76vw,58rem)]`, `lg:w-[min(68vw,64rem)]`) sits over a full-viewport scrim — page field remains partially visible on wide viewports
- Reveal: restrained **translateX from the right** on the plane plus opacity; link typography staggers in (not a loud drawer snap or bounce)
- Full-viewport scrim behind the plane — light tint + minimal blur; pointer-down on scrim closes
- Close transition mirrors open (reversed easing)
- Easing: ease-out on open, ease-in on close

### Scroll State Transition

- If scroll position triggers a visual character shift on the control surface (background opacity change or thin border appearance), the transition must be slow: 400–600ms
- Driven by scroll position via CSS scroll-linked animation or a minimal scroll hook — not discrete event-triggered jumps
- The transition must be imperceptible at small scroll distances — only apparent after meaningful scroll depth (~100px)

### Telemetry Animation

- If using a live timestamp (Option B): values update without animation — snap to new state
- No digit-rolling, no count-up, no animated transitions on telemetry content — these are dashboard patterns

### Hover States

- Opacity shift only (`hover:opacity-60` consistent with existing ONI link hover pattern)
- No scale transforms
- No translate transforms
- No color changes on hover (accent `#FF4A1A` is reserved for functional states, not hover effects)
- Transition duration: `150ms` — fast enough to feel responsive, not so fast it feels mechanical

---

## 7. Component Architecture Proposal

### Directory Structure

```
components/
  navigation/
    index.tsx             ← ControlSurface — root floating container, z-index owner
    NavLogo.tsx           ← Logo link with sizing tokens
    NavTelemetry.tsx      ← Telemetry annotation, desktop-only, ambient
    NavMenuTrigger.tsx    ← Menu open button + consistent glyph
    NavOverlay.tsx        ← Adaptive menu overlay — full-width plane `< md`, right atmospheric plane `md+`
```

The existing `components/SiteHeader.tsx` is the **migration target** — it will be replaced by `components/navigation/index.tsx` when Phase 5 begins. It is not removed during planning.

### ControlSurface — `index.tsx`

**Responsibilities:**
- `position: fixed`, `top-0`, `left-0`, `right-0`
- z-index ownership: `z-40`
- Three-zone horizontal layout: identity / telemetry / action
- Horizontal padding follows section cadence: `px-6 → md:px-10 → lg:px-14`
- Manages `menuOpen` boolean state, passes to `NavOverlay`
- Exposes no layout side effects on the rest of the page — no height reservation

**Does not own:**
- Any section layout or section overflow
- Hero height compensation
- Scroll event logic (belongs in a hook inside `shared/hooks/`)

### NavLogo — `NavLogo.tsx`

- Reserved identity-zone spacer only
- No visible mini-logo/sigil in the closed control surface
- Sizing tokens preserve the advisory header safe-zone math

### NavTelemetry — `NavTelemetry.tsx`

- Rendered only at `lg+` breakpoint
- Contains the telemetry annotation string (Phase 5 content decision)
- `pointer-events-none` — never interactive
- `aria-hidden="true"` — decorative, screen reader silent

### NavMenuTrigger — `NavMenuTrigger.tsx`

- Action zone: `MENU` / `CLOSE` label + `ONINavigationSigil` via `ArtifactConsumptionPair` (see **§9 Navigation Artifact Interaction Model**)
- `aria-label="Open menu"` when closed / `aria-label="Close menu"` when open
- `aria-expanded` state wired correctly
- `aria-controls` pointing to the overlay element id
- Does not own sigil motion or consumption tokens — delegates to `systems/spatial/`

### NavOverlay — `NavOverlay.tsx`

Implemented (Phase 5). Adaptive atmospheric navigation — not permanent center-nav on the control surface.

**Layering:**
- Outer shell: `position: fixed`, `inset-0`, `z-50` — owns scrim, dismiss target, and scroll lock
- Scrim: full-viewport, light tint + minimal `backdrop-blur`; click/tap scrim closes

**Adaptive navigation plane (intentional):**
- **Below `md` (mobile / narrow):** plane is `w-full` — reads as full-viewport navigation
- **`md+` (desktop / wide):** right-aligned partial-width plane — `md:w-[min(76vw,58rem)]`, `lg:w-[min(68vw,64rem)]`; atmospheric field remains visible left of the plane

**Motion & typography:**
- Plane: `translateX` from right (`translate-x-full` → `translate-x-0`) with opacity — ~520–760ms, ease-out/in
- Links: large editorial Bebas scale, bottom-weighted column, staggered opacity/translate on open
- No loud drawer snap, bounce, or spring choreography

**Interaction & a11y:**
- Close: `NavMenuTrigger` toggle, ESC, scrim pointer-down
- `body` scroll locked while open
- `aria-modal="true"`, `role="dialog"`; focusable links when open (`tabIndex` gated)

### Hero Architecture Impact — Phase 5 Change

When Phase 5 navigation implementation begins:
- Remove `calc(100svh - var(--oni-header-h))` from `sections/HeroSection/index.tsx`
- Hero returns to `height: 100svh` or `height: 100dvh`
- `--oni-header-h` token is kept in `globals.css` but becomes advisory-only (for safe-zone content planning, not structural layout)
- Document this change in `ARCHITECTURE.md` when implemented

---

## 8. Relationship to Atmospheric Systems

The control surface is the outermost interface layer of the ONI atmospheric world. It does not exist apart from it.

### What this means in practice

**Backdrop compositing.** The control surface must not sever the ambient backdrop. `bg-white`, blur, borders, or any full-width material treatment are prohibited for the closed control surface. At page top, the atmospheric backdrop SVG must remain uninterrupted — the system works as a single continuous visual field.

**Shared typographic register.** Telemetry annotation uses the same typographic specification as the backdrop annotation system: `11px`, `tracking-[0.22em]`, neutral gray. They speak the same visual language. A visitor should not experience them as separate systems.

**Z-index ecology.** The control surface participates in the formally documented z-index table above. It does not override it arbitrarily. Every layer in the page has a documented owner.

**Motion continuity.** When motion is introduced in Phase 5, the control surface motion must feel continuous with ambient motion of the backdrop and section atmosphere — same speed register (slow, 400–700ms), same easing philosophy (ease-out/ease-in, not spring or bounce), same principle (motion supports atmosphere, never demands attention).

**Accent restraint.** The accent color `#FF4A1A` is not used decoratively in the control surface. It may appear in functional states only if necessary (e.g., a focused-state indicator on the menu trigger). The closed control surface is neutral-tone environmental marking only — no visible logo treatment is present until approved.

---

## 9. Navigation Artifact Interaction Model

> **Scope:** Interaction semantics and control-surface extension only.
> This section does **not** introduce a new navigation system, header architecture, or overlay runtime.
> Runtime ownership remains: `ControlSurface` → `NavMenuTrigger` → `NavOverlay`.
>
> The artifact pass added **reusable ritual primitives** and **interface → artifact transition grammar**
> inside the existing navigation action zone.

### Persistent control surface (not header UI)

Navigation is **not** a marketing navbar, decorative hero chrome, or cinematic header band.

It is a **persistent control surface** — infrastructural access floating above the page field.

The nav layer represents:

- persistent system access
- global orientation
- temporary readable interface shell
- artifact gateway into the overlay

It must remain quiet, atmospheric, and peripheral relative to primary content (e.g. the archive field).

### Runtime ownership separation

#### Navigation layer — `components/navigation/`

**Owns:**

- interaction state (`menuOpen`)
- overlay open/close and scroll lock
- trigger semantics (`aria-expanded`, `aria-controls`)
- global visibility and z-index promotion (`z-40` / `z-50`)
- three-zone layout (identity / telemetry / action)

**Does not own:**

- 3D artifact behavior
- ritual interaction grammar
- symbolic motion or frontal reveal logic

**Chain (unchanged):**

```
ControlSurface
  → NavMenuTrigger        (action zone — wires hover + click)
  → NavOverlay            (adaptive navigation plane — full-width `< md`, right plane `md+`)
```

`NavMenuTrigger` composes spatial primitives; it does not implement artifact motion inline.

#### Spatial artifact layer — `systems/spatial/`

**Owns:**

- `ONINavigationSigil` — canonical 3D navigation artifact (`/public/models/ONI_3d_no_texture.glb`)
- `ArtifactConsumptionPair` — interface + artifact composition shell
- `convergenceInteraction.ts` — tokens and style helpers for consumption grammar

**Responsible for:**

- symbolic presence and perceptual authority
- artifact idle / reveal / retreat behavior
- interface dissolution semantics
- reusable ritual primitives (not nav-specific animation hacks)

**Does not own:**

- menu routing or overlay content
- `menuOpen` state
- control surface layout or z-index table

### Canonical interaction grammar

**Core rule:**

```txt
interface layer dissolves
artifact remains
```

This is **not** button animation, kerning choreography, or paired UI hover feedback.

It is **artifact revelation** — a temporary readable layer yields to a persistent symbolic object.

**Principle:** meaning > effect.

| Correct | Incorrect |
|---------|-----------|
| `ArtifactConsumptionPair` | `HoverAnimationPair` |
| artifact consumption | two elements converging |
| interface dissolution | typography sliding |

The primitive names **what is happening**, not what visually moves.

### Two-layer semantics

#### Interface layer (e.g. `MENU` / `CLOSE`)

Represents:

- temporary human-readable abstraction
- infrastructural shell affordance
- low-mass UI text

Properties:

- dissolvable
- secondary authority
- must fully disappear at peak attention (not ghost, not blur residue)

#### Artifact layer (ONI sigil)

Represents:

- persistent symbolic object
- deeper system presence
- navigation core under the readable shell

Properties:

- spatially authoritative on activation
- stable at peak (frontal, legible)
- perceptually central only during attention — not hero-scale spectacle

**Final principle:** the navigation system should feel like a **temporary readable interface wrapped around a persistent artifact**.

### Idle vs hover semantics

#### Idle

| Layer | Behavior |
|-------|----------|
| Interface (`MENU`) | Readable, stable, lightweight; intentional spacing from sigil (`MENU        ◊`) |
| Sigil | Oblique orientation, slight autonomous drift, low authority, quiet infrastructure |

#### Hover / focus (artifact revelation)

| Layer | Behavior |
|-------|----------|
| Interface | Fully disappears: `opacity: 0`, `visibility: hidden`, `pointer-events: none`. No blur-based dissolve. Optional minimal tracking loosen before disappearance only. |
| Sigil | Rotates toward **frontal** orientation; motion **calms** (settles, does not accelerate); slight inward drift and scale (`~1.21`, transform-only); occupies perceptual center |

Hover should feel like **revelation** — the sigil was always the real object; `MENU` was only a readable layer.

**Not:** hover animation, HUD excitement, elastic UI, or increased spin energy.

Sequence (CSS + local R3F):

1. Artifact activates (inward, mass)
2. Interface destabilizes and vanishes
3. Sigil settles to frontal, near-still pose
4. On release: artifact retreats first → interface quietly reforms

### Implementation reference (action zone)

```
NavMenuTrigger
  └── ArtifactConsumptionPair          ← interfaceLayer + artifact slots
        ├── interfaceLayerStyle()      ← convergenceInteraction.ts
        └── ONINavigationSigil         ← frontal reveal, dormant spin
```

Model asset: `/public/models/ONI_3d_no_texture.glb` — canonical, not duplicated.

### Reusability

`ArtifactConsumptionPair` and `convergenceInteraction.ts` are **intentionally reusable** interaction grammar.

Potential future use (same primitives, different slots):

- 404 rituals
- loading / gateway transitions
- archive trigger rituals
- inspect entry transitions
- editorial synchronization pairs

This is **not** nav-specific animation logic. Compose `interfaceLayer` + `artifact` with shared tokens; do not fork menu-only motion.

### Non-goals (artifact interaction)

Hard constraints for this layer:

- no cinematic UI or HUD energy
- no glow, shaders, bloom, or postprocessing on the sigil
- no Framer Motion, spring physics, or elastic choreography
- no giant scale jumps (artifact scale capped ~`1.18–1.24`)
- no fullscreen nav canvas or global render managers
- no effect-driven hover (opacity ghosts, blur residue, symmetric pair drift)

The system remains **quiet, architectural, systemic** — discovered, not animated.

### Relationship to Section 6 (motion)

Section 6 hover rules apply to **telemetry and ambient chrome** (opacity-only, no scale/translate).

The **action zone** is exempt: it uses artifact revelation per this section, not generic link-hover opacity.

---

## Implementation Boundaries

### Phase 5 Scope — Navigation Implementation

1. Create `components/navigation/` system with all sub-components
2. Replace `components/SiteHeader.tsx` with the `ControlSurface`
3. Remove `calc(100svh - var(--oni-header-h))` from Hero, restore full-viewport height
4. Implement `NavOverlay` (adaptive atmospheric menu plane) with keyboard accessibility
5. Define and implement scroll state behavior (transparent → subtle surface)
6. Finalize telemetry content selection

### Not in Phase 5

- Scroll-driven entrance motion for sections (Phase 4)
- Section-local atmosphere systems (Phase 4)
- CMS integration (future)
- Per-page navigation active states (future, depends on routing system)
- Hide-on-scroll behavior (future, revisit if multi-page routing is introduced)

### Phase Prerequisites

- Phase 4 motion system (`systems/motion/`) should be established before Phase 5 motion is applied to the navigation
- Phase 4 may define scroll behavior context (scroll hooks, motion tokens) that informs how the control surface scroll state is implemented
- Phase 5 can begin independently of Phase 4 if the scroll state behavior is implemented statically first and the motion layer added after

---

## Anti-Patterns — Explicitly Prohibited

- `bg-white` or any fully opaque background on the control surface at page top
- `position: sticky` — the surface must float, not displace
- Permanent visible nav links in the control surface (startup pattern)
- Bottom navigation bar (mobile app/dashboard pattern)
- Reverting the overlay to permanent center-nav links on the control surface (startup pattern)
- `z-index: 9999` or undocumented z-index values
- Entrance animations on the control surface itself
- Scale or translate transforms on hover outside the action-zone artifact model (§9)
- Telemetry with animated transitions or count-up effects
- Using the accent color `#FF4A1A` decoratively in the navigation surface
