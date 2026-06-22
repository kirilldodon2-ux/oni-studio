# Content

Filesystem-native registries and types for ONI content lanes.

**Canonical authoring model (filesystem-native doctrine, layers, ingestion, non-goals):**
→ [`CONTENT_SYSTEM.md`](../CONTENT_SYSTEM.md) at project root

**Browse / inspect operational authority (archive — `mediaAspect`, masonry, optics, evidence-scale):**
→ [`ARCHIVE_OPERATING_LOGIC.md`](../ARCHIVE_OPERATING_LOGIC.md)

**Works Lean Path (parallel lane, not an archive filter):**
→ [`docs/DECISIONS.md`](../docs/DECISIONS.md) DEC-001

---

## Directory map

| Path | Role |
|------|------|
| `field.ts` | Archive registry — `archiveObjects` / `archiveFieldEntries`, explicit metadata truth |
| `types.ts` | Archive type system — `ArchiveObject`, `ArchiveTerritoryId`, contracts |
| `archiveObjectPaths.ts` | Archive ontology + transport — `canonicalPreviewSrc()`, `resolveArchiveMediaSrc()` |
| `casesMediaPaths.ts` | Cases ontology + transport — `caseAssetPath()`, `resolveCasesMediaSrc()` → `docs/CASES_SYSTEM.md` |
| `sources/` | Reserved raw material staging (`.gitkeep` only — do not reorganize automatically) |
| `works/field.ts` | Works registry — `worksRegistry`, explicit index order |
| `works/types.ts` | Works type system — `Work`, `WorkDomain` |

**Archive object territory (media + sequence):** `public/archive/objects/[slug]/` — see `CONTENT_SYSTEM.md`.

**Works territory (cover + future evidence):** `public/works/[slug]/` — see `CONTENT_SYSTEM.md` § Works lane.

**Cases territory (preview + landing assets):** `public/cases/[slug]/` — see `docs/CASES_SYSTEM.md` § Media delivery. Transport via `resolveCasesMediaSrc()`; registry in `systems/cases/casesData.ts` (not `content/`).

---

## Quick reference

### Archive

- **One folder** = one object territory (`00-hero.*` + `01+` sequence) under `public/archive/objects/[slug]/`
- **Registry entry** required in `field.ts` for every published object
- **`previewSrc`** = `canonicalPreviewSrc(slug, ext)` → site-relative path; CDN via `resolveArchiveMediaSrc()` when `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` is set (see `CONTENT_SYSTEM.md` § Media delivery)
- **`mediaAspect`** must match `00-hero` intrinsic ratio — measure, do not guess

### Works

- **Registry entry** required in `works/field.ts` for every published work
- **`coverSrc`** = site-relative path under `public/works/[slug]/` — Pages static delivery only (do not use `resolveArchiveMediaSrc()`)

**Deprecated:** `public/archive/previews/` — see `public/archive/previews/DEPRECATED.md`
