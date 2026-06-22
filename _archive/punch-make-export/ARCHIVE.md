# Archive — PUNCH 2026 Figma Make Export

**Status:** REFERENCE ONLY — not runtime  
**Production:** `systems/cases/components/CasesPunch.tsx` + `public/cases/punch/`  
**Archived:** 2026-06-22

## What this is

Original Figma Make export for the PUNCH (ПУНШ) event branding case study.
A Vite SPA with a single long-scroll component (`src/imports/CrazyEvent/index.tsx`).

## Why archived

Figma Make exports use:
- Fixed 1920×1080 absolute positioning — not responsive
- Vite import syntax — not compatible with Next.js App Router
- shadcn/Radix UI toolchain — not in ONI stack
- `font-['Bounded:Regular']` — not available in project; falls back to sans-serif

Production port is a selective adaptation that fits ONI's cases infrastructure.

## Source structure

```
src/
  imports/
    CrazyEvent/
      index.tsx            ← main component (15+ sections)
      svg-xinqis31yf.ts    ← PUNCH logo SVG paths
      svg-hma1o.tsx        ← mask SVG
      *.png                ← 44 image assets (hash-named)
  app/
    components/ui/         ← 48 shadcn files — zero imports from active app
```

## Assets

All 44 PNG files are copied to `public/cases/punch/` in the production build.
Filenames preserved verbatim (SHA-like hashes).

## Do not

- Import from this directory in Next.js code
- Treat as production-ready design — it's a reference
- Implement the 1920px-fixed absolute layout directly
