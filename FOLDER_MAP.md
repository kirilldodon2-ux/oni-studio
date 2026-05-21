# Folder Map

## Current Structure

```
oni-site/
├── app/
│   ├── globals.css         ← layout tokens, viewport safety (overflow-x: clip on html)
│   ├── layout.tsx          ← root layout, font loading
│   └── page.tsx            ← page composition (section imports)
│
├── sections/               ← self-contained page sections
│   ├── HeroSection/
│   │   ├── index.tsx       ← cinematic full-viewport artboard
│   │   ├── Scene.tsx       ← Three.js / R3F 3D scene, Hero-scoped
│   │   └── ViewWorkLink.tsx
│   ├── WorkSection/
│   │   ├── index.tsx
│   │   └── ProjectCard.tsx
│   ├── ShowreelSection/
│   │   ├── index.tsx             ← section shell; SectionLabel + ShowreelMediaCard
│   │   └── ShowreelMediaCard.tsx ← cinematic media artifact (Phase 4 polish)
│   └── ContactFooterSection/
│       └── index.tsx
│
├── systems/                ← shared infrastructure systems
│   ├── layout/
│   │   ├── SectionContainer.tsx  ← section shell: overflow-hidden + px cadence
│   │   └── SectionLabel.tsx      ← section heading + accent bar pattern
│   ├── backdrop/
│   │   └── index.tsx             ← global ambient SVG backdrop (Phase 2 complete)
│   └── atmosphere/               ← atmospheric infrastructure (established)
│       ├── PresenceLayer.tsx     ← scroll-driven cinematic opacity/translateY emergence
│       ├── AmbientField.tsx      ← CSS-driven ambient drift + breathing (server component)
│       ├── RevealPrimitives.tsx  ← FadeIn, RevealUp reveal atoms
│       ├── useDepthField.ts      ← scroll-driven parallax depth hook
│       ├── ContinuityField.tsx   ← page-level spatial continuity layer (spatial continuity pass)
│       └── index.ts              ← barrel export
│
├── components/             ← atomic / global UI (not section-level)
│   └── navigation/         ← Phase 5: floating control surface system (active)
│       ├── index.tsx       ← ControlSurface — fixed, z-40/50, three-zone layout
│       ├── NavLogo.tsx     ← Reserved identity zone; visible sigil disabled
│       ├── NavTelemetry.tsx ← Ambient annotation, desktop-only, pointer-events-none
│       ├── NavMenuTrigger.tsx ← MENU + ONINavigationSigil; toggles MENU/CLOSE
│       └── NavOverlay.tsx  ← Fullscreen menu overlay (z-50), fade-only reveal
│
└── public/
    ├── archive/
    │   ├── objects/[slug]/   ← object territory: 00-hero.*, 01+ editorial sequence (see CONTENT_SYSTEM.md)
    │   └── previews/         ← deprecated — DEPRECATED.md only
    ├── logo/
    │   └── oni_logo_black.svg
    ├── frames/
    │   └── showreel_frame.png    ← metallic figurative frame (1024×682, luma-matte composite)
    ├── models/
    │   └── ONI_3d_no_texture.glb
    └── png/
        ├── desktop/        ← desktop reference screenshots
        └── mobile/         ← mobile reference screenshots
```

---

## Target Structure (Remaining Phases)

```
oni-site/
│
├── app/
│   ├── globals.css         ← ✓ established
│   ├── layout.tsx          ← ✓ established
│   ├── page.tsx            ← ✓ established (home)
│   └── (routes)/           ← Phase 6 — dynamic content routes
│       ├── works/
│       │   ├── page.tsx              ← works index
│       │   └── [slug]/
│       │       └── page.tsx          ← individual work page
│       ├── writing/
│       │   ├── page.tsx              ← writings index
│       │   └── [slug]/
│       │       └── page.tsx          ← individual writing
│       └── code/
│           └── [slug]/
│               └── page.tsx          ← code artifact page (no public index)
│
├── content/                ← archive registry + types (see CONTENT_SYSTEM.md — not a CMS)
│   ├── field.ts            ← archiveObjects registry (explicit, not auto-discovered)
│   ├── types.ts            ← ArchiveObject schema
│   ├── archiveObjectPaths.ts ← canonicalPreviewSrc()
│   └── README.md           ← directory index
│
├── systems/
│   ├── layout/             ← ✓ established
│   ├── backdrop/           ← ✓ established (Phase 2 complete)
│   ├── atmosphere/         ← ✓ established (Atmospheric Infrastructure phase)
│   ├── spatial/            ← infrastructural spatial artifacts + object grounding
│   │   ├── ONINavigationSigil.tsx  ← canonical 3D menu sigil (`NavMenuTrigger`)
│   │   ├── ArtifactConsumptionPair.tsx ← interface dissolved by artifact (reusable)
│   │   ├── ConvergencePair.tsx         ← deprecated alias
│   │   ├── convergenceInteraction.ts   ← consumption tokens + style helpers
│   │   ├── silhouetteGrounding.ts
│   │   └── index.ts
│   ├── archive/            ← layered browse + inspect (see ARCHIVE_OPERATING_LOGIC.md)
│   │   ├── ArchiveGrid.tsx           ← browse: BalancedMasonryGrid + Frame(mediaAspect)
│   │   ├── ArchiveTile.tsx           ← browse optical presentation inside frame
│   │   ├── ArchiveInspectView.tsx    ← inspect: evidence-scale occupancy
│   │   ├── archiveInspectLayout.ts   ← inspect occupancy formula (not masonry)
│   │   ├── ArchiveHeroFrame.tsx      ← inspect atmosphere only
│   │   ├── ArchiveEditorialSequence.tsx
│   │   └── getObjectAssets.ts        ← per-slug filesystem assets (inspect)
│   ├── typography/         ← Phase 7–8 — long-form reading typographic system
│   └── ornaments/          ← future
│
├── shared/                 ← utilities, tokens, schemas (no UI)
│   ├── content/            ← Phase 6 — Zod schemas + typed content definitions
│   │   ├── schemas.ts      ← Work, Writing, Artifact, etc.
│   │   └── types.ts        ← content type exports
│   ├── tokens/
│   └── hooks/
│
└── components/
    ├── navigation/         ← ✓ established (Phase 5 — NavOverlay implemented)
    │   ├── index.tsx
    │   ├── NavLogo.tsx
    │   ├── NavTelemetry.tsx
    │   ├── NavMenuTrigger.tsx
    │   └── NavOverlay.tsx
    └── (atomic UI only)
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
