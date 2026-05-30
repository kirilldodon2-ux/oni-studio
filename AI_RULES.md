# AI Rules

Rules for AI assistants (Cursor, Claude, etc.) working on this codebase.

---

## Before Modifying Structure

- read ARCHITECTURE.md and this file first
- read `docs/DECISIONS.md` before changing navigation links, content lanes, or control-surface scroll behavior
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

Phase 5 is in progress. `components/SiteHeader.tsx` has been replaced by `components/navigation/`. The active ControlSurface v1 is `fixed`, transparent at all scroll positions, three-zone layout (`docs/DECISIONS.md` DEC-004). `NavOverlay` v1 — HOME / WORK / ARCHIVE / STUDIO / CONTACT (`DEC-002`). Overlay: full-viewport scrim, adaptive navigation plane, `z-50`, ESC close, body scroll lock.

---

## ShowreelMediaCard Rules

The `ShowreelMediaCard` is the reference implementation for cinematic media artifacts.
Follow these rules when extending or reusing the pattern:

### Compositing
- the metallic frame PNG lives at `public/frames/showreel_frame.png` (1024×682, black bg)
- frame compositing uses the inline SVG filter `#oni-luma-matte` — **not** `mix-blend-mode`
- the SVG filter performs a 4-step pipeline: contrast-boost → luminanceToAlpha → alpha-gamma (√) → composite
  - do not reduce the filter to a single `luminanceToAlpha + composite` — the contrast-boost and gamma steps are required for metallic definition and fog reduction
  - do not change `exponent="0.5"` to a value above `0.8` — higher values reintroduce fog
  - do not increase the contrast matrix amplitude above `1.35` — it will damage mid-tone metallic areas
- the SVG filter is defined inline as a zero-size hidden element — do not move it to a global file
- the CSS `filter` on the frame layer chains the SVG matte with dual `drop-shadow()` in one property value
- drop-shadow follows the PNG silhouette because it operates on the post-matte output
- the card div has **no background, no isolate, no overflow-hidden** — shadows must render beyond element bounds
- do not reintroduce `bg-neutral-950`, `mix-blend-mode`, `isolation`, or `overflow-hidden` on the card
- do not add glow, gradient overlays, or visible container styling

### Media stack hierarchy
- `media-object` is the unified parallax container — it contains `media-well` AND `frame-layer`
- do not separate `media-well` and `frame-layer` into sibling stacking contexts — they must share one parallax parent so they move as a single spatial unit
- `media-content` (inside `media-well`) is the dedicated layer for future video/still insertion
  - it carries a pre-applied radial `mask-image` vignette — do not remove it
  - insert video/image content into this div, not directly into `media-well`
- the play button must be a **sibling** of `media-content`, never a child — it must not be affected by the vignette mask
- `frame-layer` is `z-[2]` relative to `media-object` — it renders above `media-well`
  - the frame's transparent inner window (post-matte) lets the play control show through
  - do not reduce `z-[2]` — it must remain above the media content

### Motion
- frame inner window positioning is owned by named constants at the top of `ShowreelMediaCard.tsx`
- always update those constants when the frame asset changes
- motion uses three isolated transform layers (float / scale / parallax) — never combine on one element
- the floating CSS animation (`oni-showreel-float`) lives in `globals.css` — do not inline it
- parallax is owned by `mediaRef` pointing to `media-object` — do not move it back to the frame layer only
- parallax runs only on `(pointer: fine)` devices and respects `prefers-reduced-motion`
- the JS parallax writes `media.style.transform` directly; the frame layer's `style.filter` is a separate CSS property — no conflict

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
Reference implementation: `ShowreelMediaCard` (matte + silhouette chain on frame layer).
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
| 7     | Pending     | Work archive — individual Work pages + Works index            |
| 8     | Pending     | Written content — Writings + MDX pipeline + typography system |
| 9     | Pending     | Experiment layer — Code Artifacts + sandbox architecture      |


Check ROADMAP.md for active phase before making structural changes.