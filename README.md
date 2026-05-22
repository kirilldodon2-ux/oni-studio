# ONI Studio

Cinematic studio system — living archive, experimental publishing space, and editorial
environment.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Three.js / React Three Fiber
- Cloudflare Pages

## Philosophy

- cinematic calmness
- editorial rhythm
- restrained motion
- atmosphere over feature count
- systems over hacks

## Current Priority

Phase 4 — Cinematic Polish (in progress)  
Phase 5 — Navigation System (in progress)

## Local Development

```
npm install
npm run dev
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — layout system, section ownership, content architecture
- [CONTENT_PHILOSOPHY.md](./CONTENT_PHILOSOPHY.md) — content archetypes, archive model, editorial standards
- [CONTENT_SYSTEM.md](./CONTENT_SYSTEM.md) — filesystem-native archive authoring (object folders, registry, ingestion)
- [ARCHIVE_SYSTEM.md](./ARCHIVE_SYSTEM.md) — archive object model, territories, surface architecture
- [ARCHIVE_OPERATING_LOGIC.md](./ARCHIVE_OPERATING_LOGIC.md) — browse/inspect authority, masonry, runtime HOW
- [VISUAL_LANGUAGE.md](./VISUAL_LANGUAGE.md) — aesthetic direction, typography, motion
- [NAVIGATION_ARCHITECTURE.md](./NAVIGATION_ARCHITECTURE.md) — navigation system specification
- [FOLDER_MAP.md](./FOLDER_MAP.md) — repository structure (current vs Phase 6+ target)
- [AI_RULES.md](./AI_RULES.md) — AI assistant behaviour rules
- [ROADMAP.md](./ROADMAP.md) — phases, priorities, platform direction

Archive read order: [CONTENT_PHILOSOPHY.md](./CONTENT_PHILOSOPHY.md) → [ARCHIVE_SYSTEM.md](./ARCHIVE_SYSTEM.md) → [ARCHIVE_OPERATING_LOGIC.md](./ARCHIVE_OPERATING_LOGIC.md) (authoring: [CONTENT_SYSTEM.md](./CONTENT_SYSTEM.md)).

## Routes

| Route | Status | Notes |
|-------|--------|--------|
| `/` | Live | Home — section stack |
| `/archive` | Live | Browse field — `ArchiveGrid` |
| `/archive/[slug]` | Live | Inspect view — `ArchiveInspectView` |
| `/works`, `/writing`, `/code/[slug]` | Phase 6 | See [ROADMAP.md](./ROADMAP.md) |
