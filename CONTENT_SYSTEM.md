# Content System — Canonical Authoring Model

## Purpose

The ONI archive content layer is **not** designed as:

- a CMS
- a media library
- a dynamic content platform
- a database-backed archive
- an auto-generated ingestion system

It is designed as **filesystem-native editorial infrastructure**.

This distinction is critical.

The archive content system represents:

- authored editorial territory
- deterministic artifact ownership
- explicit sequencing
- stable metadata truth
- AI-readable structure
- automation-compatible ingestion

**Not:**

- opaque content management
- hidden runtime discovery
- machine-inferred editorial structure

---

## Core principle

The filesystem itself is part of the archive architecture.

Filesystem structure is **not** raw storage. It **is** editorial structure.

| Filesystem signal | Archive meaning |
|-------------------|-----------------|
| Folder structure | Archive logic |
| Sequence naming (`00`, `01`, …) | Editorial ordering |
| `00-hero.*` | Canonical object authority |

---

## System layers

### 01 — Object territory layer

**Location:** `public/archive/objects/[slug]/`

**Canonical ownership:**

- editorial sequence
- artifact material
- narrative ordering
- canonical hero representation
- inspect sequence origin
- future manifests / notes / credits

This layer owns images, motion assets, videos, editorial ordering, and future longform material.

This layer does **not** own metadata truth, archive registration, masonry logic, runtime behavior, or schema authority.

#### Object folder doctrine

One object folder = one archive object territory.

Example:

```
public/archive/objects/podcast-cats/
  00-hero.png
  01-carousel.png
  02-logo-primary.png
  03-logo-alt.png
```

The object folder is self-contained, deterministic, editorial, and human-authored.

**Not:** dynamically generated, inferred at runtime, auto-scanned, or CMS-managed.

#### Sequence semantics

Sequence numbering is canonical.

| Prefix | Meaning |
|--------|---------|
| `00-hero.*` | Canonical object representation |
| `01+` | Editorial continuation |

This ordering encodes inspect ordering, narrative progression, editorial rhythm, and artifact sequencing.

**Do not replace** with runtime sorting inference, hidden ordering logic, timestamp sequencing, or dynamic discovery ordering.

#### Canonical hero doctrine

`00-hero.*` is the **single** canonical object authority.

It simultaneously owns:

- browse representation
- masonry preview
- inspect opening artifact
- editorial sequence origin

This eliminates preview drift, duplicate preview systems, mismatched representations, and detached thumbnail authority.

**One object = one canonical hero.**

---

### 02 — Registry layer

**Location:** `content/field.ts`

**Canonical ownership:**

- archive registration
- metadata truth
- browse ordering (array order in registry)
- `mediaAspect` truth
- territories
- summaries
- creator attribution
- archetype classification

`field.ts` is intentionally explicit. It is **not** auto-generated, filesystem-discovered, or runtime-inferred. That explicitness is canonical.

#### Registry doctrine

`field.ts` provides deterministic metadata truth.

| Layer | Role |
|-------|------|
| Filesystem | Artifact territory |
| Registry | Archive intelligence |

The split is intentional.

---

### 03 — Type system layer

**Location:** `content/types.ts`

**Canonical ownership:**

- schema authority
- archive object structure
- runtime expectations
- metadata contracts
- ingestion validation shape

This layer defines **what archive objects are** — not how they are discovered.

---

## Preview derivation

Preview ownership is deterministic.

### Ontology (path)

**Helper:** `canonicalPreviewSrc(slug, ext)` in `content/archiveObjectPaths.ts`

**Example output:** `/archive/objects/podcast-cats/00-hero.png`

Registry `previewSrc` values and `field.ts` entries store **site-relative ontology paths** — not CDN hosts.

### Archive transport (delivery)

**Helper:** `resolveArchiveMediaSrc(path)` in `content/archiveObjectPaths.ts`

**Archive-only.** Prepends `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` when set (production R2/CDN). When unset, returns the path unchanged — local dev and Pages static serving behave as today.

Resolution occurs at DOM `src` boundaries for the **archive lane only** (`ArchiveTile`, `ArchiveInspectView`, `getObjectAssets`) — not in the registry. Do not pass Works `coverSrc` paths through this helper (see Works lane below).

**Build-time:** `NEXT_PUBLIC_*` is inlined at `next build`. `getObjectAssets` resolves sequence URLs during SSG. Changing the origin requires a Pages rebuild. `next.config.mjs` derives `images.remotePatterns` from the origin hostname at build time.

**Local fallback:** `public/archive/objects/[slug]/` remains canonical on disk and in git. Production may serve the same paths from R2 while the repo keeps hybrid rollback — unset the env and redeploy to revert transport to `public/` without ontology changes.

The system is **explicit** — not runtime-scanned, filesystem-crawled, dynamically inferred, or auto-generated at browse time.

`public/archive/previews/` is deprecated duplicate authority. Do not add new files there.

### Media delivery — operational (Phase A, Cloudflare R2)

**Status:** ACTIVE (transport). Ontology unchanged. Bucket `oni-archive`. Public dev origin (no trailing slash):

`https://pub-9e22320b4cf74cbc852a1ad58e965d9f.r2.dev`

**Pages env:** `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` = that origin base URL.

**Object keys** must mirror repo paths under `public/` for the **archive lane only**:

```
archive/objects/[slug]/00-hero.[ext]
archive/objects/[slug]/01-….[ext]
```

Resolved fetch URL pattern: `{ORIGIN}/archive/objects/[slug]/00-hero.[ext]`

Works territory (`public/works/[slug]/`) is **not** part of Phase A R2 upload scope (`docs/DECISIONS.md` DEC-001).

**CORS** (R2 bucket): allow `http://localhost:3000` and production Pages origin (e.g. `https://oni-studio.pages.dev`) for video `Range` / cross-origin media.

#### First upload (pilot)

```bash
wrangler r2 object put oni-archive/archive/objects/[slug]/00-hero.[ext] \
  --file=public/archive/objects/[slug]/00-hero.[ext] \
  --content-type=image/jpeg \
  --cache-control="public, max-age=31536000, immutable" \
  --remote
```

Verify (replace `ORIGIN`):

```bash
curl -sI "$ORIGIN/archive/objects/[slug]/00-hero.[ext]"
```

Expect `200`, correct `content-type`, `accept-ranges` where applicable.

**Critical:** `wrangler r2 object put` writes to **local Miniflare** unless `--remote` is passed. Local success + public R2 `404` means the object was not uploaded remotely.

#### Bulk upload

From repo root, upload all object-territory files (exclude `.DS_Store`):

```bash
find public/archive/objects -type f ! -name '.DS_Store' | while read f; do
  key="${f#public/}"
  wrangler r2 object put "oni-archive/$key" --file="$f" --remote
done
```

Add `--content-type` per extension when MIME matters for inspect/video. Re-upload a key after local editorial replacement; keys are stable.

Add `--cache-control="public, max-age=31536000, immutable"` on upload when absent — production R2 responses may omit `Cache-Control` if bulk upload skipped it (verify with `curl -I`).

#### Rollback

1. Clear `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` on Cloudflare Pages (or remove from preview env).
2. Redeploy / rebuild.
3. Runtime serves site-relative paths from `public/archive/objects/` again.

No `field.ts`, slug, or path changes required.

#### Phase A core — complete when

- Transport abstraction active (`resolveArchiveMediaSrc`, `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN`)
- CDN delivery operational (R2 bucket `oni-archive`, keys mirror `archive/objects/…`)
- Canonical topology preserved (`public/archive/objects/[slug]/`, `00-hero.*`, `field.ts` ontology)
- Local fallback preserved (unset env → site-relative `public/` paths)
- Zero ontology/runtime redesign

#### Explicitly outside Phase A core

- **`ROADMAP.md` sync** — optional one-line “delivered early” only; no roadmap restructure
- **Custom domain** — operational origin URL swap; no resolver or registry semantics change
- **`git lfs prune`** — repository hygiene only; unrelated to media transport architecture

#### FUTURE (not Phase A)

- Preview vs master transport split
- Per-object CDN URLs in registry
- Upload dashboards, manifests, auto-discovery, or CMS ingestion
- Removing `public/archive/objects` from the repo
- Works lane CDN / `resolveWorksMediaSrc()` — deferred until a separate delivery decision

---

## Works lane — media delivery

**Status:** ACTIVE (Lean Path). Parallel registry — not a filter of archive objects (`docs/DECISIONS.md` DEC-001).

| Layer | Location |
|-------|----------|
| Registry | `content/works/field.ts` + `content/works/types.ts` |
| Territory | `public/works/[slug]/` — `00-cover.*` |
| Routes | `/works`, `/works/[slug]` — static SSG |
| Render | `systems/works/` — typographic index + document shell |

### Ontology (path)

Registry `coverSrc` values are **site-relative** paths, e.g. `/works/system-architectures/00-cover.svg`.

### Delivery (transport)

Works covers are served as **Cloudflare Pages static assets** from `public/works/`. The browser `src` uses the registry path unchanged at the DOM boundary (`WorkPageView`).

**Do not** call `resolveArchiveMediaSrc()` on Works paths. That helper prepends `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` (archive R2). Works assets are not uploaded to `oni-archive` under `works/…` in the current model — passing Works paths through archive transport produces R2 URLs that 404.

### Explicitly deferred (DEC-001)

MDX narrative, Zod validation, `shared/content/`, evidence sequences, R2 upload for works assets, archive cross-links.

### Future Works CDN (not authorized yet)

If Works media moves off-repo, require a **lane-specific** decision: documented R2 key prefix (`works/[slug]/00-cover.*`), optional `NEXT_PUBLIC_WORKS_MEDIA_ORIGIN`, and a dedicated resolver — not reuse of archive transport without an explicit DEC.

---

## Cases lane — media delivery (operational)

**Status:** ACTIVE (transport). Full authority: `docs/CASES_SYSTEM.md` § Media delivery.

**Helper:** `resolveCasesMediaSrc(path)` and `casesSrc(slug, …)` in `content/casesMediaPaths.ts`

**Cases-only.** Prepends `NEXT_PUBLIC_CASES_MEDIA_ORIGIN` when set. Separate from archive (`NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN`) and works (Pages static). Enables cases bucket/account migration without touching archive transport.

**Ontology paths:** `/cases/[slug]/…` — stored in `casesData.ts` and per-case `[slug]Assets.ts`. Resolution at DOM `src` boundaries only.

**R2 bucket (default):** `oni-cases`. Keys mirror `public/cases/…` without the `public/` prefix.

**Bulk upload:** `npm run sync:cases-r2` (see `scripts/sync-cases-r2.sh`).

**Rollback:** unset `NEXT_PUBLIC_CASES_MEDIA_ORIGIN` → redeploy → `public/cases/` fallback.

**Performance:** WebP on CDN (`.png` → `.webp` at transport), `CaseImage` viewport gating, `prebuild` strips `public/cases/` on Pages when CDN active — see `docs/CASES_SYSTEM.md` § Performance.

**Do not** pass cases paths through `resolveArchiveMediaSrc()`.

---

## `mediaAspect` doctrine

`mediaAspect` = **spatial metadata truth**

It owns masonry reservation, geometric rhythm, and spatial occupancy.

`mediaAspect` **must** match `00-hero` intrinsic ratio truthfully.

**Do not:**

- approximate ratios
- use “close enough”
- patch geometry with CSS
- compensate with `object-cover` tricks on browse tiles

**Metadata truth > visual patching.** This is canonical archive doctrine.

Browse/runtime layered authority (masonry, optics, inspect) → `ARCHIVE_OPERATING_LOGIC.md` § Canonical Authority Model.

---

## Ingestion workflow

Canonical archive authoring flow:

1. Create object folder → `public/archive/objects/[slug]/`
2. Add canonical hero → `00-hero.*`
3. Add editorial sequence → `01-…`, `02-…`, `03-…`
4. Create `field.ts` registry entry (`canonicalPreviewSrc(slug, ext)` for `previewSrc`)
5. Define truthful `mediaAspect` (measure `00-hero`)
6. Verify browse behavior, masonry rhythm, inspect ordering, canonical hero rendering

Slug is permanent once published. It is the route `/archive/[slug]` and the folder name.

---

## Future-compatible editorial plates

The archive is **not** image-only.

Future-compatible sequence examples (conceptual):

```
00-hero.png
01-image.png
02-motion.mp4
03-notes.md
04-credits.md
05-links.json
```

This represents **editorial sequencing**, not gallery dumping.

Future textual support should remain filesystem-native, not CMS-driven.

**This document does not authorize:**

- markdown runtime support
- prose rendering systems
- metadata parsers
- dynamic sequence interpretation

Current runtime behavior remains unchanged until explicitly implemented.

---

## Automation compatibility

The system is structured for AI-assisted ingestion and future tools (Telegram bot, local CLI, GitHub-assisted publishing, registry scaffolding).

Automation must operate **on top of** the canonical filesystem model, not replace it.

Automation must preserve explicit authorship.

**Do not introduce:**

- hidden ingestion systems
- automatic archive registration
- inferred metadata pipelines
- runtime filesystem intelligence for browse
- autonomous content mutation

The archive is **human-authored first**, AI-assisted second.

---

## Non-goals

Do **not** transform this system into:

- headless CMS architecture
- database-driven ingestion
- visual content dashboard
- runtime-discovered media platform
- auto-tagging infrastructure
- smart archive engine

The archive should remain **quiet, deterministic, authored, systemic** — not opaque, automagic, or self-mutating.

---

## Final principle

The ONI archive content system is a **filesystem-native editorial operating model** — not a CMS pretending to be an art archive.

The filesystem is part of the authorship. Preserve that philosophy.

---

## Document relations

| Document | Relationship |
|----------|--------------|
| `CONTENT_PHILOSOPHY.md` | Editorial position — what the archive holds and why |
| `ARCHIVE_SYSTEM.md` | Archive philosophy, territories, surface architecture |
| `ARCHIVE_OPERATING_LOGIC.md` | Operational authority — browse vs inspect, `mediaAspect`, masonry |
| `content/README.md` | Directory index for `content/` |
| `content/field.ts` | Live registry |
| `content/types.ts` | Schema types |
| `content/archiveObjectPaths.ts` | Archive ontology paths + `resolveArchiveMediaSrc()` (archive transport only) |
| `content/works/field.ts` | Works registry (parallel lane) |
| `content/works/types.ts` | Works schema types |
| `docs/DECISIONS.md` | DEC-001 Works Lean Path · DEC-005 nav route awareness |
