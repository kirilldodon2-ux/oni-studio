# ONI Roadmap

## Engineering Philosophy

- stability first, spectacle second
- systems over hacks
- scalable structure over temporary polish
- atmosphere over feature count
- editorial rhythm over startup UI

---

## Phase 0 — Infrastructure Migration

**Status: Complete**

Goals:
- root documentation system (README, ARCHITECTURE, VISUAL_LANGUAGE, FOLDER_MAP, AI_RULES, ROADMAP)
- layout tokens (CSS custom properties for header height)
- Tailwind maxWidth named tokens
- shared infrastructure foundations

Completion criteria met:
- all magic layout numbers replaced by named tokens
- all documentation files exist
- visual output preserved

---

## Phase 1 — Section Architecture

**Status: Complete**

Goals achieved:
- Hero extracted from `page.tsx` into `sections/HeroSection/`
- Scene moved into Hero scope (`sections/HeroSection/Scene.tsx`)
- Hero owns its own height, overflow, and full-viewport layout
- all remaining sections extracted into `sections/` (Work, Showreel, ContactFooter)
- `systems/layout/SectionContainer` established — owns horizontal padding + overflow containment per section
- `systems/layout/SectionLabel` established — shared section heading + accent bar pattern
- section padding de-duplicated through shared layout system
- visual output preserved throughout

---

## Phase 2 — PageBackdrop Decoupling

**Status: Complete**

Goals achieved:
- `PageBackdrop` moved into `systems/backdrop/index.tsx`
- global ambient responsibilities separated from section-local decorative responsibilities
- section-local elements identified and documented as Phase 4 migration candidates
- section-name coupling comments removed; architectural intent documented
- backdrop does not affect layout or create overflow
- visual output preserved throughout

---

## Phase 3 — Responsive Stabilization

**Status: Complete**

Goals achieved:
- all sections audited for mobile layout correctness
- uncontrolled overflow eliminated — `overflow-x: clip` on `html` for viewport-level safety
- section-level overflow containment enforced via `SectionContainer`
- section padding normalized to shared system
- all breakpoints verified (mobile, tablet, desktop, wide)

---

## Phase 4 — Cinematic Polish

**Status: In Progress**

Goals:
- scroll-driven entrance motion (restrained, cinematic)
- ambient atmospheric layers
- typography refinement
- spacing and rhythm refinement
- 3D scene enhancements

Completed (ShowreelSection):
- ✓ `ShowreelMediaCard` — cinematic media artifact with metallic frame overlay
- ✓ Frame compositing: metallic frame PNG via inline SVG filter `#oni-luma-matte` (contrast-boost → luminanceToAlpha → alpha-gamma → composite) — transparent field, not `mix-blend-mode`
- ✓ Three-layer motion system: float (CSS, md+) / scale (hover) / parallax (JS rAF)
- ✓ `oni-showreel-float` keyframe in `globals.css` (prefers-reduced-motion safe)
- ✓ Reusable structure prepared for video integration, modal expansion, archive usage
- ✓ Frame inner window constants — tunable when asset changes

Remaining:
- scroll-driven entrance motion for all sections
- HeroSection, WorkSection atmospheric polish
- ContactFooterSection editorial refinement pass: ✓ complete (see below)

Completed (ContactFooterSection — CTA + Footer Editorial Refinement):
- ✓ Heading migrated to `font-bebas` — genuine condensed display poster language
- ✓ Body description paragraph removed — editorial restraint over agency brochure copy
- ✓ Large orange CTA button replaced with restrained text-link "START A PROJECT →"
- ✓ Contact thread refactored — flat annotation style, opacity-only hover, no border rows
- ✓ Footer restructured — navigation layer (left) / archival layer (right)
- ✓ Authorship signature added — "built by dodon.one with ONI" at quietest register
- ✓ Section spatial composition tightened — reduced "floating in empty space" feeling
- ✓ Border reduced to `border-black/[0.08]` — hairline, below visible separator threshold

Constraints:
- motion must support atmosphere, not compete with content
- no aggressive easing or loud animation
- preserve editorial restraint throughout

---

## Phase 5 — Navigation System

**Status: Complete (baseline)**

Goals:
- ✓ replace `components/SiteHeader.tsx` with `components/navigation/` floating control surface
- ✓ implement `ControlSurface` (`fixed`, `z-40`), `NavLogo`, `NavTelemetry`, `NavMenuTrigger`
- ✓ remove `calc(100svh - var(--oni-header-h))` from Hero; restore full-viewport height
- ✓ route-aware telemetry — `NavTelemetry`: `ONI.STUDIO / {lane}` (`HOME` · `WORKS` · `ARCHIVE` · `MMXXVI` fallback); see `docs/DECISIONS.md` DEC-005
- ✓ route-aware overlay — `aria-current` on primary links, non-current opacity, route-specific footer annotation (`HOME FIELD` · `WORKS INDEX` · `WORK OPEN` · `ARCHIVE FIELD` · `ARCHIVE OPEN`); DEC-005
- ✓ implement `NavOverlay` — adaptive atmospheric menu overlay (`z-50`): full-viewport scrim; navigation plane full-width below `md`, right partial-width plane on `md+`; HOME / WORK / ARCHIVE / STUDIO / CONTACT; translateX+opacity reveal; ESC close; body scroll lock
- ✓ Atmospheric Polish Layer 1 — static material pass applied (control surface + overlay)
- ✓ scroll state on closed surface — **removed**; always transparent (see `docs/DECISIONS.md` DEC-004; supersedes DEC-003 glass/border experiments)

Remaining (not Phase 5 blockers):
- cross-route STUDIO / CONTACT overlay targets (`#showreel` / `#contact` — home hash anchors only on `/`)

Constraints:
- control surface must not sever the atmospheric backdrop — no `bg-white` at page top
- navigation links are not permanently visible — they live in the overlay only
- overlay uses an intentional adaptive plane: full-width below `md`, right atmospheric partial-width plane on `md+` over a full-viewport scrim (see `NAVIGATION_ARCHITECTURE.md` §7)
- no bottom nav bar, no startup nav patterns (permanent center-nav on the control surface)
- single consistent menu glyph across all breakpoints
- motion: slow, spatial overlay reveal (~500–760ms); restrained translateX from the right on the plane plus opacity — not loud drawer snap or bounce

See `NAVIGATION_ARCHITECTURE.md` for full specification.

---

## Remaining work — three layers

Phases 0–5 established layout, atmosphere, sections, and navigation. Further work is
organized by concern — not numbered phases. Layers may proceed in parallel where
dependencies allow; Phase 5 navigation should reach stable baseline before large
routing expansion.

**Canon for content and archive:** `CONTENT_PHILOSOPHY.md` · `ARCHIVE_SYSTEM.md` ·
`ARCHIVE_OPERATING_LOGIC.md` · `CONTENT_SYSTEM.md`

**What is not being built (yet or ever):** external CMS · social layer · recommendation
engine · tag/category filter UI · "labs" or "blog" sub-brand

### Delivered early (Layer 1 — partial)

Already live before full layer completion:

- `content/` — `field.ts`, `types.ts`, `archiveObjectPaths.ts`
- `/archive`, `/archive/[slug]` — browse + inspect (`systems/archive/`)
- `public/archive/objects/[slug]/` — object territory
- `resolveArchiveMediaSrc()` + Cloudflare R2 delivery (`oni-archive`, `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN`)
- Browse video — `useCinematicVideo` (viewport-gated playback, gesture unlock)
- **Works Lean Path (Batch 2)** — `content/works/`, `/works`, `/works/[slug]`, `systems/works/`, `public/works/[slug]/` — parallel registry + typographic index + document shell; no MDX/Zod yet (see `docs/DECISIONS.md` DEC-001)

### URL targets (permanent slugs)

```
/works, /works/[slug]     ← Lean Path delivered (Batch 2); MDX interior pending
/writing, /writing/[slug] ← writings (pending)
/code/[slug]              ← code artifacts, no public index (pending)
/archive, /archive/[slug] ← delivered early
```

---

## Layer 1 — Infrastructure

**Status: In progress** (archive delivery operational; stabilization sprint in flight). Technical reliability, media truth,
routing shells, and deployment — the site must carry weight before editorial systems
scale.

### Core track

- archive optimization — grid performance, `mediaAspect` integrity, masonry stability at scale
- Safari stability — compositing, video, scroll, overlay, WebGL edge cases *(Chromium pass: no code fixes; iOS Safari manual QA recommended)*
- media pipeline — ingest, type detection, hero canonical paths, variant strategy
- deferred playback — browse vs inspect load policy; no autoplay tax on the field *(browse: done)*
- external storage — object assets off-repo or hybrid; URL contract stable in `field.ts` *(R2 Phase A: done)*
- inspect / master separation — browse previews vs inspect editorial sequence authority
- CDN logic — cache keys, immutable assets, video origin rules (Cloudflare Stream / Mux TBD) *(R2 origin: done; cache headers: sprint)*
- mobile behavior — touch, overflow, overlay plane, archive density on narrow viewports *(390px pass: no code fixes)*
- caching — route-level and asset-level strategy on Cloudflare Pages *( `public/_headers` added; R2 object Cache-Control: operational re-upload if needed)*
- preload strategy — hero and inspect critical path without flooding the browse field

### Routing and schema (from former Phase 6–9)

- App Router shells for `/works` *(Lean Path done)*, `/writing`, `/code/[slug]`
- `shared/content/` — Zod schemas per archetype; repository remains source of truth
- formal performance budget (Three.js + R3F + FM baseline + route increments)
- Cloudflare Pages config — build, headers, redirects, env  
  **Audit (2026-05):** `@cloudflare/next-on-pages` fails adapter stage when `/` is dynamic (`searchParams` for `/?export=1`) without `export const runtime = 'edge'` on `app/page.tsx`. Build output: `ƒ /` dynamic, `/archive` + `/archive/[slug]` static/SSG. **Minimal fix:** edge on home only. **Long-term:** migrate to `@opennextjs/cloudflare` (Node runtime on Workers; deprecates next-on-pages). Do not remove export `searchParams` without a reconciliation-approved alternative — server `initialExportMode` is required for correct export first paint.
- MDX static pipeline (build-time only)
- Code Artifact sandbox — isolated route, memory-safe experiment boundary
- video hosting decision before Work pages become primary video surface
- archive preservation policy — URL permanence, asset integrity at depth

**Constraints:** no client-side MDX · slugs permanent once published · data alignment over CSS masks for masonry (`ARCHIVE_OPERATING_LOGIC.md`)

---

## Layer 2 — Editorial / Spatial

**Status: Pending** (depends on Layer 1 stability for archive and routes). How the site
*feels* when moving through it — not feature count.

### Core track

- territory logic — homepage territories ↔ archive objects; authored proximity, not tags
- memory drift — environmental residue across sessions and depth (subtle, not gamified)
- atmospheric pacing — section and route rhythm; when silence vs motion
- navigation consciousness — overlay route awareness, scroll state on control surface, active field
- motion ontology — one motion language: atmosphere primitives, transitions, nav plane (no new dialects)
- editorial rhythm — typographic and spatial measure across home, archive, works, writings
- traversal feeling — browse field vs inspect occupancy; “deepening” not “navigating”

### Spatial systems (carry-forward)

- route transitions — backdrop persists; content dissolves and re-materializes (not slide/zoom/wipe); `prefers-reduced-motion`
- Phase 4 remainder — scroll-driven entrance for all sections; Hero + Work atmospheric polish
- Works / Writings surfaces — non-feed indexes; full spatial Work pages; `systems/typography/` (65–75ch, calm column)
- cross-archive associations — authored links between archetypes, not tag filters
- atmospheric fragments — encounter-based; only when archive has mass
- visual register — gallery editorial on every route; type as architecture; media as evidence

**Constraints:** no preview text on indexes · no next/previous project rails · atmosphere extends into content routes without re-inventing per page

---

## Layer 3 — Studio / Identity

**Status: Pending** (parallel with Layer 2 once infrastructure is trustworthy). Who ONI
is on the site and how studio, client work, and personal practice relate.

### Core track

- studio landing refinement — home as studio threshold, not agency brochure
- external link architecture — when the site points outward vs holds evidence locally
- contact system — epilogue CTA, mailto, environmental activation; inquiry path clarity
- project ecosystem mapping — works, archive objects, writings, experiments as one studio graph
- client / project separation — editorial clarity without portfolio-card sameness
- identity cohesion — ONI Studio voice across nav telemetry, footer, overlay, archive headers
- transition between ONI / personal / studio — dodon.one, authorship, dual presence without brand confusion
- mobile presentation layer — studio identity readable on narrow viewports (not a shrunk desktop)

### Publishing surfaces

- Works index — titles, years, domain classification only; atmospheric presence, not thumbnails
- Writings index — title, year, duration; long-form floor ≥ 800 words
- Code Artifacts — experiment as content; no "labs" branding; site version authoritative
- `/archive` maturity — optional cross-archetype index evolution beyond current browse/inspect

**Constraints:** no social infrastructure · no filled accent CTA buttons · hairline text-link + environmental field (`VISUAL_LANGUAGE.md`)

---

## Horizon

Items that need Layer 1–3 shape before commitment:

- cross-archetype archive index beyond current browse/inspect
- atmospheric fragments archetype at scale
- hide-on-scroll navigation (revisit with multi-route studio shell)
