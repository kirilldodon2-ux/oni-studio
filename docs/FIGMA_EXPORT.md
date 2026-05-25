# Figma Export — Landing Perception Freeze

**Status:** OPERATIONAL  
**Scope:** Canonical home route only (`/`)  
**Authority:** `ARCHITECTURE.md`, `VISUAL_LANGUAGE.md`, `AI_RULES.md`  
**Doctrine:** [FIGMA_RECONCILIATION_WORKFLOW.md](./FIGMA_RECONCILIATION_WORKFLOW.md) — full code ↔ Figma ↔ code pipeline

---

## Purpose

ONI uses a perception-layer workflow:

| Layer | Role |
|-------|------|
| Codebase | Structural truth |
| Figma | Perception laboratory |
| AI | Reconciliation between the two |

Export mode is a **temporary perception freeze** of the live landing environment — not a parallel route or redesign.

---

## Activation

```
https://<host>/?export=1
```

- Query key: `export`
- Value: `1`
- Sets `html.oni-export` and `data-oni-export-mode="1"` on `<html>`
- Wraps the page in `ExportModeProvider` (see `systems/export/`)

Production (`/` without the flag) is unchanged.

---

## What export mode does

| Behavior | Production | `?export=1` |
|----------|------------|-------------|
| Section layout / spacing | ✓ | ✓ identical |
| Atmosphere DOM (backdrop, continuity, marks) | ✓ | ✓ preserved |
| Scroll reveals (`PresenceLayer`) | opacity 0 → 1 on intersect | fully visible immediately |
| CSS keyframes (drift, breath, float, signal) | active | neutralized |
| Scroll parallax (`useDepthField`) | active | off |
| Hero WebGL | `HeroVisual` → `Scene` (R3F + local `HeroRoomEnvironment`) | `HeroVisual` → `HeroExportFallback` only (no R3F mount) |
| Showreel pointer parallax | active | off |
| SystemArtifact cycling | active | frozen at initial readout |

---

## Reconciliation metadata (Tier A)

| Attribute | Values | Meaning |
|-----------|--------|---------|
| `data-oni-page` | `landing` | Page identity |
| `data-oni-section` | `hero`, `work`, `showreel`, `contact` | Section boundaries for AI + Figma |
| `data-oni-layer` | `content`, `decorative`, `chrome` | Strip vs keep in structure import |
| `data-oni-presence` | (empty) | `PresenceLayer` / FadeIn / RevealUp wrappers |
| `data-oni-export` | `1` on page root when active | Capture flag mirror |
| `data-oni-hero-fallback` | (empty) | Hero sculpture reference image |

### Layer guidance for importers

- **`content`** — primary structure; always import
- **`decorative`** — atmosphere; keep in Figma as reference or hide in structure tree
- **`chrome`** — fixed `ControlSurface`; capture separately or exclude from scroll frames

---

## Recommended capture workflow

### 1. Desktop full page

1. Open `/?export=1` at **1440×** (or target width).
2. Wait for fonts and hero reference image to load (no WebGL spinner).
3. Scroll once top → bottom (optional; content is already visible).
4. Capture full page (`generate_figma_design`, html.to.design, or browser screenshot).

### 2. Mobile frame

1. Open `/?export=1` at **390×** width.
2. Capture separately — Hero stack order differs (sculpture below copy).

### 3. Figma import strategy

1. **Strip** `data-oni-layer="decorative"` from structure (or move to locked reference group).
2. **Hero** — treat `data-oni-hero-fallback` as raster reference; rebuild sculpture as linked component if needed.
3. **Work** — import six `article` nodes (`data-oni-section="work"`), not one flattened group. Desktop uses `lg:order-*`; DOM order ≠ visual order.
4. **Showreel** — frame + play control; media well may be empty.
5. **Reconcile** with `TERRITORIES` ids in `sections/WorkSection/index.tsx`, not Figma layer order alone.

### 4. Code Connect / `use_figma` (optional)

After screenshot capture, rebuild or refine with `SectionLabel`, territory articles, and tokens from `tailwind.config.ts` (`oni-page`, `oni-showreel`, `oni-contact`).

---

## Known limitations

- Hero reference PNG is a perception snapshot, not live WebGL geometry (production uses `Scene` + local PMREM — no remote HDR).
- Fixed nav (`data-oni-layer="chrome"`) may pin to viewport in some capture tools.
- Contact CTA environmental field remains **dormant** (opacity 0) unless hovered — matches production at rest.
- Footer hash links `#studio`, `#services` have no landing targets (content debt, not export-specific).

---

## Implementation map

| Piece | Location |
|-------|----------|
| Flag parsing | `systems/export/exportMode.ts` |
| Provider + hook | `systems/export/ExportModeProvider.tsx` |
| Page wiring | `app/page.tsx` |
| Perception freeze CSS | `app/globals.css` (`html.oni-export`) |
| Hero visual gate | `sections/HeroSection/HeroVisual.tsx` (export → fallback; else `Scene`) |
| Hero fallback | `sections/HeroSection/HeroExportFallback.tsx` |

---

## Out of scope (Tier C — pending first real export)

- Wrapper flattening (Showreel nested `FadeIn`, duplicate `ViewWorkLink`)
- Merging decorative roots in `page.tsx`
- Typography token extraction from inline `fontSize` clamps

Do not implement Tier C until after evaluating the first Figma export.

---

## Canonical boundaries

Export affects **landing only** (`app/page.tsx` + `ExportModeProvider`). Archive routes never set `html.oni-export` or export metadata.

Contributor doctrine (canonical truth, allowed freeze, “too invasive” signals): [FIGMA_RECONCILIATION_WORKFLOW.md](./FIGMA_RECONCILIATION_WORKFLOW.md) §12.

Atmospheric runtime (transform ownership, export separation, fragile chains): [FIGMA_RECONCILIATION_WORKFLOW.md](./FIGMA_RECONCILIATION_WORKFLOW.md) §13.

---

## Deployment verification checklist

Run after any atmosphere or export change before treating production as authoritative.

### Build parity

- [ ] `npm run build` succeeds locally
- [ ] `git status` clean — atmosphere fixes committed (not only on localhost)
- [ ] Deployed commit SHA matches `git rev-parse HEAD` on release branch

### Production `/` (no query flag)

- [ ] DevTools → `<html>` has **no** `oni-export` class
- [ ] Desktop width ≥1024px — hero rings visible and centered on sculpture
- [ ] Subtle opacity breathing visible on hero rings after ~3s (mid ring strongest)
- [ ] Scroll — faint parallax separation between ring planes (inverted mid ring)
- [ ] `ContinuityField` horizon threads: opacity-only shimmer (very subtle)
- [ ] No runtime error overlay; WebGL hero loads (local PMREM, no HDR fetch)

### Production `/?export=1`

- [ ] `<html class="oni-export">` present
- [ ] `data-oni-export="1"` on page root
- [ ] Hero shows static fallback — no WebGL spinner
- [ ] All sections visible without scroll
- [ ] No CSS drift/breath on decorative nodes (frozen)

### Archive `/archive`

- [ ] No `oni-export` on `<html>`
- [ ] No `ExportModeProvider` side effects
- [ ] Browse grid / video behavior unchanged

### Stale artifact suspicion

If localhost feels more alive than production with the same commit intent:

1. Compare deployed SHA vs local `HEAD`
2. Hard-refresh / purge CDN cache
3. Confirm desktop viewport and `prefers-reduced-motion` off
4. Inspect hero depth nodes: parallax anchor must **not** share centering transform with `useDepthField` (see reconciliation doc §13.3)
