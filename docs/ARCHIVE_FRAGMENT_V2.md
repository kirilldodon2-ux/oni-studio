# Archive Fragment V2

**Status:** OPERATIONAL — homepage `/` section  
**System:** `sections/ArchivePreviewSection/`  
**Route anchor:** `#archive`

**Homepage position:** after Work, before Brand Identity (`#identity`), then Showreel.

```
Hero → Work → Archive Fragment → Brand Identity → Showreel → Contact Footer
```

---

## Rationale

The first Archive Fragment read as a homepage feature module: one dominant lead object, a vertical support stack, and Showreel-scale media. Visitors perceived **selected works**, not a **studio archive**.

V2 reframes the section as a **clipped opening** into the live archive field at `/archive`. The homepage does not present three projects; it reveals a **cropped, unresolved slice** of a much larger index.

---

## Visual language

### What the section is

- A **window** — bounded, incomplete, with objects cut by the frame edge  
- A **field sample** — multiple optical units at browse-adjacent scale  
- A **peripheral discovery** — subordinate to Showreel; evidence before climax, not a second hero  

### What the section is not

- Featured work / case study layout  
- Portfolio grid or gallery mat  
- Hero media or showreel surrogate  
- Capability proof block (that remains WorkSection)  

### Perceptual target

The viewer should feel:

1. Objects continue **beyond** the right and bottom edges  
2. The index holds **many more** entries than shown (`fragment / 7 · field index / 32`)  
3. Authorship and format **vary** across the slice — studio depth, not one lane  
4. The section is **discovered**, not **presented**  

---

## Composition principles

### No role hierarchy

There is **no lead**, **no support**, and **no feature/sidebar column split**. Every object has equal optical authority. Asymmetry comes only from **absolute placement**, **aspect ratio collision**, and **vertical offset** — the same grammar as a masonry browse field, not a magazine spread.

### Clipped archive field

The object cluster lives inside a fixed-height container with `overflow: hidden`. Tiles are positioned to extend past the frame:

- **Right clip** — vertical objects placed past ~80% width (`static-poster`, `3d-psp-artifact`)  
- **Bottom clip** — lower objects placed below the visible band (`converse-acw-commercial` at ~70% top)  
- **Vertical stagger** — at least one tile uses `translateY` offset (`poster-square`)  

The crop is literal: the section boundary cuts through media, implying continuation.

### Scale and density

| Rule | V2 |
|------|-----|
| Max tile width | ≤35% of clip container |
| Object count | 5–7 visible in frame |
| Inter-tile rhythm | Placement proximity (browse-like collision), not 48px section gaps |
| Clip frame height | ~340–500px by breakpoint — smaller than Showreel artifact footprint |

### Negative space

Unresolved space is **field space**, not hero staging:

- Right and bottom **clips** imply more content  
- Ambient `+N objects` annotation sits in the void (desktop)  
- Footer line: `cropped field · continuation in archive` — threshold language, not section closure  

### Motion

At most **one** tile uses `AmbientField` drift — slow, environmental, non-performative. Video tiles use `useCinematicVideo` under the same browse policy as `ArchiveTile` (viewport-gated, `preload="none"`).

---

## Curation principles

Curation is **section-local** (`curatedWindow.ts`). It does not modify `content/field.ts` or archive ontology.

### Studio archive, not author showcase

Each rotation must span **multiple creator lanes** and avoid clustering one `@handle` or principal author.

### Diversity axes

| Axis | Intent |
|------|--------|
| Creators | Minimum four distinct lanes in a seven-object window |
| Archetype | Mix `Work`, `ProcessArtifact`, `AtmosphericFragment` |
| Media | Motion and still in the same frame |
| Aspect | 16:9, 9:16, 3:4, 1:1 — stagger collision without masonry engine |
| Territory | Spread across capability fields; no FIELD / 0N metadata on homepage |

### Current V2 lineup (reference)

| Object | Author | Notes |
|--------|--------|-------|
| BUSHIDO ZHO EDIT | @somovdes | 16:9 motion |
| DEPTH MAP ARTIFACTS | dodon.one | 16:9 still |
| ALABASTER SOUND | @minzvr | 16:9 motion · drift |
| STATIC POSTER | @whytheweakest x МАУНТЕР | 9:16 still · right clip |
| 3D PSP ARTIFACT | @zxseeczs | 9:16 motion · right clip |
| POSTER SQUARE | @whytheweakest | 1:1 still · vertical offset |
| CONVERSE ACW COMMERCIAL | dodon.one | 3:4 still · bottom clip |

Rotation replaces slugs in `ARCHIVE_FRAGMENT_FIELD` only. Placement percentages may be tuned per slug aspect.

---

## Clipping rules

1. **Container owns the crop** — `overflow: hidden` on the field window, not per-tile masks  
2. **Minimum two clip edges** — one right, one bottom, per composition pass  
3. **No full-bleed object** — nothing spans >35% width or reads as section hero  
4. **Clipped tiles remain interactive** — links to `/archive/[slug]`; clip does not disable affordance on visible portion  

---

## Density rules

1. **Browse-adjacent scale** — optical units closer to `/archive` tiles (~280px frame class) than to Showreel (~880px)  
2. **Collision over spacing** — tiles may visually neighbor; avoid portfolio whitespace between cards  
3. **Metadata minimal** — three lines max: TITLE, YEAR, AUTHOR (8px). No territory field codes on the fragment  
4. **Section vertical padding** — tighter than Work / Showreel; fragment reads as passage, not platform  

---

## Relationship to archive

| Archive (`/archive`) | Archive Fragment |
|----------------------|------------------|
| Full index (32+ objects) | Fixed seven-slug sample |
| Masonry browse | Static clipped positions |
| Hover metadata overlay | Always-visible micro-annotation |
| Inspect route from any tile | Same inspect routes |

The fragment is an **invitation into** the archive field, not a substitute for it. CTA: **Enter archive field** → `/archive`.

---

## Relationship to capabilities

WorkSection (`#work`) states **what ONI does** — territory taxonomy, typographic, no media hierarchy.

Archive Fragment shows **what exists in the index** — unrelated to territory routing. No `FIELD / 0N` labels; capabilities and archive remain separate layers.

Optional future link: ARCHIVE RESEARCH territory → `#archive` (hash only; no territory system work in V2).

---

## Relationship to showreel

| Showreel | Archive Fragment |
|----------|------------------|
| Homepage **climax** — single cinematic artifact | **Peripheral** — multi-tile discovery |
| ~880px centered object | Clipped field ≤500px tall |
| One motion surface | Many smaller surfaces |
| Intentional focal weight | No dominant tile |

Showreel keeps narrative climax. Archive Fragment is the **field glimpse** encountered earlier in scroll — proof of volume, not proof of reel craft.

Brand Identity (`#identity`) sits between Archive Fragment and Showreel — a compressed poster threshold to `/brandbook`, not a second archive field. See `docs/BRAND_IDENTITY_SECTION.md`.

---

## Canonical boundaries

- **In scope:** `sections/ArchivePreviewSection/`, homepage composition order, `docs/ARCHIVE_FRAGMENT_V2.md`  
- **Out of scope:** `content/field.ts`, `systems/archive/`, routes, masonry grid import, registry or ontology changes  

---

## Revision protocol

When rotating curation:

1. Verify creator-lane spread across the seven slots  
2. Verify at least one right clip and one bottom clip after placement pass  
3. Verify no tile exceeds 35% width  
4. Re-check mobile clip frame — density must remain browse-like, not one-object-per-screen  
5. Do not reintroduce lead/support layout or FIELD / 0N metadata  

---

## V3 — Field Gravity Pass

**Status:** OPERATIONAL (homepage `/`)

### Rationale

V2 established the clipped field but remained sparse, grid-aligned, and single-column on mobile. V3 introduces **field gravity**: a ghost ONI nucleus, orbital mobile constellation, ten-object desktop/mobile placements, collision overlap via `z-index`, and fog emergence on viewport entry.

### Ghost core

- ONI mark from `/logo/oni_logo_black.svg` — not branding, not navigation  
- Dark silver via `invert` + `grayscale` + heavy `blur`  
- Opacity breathe 16s cycle; scale drift ±1%  
- Desktop ~0.035–0.065 · mobile ~0.08–0.12  
- Always `z-[1]` below tiles; never primary focal point  

### Composition

- **10 objects** — separate `desktop` and `mobile` coordinate maps in `curatedWindow.ts`  
- **Alabaster Sound** anchors center (~31% / 20% desktop; ~58% width mobile)  
- **No lead/support roles** — overlap and `zIndex` only  
- Partial clip: negative `left` / high `top` / widths pushing past 80%  
- Max tile width ~38% (mobile alabaster exception for nucleus)  

### Emergence

- `ArchiveFragmentField` sets `data-emerged` via `IntersectionObserver`  
- Tiles use `oni-fragment-emerge` — opacity + slight translate + blur dissolve (3.2s)  
- Stagger via per-slot `emergeDelay` — memory surfacing, not showcase stagger  

### Showreel relationship

Fragment height and padding reduced vs V2; ghost is sub-perceptual. Showreel remains the single large cinematic artifact on the landing scroll.

### Curation (V3 reference)

`alabaster-sound` · `bushido-zho-edit` · `depth-map-artifacts` · `gajet-store` · `static-poster` · `3d-psp-artifact` · `poster-square` · `converse-acw-commercial` · `event-4nway-case` (nine objects; V3.2 stagger 140ms · 1.4s emerge)

Creators: `@minzvr` · `@somovdes` · `dodon.one` · `@zxseeczs` · `@whytheweakest` · `@whytheweakest x МАУНТЕР`

### V3.3 — Mobile field gravity

**Desktop:** unchanged (V3.2 clipped scatter).

**Mobile:** dedicated orbital composition — nine tiles pulled toward a central ghost core (`z-0`, opacity 0.05–0.08, ~90vw mark). `alabaster-sound` is the visual nucleus (`zIndex: 12`, ~46% width at field center). Tiles overlap in the 30–55% vertical band; no symmetric ring, no radial menu. Section height unchanged.

### V3.4 — Noise removal

Tile metadata (title / year / author) removed from persistent view. **Mobile:** objects only. **Desktop:** index lines on hover/focus fade (500ms). Section chrome unchanged (`ARCHIVE FRAGMENT`, field index, `Enter archive field`). Link `aria-label` retains inspect context.

### V3.5 — Mobile scroll-through tiles (touch targets)

**Problem:** On iOS Safari, vertical swipes starting on fragment `<video>` inside a full-surface `<Link>` often did not scroll the document (native media touch path).

**Fix (`ArchiveFragmentTile.tsx`):**

| Layer | Treatment |
|-------|-----------|
| `<Link>` | `touch-pan-y` — document vertical pan allowed on tile surface |
| Media wrapper | `touch-pan-y` |
| `<video>` / `<Image>` | `pointer-events-none` — gesture hits the link; tap still navigates; `useCinematicVideo` unchanged (ref + IntersectionObserver on video) |

Layout, autoplay, and hover opacity unchanged. Do not re-wrap video in interactive-only overlays without revisiting this table.
