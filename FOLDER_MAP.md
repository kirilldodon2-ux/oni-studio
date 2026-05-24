# Folder Map

## Current Structure

```
oni-site/
├── app/
│   ├── globals.css              ← layout tokens, viewport safety (overflow-x: clip on html)
│   ├── layout.tsx               ← root layout, font loading
│   ├── page.tsx                 ← home: backdrop, continuity, ControlSurface, sections
│   └── archive/
│       ├── page.tsx             ← browse: /archive (ArchiveGrid)
│       └── [slug]/
│           └── page.tsx         ← inspect: /archive/[slug] (ArchiveInspectView)
│
├── content/                     ← archive registry + types (see CONTENT_SYSTEM.md)
│   ├── field.ts                 ← archiveObjects registry (explicit, not auto-discovered)
│   ├── types.ts                 ← ArchiveObject schema
│   ├── archiveObjectPaths.ts    ← canonicalPreviewSrc() (ontology) + resolveArchiveMediaSrc() (transport)
│   ├── README.md                ← directory index
│   └── sources/                 ← reserved (.gitkeep)
│
├── sections/                    ← self-contained page sections
│   ├── HeroSection/
│   │   ├── index.tsx            ← cinematic full-viewport artboard
│   │   ├── HeroAtmosphere.tsx   ← environmental field rings + depth parallax (desktop)
│   │   ├── Scene.tsx            ← Three.js / R3F 3D scene, Hero-scoped
│   │   └── ViewWorkLink.tsx
│   ├── WorkSection/
│   │   ├── index.tsx
│   │   └── SystemArtifact.tsx   ← SYSTEM ARCHITECTURES territory media (conditional)
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
│   ├── useCinematicVideo.ts     ← viewport-gated browse video playback (ArchiveTile)
│   ├── spatial/                 ← nav sigil, object grounding, convergence (see ARCHITECTURE.md)
│   │   ├── ONINavigationSigil.tsx
│   │   ├── ArtifactConsumptionPair.tsx
│   │   ├── ConvergencePair.tsx      ← deprecated alias
│   │   ├── convergenceInteraction.ts
│   │   ├── silhouetteGrounding.ts
│   │   └── index.ts
│   └── archive/                 ← browse + inspect (see ARCHIVE_OPERATING_LOGIC.md)
│       ├── ArchiveGrid.tsx
│       ├── ArchiveTile.tsx
│       ├── ArchiveInspectView.tsx
│       ├── archiveInspectLayout.ts
│       ├── ArchiveHeroFrame.tsx
│       ├── ArchiveEditorialSequence.tsx
│       ├── ArchiveEditorialPlate.tsx
│       ├── composeEditorialField.ts
│       ├── getObjectAssets.ts
│       ├── probeImageSize.ts
│       ├── territoryLabels.ts
│       └── index.ts
│
├── components/                  ← atomic / global UI (not section-level)
│   └── navigation/              ← floating control surface (Phase 5)
│       ├── index.tsx            ← ControlSurface — fixed, z-40/50, three-zone layout
│       ├── NavLogo.tsx          ← reserved identity zone; visible sigil disabled
│       ├── NavTelemetry.tsx     ← ambient annotation, desktop-only, pointer-events-none
│       ├── NavMenuTrigger.tsx   ← MENU + ONINavigationSigil; toggles MENU/CLOSE
│       └── NavOverlay.tsx       ← adaptive overlay (z-50): full-viewport scrim; plane full-width `< md`, right plane `md+`; ESC, scroll lock
│
└── public/
    ├── archive/
    │   ├── objects/[slug]/    ← object territory: 00-hero.*, 01+ editorial sequence
    │   └── previews/          ← deprecated — DEPRECATED.md only
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

Only paths not yet present in **Current Structure**. `/archive` and `content/` registry are implemented — see Current.

```
oni-site/
├── app/
│   ├── works/                         ← Phase 6
│   │   ├── page.tsx                   ← /works index
│   │   └── [slug]/page.tsx            ← /works/[slug]
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
│   ├── tokens/
│   └── hooks/                         ← shared hooks (e.g. nav scroll state)
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
- `components/navigation/` is the Phase 5 floating control surface system — replaced `SiteHeader.tsx`; see `NAVIGATION_ARCHITECTURE.md`
