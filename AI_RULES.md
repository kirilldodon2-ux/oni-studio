# AI Rules

Rules for AI assistants (Cursor, Claude, etc.) working on this codebase.

---

## Before Modifying Structure

- read ARCHITECTURE.md and this file first
- read `docs/DECISIONS.md` before changing navigation links, content lanes, control-surface scroll behavior, or overlay/showreel interaction
- analyze dependencies before moving files
- preserve responsive behavior at every breakpoint
- preserve cinematic restraint — do not default to "standard" layouts
- avoid introducing chaos into what is currently stable

---

## Documentation Synchronization

After every completed architectural phase or system extraction:
- update all affected documentation files immediately
- keep ROADMAP.md truthful
- keep ARCHITECTURE.md aligned with actual repository state
- keep FOLDER_MAP.md synchronized with current structure
- never leave documentation stale after infrastructure changes

---

## Do Not

- create unnecessary wrapper divs
- introduce random UI libraries without discussion
- duplicate systems that already exist
- overuse absolute positioning
- convert ONI into startup / SaaS / dashboard UI
- introduce visual clutter or decoration that competes with content
- add comments that just describe what code does — only explain non-obvious intent
- generate magic numbers without naming them as tokens
- add a new section without wrapping it in `SectionContainer` (unless it is a full-viewport artboard like HeroSection)
- replicate `overflow-x: clip` on body or page wrapper — it is already owned at the `html` level in `globals.css`

---

## Prefer

- reusable, named systems over one-off hacks
- isolated sections that own their own layout
- scalable layout logic via CSS custom properties and Tailwind tokens
- named tokens over hardcoded values (`max-w-oni-page` not `max-w-[1500px]`)
- section ownership — each section manages its own padding, overflow, height
- `SectionContainer` for all new content sections — do not hand-roll the padding or overflow pattern
- `SectionLabel` for all section headings — do not hand-roll the heading + accent bar
- local overflow containment at the section level via `SectionContainer`
- `clamp()` over multiple fixed breakpoint values where appropriate

---

## Token Rules

- header height is `--oni-header-h` — defined in `globals.css`, responsive via media query
- max-width tokens live in `tailwind.config.ts` under `theme.extend.maxWidth`
- never hardcode a value that already has a named token
- when adding new layout values, define as a token first

---

## Motion Rules

Motion should:

- support atmosphere, not demand attention
- never block usability or interaction
- remain subtle and ambient
- preserve the cinematic calmness of the visual direction

---

## Responsive Rules

- mobile is equal priority — never "we'll fix mobile later"
- test layout changes at mobile, tablet, and desktop
- avoid giant viewport-based positioning that breaks on small screens
- decorative systems must not create horizontal or vertical overflow
- `overflow-x: clip` is the viewport safety layer — owned on `html` in `globals.css`, do not add it elsewhere

---

## Visual Identity Rules

- background: `#ffffff`
- foreground: `#000000`
- accent: `#FF4A1A` — use sparingly, never randomly
- fonts: Bebas Neue (display) + Inter (body/UI)
- the aesthetic is cinematic minimalism — not startup, not brutalist, not maximalist

---

## Navigation Rules

The navigation system is a **floating control surface**, not a navbar. These rules apply to any work touching `components/navigation/` or `components/SiteHeader.tsx`:

- never apply `bg-white` or any fully opaque background to the control surface at page top — the atmospheric backdrop must composite through it
- never use `position: sticky` for the control surface — it must be `position: fixed` and float above content
- never add permanent visible nav links to the control surface — navigation links belong in `NavOverlay` only
- `NavOverlay` uses an **adaptive atmospheric plane** (intentional): full-viewport scrim at `z-50`; below `md` the navigation plane is **full-width**; at `md+` it is a **right-aligned partial-width plane** (`md:w-[min(76vw,58rem)]`, `lg:w-[min(68vw,64rem)]`) over the scrim — not permanent links on the control surface
- preserve overlay reveal as restrained **translateX from the right + opacity** (with typography stagger) — not loud slide choreography or startup drawer gimmicks
- never add a bottom navigation bar — incompatible with ONI visual language
- never use `z-index` values outside the formally documented table in `ARCHITECTURE.md`
- never break the three-zone layout (identity / telemetry / action)
- `NavTelemetry` is always `pointer-events-none` and `aria-hidden` — it is never interactive
- menu trigger uses `ONINavigationSigil` from `systems/spatial/` — consistent across all breakpoints; do not revert to hamburger or 4-dot glyph
- the control surface does not entrance-animate — it is present, not performative
- hover states are opacity-only (`hover:opacity-60`) — no scale, no translate, no color change
- do not remove `--oni-header-h` from `globals.css` without also updating Hero to remove its dependency

Phase 5 is complete. `components/SiteHeader.tsx` has been replaced by `components/navigation/`. ControlSurface is `fixed`, transparent at all scroll positions (`docs/DECISIONS.md` DEC-004). `NavOverlay` — HOME · CAPABILITIES · ARCHIVE · BRANDBOOK · CONTACT (`DEC-002`). Overlay: `z-50`, ESC close, `useDocumentScrollLock` (DEC-008).

---

## Interaction rules

### Document scroll lock

- use `useDocumentScrollLock` from `systems/useDocumentScrollLock.ts` for any fullscreen modal that locks the document — do not hand-roll `body` style mutation (DEC-008)
- pass `{ blockTouchMove: true }` for iOS overlay/showreel consumers unless a future DEC narrows policy
- respect ref counting — do not bypass the module with parallel lock utilities

### Pointer-events and touch

- when a closed overlay root is `pointer-events-none` but remains mounted, **gate `pointer-events-auto` on media children to open state only** (DEC-007)
- Hero canvas: keep `touch-pan-y`; never reintroduce `OrbitControls` on the hero scene (DEC-006)
- full-surface links with embedded video/image: media `pointer-events-none`, link owns pan/tap (Archive Fragment pattern, DEC-006)

---

## Showreel rules

Runtime and calibration authority — do not duplicate long spec here:

- **`docs/SHOWREEL_SYSTEM.md`** — ambient / installation / cinema viewers, portal lifecycle, media path, troubleshooting
- **`docs/SHOWREEL_FRAME_CALIBRATION.md`** — 1536×1024 RGBA frame, aperture constants, vignette, silhouette filter

Agent constraints:

- do not reintroduce luma-matte / SVG matte / `mix-blend-mode` frame pipelines — production uses native RGBA + `silhouetteGrounding` on the frame layer
- do not add showreel masters under `public/archive/` — R2 transport via `SHOWREEL_VIDEO_PATH` + `resolveArchiveMediaSrc()`
- cinema viewer must stay portaled at `z-[60]` on mobile; installation at `z-30`
- on cinema close, viewer video must use `pointer-events-none` when `isOpen === false`
- frame constant changes require updating both `ShowreelMediaCard.tsx` and `ShowreelInstallationViewer.tsx` per calibration doc

---

## Spatial Separation — Environmental Atmosphere vs Object Grounding

The site uses **two independent** spatial separation systems. Do not merge them.

### Environmental Atmosphere

Field conditions surrounding the artifact — not the artifact itself:

- ambient gradients
- continuity fields
- atmospheric residue
- spatial tone
- room presence

**Implemented via:** `AmbientField`, `ContinuityField`, `HeroAtmosphere`, archive inspect
`.archive-hero-atmosphere` / `.archive-hero-separation` (gradients + blur only).

**Must never become:** card chrome, visible fog, UI shadow treatment, or object silhouette rendering.

- no `box-shadow` on atmosphere wrappers
- no `filter: drop-shadow()` on atmosphere layers, layout containers, or `.archive-hero-media`
- no `mix-blend-mode: multiply` on white fields (collapses to invisible)

### Object Grounding

Physical separation on the **rendered media artifact** — gallery lift, silhouette readability,
print/object anchoring on white spatial fields, without card framing.

**Implemented via:** `filter: drop-shadow()` chained as contact (tight) + atmospheric lift (wide).

**Applied ONLY to:** the actual media element (`img`, `video`, transparent PNG, or post-matte
frame layer in Showreel).

**Never applied to:** wrappers, `.archive-hero-atmosphere`, `.archive-hero-optical`,
`.archive-hero-media`, or any layout container.

**Canonical values:** `systems/spatial/silhouetteGrounding.ts` (`ONI_SILHOUETTE_FILTER`).
Reference implementation: `ShowreelMediaCard` (RGBA frame layer + silhouette chain).
Archive inspect: `ONI_SILHOUETTE_FILTER` on hero `Image` / `video` in `ArchiveInspectView`.

- `.archive-hero-media` must stay `overflow: visible` so silhouette shadows are not clipped
- do not substitute `box-shadow` for object grounding on archive heroes

---

## Content Architecture Rules

These rules apply to any work touching `content/`, `shared/content/`, or content-facing
page routes under `app/(routes)/`:

- **Do not introduce an external CMS.** Content is authored in the repository. Zod-validated
  TypeScript schemas and MDX files are the authoring layer. No Contentful, no Sanity, no
  Notion-as-CMS, no Airtable.
- **Do not use tag-based or category-based taxonomy.** Content relationships are defined
  by authored associations in the schema — not by tag arrays filtered in UI. No tag cloud,
  no category pages, no filter dropdowns.
- **URL slugs are permanent.** Once a content piece is published with a slug, that slug
  does not change. Design slug format carefully before first use. No auto-generated UUIDs
  as slugs.
- **Do not add preview text to index pages.** Works and Writings index pages show title,
  year, and domain classification only. No excerpts, no truncated body copy, no preview
  cards with description text.
- **Do not add social infrastructure.** No like counts, no share buttons, no comment
  systems, no subscription prompts embedded in content pages.
- **Do not create a "labs" or "blog" section.** Code Artifacts are content, not a product
  sub-brand. Writings are not a blog. These are named archetypes with defined spatial
  treatments — do not introduce alternate naming that carries external associations.
- **Atmospheric infrastructure carries through to all content pages.** Content page
  templates must use `systems/atmosphere/` primitives for reveals, `systems/layout/`
  shells for structure, and the global backdrop. Do not re-establish atmosphere from scratch
  on content routes — the infrastructure is designed to extend.
- **Content page templates inherit the z-index ecology.** The documented z-index table in
  `ARCHITECTURE.md` applies to all routes. No escape-hatch values on content pages.
- **MDX is static-generated.** MDX parsing happens at build time. Do not introduce
  client-side MDX evaluation — it violates the performance budget and the server/client
  component model.
- **`systems/typography/`** is the designated home for long-form reading typographic
  primitives (Phase 7–8). Do not hand-roll reading column styles on individual pages —
  define them in the typography system first.

See `CONTENT_PHILOSOPHY.md` for the full editorial position and content model.
See `CONTENT_SYSTEM.md` for the filesystem-native archive authoring model (object territory,
registry, `00-hero`, deterministic preview paths, ingestion workflow, non-goals). Do not
introduce CMS patterns, auto-discovery, or duplicate preview authority.
See `ARCHIVE_SYSTEM.md` for the canonical archive object model, schema direction, territorial
behavior, contributor system, and archive surface layer architecture before implementing any
archive routes, schema files, or content templates.

**Archive layered authority (browse vs inspect):** `ARCHIVE_OPERATING_LOGIC.md` § Canonical Authority Model.
`mediaAspect` owns spatial reservation; `BalancedMasonryGrid` owns geometry; `ArchiveTile` owns browse optics;
`ArchiveInspectView` owns evidence-scale occupancy. False `mediaAspect` causes masonry overlap — fix metadata,
not CSS masks. Do not use forced `h-full` / `object-cover` on browse previews to compensate.

---

## Phase Awareness


| Phase | Status      | Scope                                                         |
| ----- | ----------- | ------------------------------------------------------------- |
| 0     | Complete    | Infrastructure migration — tokens, documentation              |
| 1     | Complete    | Section architecture — extraction + layout systems            |
| 2     | Complete    | PageBackdrop decoupling → `systems/backdrop/`                 |
| 3     | Complete    | Responsive stabilization + overflow containment               |
| 4     | In Progress | Cinematic polish — Showreel, Archive Fragment, Brand Identity shipped; Hero/Work atmosphere pending |
| 5     | Complete    | Navigation — floating control surface + adaptive overlay (DEC-004/005) |
| 6     | Pending     | Routing & page architecture — writings/code routes, transitions (partial: archive + works shipped) |
| 7     | Partial     | Works Lean Path delivered (DEC-001); MDX interior / production pipeline pending |
| 8     | Pending     | Written content — Writings + MDX pipeline + typography system |
| 9     | Pending     | Experiment layer — Code Artifacts + sandbox architecture      |


Check ROADMAP.md for active phase before making structural changes.