# Cases System

**Status:** OPERATIONAL — Phase 1 complete  
**Route:** `/cases` (production — `app/cases/`)  
**System:** `systems/cases/`

---

## What it is

`/cases` is an interactive scroll-snap portfolio surface — a full-viewport cinematic case study experience. It follows the same architectural pattern as `/brandbook`: scroll-snap orchestrator, section context, dot navigation rail, `motion/react` entrance animations.

Each case occupies one full viewport height. The user scrolls vertically through cases, with dot navigation on the right rail providing direct access to any slide. The page is intentionally dark (`#070707`) — all case slides share the dark field.

**Not an archive lane.** Cases are not routed through `content/field.ts`, `content/works/field.ts`, or any existing registry. Content is hardcoded in `systems/cases/casesData.ts` — a system-local data file, not a content registry.

---

## File structure

```
app/cases/
  layout.tsx              ← metadata only; no route-scoped fonts (uses site Bebas Neue + Inter)
  page.tsx                ← CasesSectionProvider + ControlSurface + CasesSectionNav + CasesExperience

systems/cases/
  CasesExperience.tsx     ← scroll-snap orchestrator + scroll tracking
  CasesSectionContext.tsx ← activeSection, scrollContainerRef, scrollToSection
  CasesSectionNav.tsx     ← dot rail (right edge, lg+, always light on dark)
  casesData.ts            ← CaseEntry type + casesRegistry (hardcoded)
  components/
    CasesCover.tsx        ← intro slide: "26' / CASES" dark field, cinematic entrance
    CasesCard.tsx         ← reusable full-viewport case slide (driven by CaseEntry)
```

---

## Scroll model

Identical to brandbook:

- `CasesExperience` renders an `h-screen overflow-y-scroll` container with `scrollSnapType: y mandatory`
- Each section (`CasesCover`, `CasesCard`) uses `style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}`
- Scroll position → `activeSection` index via `Math.round(scrollTop / clientHeight)`
- `CasesSectionContext` holds `scrollContainerRef` and `scrollToSection(index)` for programmatic scroll

```
Section 0: CasesCover     ← always the intro; dot label "CASES"
Section 1: CasesCard 01   ← casesRegistry[0]; dot label "01"
Section 2: CasesCard 02   ← casesRegistry[1]; dot label "02"
…
```

---

## Content model

Defined in `systems/cases/casesData.ts`:

```ts
export type CaseEntry = {
  id: string;       // "01", "02", "03" — displayed as ghost number + dot label
  client: string;   // "MEGAFON" — shown in accent orange above title
  title: string;    // "BRAND SYSTEM" — Bebas, clamp(3.25rem, 11vw, 8.5rem)
  category: string; // "IDENTITY" — shown in top-left header line
  year: string;     // "2026"
  scope: string[];  // ["Brand Identity", "Visual Language"] — bordered tags bottom
  cover: string | null; // "/cases/megafon/cover.jpg" or null for geometric placeholder
};

export const casesRegistry: CaseEntry[] = [ … ];
```

**To add a new case:** append a new `CaseEntry` object to `casesRegistry`. `CasesExperience` and `CasesSectionNav` derive slide count and labels from this array — no other wiring required.

**To set a cover image:** put the file in `public/cases/[slug]/` and set `cover: "/cases/[slug]/cover.jpg"` (ontology path). `CasesCard` resolves transport via `resolveCasesMediaSrc()` at render time.

---

## Media delivery (R2 / CDN)

**Status:** ACTIVE (transport). Ontology unchanged. Lane-specific — not archive, not works.

### Separation of concerns

| Layer | Owner | Rule |
|-------|-------|------|
| Ontology | `caseAssetPath(slug, file)` in `content/casesMediaPaths.ts` | Site-relative paths: `/cases/[slug]/…` |
| Transport | `resolveCasesMediaSrc(path)` | Prepends `NEXT_PUBLIC_CASES_MEDIA_ORIGIN` when set |
| Per-case wrapper | `systems/cases/[slug]/[slug]Assets.ts` | e.g. `punchSrc("planet.png")` → `casesSrc("punch", …)` |
| Disk truth | `public/cases/[slug]/` | Authoring + local dev fallback |
| Remote truth | R2 bucket (default `oni-cases`) | Keys mirror repo: `cases/punch/planet.png` |

**Do not** pass cases paths through `resolveArchiveMediaSrc()` — archive and cases are separate lanes with separate env vars and buckets. This allows migrating cases to another Cloudflare account without touching archive transport.

### Environment

| Variable | Scope | When unset |
|----------|-------|------------|
| `NEXT_PUBLIC_CASES_MEDIA_ORIGIN` | Cases lane only | Site-relative paths → `public/cases/` via Pages |

Build-time: `NEXT_PUBLIC_*` is inlined at `next build`. Changing origin requires Pages rebuild. `next.config.mjs` adds `images.remotePatterns` for both archive and cases origins.

**Same origin OK:** If archive and cases share one R2 public URL, set both env vars to the same base — keys remain distinct (`archive/objects/…` vs `cases/…`).

### R2 object keys

```
cases/[slug]/planet.png
cases/[slug]/stickers/stk-hh-1.png
cases/[slug]/merch-event.png
```

Resolved URL: `{ORIGIN}/cases/punch/planet.png`

### Upload — single file

```bash
wrangler r2 object put oni-cases/cases/punch/planet.png \
  --file=public/cases/punch/planet.png \
  --content-type=image/png \
  --cache-control="public, max-age=31536000, immutable" \
  --remote
```

**Critical:** `--remote` required — without it, wrangler writes to local Miniflare only.

### Upload — bulk sync

```bash
npm run sync:cases-r2
# dry-run:
./scripts/sync-cases-r2.sh --dry-run
```

Override bucket: `CASES_R2_BUCKET=oni-cases npm run sync:cases-r2`

Script: `scripts/sync-cases-r2.sh` — syncs all files under `public/cases/`.

### CORS

R2 bucket must allow GET from `http://localhost:3000` and production site origin.

### Rollback

1. Unset `NEXT_PUBLIC_CASES_MEDIA_ORIGIN` on Cloudflare Pages.
2. Rebuild / redeploy.
3. Runtime serves `public/cases/` again. No component or path changes.

### Implementation rule

All case media `src` values must go through `casesSrc()` / `resolveCasesMediaSrc()` — never hardcode full CDN URLs in components. Registries (`casesData.ts`) store **ontology paths only**.

Template for new case landings: `systems/cases/_template/caseAssets.ts` → copy to `systems/cases/[slug]/[slug]Assets.ts`.

### Performance

| Layer | Mechanism |
|-------|-----------|
| **WebP on CDN** | `resolveCasesMediaSrc()` maps `.png` → `.webp` when `NEXT_PUBLIC_CASES_MEDIA_ORIGIN` is set. PNG stays in repo for local dev. |
| **WebP generation** | `npm run optimize:cases-webp` — creates siblings under `public/cases/` (`*.webp` gitignored). Re-run after PNG edits, then `sync:cases-r2`. |
| **Lazy / viewport** | `CaseImage` / `CaseMotionImage` — no network fetch until section or element nears viewport. Cover uses `priority`. |
| **Pages deploy trim** | `prebuild` → `scripts/strip-cases-public.mjs` strips `public/cases/` when `CF_PAGES=1` + cases CDN env are set. Prod = R2 only. |

**Archive comparison:** archive has R2 transport, `next/image` on browse tiles, and `useCinematicVideo` for video. Archive does **not** have WebP pipeline, Pages deploy strip, or viewport-gated case images.

### Operator checklist (edit → ship)

1. Edit PNG in `public/cases/[slug]/`
2. `npm run optimize:cases-webp`
3. `npm run sync:cases-r2`
4. Commit PNG changes (WebP stays local/gitignored)
5. Push — Pages rebuild strips `public/cases/` when CDN env is set

---

## Dot navigation

`CasesSectionNav` — right edge rail, `lg:flex` (desktop only), `z-30`.

All sections are dark → dots always use the light palette (`#F7F7F7` active, `rgba(200,200,200,0.32)` inactive). No dark/light inversion logic (contrast with `BrandbookSectionNav` which inverts on dark sections 1–3).

Pulse ring on active dot: `scale 0.5 → 1.5`, opacity fade, 1s ease-out, `repeatDelay: 1.4`.

Dot labels derive from `LABELS = ["CASES", ...casesRegistry.map(c => c.id)]` — updating `casesRegistry` automatically updates the nav.

---

## Navigation wiring

### NavOverlay

`CASES → /cases` added to `NAV_ITEMS` between BRANDBOOK and CONTACT:

```ts
{ id: "cases", label: "CASES", href: "/cases", … }
```

`overlayFieldAnnotation` returns `"CASES OPEN"` for `/cases*` routes.

### NavTelemetry

`/cases` lane added: `ONI.STUDIO / CASES / 01` … `CASES / 04`.

`NavTelemetry` reads `useCasesSectionOptional()` (returns `null` on non-cases routes — safe). Section index formatted via `formatCasesSectionIndex(index)` → `String(index + 1).padStart(2, "0")`.

---

## Visual language

| Layer | Detail |
|-------|--------|
| Background | `#070707` — all slides share the dark field |
| Ghost number | Case `id` (`01`, `02`…) in Bebas, `clamp(10rem, 32vw, 26rem)`, `opacity: 0.028` — environmental depth |
| Client signal | `text-[#FF4A1A]` — accent used sparingly; one per slide |
| Title | Bebas, `clamp(3.25rem, 11vw, 8.5rem)`, `y: 105% → 0%` entrance |
| Scope tags | `border border-white/[0.1]`, `text-white/40`, `tracking-[0.22em]` |
| Cover image | `object-cover opacity-30` — film over the dark field |
| Placeholder | `border border-white/[0.06]` rectangle — geometric marker |
| Fonts | Site-global: Bebas Neue (display) + Inter (body/UI). No route-scoped fonts. |
| Motion | `motion/react` + `useInView` — same entrance pattern as `BrandbookLinks`, `BrandbookAbout` |
| Reduced motion | Handled by `motion/react` internally |

---

## Porting a case from Figma Make

When a case is designed in Figma Make and ready to port:

1. **Create a custom component** — `systems/cases/components/CasesClientName.tsx` (e.g. `CasesMegafon.tsx`). Model it on `CasesCard` but with the Figma Make layout directly ported in. Must include:
   ```tsx
   style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
   ```
2. **Wire it into `CasesExperience.tsx`** — either replace the corresponding `CasesCard` call or render it alongside. If the case has its own multi-slide layout, keep it as one snap-section (the scroll snap is per-case, not per-slide within a case).
3. **Keep `casesData.ts` as source of truth** — update `cover` path if the case has a cover image.
4. **No new packages** — `motion/react` is already available. If the Figma Make export used `embla-carousel`, `@radix-ui`, etc., strip them and replicate the interaction with native CSS scroll or `motion/react`.

---

## NavHome behavior

`NavHome.tsx` shows a `HOME` link on `/cases` — same as `/brandbook` and `/archive`. No changes needed.

---

## Build (Phase 1)

```
Route (app)                              Size     First Load JS
○ /cases                               2.58 kB         379 kB
```

- `npm run build` — pass
- TypeScript — pass
- Static SSG — `○` (static, no server-side data fetching)
- No new runtime dependencies

---

## Constraints

- No `PageBackdrop` on `/cases` — dark field is carried by section backgrounds, not a global SVG layer
- No route-scoped fonts — uses site Bebas Neue + Inter
- `z-30` for `CasesSectionNav` — below `ControlSurface` (`z-40/50`), above section content (`z-10`)
- `hover:opacity-60` doctrine applies to links — no scale, translate, or color shift on interactive elements outside the case cards themselves
- `casesData.ts` lives in `systems/cases/` — not in `content/`. Cases are not an archive/works lane.

---

## Phase 2 follow-up

1. **First real case** — port Figma Make case into `systems/cases/components/CasesClientName.tsx`
2. **Cover images** — add to `public/cases/[slug]/` when assets are ready
3. **Mobile dot nav** — `CasesSectionNav` is `lg:flex` only; consider a bottom-bar nav for mobile if needed
4. **Homepage entry** — optional teaser section linking to `/cases` (analogous to `BrandIdentitySection → /brandbook`)
5. **NavOverlay annotation** — `CASES OPEN` bottom-right in overlay already wired (Phase 1)

---

## Full case landing — `/cases/punch`

**Route:** `app/cases/punch/page.tsx`  
**System:** `systems/cases/punch/`  
**Assets:** `public/cases/punch/`

The PUNCH case has a dedicated scroll-snap landing (same architecture as `/brandbook` and `/cases` index). Preview slide on `/cases` links via `WATCH FULL → /cases/punch`.

### Sections (12 total)

| Index | Label | Component |
|-------|-------|-----------|
| 0 | INTRO | `PunchCover` |
| 1 | BRAND | `PunchBrand` |
| 2 | ARTIST | `PunchHeadliner` |
| 3 | ABOUT | `PunchAbout` |
| 4 | COLORS | `PunchColors` |
| 5 | POSTERS | `PunchPosters` |
| 6 | DIGITAL | `PunchSocial` |
| 7 | EVENT | `PunchPeople` |
| 8 | MERCH | `PunchMerch` |
| 9 | STICKERS | `PunchStickers` |
| 10 | FIN | `PunchCredits` |
| 11 | END | `PunchFooter` |

Light dot-nav sections: `COLORS` (4), `POSTERS` (5), `END` (11).

### Key assets

| Asset | Path | Used in |
|-------|------|---------|
| PUNCH logo (twitch-like) | `public/cases/punch/punch-logo.png` | `PunchCover`, `PunchCredits`, `PunchFooter` |
| Brand wall texture (grunge) | `public/cases/punch/brand-wall-texture.png` | `PunchBrand` |
| XXXMANERA headliner (framed portrait, 506×1021, RGBA) | `public/cases/punch/xxxmanera-headliner.png` | `CasesPunch`, `PunchHeadliner` |
| Planet (RGBA PNG) | `public/cases/punch/planet.png` | `CasesPunch`, `PunchCover`, `PunchCredits` |
| Sticker kit | `public/cases/punch/stickers/*` | `PunchStickers` |
| Merch photos | `public/cases/punch/merch-*.png` | `PunchMerch` |

`PunchHeadliner` renders the headliner photo with `object-contain` — RGBA asset, no `mix-blend-mode: screen`.

`PunchFooter` is the reusable case-footer template: light gray editorial strip (`#CBCAC5`), LINKS rail, project description, client logo + `created by ONI`.

### Adding the next full case landing

1. Create `app/cases/[slug]/page.tsx` + `systems/cases/[slug]/` mirroring `punch/`
2. Copy `systems/cases/_template/caseAssets.ts` → `systems/cases/[slug]/[slug]Assets.ts`; set `SLUG`
3. Add preview component in `systems/cases/components/Cases[Name].tsx` — use `[slug]Src()` for all media
4. Register in `casesData.ts` with ontology `cover` path; `CasesCard` resolves transport automatically
5. Add assets to `public/cases/[slug]/`, then `npm run sync:cases-r2`
6. Reuse `PunchFooter` pattern (or generalize) for the editorial end section
