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

**Status: In Progress**

Goals:
- ✓ replace `components/SiteHeader.tsx` with `components/navigation/` floating control surface
- ✓ implement `ControlSurface` (`fixed`, `z-40`), `NavLogo`, `NavTelemetry`, `NavMenuTrigger`
- ✓ remove `calc(100svh - var(--oni-header-h))` from Hero; restore full-viewport height
- ✓ telemetry content: `ONI.STUDIO / MMXXVI` (Option A — static identity thread)
- ✓ implement `NavOverlay` — adaptive atmospheric menu overlay (`z-50`): full-viewport scrim; navigation plane full-width below `md`, right partial-width plane on `md+`; HOME / WORK / STUDIO / CONTACT; translateX+opacity reveal; ESC close; body scroll lock
- ✓ Atmospheric Polish Layer 1 — static material pass applied (control surface + overlay)
- implement scroll state behavior (transparent → subtle surface on scroll)

Constraints:
- control surface must not sever the atmospheric backdrop — no `bg-white` at page top
- navigation links are not permanently visible — they live in the overlay only
- overlay uses an intentional adaptive plane: full-width below `md`, right atmospheric partial-width plane on `md+` over a full-viewport scrim (see `NAVIGATION_ARCHITECTURE.md` §7)
- no bottom nav bar, no startup nav patterns (permanent center-nav on the control surface)
- single consistent menu glyph across all breakpoints
- motion: slow, spatial overlay reveal (~500–760ms); restrained translateX from the right on the plane plus opacity — not loud drawer snap or bounce

See `NAVIGATION_ARCHITECTURE.md` for full specification.

---

## Platform Evolution

ONI is no longer only a portfolio shell.

The site is evolving into a studio system — a living archive, an experimental publishing
space, and a cinematic technical editorial environment. These are not separate products or
site sections. They are the same project described at different scales.

Phases 0–5 established the foundational infrastructure: stable layout systems, section
architecture, atmospheric conditions, and navigation. The phases that follow build the
content layer — the system through which the studio's output accumulates over time.

**Direction of expansion:**
- page routing with cinematic transitions (single-page to multi-page environment)
- content archetypes with individual spatial treatments and disclosure rhythms
- an archive that is spatial rather than chronological
- a writing layer with editorial long-form typography
- a code artifact layer where the experiment is the content

**What is not being built (yet or ever):**
- external CMS dependency
- social layer or community features
- recommendation engine or engagement metrics
- tag-based taxonomy or category filter UI
- a "labs" or "blog" sub-brand

See `CONTENT_PHILOSOPHY.md` for the full content philosophy, archetype definitions,
disclosure model, and editorial standards. See `ARCHIVE_SYSTEM.md` for the canonical archive
object model, schema direction, territorial behavior, contributor logic, and surface layer
architecture — the foundational intelligence layer that Phases 6–9 implement.

---

## Phase 6 — Routing & Page Architecture

**Status: Pending** (requires Phase 5 navigation completion). **Partial delivery:** archive surface routes and `content/` registry are live ahead of this phase — see below.

### Delivered early (archive surface — not Phase 6 complete)

Shipped before archetype routing and page transitions:

- `content/` — `field.ts` registry, `types.ts`, `archiveObjectPaths.ts` (explicit, not auto-discovered)
- `app/archive/page.tsx` — `/archive` browse (`ArchiveGrid`)
- `app/archive/[slug]/page.tsx` — `/archive/[slug]` inspect (`ArchiveInspectView`)
- `systems/archive/` — browse + inspect stack (see `ARCHIVE_OPERATING_LOGIC.md`)
- `public/archive/objects/[slug]/` — filesystem-native object territory (`CONTENT_SYSTEM.md`)

Phase 6 still owns works/writing/code routes, shared Zod schemas (`shared/content/`), cinematic route transitions, and navigation overlay active states.

### Goals (remaining for Phase 6)

- establish Next.js App Router routes for Works, Writings, and Code Artifacts (archive routes already exist)
- define stable, permanent URL schema before archetype content is published at scale
- implement page transition system: cinematic reveal at the route level
- establish shared page shell templates per content archetype
- ensure all existing atmospheric infrastructure carries through to content pages
- wire navigation overlay active states to route state

### URL Structure

```
/works              ← works index (Phase 6)
/works/[slug]       ← individual work (Phase 6)
/writing            ← writings index (Phase 6)
/writing/[slug]     ← individual writing (Phase 6)
/code/[slug]        ← code artifact (Phase 6; no public index)
/archive            ← browse field (delivered early)
/archive/[slug]     ← inspect view (delivered early)
```

Phase 9 may extend `/archive` into a full cross-archetype index — browse and inspect are already operational.

URL slugs are permanent once established. Slug format: hyphenated lowercase title, year
suffix if required for disambiguation. No category path segments. No tag paths. No
query-string navigation.

### Page Transition System

Route-to-route transitions must extend the existing atmosphere system — not introduce
new motion language. The transition is a spatial event: the site does not navigate,
it deepens. The backdrop remains; content dissolves and re-materializes. Not a slide.
Not a zoom. Not a wipe.

Constraints:
- transitions must support `prefers-reduced-motion`
- URL structure is permanent — define before first content is published
- all new routes inherit `systems/atmosphere/` infrastructure without modification
- navigation overlay active states require route awareness from this phase forward

---

## Phase 7 — Work Archive

**Status: Pending** (requires Phase 6)

Goals:
- individual Work pages: full spatial treatment per `CONTENT_PHILOSOPHY.md` spec
- Works index: non-feed, non-grid spatial surface
- content schema for Works: typed, Zod-validated, authored in the repository
- visual treatment for Work entry points on the Works index

### Works Index

The Works index is not a grid of cards and not a list of previews. It is a composed
spatial surface — a field where works are present as titles, years, and domain
classifications. The image, if present, is not a thumbnail. It is an atmospheric
presence. Entry is by title. The visitor chooses before they see.

### Individual Work Pages

A Work page is a spatial document: editorial heading, domain classification, defining
image under full atmospheric treatment, written investigation, supporting images as
evidence. The atmosphere system extends fully into this template. A Work page should
feel continuous with the home environment — not a separate section, a deeper layer.

### Content Schema (Works)

```typescript
type Work = {
  slug: string
  title: string
  year: number
  domain: WorkDomain[]   // e.g. "spatial" | "motion" | "identity" | "technical"
  status: "published" | "draft"
  summary: string        // 1–2 sentences; editorial anchor only — displayed nowhere
  cover: MediaAsset
  body: MDXContent
  artifacts?: ProcessArtifact[]
}
```

Constraints:
- no preview text in the Works index — title, year, domain classification only
- no "next / previous project" navigation — works do not have inherent sequence
- no social infrastructure (like, share, comment)
- Works are authored in the repository, not managed via external CMS

---

## Phase 8 — Written Content

**Status: Pending** (requires Phase 6; may proceed in parallel with Phase 7)

Goals:
- Writings archetype support: page template + index
- MDX rendering pipeline: long-form text with component composition capability
- editorial typography system for long-form reading (`systems/typography/`)
- Writings index: title, year, reading duration — no preview text

### Long-Form Typography System

Long-form reading requires a distinct typographic register from the editorial display
typography used in section headings and hero text. The reading column must be:

- measured: 65–75 characters per line on desktop
- properly spaced: `line-height` ≥ 1.65 for body copy
- calm: no competing atmospheric motion within the reading column
- consistent: one typeface (Inter), minimal variant use

This implements the `systems/typography/` slot in the target architecture.

### MDX Pipeline

Writings are authored as `.mdx` files in the repository. Component composition allows
inline atmosphere elements, code blocks with syntax highlighting, and cross-references
to Works and Code Artifacts.

Constraints:
- no tag system, no category filters in Phase 8
- no comment or response infrastructure
- no excerpt or preview in the Writings index — title, year, duration only
- Writings are long-form: floor at 800 words, no upper limit

---

## Phase 9 — Experiment Layer

**Status: Pending** (requires Phase 6; may proceed after Phase 7)

Goals:
- Code Artifacts archetype support: experiment rendering + individual pages
- sandbox architecture for isolated interactive content
- technical documentation as authored MDX (not inline code comments)
- reference system: linking Code Artifacts from Works and Writings

### Experiment Architecture

Code artifacts run in the site environment — not in iframes or external embeds where
possible. Each is a self-contained component that renders within the atmospheric
template. Where an experiment requires heavy computation or memory risk, a sandboxed
approach is permitted.

Performance constraint: the homepage carries Three.js + Framer Motion. A Code Artifact
page that adds a generative experiment must operate within a clearly defined budget
increment. Heavy experiments load only on their own dedicated route.

Constraints:
- no "labs" section branding — experiments are content, not a product sub-brand
- experiment pages do not require descriptive text — the artifact speaks or it does not
  belong here
- the site version of an artifact is authoritative; external hosting links are references

---

## Future Considerations

**These items exist but are not phased — they belong to the system's long-term horizon.**

### Cross-Archive Association System

In its mature form, the archive allows content to reference other content by proximity
rather than by category. A Work surfaces related Writings and Process Artifacts not
through tags but through authored associations defined at the content schema level.
This system requires Phases 7 and 8 to be complete before its shape becomes clear.

### Atmospheric Fragments Archetype

The most diffuse archetype — ambient, encounter-based, not individually indexed.
Implementation requires the archive to have sufficient mass (Phases 7–8 complete) so
that fragments have territory to inhabit. Premature implementation produces a section
that reads as decorative rather than contextually meaningful.

### Video Architecture

Showreel and Work documentation require a considered video hosting strategy. The site
does not self-host video at scale. Options include Cloudflare Stream (aligned with the
existing Cloudflare Pages deployment) and Mux (metadata-rich, frame-level access).
Decision deferred to Phase 7, when Work pages become the primary video surface.

### Performance Budget

The current baseline carries Three.js + React Three Fiber + Framer Motion. Adding MDX
parsing, dynamic routing, and potential experiment components requires a formal
performance budget before any content pages go live. Define in Phase 6.

### Cloudflare Pages Configuration

Full deployment configuration — build commands, environment variables, headers,
redirects, cache strategy — has not been formalized. Define in Phase 6. Redirect rules
and cache headers are route-dependent and cannot be finalized until routes exist.

### Archive Preservation

Content published in the archive carries an implicit promise of stability. URL permanence,
image hosting stability, and content integrity over time require an explicit archival
strategy. Not a Phase 7 concern — but must be decided before the archive has
significant depth.

---

## Visual Goals (Long Term)

- gallery-quality editorial presence across all content pages, not only the homepage
- cinematic route-to-route transitions: spatial, atmospheric, continuous — not
  navigational
- atmospheric continuity: the same conditions that govern the homepage extend into
  every Work, Writing, and Experiment page without re-establishing themselves
- typographic scale as architecture — every content page uses type as its primary
  spatial element, not as caption beneath imagery
- media as evidence, not illustration — images in Work pages document; they do not decorate
- every element earns its place; nothing is present because the template required
  something here
