# Folder Map

## Current Structure

```
oni-site/
├── _archive/                              ← reference-only exports (not runtime — see _archive/README.md)
│   └── brandbook-make-export/             ← Figma Make Vite source; production = app/brandbook/
│
├── _archive_graveyard/                    ← deprecated site scaffolding (never delete)
│
├── docs/
│   ├── DECISIONS.md                       ← architecture decision log (nav, content lanes, control surface)
│   ├── BRANDBOOK_INTEGRATION.md           ← /brandbook port, atmosphere pass, Phase 1 release (OPERATIONAL)
│   ├── ARCHIVE_FRAGMENT_V2.md             ← homepage Archive Fragment section (OPERATIONAL)
│   ├── BRAND_IDENTITY_SECTION.md          ← homepage Brand Identity threshold → /brandbook (OPERATIONAL)
│   ├── FIGMA_EXPORT.md                    ← landing capture: ?export=1, metadata, freeze table
│   └── FIGMA_RECONCILIATION_WORKFLOW.md   ← code ↔ Figma ↔ code perception doctrine
│
├── app/
│   ├── globals.css              ← layout tokens, viewport safety (overflow-x: clip on html)
│                                 + html.oni-export perception freeze (?export=1)
│   ├── layout.tsx               ← root layout, font loading
│   ├── page.tsx                 ← home: ExportModeProvider, backdrop, continuity, sections
│   ├── archive/
│   │   ├── page.tsx             ← browse: /archive (ArchiveGrid)
│   │   └── [slug]/
│   │       └── page.tsx         ← inspect: /archive/[slug] (ArchiveInspectView)
│   ├── works/
│   │   ├── page.tsx             ← index: /works (WorksIndex)
│   │   └── [slug]/
│   │       └── page.tsx         ← detail: /works/[slug] (WorkPageView)
│   └── brandbook/
│       ├── layout.tsx           ← route fonts (Outfit, JetBrains Mono) + metadata
│       └── page.tsx             ← /brandbook (ControlSurface + BrandbookExperience)
│
├── content/                     ← archive registry + types (see CONTENT_SYSTEM.md)
│   ├── field.ts                 ← archiveObjects registry (explicit, not auto-discovered)
│   ├── types.ts                 ← ArchiveObject schema
│   ├── archiveObjectPaths.ts    ← canonicalPreviewSrc() (ontology) + resolveArchiveMediaSrc() (transport); R2 ops → CONTENT_SYSTEM.md § Media delivery
│   ├── README.md                ← directory index
│   ├── sources/                 ← reserved (.gitkeep)
│   └── works/                   ← works registry (Lean Path — see docs/DECISIONS.md DEC-001)
│       ├── field.ts             ← worksRegistry
│       └── types.ts             ← Work type
│
├── sections/                    ← self-contained page sections
│   ├── HeroSection/
│   │   ├── index.tsx            ← cinematic full-viewport artboard
│   │   ├── HeroAtmosphere.tsx   ← environmental field rings + depth parallax (desktop)
│   │   ├── HeroVisual.tsx         ← export gate: fallback | dynamic Scene
│   │   ├── HeroExportFallback.tsx ← static hero reference (?export=1)
│   │   ├── Scene.tsx            ← Three.js / R3F 3D scene, Hero-scoped
│   │   └── ViewWorkLink.tsx
│   ├── WorkSection/
│   │   ├── index.tsx
│   │   └── SystemArtifact.tsx   ← SYSTEM ARCHITECTURES territory media (conditional)
│   ├── ArchivePreviewSection/
│   │   ├── index.tsx            ← ARCHIVE FRAGMENT section shell + footer threshold
│   │   ├── ArchiveFragmentField.tsx
│   │   ├── ArchiveFragmentTile.tsx
│   │   ├── ArchiveFragmentGhostCore.tsx
│   │   └── curatedWindow.ts     ← section-local slug + placement maps
│   ├── BrandIdentitySection/
│   │   ├── index.tsx            ← BRAND IDENTITY section shell + poster link + footer threshold
│   │   ├── IdentityManifesto.tsx ← ОНИ + black mass poster (client)
│   │   └── manifestoLines.ts    ← layout + motion constants
│   ├── ShowreelSection/
│   │   ├── index.tsx            ← section shell; SectionLabel + ShowreelMediaCard
│   │   └── ShowreelMediaCard.tsx ← cinematic media artifact (luma-matte frame)
│   ├── ContactFooterSection/
│   │   └── index.tsx
│   └── GhostPopulationSection/  ← present; not composed on app/page.tsx (home)
│       └── index.tsx
│
├── systems/                     ← shared infrastructure (no section-level UI)
│   ├── layout/
│   │   ├── SectionContainer.tsx ← section shell: overflow-hidden + px cadence
│   │   └── SectionLabel.tsx     ← section heading + accent bar pattern
│   ├── backdrop/
│   │   └── index.tsx            ← global ambient SVG backdrop (PageBackdrop)
│   ├── atmosphere/
│   │   ├── PresenceLayer.tsx
│   │   ├── AmbientField.tsx
│   │   ├── RevealPrimitives.tsx ← FadeIn, RevealUp
│   │   ├── ContinuityField.tsx
│   │   ├── useDepthField.ts
│   │   └── index.ts
│   ├── export/                  ← landing perception freeze (?export=1); see docs/FIGMA_*.md
│   │   ├── exportMode.ts
│   │   ├── ExportModeProvider.tsx
│   │   └── index.ts
│   ├── useCinematicVideo.ts     ← viewport-gated browse video playback (ArchiveTile)
│   ├── spatial/                 ← nav sigil, object grounding, convergence (see ARCHITECTURE.md)
│   │   ├── ONINavigationSigil.tsx
│   │   ├── ArtifactConsumptionPair.tsx
│   │   ├── ConvergencePair.tsx      ← deprecated alias
│   │   ├── convergenceInteraction.ts
│   │   ├── silhouetteGrounding.ts
│   │   └── index.ts
│   ├── archive/                 ← browse + inspect (see ARCHIVE_OPERATING_LOGIC.md)
│   │   ├── ArchiveGrid.tsx
│   │   ├── ArchiveTile.tsx
│   │   ├── ArchiveInspectView.tsx
│   │   ├── archiveInspectLayout.ts
│   │   ├── ArchiveHeroFrame.tsx
│   │   ├── ArchiveEditorialSequence.tsx
│   │   ├── ArchiveEditorialPlate.tsx
│   │   ├── composeEditorialField.ts
│   │   ├── getObjectAssets.ts
│   │   ├── probeImageSize.ts
│   │   ├── territoryLabels.ts
│   │   └── index.ts
│   ├── works/                   ← works index + detail (Lean Path — see docs/DECISIONS.md)
│   │   ├── WorksIndex.tsx
│   │   ├── WorkPageView.tsx
│   │   └── index.ts
│   └── brandbook/               ← interactive brandbook (Phase 1 — see docs/BRANDBOOK_INTEGRATION.md)
│       ├── BrandbookExperience.tsx
│       ├── BrandbookSectionContext.tsx
│       ├── BrandbookSectionNav.tsx
│       ├── components/          ← six sections; cover = BrandbookHero + BrandbookHeroMetallicDrift (unified desktop/mobile — hero spec in docs/BRANDBOOK_INTEGRATION.md)
│       └── imports/             ← hero + logo SVG paths
│
├── components/                  ← atomic / global UI (not section-level)
│   └── navigation/              ← floating control surface (Phase 5)
│       ├── index.tsx            ← ControlSurface — fixed, z-40/50, always transparent
│       ├── NavHome.tsx          ← HOME link on `/`, `/archive*`, `/brandbook`; else NavLogo spacer
│       ├── NavLogo.tsx          ← reserved identity zone; visible sigil disabled
│       ├── NavTelemetry.tsx     ← ambient annotation, desktop-only, pointer-events-none
│       ├── NavMenuTrigger.tsx   ← MENU + ONINavigationSigil; toggles MENU/CLOSE
│       └── NavOverlay.tsx       ← overlay: HOME · CAPABILITIES · ARCHIVE · BRANDBOOK · CONTACT
│
└── public/
    ├── archive/
    │   ├── objects/[slug]/    ← object territory: 00-hero.*, 01+ editorial sequence
    │   └── previews/          ← deprecated — DEPRECATED.md only
    ├── works/
    │   └── [slug]/            ← work territory: 00-cover.* (Lean Path)
    ├── brandbook/
    │   ├── hero-wire.png      ← cover section metallic wire art
    │   └── about-wire.png     ← about section wire art
    ├── logo/
    │   └── oni_logo_black.svg
    ├── frames/
    │   └── showreel_frame.png ← metallic figurative frame (1024×682, luma-matte composite)
    ├── models/
    │   └── ONI_3d_no_texture.glb
    └── png/
        ├── desktop/           ← desktop reference screenshots
        └── mobile/            ← mobile reference screenshots
```

---

## Target Structure (Phase 6+)

Only paths not yet present in **Current Structure**. `/archive`, `/works` (Lean Path), and `content/` registries are implemented — see Current.

```
oni-site/
├── app/
│   ├── writing/                       ← Phase 6
│   │   ├── page.tsx                   ← /writing index
│   │   └── [slug]/page.tsx            ← /writing/[slug]
│   └── code/                          ← Phase 6
│       └── [slug]/page.tsx            ← /code/[slug] (no public index)
│
├── shared/                            ← Phase 6 — utilities, tokens, schemas (no UI)
│   ├── content/
│   │   ├── schemas.ts                 ← Zod: Work, Writing, Artifact, etc.
│   │   └── types.ts                   ← archetype type exports
│   └── tokens/
│   # No nav scroll-state hook — closed ControlSurface has no scroll listener (DEC-004)
│
└── systems/
    ├── typography/                    ← Phase 7–8 — long-form reading typographic system
    └── ornaments/                     ← future — decorative infrastructure
```

---

## Notes

- `sections/` owns layout, content, and local overflow — each section is independently deployable
- `systems/layout/SectionContainer` is the enforcement shell: provides `overflow-hidden` + horizontal padding for all content sections
- `systems/layout/SectionLabel` is the shared section heading pattern — always wired via `aria-labelledby`
- `systems/` is infrastructure — never hard-controls layout, always independently removable
- `shared/content/` will hold Zod-validated schemas and typed content definitions — no UI, no rendering logic
- `content/field.ts` — `archiveObjects` registry; `mediaAspect` must match `00-hero` intrinsic ratio
- `public/archive/objects/[slug]/` — editorial territory; numbering encodes sequence (CONTENT_SYSTEM.md)
- `content/` — archive registry and types; filesystem-native authoring, not auto-discovery
- `shared/` is utilities and tokens — no UI
- `components/` is atomic/global UI only — no section-level concerns
- `components/navigation/` is the Phase 5 floating control surface — `SiteHeader.tsx` removed; route awareness DEC-005; no scroll-state DEC-004; see `NAVIGATION_ARCHITECTURE.md`
- `systems/brandbook/` + `app/brandbook/` — interactive brandbook route (Phase 1); no `PageBackdrop`; route-scoped fonts; cover hero = one composition (`BrandbookHero` + drift layer) — see `docs/BRANDBOOK_INTEGRATION.md` § Cover hero
- `sections/ArchivePreviewSection/` + `sections/BrandIdentitySection/` — homepage field glimpse + identity threshold (composed on `app/page.tsx` between Work and Showreel) — see `docs/ARCHIVE_FRAGMENT_V2.md`, `docs/BRAND_IDENTITY_SECTION.md`
- `_archive/brandbook-make-export/` — Figma Make reference export only; excluded from typecheck; production is `app/brandbook/`
- `content/works/` + `public/works/[slug]/` — Works lane; covers are Pages-static — do not use `resolveArchiveMediaSrc()` (`CONTENT_SYSTEM.md`)
- `systems/export/` — canonical `/?export=1` perception freeze; not a parallel route
- `docs/FIGMA_EXPORT.md`, `docs/FIGMA_RECONCILIATION_WORKFLOW.md` — OPERATIONAL perception workflow
