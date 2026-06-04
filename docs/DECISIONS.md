# ONI — Architecture Decisions

Operational decision log. Read before changing navigation, content lanes, or control-surface behavior.

**Status:** ACTIVE  
**Format:** newest decisions first

---

## Decision 001 — Capabilities section removed from production

**Status:** Accepted

The homepage **Capabilities** section (Identity, Motion, Digital, Spatial, Systems) is removed from production composition.

**Reason:**

- Duplicates information already present in the archive
- Introduces unnecessary text density
- Weakens journal / archive editorial feeling
- Team feedback indicated the section feels overloaded

**Preservation:**

Original implementation remains in `sections/CapabilitiesSection/` (not deleted). Content may return later in a different format.

**Future possibilities (not current release):**

- Archive tagging
- Archive filters
- Contextual capabilities
- Project metadata

**Implementation:** `app/page.tsx` no longer composes `CapabilitiesSection`. Overlay nav no longer links to `#work` (see DEC-009).

---

## DEC-009 — Overlay index after Capabilities removal (2026-06-04)

**Context:** Decision 001 removes the `#work` homepage anchor. CAPABILITIES overlay row pointed at that section.

**Decision:** Remove CAPABILITIES from `NavOverlay` `NAV_ITEMS`. Canonical overlay order: HOME · ARCHIVE · BRANDBOOK · CONTACT.

| Label | href | Rationale |
|-------|------|-----------|
| HOME | `/` | Landing |
| ARCHIVE | `/archive` | Cross-archetype browse field |
| BRANDBOOK | `/brandbook` | Brand identity route |
| CONTACT | `#contact` | Homepage contact layer |

`/works` remains a first-class route via direct URL and telemetry; not an overlay row (unchanged from DEC-002 intent).

**Rejected:** Keeping CAPABILITIES linking to a removed section. Redirecting CAPABILITIES to `/works` without editorial review (different content lane).

**Implementation:** `components/navigation/NavOverlay.tsx` · footer nav in `sections/ContactFooterSection/index.tsx` (WORK → `/works`).

**See also:** Decision 001 above · `docs/contact-layer-spec.md`

---

## DEC-010 — Contact Layer in dedicated Cloudflare Worker (2026-06-04)

**Status:** Active

**Context:** Homepage needs project inquiry intake with file attachments and dual notification (Telegram forum topic + email). Running that logic inside the Next.js Pages bundle would couple static deploys to upload handling, secrets, and delivery retries.

**Decision:** Extract inquiry handling into a standalone Cloudflare Worker — `oni-contact-api` (`workers/contact/`).

| Concern | Owner |
|---------|--------|
| Form UI + client validation | `sections/ContactFooterSection/ProjectContactForm.tsx` |
| API, uploads, delivery, rate limit | `workers/contact/` |

**Reason:**

- Keep homepage static and deployable on Cloudflare Pages without a Node inquiry API
- Isolate validation, R2 uploads, Telegram, and Resend from the editorial frontend
- Parallel Telegram + email delivery without cross-routing between channels

**Rejected:** Next.js Route Handler on Pages for multipart uploads (heavier deploy surface, mixed runtime concerns). Telegram-via-email or email-via-Telegram forwarding.

**Implementation:** `workers/contact/` · `docs/contact-layer-spec.md` · `ARCHITECTURE.md` § Contact Layer Architecture · `NEXT_PUBLIC_CONTACT_API_URL` on Pages.

**See also:** DEC-009 (contact anchor `#contact`) · Decision 001

---

## DEC-008 — `useDocumentScrollLock` (2026-05-30)

**Context:** Menu overlay and showreel viewers both need iOS-safe document scroll lock. Ad-hoc per-component body style mutation risks drift and double-release bugs.

**Decision:** Single module `systems/useDocumentScrollLock.ts` owns lock lifecycle.

| Concern | Behavior |
|---------|----------|
| **Ownership** | Module-level ref count (`lockCount`); first acquire snapshots `scrollY` + inline `html`/`body` styles; last release restores both and calls `window.scrollTo(0, scrollY)` |
| **Apply** | `html`/`body` `overflow: hidden`; `body` `position: fixed`, `top: -scrollY`, `width: 100%`, `touchAction: none` |
| **Consumers** | `NavOverlay` (`blockTouchMove: true`); `ShowreelInstallationViewer`; `ShowreelCinemaViewer` |
| **`blockTouchMove`** | When true: document `touchmove` listener with `{ passive: false }` + `preventDefault` — iOS background-scroll guard; ref-counted separately (`touchMoveBlockCount`) |
| **Restoration** | Synchronous on last consumer cleanup — revert inline styles, then `scrollTo` saved position; clear snapshot |

**Rejected:** Duplicate scroll-lock logic in overlay or showreel components. Reintroducing `useControlSurfaceScroll` for scroll feedback (DEC-004).

**Implementation:** `systems/useDocumentScrollLock.ts` · consumers above.

**See also:** `ARCHITECTURE.md` Interaction ownership · `docs/SHOWREEL_SYSTEM.md` · `NAVIGATION_ARCHITECTURE.md` §7 NavOverlay

---

## DEC-007 — Cinema viewer closed-state hit testing (2026-05-30)

**Context:** After closing mobile showreel (TEST C), production iOS exhibited partial scroll recovery, dead footer/trigger zones, scroll only at viewport edges, intermittent recovery when content moved — not explained by focus restore (`preventScroll` did not help) or deferred time sync experiments.

**Root cause:** `ShowreelCinemaViewer` stays **portaled** to `document.body` at `z-[60]` after first mobile open. On close, dialog root correctly uses `pointer-events-none`, but viewer `<video>` kept `pointer-events-auto`. CSS hit testing: descendants with `auto` remain targets under a `none` parent — invisible **ghost video slab** (`object-contain` center) intercepted pan/tap over page content.

**Investigation summary:**

| Hypothesis | Result |
|------------|--------|
| Return focus / `scrollTo` order | Ruled out — `preventScroll` patch no improvement |
| Pre-unlock `onTimeSync` | Ruled out — deferral experiment did not fix TEST C |
| Closed portaled layer + child `pointer-events` | **Confirmed** — `pointer-events-none` on video when `!isOpen` fixed production TEST C |

**Decision:** Gate viewer `<video>` pointer events on `isOpen` — `pointer-events-auto` only while open; `pointer-events-none` when closed. Portal mount persistence unchanged.

**Rejected:** Unmounting portal on every close (larger lifecycle change). Stacking workaround layers. Canonizing forensic `setTimeout` deferral for `onTimeSync`.

**Implementation:** `sections/ShowreelSection/ShowreelCinemaViewer.tsx` — video `className` toggles with `isOpen`.

**See also:** `docs/SHOWREEL_SYSTEM.md` § Portal lifecycle · § Closed-state interaction

---

## DEC-006 — Homepage touch scroll-through (2026-05-30)

**Context:** Phase 1 scroll-lock work did not fix production mobile symptom: vertical swipes starting on Hero WebGL or Archive Fragment tiles often failed to scroll the document.

**Root causes:**

| Surface | Cause |
|---------|--------|
| Hero canvas | `@react-three/drei` `OrbitControls` `connect()` set inline `touch-action: none` on `gl.domElement`, overriding Tailwind `touch-pan-y` |
| Archive tiles | iOS Safari: touch on `<video>` inside full-surface `<Link>`; media element captured pan before document |

**Decision:**

1. **Hero — remove `OrbitControls` entirely** (all breakpoints). `enableRotate` / `enablePan` / `enableZoom` were already `false`; environmental motion is `SpinOnY` + `useFrame`, not controls. Removing avoids `touch-action: none` and dead pointer listeners. Canvas + `.oni-webgl` keep `touch-pan-y` (class + inline on canvas).

2. **Archive Fragment — minimal tile touch stack** (`ArchiveFragmentTile`): `touch-pan-y` on link + wrapper; `pointer-events-none` on `<video>` / `<Image>` so the link owns tap and vertical pan reaches the document. Autoplay via `useCinematicVideo` unchanged.

**Rejected:** Post-connect `touch-action` override while keeping OrbitControls — fights drei on every connect/dispose. Mobile-only OrbitControls removal — desktop scroll-over-canvas benefit is free when control is unused.

**Implementation:** `sections/HeroSection/Scene.tsx` · `sections/HeroSection/index.tsx` · `sections/ArchivePreviewSection/ArchiveFragmentTile.tsx`

**See also:** `ARCHITECTURE.md` Hero editorial composition · `docs/ARCHIVE_FRAGMENT_V2.md` § V3.5

---

## DEC-005 — Navigation route awareness (2026-05-30)

**Context:** Multi-route baseline (`/`, `/works`, `/works/[slug]`, `/archive`, `/archive/[slug]`) shipped with Layer 1. Overlay and telemetry were still documented as home-static (static `MMXXVI`, decorative `ARCHIVE OPEN`). Visitors had no infrastructural signal of current lane.

**Decision:** **Route consciousness on the control surface** — read `pathname` via Next.js `usePathname()` in navigation client components. No new systems, no scroll-state, no route transitions.

| Surface | Behavior |
|---------|----------|
| **NavTelemetry** | `ONI.STUDIO / {lane}` — `HOME` on `/`; `WORKS` when path starts with `/works`; `ARCHIVE` when path starts with `/archive`; `MMXXVI` fallback elsewhere |
| **NavOverlay links** | `aria-current="page"` when href matches current route (`/` exact; `/works` and `/archive` include subpaths; `#showreel` / `#contact` current only on `/`) |
| **NavOverlay links (visual)** | Non-current items at reduced opacity until hover/focus (overlay interaction unchanged) |
| **NavOverlay footer annotation** | Route-specific third line: `HOME FIELD` · `WORKS INDEX` · `WORK OPEN` · `ARCHIVE FIELD` · `ARCHIVE OPEN` · `ONI STUDIO` fallback |

**Rejected:** Reintroducing scroll-state on the closed control surface for orientation (DEC-004). Folding Works media into `resolveArchiveMediaSrc()` (archive R2 scope — see `CONTENT_SYSTEM.md` Works lane).

**Implementation:** `components/navigation/NavTelemetry.tsx`, `components/navigation/NavOverlay.tsx`.

**See also:** `NAVIGATION_ARCHITECTURE.md` §4 Telemetry · §7 NavOverlay · `ROADMAP.md` Layer 2 navigation consciousness (partial — scroll-state item cancelled by DEC-004)

---

## DEC-004 — ControlSurface: no scroll-state (2026-05-29)

**Supersedes:** DEC-003

**Context:** DEC-003 reduced scroll feedback to hairline border only after `scrollY > 100`. Evaluation (2026-05-29): border-only provides negligible orientation value — closed surface exposes no route/section position; user already knows they scrolled; full-width edge still reads as a frame, contradicting `NAVIGATION_ARCHITECTURE.md` §2 (“no border, not a bar”) and Environmental Control Layer intent.

**Decision:** **Remove scroll-state entirely.** Closed ControlSurface is **identical at all scroll positions** — transparent, no border, no background, no backdrop blur, no scroll listener.

**Rejected:** Keeping border-only as permanent scroll feedback — residual generic nav pattern, not ONI orientation infrastructure.

**Implementation:** Remove `useControlSurfaceScroll` and all scroll-conditional header classes from `components/navigation/index.tsx`. Delete `useControlSurfaceScroll.ts`.

**Reintroduction gate:** Only if a future need is explicit and ONI-specific (e.g. scroll-indexed telemetry, evidenced trigger illegibility on a specific route) — not generic “user scrolled” chrome.

**See also:** `NAVIGATION_ARCHITECTURE.md` §2 Visual Character · `ARCHITECTURE.md` Environmental Control Layer

---

## DEC-003 — ControlSurface scroll feedback: border only (2026-05-29) — SUPERSEDED

**Status:** Superseded by DEC-004. Retained for history.

**Context:** Phase 5 scroll state used `bg-white/[0.03]` + `backdrop-blur-[2px]` on the full-width fixed `<header>` after `scrollY > 100`. This read as a conventional sticky glass navbar — contradicting Environmental Control Layer doctrine (no persistent panel, blur, or full-width material on the closed control surface).

**Decision:** Scroll feedback is **hairline border only** — `border-b border-black/[0.06]` after threshold. No background fill. No `backdrop-filter` on the closed control surface at any scroll position.

**Rejected:** Full-width glass strip (background + blur). Reads as SaaS navbar; severs atmospheric continuity.

**Implementation:** `components/navigation/index.tsx` — `useControlSurfaceScroll` unchanged (100px threshold, 500ms border transition).

**See also:** `NAVIGATION_ARCHITECTURE.md` §6 Scroll State Transition · `ARCHITECTURE.md` Navigation System → Environmental Control Layer

---

## DEC-002 — Overlay editorial index (2026-05-29, amended 2026-05-30)

**Context:** Layer 1 introduced `/works` and `/archive` as permanent content routes. The overlay was home-centric with no ARCHIVE link. Initial DEC-002 shipped WORK → `/works` in the overlay; production index later evolved to foreground homepage territory and brandbook while Works remains a first-class route via telemetry and direct URLs.

**Decision (canonical — matches `NavOverlay.tsx` `NAV_ITEMS`):**

| Label | href | Rationale |
|-------|------|-----------|
| HOME | `/` | Landing |
| CAPABILITIES | `#work` | Homepage territory section (Capabilities) — dominant M tier; `md:-ml-3` |
| ARCHIVE | `/archive` | Cross-archetype browse field |
| BRANDBOOK | `/brandbook` | Brand identity route |
| CONTACT | `#contact` | Homepage footer anchor |

**Overlay order:** HOME · CAPABILITIES · ARCHIVE · BRANDBOOK · CONTACT

- `/works` is **not** an overlay row — lane signal via `NavTelemetry` (`WORKS` / `WORK OPEN`) and Hero CTA; DEC-001 Lean Path unchanged.
- `#showreel` is **not** an overlay row — showreel remains homepage section `#showreel`; cross-route overlay pass still deferred.

**Rejected:** Omitting ARCHIVE from overlay. Reintroducing scroll-state on the closed control surface (DEC-004).

**Implementation:** `components/navigation/NavOverlay.tsx` — `NAV_ITEMS` only.

**See also:** `NAVIGATION_ARCHITECTURE.md` §7 NavOverlay · `docs/DECISIONS.md` DEC-005 · `ROADMAP.md` Layer 1 URL targets

---

## DEC-001 — Works Lean Path vertical slice (2026-05-29)

**Context:** Layer 1 Batch 2 goal — prove multi-archetype scalability beyond archive without Layer 1 maturity work (MDX, Zod, `shared/content/`) blocking delivery.

**Decision:** Ship a **parallel Works lane** with minimum surface area:

| Layer | Location |
|-------|----------|
| Registry | `content/works/field.ts` + `types.ts` |
| Territory | `public/works/[slug]/` (`00-cover.*`) |
| Routes | `/works`, `/works/[slug]` — static SSG |
| Render | `systems/works/` — typographic index + document shell |

**Explicitly deferred:** MDX narrative, Zod validation, `shared/content/`, evidence sequences, R2 upload for works assets, archive cross-links.

**Proof criteria met when:** second registry + territory + render system coexist with archive; index is not masonry; detail is not inspect; archive untouched.

**Rejected:** Full Architecture Path (MDX + Zod + `getWorkAssets` + production pipeline) as Batch 2 gate — conflates “prove lane scales” with “Works production system complete.” Filtering `archiveObjects` by `archetype: "Work"` for `/works` — breaks parallel registry doctrine.

**See also:** `content/works/field.ts` · `FOLDER_MAP.md` · `ROADMAP.md` Delivered early

---

## Document relations

| Document | Role |
|----------|------|
| `ROADMAP.md` | Delivery status — sync when decisions ship |
| `NAVIGATION_ARCHITECTURE.md` | Navigation runtime spec |
| `ARCHITECTURE.md` | Infrastructure truth |
| `AI_RULES.md` | Agent constraints — points here for nav/content lane decisions |
| `CONTENT_SYSTEM.md` | Archive authoring + Works Pages-static delivery |
| `docs/SHOWREEL_SYSTEM.md` | Showreel runtime authority (ambient / installation / cinema) |
| `docs/SHOWREEL_FRAME_CALIBRATION.md` | Frame geometry + RGBA compositing authority |
| `docs/contact-layer-spec.md` | Contact form + oni-contact-api Worker authority |
