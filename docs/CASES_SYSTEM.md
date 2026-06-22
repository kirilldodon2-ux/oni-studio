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

**To set a cover image:** put the file in `public/cases/[client-slug]/` and set `cover: "/cases/[client-slug]/cover.jpg"`. The image renders at 30% opacity over the dark field.

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
