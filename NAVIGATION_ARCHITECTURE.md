# ONI Navigation Architecture

## Planning Status

**Phase:** Navigation control surface (Phase 5 — implemented) + artifact interaction grammar (implemented) + route awareness (DEC-005)
**Runtime:** `components/navigation/` — `ControlSurface`, `NavTelemetry`, `NavOverlay`, `NavMenuTrigger`
**Artifact semantics:** `systems/spatial/` — §9 below; see also `ARCHITECTURE.md` (Navigation Sigil)
**Retired:** `components/SiteHeader.tsx` — removed; do not reintroduce

---

## 1. Historical — SiteHeader (replaced)

> **Status:** Historical context only. Migration complete. Active runtime is `components/navigation/`.

The former `components/SiteHeader.tsx` was a sticky, opaque top bar with permanent center links (WORK, STUDIO, SERVICES, CONTACT). It severed the atmospheric backdrop, coupled Hero height to header dimensions, and read as conventional SaaS chrome.

**Why it was replaced:** ONI navigation is a floating control surface (`position: fixed`), transparent at all scroll positions (DEC-004), with links in `NavOverlay` only — not a structural band in document flow.

Do not restore `SiteHeader` patterns: `position: sticky`, `bg-white` on the closed surface, permanent center-nav links, or scroll-state on the closed surface.

---

## 2. Navigation Architecture (implemented)

### Philosophy

Navigation should be a **floating control surface** — an instrument panel hovering above the page, not a structural band that divides header from content.

The control surface does not claim territory. It does not compete with the atmospheric layer beneath it. It is present without being dominant. It belongs to the same visual register as the backdrop annotation system: thin, tracked, precise.

The language of the control surface is the same as the ONI backdrop vocabulary — thin letterforms, high tracking, neutral tone, minimal punctuation. It reads like an instrument, not a menu bar.

### Positioning Model

`position: fixed` — not sticky.

The control surface floats above all content layers. Sections scroll beneath it. The surface never moves. Structural consequence (implemented):

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
- Nav links (HOME, CAPABILITIES, ARCHIVE, BRANDBOOK, CONTACT) are **not** permanently visible in the control surface — permanent center-nav is the startup pattern
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

- At all scroll positions: control surface is present and visually minimal — transparent, atmospheric, **unchanged by scroll** (see `docs/DECISIONS.md` DEC-004)
- **No scroll-state on the closed surface** — no border, background, or blur in response to `scrollY`
- **No hide-on-scroll behavior** for Phase 5 — adds complexity without clear benefit for a single-page scrolling site. Revisit if multi-page routing is introduced in future phases.
- The control surface is ambient infrastructure — it does not perform or react dramatically

---

## 4. Telemetry Placement and Interaction

### Purpose

Telemetry is atmospheric annotation — it reinforces the editorial and instrument character of the control surface without adding functional complexity. It is not a feature. It is part of the visual identity language.

The register is identical to the backdrop annotation system: `PRSM 001`, `ONI`, `MOVEMENT BY CONNECTION` — same weight, same scale, same neutrality.

### Shipped behavior (route lane awareness — DEC-005)

`NavTelemetry.tsx` reads `usePathname()` and renders:

```
ONI.STUDIO / {lane}
```

| Pathname | Lane suffix |
|----------|-------------|
| `/` | `HOME` |
| starts with `/works` | `WORKS` |
| starts with `/archive` | `ARCHIVE` |
| starts with `/brandbook` | `BRAND BOOK / {section}` — section index from brandbook context when on route |
| other | `MMXXVI` |

Lane updates are instantaneous (no animation). `pointer-events-none`, `aria-hidden="true"`.

### Historical — content options evaluated at Phase 5 baseline

**Option A — Static identity thread**
```
ONI.STUDIO / MMXXVI
```
Shipped initially; superseded for multi-route lanes by DEC-005 (table above).

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
A section-indexed position indicator that advances as the user scrolls between sections. Reinforces the instrument/HUD character. More complex to implement — deferred; reintroduction gate in DEC-004 (must be ONI-specific, not generic scroll chrome).

Options B and C remain atmosphere variants for a future pass. Option D is not authorized without a new DEC.

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
| Spatial continuity field   | `[5]`   | `systems/atmosphere/ContinuityField.tsx` | Landing only — between backdrop and sections |
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
- Backdrop is explicitly `z-0`; `ContinuityField` is `z-[5]` on the landing route (`ARCHITECTURE.md` z-index table)

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

**Removed (DEC-004).** The closed control surface does not react to scroll position — no border, background, or backdrop-filter at any depth.

Historical note: an initial Phase 5 pass used glass fill + blur (rejected, DEC-003 lineage); border-only was superseded for the same reason — closed surface is not orientation chrome. Reintroduction requires explicit ONI-specific need (e.g. scroll-indexed telemetry per §4 Option D), not generic scroll feedback.

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

## 7. Component Architecture (implemented)

### Directory Structure

```
components/
  navigation/
    index.tsx             ← ControlSurface — root floating container, z-index owner
    NavHome.tsx           ← HOME link on `/`, `/archive*`, `/brandbook`; else NavLogo spacer
    NavLogo.tsx           ← Reserved identity-zone spacer; no visible sigil
    NavTelemetry.tsx      ← Telemetry annotation, desktop-only, ambient
    NavMenuTrigger.tsx    ← Menu open button + consistent glyph
    NavOverlay.tsx        ← Adaptive menu overlay — full-width plane `< md`, right atmospheric plane `md+`
```

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
- Scroll event logic on the closed surface (DEC-004 — no scroll-state)

### NavHome — `NavHome.tsx`

- Persistent **HOME** text link on `/`, `/archive`, and `/brandbook` routes
- Returns to `/`; `aria-current="page"` when on landing
- All other routes: renders `NavLogo` spacer (same safe-zone geometry, no visible mark)

### NavLogo — `NavLogo.tsx`

- Reserved identity-zone spacer only
- No visible mini-logo/sigil in the closed control surface
- Sizing tokens preserve the advisory header safe-zone math

### NavTelemetry — `NavTelemetry.tsx`

- Rendered only at `lg+` breakpoint
- Route lane suffix via `usePathname()` — see §4 Shipped behavior (DEC-005)
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

**Primary links (`NAV_ITEMS`) — editorial index (2026-05-30):**

| Label | href | Tier | Notes |
|-------|------|------|-------|
| HOME | `/` | S · muted | Bookend |
| CAPABILITIES | `#work` | **M · primary** | Full opacity; `md:-ml-3`; homepage `#work` until dedicated route |
| ARCHIVE | `/archive` | L · 80% | Secondary field |
| BRANDBOOK | `/brandbook` | M · 80% | Tertiary proof block |
| CONTACT | `#contact` | S · muted | Bookend |

**Overlay order:** HOME · CAPABILITIES · ARCHIVE · BRANDBOOK · CONTACT

**Typography hierarchy** — single-line labels only; hierarchy via scale, opacity, and spacing:
- **Group spacing:** margin before CAPABILITIES (after HOME); margin before CONTACT (after BRANDBOOK); tight field spacing between ARCHIVE and BRANDBOOK
- No editorial word splitting or line breaks inside labels

CAPABILITIES primary at M scale (full opacity). ARCHIVE secondary at L scale (80% opacity). BRANDBOOK tertiary at M scale (80% opacity). HOME and CONTACT remain quiet bookends.

**Route awareness (DEC-005):**
- `aria-current="page"` on the matching `NAV_ITEMS` link
- Non-current links at `opacity-[0.38]` until pointer hover/focus (overlay scale interaction unchanged)
- Footer annotation (desktop, bottom-right): third line reflects current route — `HOME FIELD` · `BRANDBOOK OPEN` · `WORKS INDEX` · `WORK OPEN` · `ARCHIVE FIELD` · `ARCHIVE OPEN` · `ONI STUDIO` fallback; not a link

### Hero Architecture Impact (implemented)

- `calc(100svh - var(--oni-header-h))` removed from `sections/HeroSection/index.tsx`
- Hero is `min-h-[100svh]` / `lg:h-[100svh]`
- `--oni-header-h` is advisory-only in `globals.css` (safe-zone clearance, not structural layout)
- Documented in `ARCHITECTURE.md` Navigation System → Hero Impact

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

### Phase 5 — delivered

1. ✓ `components/navigation/` — `ControlSurface`, `NavHome`, `NavLogo`, `NavTelemetry`, `NavMenuTrigger`, `NavOverlay`
2. ✓ `SiteHeader` removed — `ControlSurface` is the only navigation chrome
3. ✓ Hero full-viewport height — no header height subtraction
4. ✓ `NavOverlay` — adaptive plane, keyboard accessibility, DEC-002 routes
5. ✓ Closed surface always transparent — no scroll-state (DEC-004)
6. ✓ Route lane telemetry + overlay route awareness (DEC-005)

### Not in scope / deferred

- Scroll-driven entrance motion for sections (Phase 4 — partial)
- CMS integration (future)
- Cross-route `/works` remains reachable by URL; overlay no longer lists it (CAPABILITIES → `#work` on homepage)
- Hide-on-scroll behavior (future)
- Scroll-state on closed control surface (rejected — DEC-004)

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
