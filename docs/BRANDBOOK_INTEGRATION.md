# Brandbook Integration

**Status:** OPERATIONAL — Phase 1 complete  
**Route:** `/brandbook` (production — `app/brandbook/`)  
**Source archive:** `_archive/brandbook-make-export/` (Figma Make Vite export — reference only, not runtime)

---

## Source archive

The original Figma Make export is preserved at **`_archive/brandbook-make-export/`**.

| | |
|--|--|
| **Original source** | Preserved intact — Vite SPA, shadcn toolchain, Frame imports, wire PNGs at source paths |
| **Production route** | `app/brandbook/` → `/brandbook` — this is what ships |
| **Runtime system** | `systems/brandbook/` + `public/brandbook/` — ported artifacts only |
| **Archive copy** | Reference-only — diff against port, recover editorial copy, trace Frame provenance |
| **Not runtime** | Excluded from `tsconfig.json`; no imports from `_archive/` in the Next.js app; not built or deployed |

See also: `_archive/README.md`, `_archive/brandbook-make-export/ARCHIVE.md`.

---

## Release note — Brandbook Phase 1 (2026-05-30)

**Shipped:** Interactive brandbook as a first-class Next.js route — selective port from Figma Make, not iframe or dual build.

| Deliverable | Location |
|-------------|----------|
| Route shell | `app/brandbook/` — Outfit + JetBrains Mono scoped; `ControlSurface` mounted |
| Experience | `systems/brandbook/` — six scroll-snap sections, internal section rail |
| Assets | `public/brandbook/` — hero + about wire-art PNGs; SVG path imports |
| Atmosphere | `BrandbookHeroMetallicDrift` — slow orbital drift on hero wire art only |
| Site nav surfacing | `NavOverlay` → `/brandbook`; `NavTelemetry` section lane on route |
| Dependency | `motion@^12.23.24` (brandbook island + existing motion usage) |
| Operational doc | `docs/BRANDBOOK_INTEGRATION.md` (this file) |

**Build (release candidate):** `/brandbook` — 60.2 kB route JS · 396 kB First Load JS · static SSG · `npm run build` pass.

**Not in Phase 1:** homepage entry point, Works evidence link, DEC log entry for nav IA (see Phase 2).

**Canonical sync (this pass):** `FOLDER_MAP.md`, `ARCHITECTURE.md`, `README.md` updated to reflect shipped route and system ownership.

---

## Phase 1 — Decisions

### Integration approach

**Selective port into Next.js** (Option A from pre-integration audit).  
Not iframe, not dual Vite build. Active runtime only — no shadcn/Radix/MUI/Tailwind v4 toolchain.

### Route shell

- **`app/brandbook/layout.tsx`** — route metadata + Outfit/JetBrains Mono scoped via CSS variables `--font-display` / `--font-mono` on `.brandbook-root`
- **`app/brandbook/page.tsx`** — `ControlSurface` + `BrandbookExperience` client island
- **No `PageBackdrop`** — brandbook sections carry own wire-art backgrounds (matches source)

### Navigation

- **`ControlSurface`** mounted on `/brandbook` (same as `/works`, `/archive`) — primary site chrome (z-40/50)
- **`BrandbookSectionNav`** — route-local section rail restored from Figma Make `OniNav` (see Navigation Refinement below)
- **Site `NavOverlay`** — **shipped:** `BRANDBOOK` → `/brandbook` (overlay editorial index; see `NAVIGATION_ARCHITECTURE.md` §7)
- **`NavTelemetry`** on `/brandbook` — **shipped:** `ONI.STUDIO / BRAND BOOK / 01` … `06` (section index from scroll via optional `BrandbookSectionContext`)
- **Overlay footer annotation** on `/brandbook` — `BRANDBOOK OPEN` (desktop, bottom-right third line)

Cross-route hash targets (`CAPABILITIES` → `#work`, `CONTACT` → `#contact`) resolve on `/` only — known limitation; deferred cross-route pass (see `NAVIGATION_ARCHITECTURE.md` deferred notes).

### Scroll model

- Internal **`h-screen overflow-y-scroll`** container preserved
- **`scrollSnapType: y mandatory`** on container
- Each section: **`height: 100vh`**, **`scrollSnapAlign: start`**, **`flexShrink: 0`**
- **`BrandbookSectionContext`** owns scroll container ref + `scrollToSection()` for internal nav clicks

### Fonts

- **`next/font/google`** in route layout only — site root Bebas/Inter untouched
- **Outfit** → `--font-brandbook-display` → remapped to `--font-display`
- **JetBrains Mono** → `--font-brandbook-mono` → remapped to `--font-mono`
- **Outfit subsets:** `latin`, `latin-ext` only — Google Fonts / `next/font` does not expose `cyrillic` for Outfit
- **JetBrains Mono subsets:** `latin`, `cyrillic` — Cyrillic body copy in About/Logo/Fonts uses mono stack

### Dependencies

- **Added:** `motion@^12.23.24` (single runtime dependency from source)
- **Not added:** 50+ Figma Make packages (Radix, MUI, Embla, Recharts, etc.)

### TypeScript

- **`_archive/brandbook-make-export/` excluded** from `tsconfig.json` `exclude` — prevents Next typecheck from compiling reference Vite source alongside ported code

### Content

- **No editorial changes** — Russian copy, `@onivisialstudio` links, color values preserved verbatim from source
- **Removed `robots: noindex`** from Vite `index.html` behavior — production route is indexable via Next metadata

---

## File structure (Phase 1)

```
app/brandbook/
  layout.tsx              ← fonts + metadata + .brandbook-root wrapper
  page.tsx                ← ControlSurface + BrandbookExperience

systems/brandbook/
  BrandbookExperience.tsx     ← scroll-snap orchestrator + scroll tracking
  BrandbookSectionContext.tsx ← active section + scroll container ref
  BrandbookSectionNav.tsx     ← internal section rail (from OniNav)
  components/
    BrandbookHero.tsx     ← from oni-hero.tsx
    BrandbookHeroMetallicDrift.tsx ← hero wire-art ambient drift (Atmosphere Pass)
    BrandbookAbout.tsx    ← from oni-about.tsx
    BrandbookLogo.tsx     ← from oni-logo.tsx
    BrandbookColors.tsx   ← from oni-colors.tsx
    BrandbookFonts.tsx    ← from oni-fonts.tsx
    BrandbookLinks.tsx    ← from oni-links.tsx
  imports/
    heroSvgPaths.ts       ← from Frame4/svg-915q4u36n2.ts
    logoSvgPaths.ts       ← from Frame6/svg-2715pv9egi.ts

public/brandbook/
  hero-wire.png           ← from Frame4/4eb5d3d61a7f0fa7bade0165667b25b124c1ca2a.png
  about-wire.png          ← from Frame5/52b6466192ebce13cf280f19e641a5bb2cd0a1b8.png

docs/
  BRANDBOOK_INTEGRATION.md  ← this file

_archive/brandbook-make-export/   ← REFERENCE ONLY — original Figma Make export (not runtime)
  ARCHIVE.md                       ← archive doctrine for this bundle
  src/ …                           ← Vite source (see ARCHIVE.md)
```

**Modified (Phase 1 + release ship set):**

| File | Change |
|------|--------|
| `package.json` | + `motion` |
| `package-lock.json` | lockfile update |
| `tsconfig.json` | exclude `_archive/brandbook-make-export` |
| `components/navigation/NavOverlay.tsx` | `BRANDBOOK` overlay link + route annotation (site nav) |
| `components/navigation/NavTelemetry.tsx` | optional brandbook section lane |
| `NAVIGATION_ARCHITECTURE.md` | editorial overlay index + brandbook telemetry row |

**Untouched per scope lock:**

- `app/page.tsx`, all archive routes/systems, `sections/WorkSection/` — homepage and archive content unchanged
- Works lane content/registry — unchanged in Phase 1

---

## Migrated assets

| Source (`_archive/brandbook-make-export/`) | Destination | Use |
|--------------------------------------------|-------------|-----|
| `src/imports/Frame4/4eb5d3d61a7f0fa7bade0165667b25b124c1ca2a.png` | `public/brandbook/hero-wire.png` | Cover section background |
| `src/imports/Frame5/52b6466192ebce13cf280f19e641a5bb2cd0a1b8.png` | `public/brandbook/about-wire.png` | About section background |
| `src/imports/Frame4/svg-915q4u36n2.ts` | `systems/brandbook/imports/heroSvgPaths.ts` | Cover logo SVG path |
| `src/imports/Frame6/svg-2715pv9egi.ts` | `systems/brandbook/imports/logoSvgPaths.ts` | Logo construction SVG path |

---

## Removed / not ported

### Components removed intentionally

| Item | Reason |
|------|--------|
| `sectionRef` props + refs in orchestrator | Unused in source; cleaned on port |
| `BrandbookSectionProgress` (interim) | Superseded by interactive `BrandbookSectionNav` |

### Source bundle not ported (dead code in Figma Make export)

| Category | Count | Notes |
|----------|-------|-------|
| `src/app/components/ui/*` (shadcn) | 48 files | Zero imports from active app |
| `Frame4/5/6/7/8/10.tsx` wrappers | 6 files | Only PNG/SVG modules used |
| `figma/ImageWithFallback.tsx` | 1 file | Unused |
| `theme.css`, `default_shadcn_theme.css` | — | shadcn tokens; oni-* used inline hex |
| Tailwind v4 `@tailwindcss/vite` toolchain | — | Site uses Tailwind v3 |
| Vite config, `index.html`, `main.tsx` | — | Replaced by Next route |

### Dependencies not migrated

All `_archive/brandbook-make-export/package.json` entries except **`motion`** — including `@radix-ui/*`, `@mui/*`, `lucide-react`, `react-router`, `recharts`, `embla-carousel-react`, etc.

---

## Navigation refinement — internal section rail

**Decision:** Restore Figma Make **`OniNav`** as **`BrandbookSectionNav`**, scoped to `/brandbook` only. Brandbook-internal navigation — section progress, awareness, click-to-section — not site navigation replacement.

### Two-layer model on `/brandbook`

| Layer | Component | Role | z-index |
|-------|-----------|------|---------|
| **Site** | `ControlSurface` | Global routes, menu overlay | z-40 / z-50 |
| **Brandbook** | `BrandbookSectionNav` | Six section dots + hover labels | z-30 |

ControlSurface remains primary. Section rail is route-local and visually subdued.

### Restored from source (`OniNav`)

- Labels: COVER · ABOUT · LOGO · COLORS · FONTS · LINKS (hover reveal)
- Active/inactive dot motion + pulse ring
- Dark-section color inversion (About, Logo, Colors)
- Click → `scrollToSection(index)` smooth scroll

### Reduced dominance vs source

| Property | Source | Port |
|----------|--------|------|
| z-index | 50 | 30 |
| Active dot | 10px | 8px |
| Inactive dot | 4px | 3px |
| Pulse ring | 16px full | 14px @ 0.55 opacity |
| Label hover | opacity 100 | opacity 70 |
| Gap | gap-4 | gap-3 |

### State wiring

`BrandbookSectionProvider` holds `scrollContainerRef`, `activeSection`, `scrollToSection`. Shared by `BrandbookExperience` (scroll track) and `BrandbookSectionNav` (click navigate). `NavTelemetry` reads optional context for `BRAND BOOK / 01`…`06` display lane.

---

## Deviations from original Figma Make export

| Deviation | Detail |
|-----------|--------|
| **Build system** | Vite SPA → Next.js App Router static page |
| **Asset loading** | Vite `import png` → public URL `/brandbook/*.png` |
| **Font loading** | Google Fonts CSS `@import` → `next/font/google` route-scoped |
| **Outfit Cyrillic** | Source assumed Outfit for Cyrillic display; `next/font` Outfit has no cyrillic subset — display headings may fall back to sans-serif for some Cyrillic glyphs; mono Cyrillic covered by JetBrains |
| **Navigation** | Site nav = `ControlSurface`; section nav = `BrandbookSectionNav` (restored from `OniNav`, subdued) |
| **Typeface labels vs reality** | Fonts section labels say "Cascadia Code" / "Bounded" but render via `--font-mono` / `--font-display` (JetBrains / Outfit) — preserved from source labeling |
| **Link hover motion** | `whileHover={{ x: 6 }}` kept on Links section — brandbook artifact behavior, not site homepage hover doctrine |
| **Indexing** | Vite `index.html` had `noindex`; Next route does not |
| **Component naming** | `oni-*` → `Brandbook*` under `systems/brandbook/` |

---

## Atmosphere drift pass — hero metallic forms

**Scope:** `/brandbook` cover section only (`BrandbookHero`).

**Goal:** Subtle orbital drift on large metallic wire-art forms surrounding the static central ONI mark — atmosphere over visibility.

### Layer model

| Layer | Component | Motion |
|-------|-----------|--------|
| Wire art (metallic forms) | `BrandbookHeroMetallicDrift` | Slow transform drift |
| Central ONI mark + title | `BrandbookHero` (z-10) | Entrance only — **static after load** |
| Section chrome | label, scroll line | Unchanged entrance motion |

The hero PNG (`hero-wire.png`) is the metallic field. The logo SVG path (`heroSvgPaths`) is a separate layer and does not inherit drift.

### Motion spec

| Property | Value |
|----------|-------|
| Transforms | `translate` (%), `rotate` (deg), `scale` only |
| Cycle | 54s linear loop, keyframes return to origin (no snap) |
| Amplitude | ≤ ~1° rotation, ≤ ~0.5% translation, scale 1.05–1.063 |
| Origin | `50% 42%` — biased toward logo centroid |
| Overscan | `-inset-[14%]` — hides edge reveal during drift |
| Blur | Not applied — filter animation avoided for compositor cost |
| Reduced motion | `useReducedMotion()` → static wire frame at rest pose |

### Constraints honored

- No Three.js / R3F / physics / particles
- No new assets
- No page redesign — background `<img>` moved into drift wrapper only
- Existing Framer Motion dependency reused (`motion/react`)

### Performance notes

- Single compositor layer (`will-change-transform`) on one oversized `<img>`
- No layout thrash — transform-only, no `width`/`height` animation
- `prefers-reduced-motion` respected

---

## Build verification (Phase 1)

```
Route (app)                              Size     First Load JS
○ /brandbook                           59 kB           394 kB
```

- `npm run build` — pass
- TypeScript — pass (with `_archive/brandbook-make-export` excluded)

### Atmosphere drift pass (2026-05-30)

```
○ /brandbook                           60.2 kB         396 kB
```

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Route JS | 59.9 kB | 60.2 kB | +0.3 kB |
| First Load JS | 396 kB | 396 kB | 0 |
| New dependencies | — | — | none |
| Runtime layers | static PNG | 1 GPU transform layer | compositor-only |

Build pass. No new packages. Drift uses existing `motion/react` + `useReducedMotion`.

---

## Phase 2 follow-up tasks

1. **Homepage entry** — brandbook proof link (e.g. WorkSection SPATIAL IDENTITY evidence slot or dedicated preview)
2. **Social handle alignment** — brandbook `@onivisialstudio` vs site `@oni_studio` editorial decision
3. **Display Cyrillic** — optional: add Cyrillic-capable display fallback if Outfit gaps are visible in QA
4. **DEC entry** — brandbook route + editorial overlay IA in `docs/DECISIONS.md`
5. **Cross-route hash nav** — `/#work` / `/#contact` from non-home routes (CAPABILITIES / CONTACT overlay targets)

---

## Figma source

Original design: [Interactive ONI Brandbook Experience](https://www.figma.com/design/iMC7YDmxquKJIJNj1o4Wbh/Interactive-ONI-Brandbook-Experience)
