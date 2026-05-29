# ONI Studio

Cinematic studio frontend — living archive, editorial environment, and experimental publishing surface.

## Phase status

| Phase | Scope | Status |
|-------|--------|--------|
| 0–3 | Tokens, sections, backdrop, responsive | Complete |
| 4 | Cinematic polish (Showreel, ContactFooter, atmosphere) | **In progress** |
| 5 | Floating navigation + adaptive menu overlay | **Complete (baseline)** — transparent closed surface (DEC-004); route-aware telemetry + overlay (DEC-005) |

Remaining work is organized in [ROADMAP.md](./ROADMAP.md) as **three layers** (not numbered phases):

| Layer | Concern | Status |
|-------|---------|--------|
| 1 — Infrastructure | Archive, Works Lean Path, media, CDN, routes, caching, Safari | **In progress** |
| 2 — Editorial / Spatial | Territory, pacing, motion, traversal, typography | Pending |
| 3 — Studio / Identity | Landing, contact, ecosystem, ONI/personal cohesion | Pending |

`/archive`, `/works`, and `content/` registries shipped under Layer 1 (Works Lean Path — see `docs/DECISIONS.md` DEC-001).

## Local development

```bash
npm install
npm run dev
```

Stack: Next.js 14 · React 18 · TypeScript · Tailwind v3 · Three.js / R3F · Cloudflare Pages

## Routes

| Route | Status |
|-------|--------|
| `/` | Live — home section stack |
| `/archive` | Live — browse (`ArchiveGrid`) |
| `/archive/[slug]` | Live — inspect (`ArchiveInspectView`) |
| `/works` | Live — typographic index (`WorksIndex`) |
| `/works/[slug]` | Live — document shell (`WorkPageView`; Lean Path) |
| `/writing`, `/code/[slug]` | Layer 1 — pending ([ROADMAP.md](./ROADMAP.md)) |

## Documentation

Read in this order unless your task is narrowly scoped.

**1 — Project ground (always)**  
[AI_RULES.md](./AI_RULES.md) → [ARCHITECTURE.md](./ARCHITECTURE.md) → [FOLDER_MAP.md](./FOLDER_MAP.md)

**2 — Archive (content + surface)**  
[CONTENT_PHILOSOPHY.md](./CONTENT_PHILOSOPHY.md) → [ARCHIVE_SYSTEM.md](./ARCHIVE_SYSTEM.md) → [ARCHIVE_OPERATING_LOGIC.md](./ARCHIVE_OPERATING_LOGIC.md)  
Authoring on disk: [CONTENT_SYSTEM.md](./CONTENT_SYSTEM.md)

**3 — Reference**  
[VISUAL_LANGUAGE.md](./VISUAL_LANGUAGE.md) · [NAVIGATION_ARCHITECTURE.md](./NAVIGATION_ARCHITECTURE.md) · [ROADMAP.md](./ROADMAP.md) (three layers — do not implement unless asked)

Bootstrap template (archived, not canonical): [_archive_graveyard/ONI_MASTER_SYSTEM.md](./_archive_graveyard/ONI_MASTER_SYSTEM.md)
