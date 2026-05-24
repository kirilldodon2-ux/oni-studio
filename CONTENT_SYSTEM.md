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

### Transport (delivery)

**Helper:** `resolveArchiveMediaSrc(path)` in `content/archiveObjectPaths.ts`

Prepends `NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN` when set (production R2/CDN). When unset, returns the path unchanged — local dev and Pages static serving behave as today.

Resolution occurs at DOM `src` boundaries (`ArchiveTile`, `ArchiveInspectView`, `getObjectAssets`) — not in the registry.

The system is **explicit** — not runtime-scanned, filesystem-crawled, dynamically inferred, or auto-generated at browse time.

`public/archive/previews/` is deprecated duplicate authority. Do not add new files there.

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
| `content/archiveObjectPaths.ts` | Deterministic `00-hero` paths |
