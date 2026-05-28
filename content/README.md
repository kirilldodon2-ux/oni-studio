# Content

Archive registry and types for the ONI archive surface.

**Canonical authoring model (filesystem-native doctrine, layers, ingestion, non-goals):**
→ [`CONTENT_SYSTEM.md`](../CONTENT_SYSTEM.md) at project root

**Browse / inspect operational authority (`mediaAspect`, masonry, optics, evidence-scale):**
→ [`ARCHIVE_OPERATING_LOGIC.md`](../ARCHIVE_OPERATING_LOGIC.md)

---

## Directory map

| Path | Role |
|------|------|
| `sources/` | Raw archive material — do not reorganize automatically |
| `objects/` | Editorial object notes — authored context, not ingestion input |
| `field.ts` | Registry layer — `archiveObjects`, explicit metadata truth |
| `types.ts` | Type system layer — `ArchiveObject`, contracts |
| `archiveObjectPaths.ts` | `canonicalPreviewSrc()` (ontology) + `resolveArchiveMediaSrc()` (transport) |

**Object territory (editorial material):** `public/archive/objects/[slug]/` — see `CONTENT_SYSTEM.md`.

---

## Quick reference

- **One folder** = one object territory (`00-hero.*` + `01+` sequence)
- **Registry entry** required in `field.ts` for every published object
- **`previewSrc`** = `canonicalPreviewSrc(slug, ext)` → site-relative path; CDN via `resolveArchiveMediaSrc()` when `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` is set (see `CONTENT_SYSTEM.md` § Media delivery)
- **`mediaAspect`** must match `00-hero` intrinsic ratio — measure, do not guess

**Deprecated:** `public/archive/previews/` — see `public/archive/previews/DEPRECATED.md`
