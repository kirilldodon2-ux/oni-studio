READ ORDER

1. [CONTENT_PHILOSOPHY.md](./CONTENT_PHILOSOPHY.md)

2. [ARCHIVE_SYSTEM.md](./ARCHIVE_SYSTEM.md)

3. [ARCHIVE_OPERATING_LOGIC.md](./ARCHIVE_OPERATING_LOGIC.md)

# ONI — Archive Operating Logic

> Operational reference for the archive surface.  
> Defines how archive objects are structured, ingested, rendered, and navigated at scale.
>
> **For archive philosophy and conceptual object model:** `ARCHIVE_SYSTEM.md`
> **For visual language and aesthetic direction:** `VISUAL_LANGUAGE.md`
>
> This document defines HOW — not what or why.

---

## Document Scope

Covers:

- **Canonical authority model** — metadata, masonry geometry, browse optics, inspect occupancy
- **Browse vs inspect** — perceptual split between field scanning and evidence-scale viewing
- **BalancedMasonryGrid integration** — geometry engine assumptions and failure modes
- **Non-goals and anti-patterns** — what must never be used to mask metadata errors
- Archive object model (implementation-level type and field rules)
- Media type detection and rendering strategy
- Aspect ratio and preview integrity (`mediaAspect` data contract)
- Creator attribution rules
- Video behavior — browse artifact and inspect
- Hover metadata rules
- Inspect view behavior
- Masonry density and mobile rules
- Mixed-media ordering
- Scalability rules

Does not cover:

- Archive philosophy → `ARCHIVE_SYSTEM.md`
- Visual style, typography, color → `VISUAL_LANGUAGE.md`
- Component and atmosphere architecture → `ARCHITECTURE.md`

The archive is a **layered editorial spatial system**. `BalancedMasonryGrid` is one geometric engine inside the browse layer — not the definition of the archive.

---

## Canonical Authority Model

The archive is not a flat component tree. Rendering authority is **layered**. Each layer has a single source of truth. Layers must not compensate for lies in other layers.


| Layer               | Authority                         | Primary artifact                                 | Governs                                                           |
| ------------------- | --------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------- |
| **Metadata**        | Spatial truth                     | `mediaAspect` in `content/field.ts`              | Masonry reservation, compaction geometry, spatial rhythm          |
| **Masonry frame**   | Geometric truth                   | `Frame` (`@masonry-grid/react`)                  | Column flow, row balancing, `translateY` compaction               |
| **Browse artifact** | Optical truth                     | `ArchiveTile`                                    | Preview framing, hover opacity, metadata overlay inside the frame |
| **Inspect**         | Perceptual / evidence-scale truth | `ArchiveInspectView` + `archiveInspectLayout.ts` | Occupancy, isolation, interior reading mode                       |


Future work must identify **which layer owns a concern** before changing CSS or components.

### Metadata authority — `mediaAspect`

`mediaAspect: [width, height]` is **canonical spatial metadata**. It is:

- **Not** decorative, approximate, optional-in-practice, or inferred from CSS at runtime
- **Not** a visual crop ratio, a responsive target, or a substitute for measuring the preview asset

It directly governs:

- Masonry `Frame` reservation (`aspect-ratio` on `div[role="listitem"]`)
- `BalancedMasonryGrid` compaction geometry (virtual row heights and `translateY`)
- Spatial rhythm in the browse editorial field

**Preview integrity rule (mandatory):** the intrinsic ratio of `00-hero.`* must match `mediaAspect` truthfully. Measure the canonical hero; set the ratio from that measurement. Do not crop browse representation to fit incorrect metadata.

**Historical failure mode (canonical):**

```
false mediaAspect
  → false spatial reservation
    → incorrect masonry compaction
      → translateY collisions (visible overlap)
```

Overlap on `/archive` was resolved by **data alignment**, not by hover patches, overflow masks, forced `h-full` fills, or engine replacement. **Data alignment > layout patching** is now canonical.

### Masonry authority — `BalancedMasonryGrid`

`BalancedMasonryGrid` owns **geometric compaction** only:

- Column flow and `frameWidth` / `gap`
- Row balancing (`balanceRow`) and virtual column assignment
- `translateY` compaction to minimize grid height

The engine **does not understand optics**. It never measures `img` height, `ArchiveTile` DOM, or preview pixels. It only reads `Frame` `--width` / `--height` (from `mediaAspect`) and treats each cell as a **stable aspect-ratio rectangle**.

Masonry does not define editorial meaning. It positions rectangles in a field.

### Browse artifact authority — `ArchiveTile`

`ArchiveTile` owns **optical presentation inside the reserved frame**:

- Preview media rendering (`h-auto w-full` at full column width when metadata is truthful)
- Hover opacity and brightness (no scale, no dimension change)
- Metadata overlay (opacity fade only, inside frame bounds)
- Link to `/archive/[slug]`

`ArchiveTile` does **not** own grid geometry, column assignment, or inspect occupancy.

**Rule:** optics must not compensate for metadata lies. If `mediaAspect` is wrong, fix `content/field.ts` — do not force-fill the frame with `h-full` + `object-cover` to mask overlap or crop previews destructively.

### Inspect authority — `ArchiveInspectView`

`ArchiveInspectView` owns **evidence-scale viewing**:

- Perceptual occupancy via `getInspectHeroOccupancy()` (`100svh` budget, rem stage cap)
- `object-contain` on hero media + `ONI_SILHOUETTE_FILTER` (object grounding on media only)
- Viewport navigation (33% zones, wheel, touch, keyboard)
- Caption and optional `ArchiveEditorialSequence` (outside viewport nav zones)

Inspect is **not masonry**. It does not use `Frame`, `mediaAspect` reservation for layout bricks, or `translateY` compaction. Browse and inspect are intentionally different perceptual systems.

---

## Browse vs Inspect


| Mode        | Route             | Goal                                | Character                                                 |
| ----------- | ----------------- | ----------------------------------- | --------------------------------------------------------- |
| **Browse**  | `/archive`        | Spatial rhythm + editorial scanning | Field-oriented, relational, rhythmic, comparative         |
| **Inspect** | `/archive/[slug]` | Focused artifact reading            | Isolated, contemplative, evidence-scale, occupancy-driven |


**Browse** presents many artifacts in an **editorial field**. The visitor moves through density and ratio variation. Navigation is spatial comparison across the registry order in `archiveObjects`.

**Inspect** narrows to one artifact at **evidence scale**. The visitor commits attention. Occupancy is height-driven and capped by systemic tokens — not masonry column width.

Do not unify browse and inspect sizing logic. Do not derive inspect hero dimensions from masonry `Frame` geometry.

---

## BalancedMasonryGrid Integration Notes

**Package:** `@masonry-grid/react` — `BalancedMasonryGrid` + `Frame`.  
**Entry:** `ArchiveGrid` → `content/field.ts` (`archiveObjects`) → `Frame width={mediaAspect[0]} height={mediaAspect[1]}` → `ArchiveTile`.

### What the library assumes

- Each child `Frame` exposes `--width` and `--height` as CSS variables and `aspect-ratio: var(--width) / var(--height)` on `div[role="listitem"]`
- Cell height = `(height / width) × frameWidth` — **geometry from metadata**, not from loaded images
- `BalancedMasonryGrid.reflow()` applies `order` and negative `translateY(%)` to compact rows
- Container uses CSS grid + `overflow: hidden`; hover elevation is a separate global rule on `[role="listitem"]:has(a:hover)`

### What the library never does

- Measure optical media height or wait for image decode to settle layout
- Read Next/Image layout or `ArchiveTile` link `offsetHeight`
- Apply editorial framing, crop policy, or inspect occupancy rules

### Runtime chain (verified)

```
archiveObjects[].mediaAspect
  → Frame (--width, --height, aspect-ratio on listitem)
    → BalancedMasonryGrid compaction (translateY)
      → ArchiveTile (optics inside listitem)
```

When `mediaAspect` matches the preview intrinsic ratio, browse artifact height and frame reservation align; compaction stays visually coherent.

### Engine variant note

`RegularMasonryGrid` (same package) omits `balanceRow` virtual reordering. Switch only if truthful metadata still produces overlap under `BalancedMasonryGrid`. That is a **variant selection**, not a new layout system. Default remains `BalancedMasonryGrid`.

---

## Non-Goals and Anti-Patterns

The following are **explicit non-goals** after the overlap recovery pass. Do not reintroduce them.


| Anti-pattern                                                              | Why it fails                                               |
| ------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Fix geometry with `overflow: hidden` on listitems                         | Masks overlap; does not restore spatial truth              |
| Compensate false `mediaAspect` with CSS (`h-full`, forced `object-cover`) | Destroys editorial framing; hides data errors              |
| Per-slug layout hacks or occupancy overrides                              | Breaks systemic browse/inspect split                       |
| ResizeObserver / DOM measurement wrappers for masonry                     | Invented layout intelligence; engine already owns geometry |
| Couple inspect occupancy to masonry `Frame` or `mediaAspect` bricks       | Inspect is a separate perceptual system                    |
| Replace `BalancedMasonryGrid` with custom masonry                         | Architecture drift; use metadata truth first               |
| Hover scale, z-index archaeology (`z-[100]`), collision solvers           | Local patches; not authority restoration                   |
| Parallel browse systems (`ArchiveField` prototype patterns)               | Multiple authorities; confuses future work                 |


**Canonical principle:** **data alignment > layout patching.**

When browse overlap reappears: audit `mediaAspect` against each object’s `00-hero.`* first. Then review engine variant. Do not CSS-patch first.

---

## 01 — Archive Object Model

### TypeScript type

```typescript
// content/types.ts
type ArchiveObject = {
  // Required
  slug: string;                      // URL key and /archive/[slug] route
  title: string;                     // Display title
  previewSrc: string;                // /archive/objects/[slug]/00-hero.[ext] — canonical hero
  territories: ArchiveTerritoryId[]; // One or more territory IDs
  year: number;                      // Year of creation or publication

  // Media
  mediaType?: "image" | "video" | "motion"; // Defaults to "image"
  mediaAspect?: [number, number];            // [w, h] spatial reservation ratio. Defaults to [4, 3]

  // Classification
  archetype?: ArchiveArchetype;
  tags?: string[];

  // Attribution
  creator?: string;  // Only when explicitly known — never inferred
  client?: string;

  // Editorial
  summary?: string;  // Inspect view only. 1–2 sentences max.

  // Legacy
};
```

### Field reference


| Field         | Required | Notes                                                                                                                                                |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`        | Yes      | Permanent. Lowercase hyphenated. Never changed after publishing.                                                                                     |
| `title`       | Yes      | Display title.                                                                                                                                       |
| `previewSrc`  | Yes      | Browse path — `canonicalPreviewSrc(slug, ext)` → object folder `00-hero.*`.                                                                          |
| `territories` | Yes      | One or more territory IDs from `ArchiveTerritoryId`.                                                                                                 |
| `year`        | Yes      | Year made or published.                                                                                                                              |
| `mediaType`   | No       | Omit for images (default). Set explicitly for `"video"` or `"motion"`.                                                                               |
| `mediaAspect` | No*      | **Must match `00-hero` intrinsic ratio when set.** Omit only to accept default `[4, 3]` for unknown ratio — never guess or reuse placeholder ratios. |
| `archetype`   | No       | Editorial classification. Per object type definitions in `ARCHIVE_SYSTEM.md`.                                                                        |
| `creator`     | No       | Handle or name. Only when explicitly known.                                                                                                          |
| `client`      | No       | Brand or client name.                                                                                                                                |
| `summary`     | No       | Shown in inspect view only.                                                                                                                          |
| `tags`        | No       | Freeform secondary grouping.                                                                                                                         |


The archive tolerates incomplete metadata. Missing optional fields never break browsing or rendering.

---

## 02 — Media Type Detection

### Extension → mediaType inference


| Source extension              | `mediaType` to set | Notes                                         |
| ----------------------------- | ------------------ | --------------------------------------------- |
| `.png` `.jpg` `.webp` `.avif` | `"image"`          | Omit `mediaType` entirely — it is the default |
| `.mp4` `.mov` (full work)     | `"video"`          | Plays once with controls in inspect           |
| `.mp4` `.mov` (short loop)    | `"motion"`         | Loops continuously in inspect                 |


### Choosing `"video"` vs `"motion"`


| `mediaType` | Use when                                             |
| ----------- | ---------------------------------------------------- |
| `"video"`   | Full reel, documentary clip, case study footage      |
| `"motion"`  | Short loop — motion preview, ambient fragment, cycle |


The difference in behavior: `"motion"` loops in inspection view; `"video"` plays once with controls (no forced loop).

---

## 03 — Aspect Ratio and Preview Integrity

### Data contract — `mediaAspect`

`mediaAspect: [width, height]` declares **spatial reservation ratio for masonry geometry**.

It is **not**:

- A visual crop ratio applied in CSS
- An inferred value from rendered layout
- A responsive target or breakpoint-specific ratio
- A substitute for measuring the preview file

It **is**:

- Canonical metadata read by `Frame` and `BalancedMasonryGrid`
- The geometric truth the browse layer reserves before optics render

**Mandatory rule:** measure `00-hero.`* intrinsic dimensions and set `mediaAspect` to that ratio (reduced fraction or measured integers, e.g. `[1065, 316]`). Canonical hero ratio and `mediaAspect` must describe the **same object truthfully**.

Uses ratio units, not pixel dimensions. Drives masonry `Frame` dimensions only — inspect occupancy uses separate rules (`archiveInspectLayout.ts`).

### Common ratios


| Format               | `mediaAspect`                 |
| -------------------- | ----------------------------- |
| Portrait 3:4         | `[3, 4]`                      |
| Portrait 9:16 (tall) | `[9, 16]`                     |
| Square               | `[1, 1]`                      |
| Landscape 4:3        | `[4, 3]` ← default if omitted |
| Landscape 16:9       | `[16, 9]`                     |
| Ultra-wide 21:9      | `[21, 9]`                     |


**Rules:**

- Always measure from the actual source media. Do not guess.
- Ratio diversity is an asset — avoid clustering the same ratio in consecutive objects.
- If ratio is unknown, omit `mediaAspect`; the `[4, 3]` default is safe.
- Do not force previews into a standard ratio at the expense of cropping — set truthful `mediaAspect` and render the preview inside the reserved frame.

---

## 04 — Folder → Archive Parsing

The filesystem often encodes creator and grouping context in its folder naming.

### Recognizable folder patterns


| Folder name                | Inferable                                 |
| -------------------------- | ----------------------------------------- |
| `cases VV @zxseeczs/`      | `creator: "VV"`, handle: `@zxseeczs`      |
| `dodon.one/`               | `creator: "dodon.one"`                    |
| `cases Somov D @somovdes/` | `creator: "Somov D"`, handle: `@somovdes` |


### Attribution rules

- Assign `creator` only when the folder name explicitly names a person or studio.
- Do not infer creator from project names, asset filenames, or patterns that don't directly identify a person.
- When authorship is ambiguous: omit `creator`. Note uncertainty in `summary` if relevant.
- Never generate attribution that is not explicitly supported by the source material.

Folder structure may suggest `territories` or `tags` as editorial hints — but these are always human-confirmed, never automatically assigned.

---

## 05 — Thumbnail and Preview Rules

Thumbnails should feel editorial — restrained, honest to the source, not optimized for click-through.

**Image previews:**

- Preserve original framing. Do not crop previews to fix bad metadata — correct `mediaAspect` instead.
- Preserve typographic integrity — type must not be cut, distorted, or partially visible.
- Preserve composition logic — the framing the author chose is the framing the archive shows.

**Video thumbnails:**

- Use the first valid frame, or a designated poster frame if provided.
- Do not use mid-transition, blurred, or low-quality frames.
- A single representative still is acceptable as a browse preview even for video objects.

**File placement (canonical hero):**

```
public/archive/objects/[slug]/00-hero.[ext]
```

One canonical hero per object folder. Registry `previewSrc` derives from this path (`content/archiveObjectPaths.ts`). `public/archive/previews/` is deprecated duplicate authority.

---

## 06 — Creator Attribution

Creator appears in:

- Browse artifact hover metadata (compact, subdued)
- Inspect view figcaption (alongside territories)

### Attribution decision table


| Situation                                             | Action                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| Creator explicitly named in folder or source document | `creator: "name"` or `creator: "@handle"`                                     |
| Creator is unknown                                    | Omit `creator` entirely                                                       |
| Creator is uncertain                                  | Omit `creator`. Note in `summary` if the uncertainty is editorially relevant. |
| Studio-only work, no individual contributor           | Omit `creator`                                                                |


**Never:**

- Infer creator from project name, asset filename, or naming similarity alone.
- Use "ONI" as a `creator` value — the archive is already the studio archive.
- Leave placeholder or speculative attribution in published objects.

---

## 07 — Video Behavior

### Browse artifact — video (browsing surface)


| State       | Behavior                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------- |
| At rest     | `<video>` rendered, `preload="none"`, not playing                                         |
| Hover       | `.play()` called — muted, `playsInline`, `loop`                                           |
| Mouse leave | `.pause()` + `currentTime = 0`                                                            |
| Visual      | Identical to image artifacts — same opacity fade, same metadata overlay, same frame shape |


- `preload="none"` defers all network cost until hover.
- `width` / `height` attributes are set from `mediaAspect` so the browser can allocate space before loading.
- No autoplay at rest. No audio ever.
- Video browse artifacts do not expand, do not animate outside their masonry frame.

### Inspect — video


| `mediaType` | Inspection element                                 | Notes                     |
| ----------- | -------------------------------------------------- | ------------------------- |
| `"image"`   | `<Image priority object-contain>`                  | Optimized via next/image  |
| `"video"`   | `<video controls autoPlay muted playsInline>`      | Plays once; user controls |
| `"motion"`  | `<video controls autoPlay muted playsInline loop>` | Continuous loop           |


- `preload="metadata"` for inspection: loads duration and first frame immediately.
- Video renders inside the same computed `wrapperStyle` as images — consistent shadow treatment.
- No cinematic entrance, no reveal animation. The video plays in the same calm, focused context as any image inspection.

---

## 08 — Hover Metadata

What appears on browse artifact hover (from bottom of frame):

```
TERRITORY   CREATOR   YEAR
TITLE
```

Components:

- Territory: short label from `TERRITORY_SHORT` map (`"Editorial Motion"`, not `"editorial-motion"`)
- Creator: if set — subdued, lighter weight (`text-neutral-300`)
- Year: tabular numerals
- Title: slightly larger, bolder

**Rules:**

- Metadata stays **inside frame bounds** — `overflow-hidden` on the browse link guarantees this.
- Pure opacity fade: `opacity-0 → opacity-100`. No translate transforms. No hover scale.
- No expansion of frame dimensions on hover.
- No descriptions or summaries in browse hover — those belong to inspect.
- Client, tags, and archetype are not shown in browse hover.

---

## 09 — Inspection View

### Inspect spatial system

Canonical layout module: `systems/archive/archiveInspectLayout.ts`  
CSS shell: `.archive-inspect` in `app/globals.css`

**Ownership (do not split across ad-hoc wrappers):**


| Layer       | Class                        | Role                                                      |
| ----------- | ---------------------------- | --------------------------------------------------------- |
| Root        | `.archive-inspect`           | Stage max token (`--archive-inspect-stage-max`)           |
| Interaction | `.archive-inspect__viewport` | Full-width; 33% / 67% prev/next click + wheel + touch     |
| Exhibit cap | `.archive-inspect__exhibit`  | `max-width: var(--archive-inspect-stage-max)`             |
| Artifact    | `.archive-inspect__artifact` | `getInspectHeroOccupancy()` — aspect × `(100svh − 410px)` |
| Atmosphere  | `ArchiveHeroFrame`           | Environmental gradients only                              |
| Caption     | `.archive-inspect__caption`  | Metadata — always `42rem` max, independent of stage       |
| Sequence    | `ArchiveEditorialSequence`   | Outside viewport — not in nav zones                       |


**Stage max (rem tokens, same for every object at breakpoint):**

- default: `42rem`
- `≥768px`: `44rem`
- `≥1024px`: `47.5rem` (ultrawide cap — no `vw` scaling)

**Interaction:** `stopPropagation` only on `.archive-inspect__chrome`, `.archive-inspect__artifact`, `.archive-inspect__caption`. Never on `<figure>` — a full-width figure with `stopProp` blocks viewport navigation.

### Spatial separation (inspect hero)

See `AI_RULES.md` § Spatial Separation. Object grounding: `ONI_SILHOUETTE_FILTER` on hero `img` / `video` only.

### Image / video framing

```
width: min(100%, ratio × (100svh - INSPECT_VIEWPORT_OVERHEAD_PX))
aspectRatio: w / h
```

`INSPECT_VIEWPORT_OVERHEAD_PX = 410` — nav, figcaption, page padding.

- **Portrait**: artifact narrower than stage; centered in exhibit.
- **Landscape**: artifact fills exhibit width up to stage max.
- All objects share the same stage cap and formula — no per-slug sizing.

### Navigation


| Input                       | Action                                                        |
| --------------------------- | ------------------------------------------------------------- |
| Click left 33% of viewport  | Previous object                                               |
| Click right 33% of viewport | Next object                                                   |
| `ArrowLeft`                 | Previous object                                               |
| `ArrowRight`                | Next object                                                   |
| `Escape`                    | Return to `/archive`                                          |
| Touch swipe left            | Next object                                                   |
| Touch swipe right           | Previous object                                               |
| Trackpad horizontal scroll  | Previous / next — 80px accumulation threshold, 700ms cooldown |


Cursor changes to `w-resize` / `e-resize` in the navigation zones.

**stopPropagation ownership:** `.archive-inspect__chrome`, `.archive-inspect__artifact`, and `.archive-inspect__caption` only. Do **not** attach `stopPropagation` to `<figure>` — that blocks viewport navigation across the exhibit width.

### Metadata shown in inspect

```
TERRITORIES  · CREATOR (if set)
TITLE
SUMMARY (if present)
                                YEAR
```

Adjacent entries are prefetched via `router.prefetch` for instant sequential browsing.

---

## 10 — Masonry Layout (Browse Field)

See **BalancedMasonryGrid Integration Notes** and **Canonical Authority Model** for engine assumptions and failure modes.

`ArchiveGrid` — `BalancedMasonryGrid` from `@masonry-grid/react`. Registry: `content/field.ts` → `archiveObjects`.

### Responsive column behavior


| Viewport              | `frameWidth` | Approximate columns |
| --------------------- | ------------ | ------------------- |
| `< 640px` (mobile)    | `150px`      | ~2                  |
| `640–1023px` (tablet) | `220px`      | ~3                  |
| `≥ 1024px` (desktop)  | `280px`      | ~4                  |


Gap: `6px`. Implemented via `useFrameWidth` hook in `ArchiveGrid.tsx`.

### Mobile rules

- 2-column masonry minimum — never single-column stacking.
- Subtle corner rounding on mobile: `rounded-[2px] sm:rounded-none` on browse link.
- Mixed aspect ratios preserved — no height normalization.
- Metadata labels same size and weight as desktop — media-first priority maintained.

### Stacking and hover elevation

`ArchiveGrid` passes `role="listitem"` to `Frame`. `Frame` renders `div[role="listitem"]` with `ArchiveTile`'s `<a>` as direct child. Masonry applies `transform` on listitems for compaction — not owned by `ArchiveTile`.

Hover elevation — global only (`app/globals.css`), not per-artifact wrappers:

```css
[role="listitem"]:has(a:hover),
[role="listitem"]:has(a:focus-visible) {
  position: relative;
  z-index: 10;
}
```

This raises the listitem wrapper on hover/focus — metadata stays above neighbors without changing frame dimensions (no scale, no reflow).

---

## 11 — Mixed-Media Ordering

The sequence in `archiveObjects` (in `content/field.ts`) defines:

- The masonry rendering order
- The inspect-view browse sequence (prev / next)

### Ordering principles

- **Vary aspect ratios**: avoid consecutive identical ratios.
- **Interleave media types**: do not cluster all video objects together.
- **Vary creators**: avoid same creator in consecutive positions.
- **Introduce breaks**: after a run of landscape frames, a portrait or square resets spatial rhythm.
- **Distribute ultra-wides**: `[21, 9]` (or measured ultra-wide ratios) are disruptive — use sparingly, spaced apart.

### What to avoid

- Pure chronological order (newest first / oldest first).
- Alphabetical order.
- Creator clustering.
- Ratio monotony — runs of identical shapes.

The archive surface improves through density with variation, not uniformity.

---

## 12 — Scalability Rules

### What stays constant as objects grow


| Concern            | Stays stable                                                         |
| ------------------ | -------------------------------------------------------------------- |
| Object addition    | Add entry to `archiveObjects` — no structural changes                |
| Route generation   | `generateStaticParams` builds all `/archive/[slug]` pages statically |
| Browse rendering   | `ArchiveGrid` maps the array — no per-object layout configuration    |
| Inspect navigation | Prev/next derived from array index — automatic                       |


### What requires human attention as the archive grows


| Concern          | Human responsibility                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| Ordering         | Periodic review of browse rhythm as density increases                   |
| Canonical hero   | `00-hero.`* in `public/archive/objects/[slug]/` — browse + inspect open |
| Creator accuracy | Confirm attribution before adding                                       |


### Adding a new object — checklist

```
1. Create object folder → public/archive/objects/[slug]/
2. Place canonical hero → 00-hero.[ext]
3. Add numbered sequence assets → 01-…, 02-… (editorial order)
4. Measure 00-hero intrinsic width × height (mandatory)
5. Set mediaAspect to that ratio — must match hero truthfully
6. Add entry to archiveObjects in content/field.ts:
   - slug, title, previewSrc via canonicalPreviewSrc(slug, ext), territories, year (required)
   - mediaType (if video or motion)
   - mediaAspect (from step 4–5)
   - creator (only if explicitly known)
7. Position in array for browse spatial rhythm
8. Verify browse + inspect
```

No deployment changes. No configuration changes. Browse (`/archive`) and inspect (`/archive/[slug]`) routes are automatic.

---

## Document Relations


| Document             | Relationship                                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `CONTENT_SYSTEM.md`  | **Filesystem-native authoring model** — object territory, registry, types, ingestion, non-goals. Read first for content ingestion.     |
| `ARCHIVE_SYSTEM.md`  | Archive philosophy, conceptual object model, territorial behavior. Read for **why**; read this document for **how** and **authority**. |
| `VISUAL_LANGUAGE.md` | Aesthetic direction — typography, color, motion register.                                                                              |
| `ARCHITECTURE.md`    | Technical infrastructure — atmospheric system, rendering.                                                                              |
| `content/types.ts`   | Canonical TypeScript types: `ArchiveObject`, `ArchiveMediaType`.                                                                       |
| `content/field.ts`   | Live archive object registry — `archiveObjects` array.                                                                                 |
| `content/README.md`  | `content/` directory index — points to `CONTENT_SYSTEM.md` and this document.                                                          |


