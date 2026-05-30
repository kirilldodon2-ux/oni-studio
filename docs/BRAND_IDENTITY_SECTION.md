# Brand Identity Section

**Status:** OPERATIONAL — homepage `/` section  
**System:** `sections/BrandIdentitySection/`  
**Route anchor:** `#identity`

---

## Role

Homepage threshold between **Archive Fragment** and **Showreel**. Increases studio credibility and routes visitors to `/brandbook` — not a mini-brandbook, documentation block, or system preview.

The section is a **compressed poster fragment**: oversized **ОНИ** (Bebas, bottom-left crop) plus an unexplained **black mass** (upper-right counterweight). No supporting copy on the poster surface.

---

## Homepage composition

```
Hero → Work → Archive Fragment → Brand Identity → Showreel → Contact Footer
```

`ContinuityField` zones:

| Zone | Transition | Depth (approx.) |
|------|------------|-----------------|
| C | Archive → Brand Identity | `228svh` |
| C′ | Brand Identity → Showreel | `252svh` |
| D | Showreel → Contact | `305svh` |

---

## Visual language

### What the section is

- A **cropped poster** — one word, one mass, no explanation  
- A **studio identity signal** — memorable mark before Showreel climax  
- A **continuation threshold** — footer language mirrors Archive Fragment (`identity field · continuation in brandbook`)  

### What the section is not

- Manifesto copy, bilingual stack, or THEY reveal  
- Logo showcase, color chips, font specimens, or wire collage  
- Educational brand-system preview or capability proof  

---

## Interaction

| Surface | Behavior |
|---------|----------|
| Poster (`IdentityManifesto`) | Entire field wrapped in `<Link href="/brandbook">` |
| Footer right | `→ Open brandbook` — sibling link, same destination |
| Scroll enter | Single GSAP `fromTo` black-block reveal on ОНИ (~0.52s); `prefers-reduced-motion` skips animation |
| Cursor (desktop) | Subtle parallax on ОНИ (translate, letter-spacing drift, scaleX); counter-drift on black mass |
| Export mode | Reveal completes immediately via `useExportMode()` |

Dependency: `gsap` (poster reveal only — not a multi-step timeline).

---

## Files

| File | Role |
|------|------|
| `index.tsx` | Section chrome — `SectionContainer`, `SectionLabel`, poster link, footer threshold |
| `IdentityManifesto.tsx` | Client poster — ОНИ + black mass, reveal, parallax |
| `manifestoLines.ts` | Layout and motion constants (`MANIFESTO_PRIMARY`, `MANIFESTO_BLACK_MASS`, parallax tokens) |

---

## Relationship to brandbook

| Homepage section | `/brandbook` route |
|------------------|-------------------|
| Poster fragment — one word, unexplained mass | Full scroll-snap identity experience (six sections) |
| Threshold CTA only | Canonical identity surface |
| No wire art, no section rail | `BrandbookExperience` + `BrandbookSectionNav` |

See `docs/BRANDBOOK_INTEGRATION.md` for route architecture. Homepage entry is **shipped** via this section (Phase 2 “homepage entry” task complete).

---

## Canonical boundaries

- **In scope:** `sections/BrandIdentitySection/`, homepage composition order, `ContinuityField` zones C / C′  
- **Out of scope:** `systems/brandbook/` internals, archive registry, navigation overlay IA, brandbook hero experiments  

Deprecated brandbook hero experiments (`BrandbookHeroMobileNucleus`, `BrandbookHeroGhostCore`) live under `_archive_graveyard/` — not runtime.
