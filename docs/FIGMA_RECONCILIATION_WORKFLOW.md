# ONI — Figma Reconciliation Workflow

**Status:** OPERATIONAL  
**Scope:** Landing perception layer (`/`) — extensible to other surfaces after first capture cycle  
**Authority:** `ARCHITECTURE.md`, `VISUAL_LANGUAGE.md`, `AI_RULES.md`, `CONTENT_PHILOSOPHY.md`  
**Companion:** [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) — capture mechanics, metadata tables, implementation map

---

## 1. What this is

This document defines ONI’s **perception reconciliation workflow** — an operational layer that sits beside (not above) the codebase.

It is not a design-handoff guide. It is not Figma-first product development. It is internal doctrine for how ONI moves perception between **structural truth in code** and **perceptual experimentation in Figma**, with AI acting as a disciplined translator — never as a redesign engine.

The workflow exists because ONI is a cinematic editorial environment. Typography, atmosphere, spacing, and territory logic are co-authored in code. Perception still benefits from a laboratory where composition can be studied without mutating production architecture on impulse.

---

## 2. Philosophy

### 2.1 Three layers, one site

| Layer | Location | Responsibility |
|-------|----------|----------------|
| **Structural truth** | Codebase (`sections/`, `systems/`, `content/`) | Routes, section ownership, territory data, tokens, motion infrastructure, archive integration |
| **Perception laboratory** | Figma | Spacing tension, type rhythm at scale, atmospheric weight, compositional hypotheses |
| **Reconciliation** | AI-assisted human review | Diff perception against structure; propose minimal code deltas; reject Figma drift |

No layer replaces another. Figma does not become the source of routes, registries, or section boundaries. Code does not pretend that a static screenshot is the hero sculpture. AI does not “redesign the landing” from a mood board.

### 2.2 What ONI refuses

- **Parallel systems** — no duplicate export routes, shadow design files, or detached token registries
- **Detached design truth** — no Figma file that outranks `ARCHITECTURE.md` for layout ownership
- **Figma-first architecture** — components in Figma follow code boundaries, not the reverse
- **Redesign mentality** — reconciliation adjusts perception within existing geometry; it does not restart the site
- **Flattened restraint** — export and import must not collapse whitespace, mute atmosphere, or introduce startup/SaaS register

### 2.3 What ONI accepts

- Perception can be **wrong in code** while structure is **right** — spacing at a breakpoint, label tracking at scale, territory hierarchy legibility on mobile
- Figma is where those questions are asked **safely**
- Code remains canonical for **what exists**; Figma is canonical for **what it feels like** until reconciled back

---

## 3. Why export mode exists

Live ONI is temporal: scroll reveals, ambient drift, WebGL rotation, pointer parallax, infrastructure polling in `SystemArtifact`. Capture tools see a moment — often the wrong moment (opacity `0`, mid-animation, empty canvas).

**Export mode** (`/?export=1`) is a **perception freeze** on the canonical landing route:

- Same DOM, same routes, same section stack
- Content fully visible
- Motion neutralized, not removed from the codebase
- Atmosphere structurally preserved (backdrop, continuity, section marks remain in the tree)
- Geometry identical to production

It is implemented in `systems/export/` and documented tactically in [FIGMA_EXPORT.md](./FIGMA_EXPORT.md).

### Why `?export=1` on `/` — not a separate export route

| Requirement | How `?export=1` satisfies it |
|-------------|------------------------------|
| No parallel architecture | One page, one composition graph |
| Structural truth unchanged | `app/page.tsx` section imports identical |
| Perception freeze is optional | Production visitors never set the flag |
| Importers see real cascade | Tailwind, fonts, `SectionContainer` cadence are authentic |
| Reconciliation keys stable | `data-oni-*` attributes live on production nodes |

A dedicated `/export` route would fork layout, invite drift, and imply that Figma owns a different site. ONI rejects that.

---

## 4. Reconciliation principles

When bringing Figma perception back into code (or code changes into Figma):

1. **Structure wins** — section ids, `TERRITORIES` order on mobile, archive paths, `SectionContainer` padding cadence are not negotiable from Figma alone
2. **Minimal diff** — prefer surgical Tailwind/token edits over new wrappers or motion systems
3. **Search before creating** — extend `systems/` and existing primitives; no parallel hooks or registries
4. **Atmosphere is additive** — drift, breath, reveals stay in `systems/atmosphere/`; reconciliation does not delete them to match a static frame
5. **Metadata is the map** — `data-oni-section` and `data-oni-layer` anchor AI and human diffs; do not rename for importer convenience
6. **Document status** — operational changes update OPERATIONAL docs; do not implement `ROADMAP.md` items during reconciliation unless explicitly requested

### AI’s role

AI is a **reconciliation layer**, not a generative redesign tool.

**Appropriate:**

- Compare Figma frame to `data-oni-section="work"` articles and list spacing/tracking deltas
- Propose `clamp()` or `max-w-oni-*` adjustments with line-level rationale
- Map Figma text styles to existing `SectionLabel` / territory patterns
- Flag importer mistakes (flattened territories, missing decorative layer context)

**Inappropriate:**

- Invent new sections, routes, or hero layouts from Figma exploration
- Replace WebGL with a static image in production without explicit approval
- Introduce new color systems, fonts, or hover patterns outside `VISUAL_LANGUAGE.md`
- “Simplify” DOM by removing `PresenceLayer` or atmosphere wrappers (Tier C is gated — see [FIGMA_EXPORT.md](./FIGMA_EXPORT.md))

---

## 5. Metadata semantics

Reconciliation metadata is **structural annotation**, not styling.

### `data-oni-page`

- **Values:** `landing` (home root)
- **Use:** Identify which operational capture playbook applies

### `data-oni-section`

- **Values:** `hero` | `work` | `showreel` | `contact`
- **Use:** Section boundaries for frames, AI prompts, and diff scope
- **Note:** Contact uses poster `<h2>` — not `SectionLabel` — but remains `contact` for reconciliation

### `data-oni-layer`

| Value | Meaning | Import default |
|-------|---------|----------------|
| `content` | Primary editorial structure | **Keep** — build Figma structure here |
| `decorative` | Atmosphere: backdrop, continuity, marks, CTA ghost field | **Reference or hide** — do not drive layout |
| `chrome` | Fixed `ControlSurface` | **Separate** or exclude from scroll capture |

### `data-oni-presence`

- Marks `PresenceLayer` / `FadeIn` / `RevealUp` wrappers
- Export mode forces visibility; importers should not treat these as content blocks

### `data-oni-hero-fallback`

- Static sculpture reference when WebGL is frozen
- Perception reference only — production hero remains `Scene` (R3F)

### `data-oni-export`

- Mirror on page root when `?export=1` active
- Confirms capture context for automated tooling

---

## 6. Perception freeze behavior

See [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) for the full production vs export table.

**Summary:** freeze makes the environment **legible** without lying about its architecture.

**Intentionally not identical to production perception:**

| Element | Export behavior | Why |
|---------|---------------|-----|
| Hero sculpture | PNG reference (`HeroExportFallback`) | WebGL is not HTML; canvas capture is unreliable |
| Motion | CSS/JS neutralized | Tools need stable pixels, not 14s drift cycles |
| Contact CTA field | Dormant (opacity 0) | Matches production at rest — not hover-activated |
| Fixed nav | May pin in viewport captures | Chrome layer — reconcile separately |
| Showreel media well | May be empty | Editorial slot reserved — not a capture failure |
| Footer `#studio` / `#services` | Still non-resolving hashes | Content debt — not export scope |

**Intentionally preserved:**

- Section vertical rhythm and horizontal padding cadence
- Territory grid logic and article boundaries
- Backdrop and continuity DOM (decorative layer)
- Typography families and hierarchy register
- Archive link (`ViewWorkLink` → `/archive`)

---

## 7. Capture workflow

Tactical steps: [FIGMA_EXPORT.md](./FIGMA_EXPORT.md). Doctrine summary:

### 7.1 First captures (landing)

**Desktop (primary structure frame)**

1. `https://<host>/?export=1` at **1440px** width
2. Wait for fonts + hero reference image
3. Full-page capture after optional scroll (content already visible)

**Mobile (stacking truth frame)**

1. Same URL at **390px** width
2. Separate Figma frame — hero column order differs from desktop

Always capture **both**. ONI responsive behavior is not a scaled desktop frame.

### 7.2 Tool selection

#### `generate_figma_design` (Figma MCP)

**When:** First pixel-accurate import of a web view into Figma.

**How it fits ONI:**

- Run against `/?export=1` so content is visible and motion is still
- Treat output as **perception reference**, not structure authority
- Pair with `use_figma` (Plugin API) to rebuild or refine using `SectionLabel`, territory articles, and `max-w-oni-*` tokens — see Figma plugin skills (`figma-generate-design`, `figma-use`)

**Workflow pattern:**

```
generate_figma_design (screenshot fidelity)
        ↓
use_figma (design-system-aligned structure, incremental)
        ↓
Human + AI reconciliation against data-oni-section boundaries
```

Do not let screenshot pass override `TERRITORIES` desktop `lg:order-*` logic.

#### html.to.design

**When:** HTML-to-Figma layer tree import for structural inspection.

**Guidance:**

- Use `/?export=1` — avoids empty `PresenceLayer` nodes
- Filter by `data-oni-layer` after import:
  - Promote `content` to main structure
  - Move `decorative` to locked “Atmosphere — reference” group
  - Isolate `chrome` outside page scroll frame
- Expect deep nesting in `ShowreelMediaCard` — Tier C flattening is **not** approved until first export is evaluated
- Do not use html.to.design layer order for Work territories on desktop — use `article` + `TERRITORIES` ids in code

#### Browser screenshot

Valid for perception review. Insufficient alone for reconciliation — no `data-oni-*` tree. Combine with html.to.design or code inspection.

### 7.3 What to exclude from fidelity expectations

Do not reject a capture for:

- Hero not being live WebGL (by design in export mode)
- Subtle decorative lines at very low opacity
- Dormant CTA environmental typography
- Empty showreel media well
- Nav fixed to viewport in full-page tools

Do reject a capture for:

- Missing sections (export flag not set)
- Flattened work territories into one auto-layout blob
- Startup-style filled buttons or foreign fonts introduced by tooling
- Collapsed vertical whitespace to “fit” the artboard

---

## 8. Reconciliation after Figma polish

After perception experiments in Figma:

### 8.1 Inventory

1. List deltas per `data-oni-section`
2. Classify each delta:
   - **Perception** (spacing, size, tracking, opacity weight) → candidate for code
   - **Structure** (new section, moved archive, new route) → requires explicit product decision — not reconciliation
   - **Atmosphere** (new lines, marks, drift) → future atmosphere upgrade — section 9

### 8.2 Apply to code (minimal)

- Edit owning section file — not `app/page.tsx` composition unless layer cake changes
- Use named tokens (`max-w-oni-page`, `px-6 md:px-10 lg:px-14`) — no arbitrary pixel patches unless justified
- Preserve `PresenceLayer` — adjust timing only if motion philosophy still holds
- Run production URL without `?export=1` to verify live behavior

### 8.3 Sync Figma (optional)

- Update Figma laboratory frame to match reconciled code
- Do not treat Figma as automatically synced — code wins

### 8.4 Record

- Note capture date, viewport, tool used
- Link Figma frame URL in commit or task context when relevant
- Update [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) known limitations if new tooling quirks appear

---

## 9. Future-safe principles — iterative atmosphere upgrades

Atmosphere will evolve (Phase 4 polish, section-local migration from `PageBackdrop`, new marks). Reconciliation must remain safe across upgrades.

| Principle | Practice |
|-----------|----------|
| **Decorative never owns layout** | New atmosphere imports as `data-oni-layer="decorative"` |
| **Export freeze stays optional** | New motion adds `html.oni-export` neutralization in `globals.css` or component export guard |
| **No Figma-driven motion** | Parallax, reveals, drift stay in `systems/atmosphere/` — Figma suggests timing, code implements |
| **Section ownership** | Atmosphere migration targets sections named in `ARCHITECTURE.md` — not orphan global blobs |
| **Tier C is gated** | Wrapper flattening requires first real export evaluation — see [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) |
| **Archive stays separate** | Browse/inspect perception workflow extends later — do not mix archive grid rules into landing capture |

When adding atmosphere to a section:

1. Implement in section or `systems/atmosphere/`
2. Tag decorative roots with `data-oni-layer="decorative"`
3. Verify `/?export=1` still produces legible capture
4. Document new behavior in this file or [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) if capture-affecting

---

## 10. Implementation reference

| Concern | Location |
|---------|----------|
| Export flag | `systems/export/exportMode.ts` |
| Provider / hook | `systems/export/ExportModeProvider.tsx` |
| Page wiring | `app/page.tsx` (landing only — `ExportModeProvider`) |
| Hero gate | `sections/HeroSection/HeroVisual.tsx` (export → fallback; else `dynamic(Scene)`) |
| Hero environment | `sections/HeroSection/Scene.tsx` — `HeroRoomEnvironment` (local PMREM, no remote HDR) |
| Perception freeze CSS | `app/globals.css` (`html.oni-export`) |
| Capture playbook | [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) |
| Section shell + metadata | `systems/layout/SectionContainer.tsx` |
| Motion infrastructure | `systems/atmosphere/` — see §13 |

---

## 11. Document map

| Document | Role |
|----------|------|
| **This file** | Operational doctrine — philosophy, reconciliation, atmosphere §13, tool strategy |
| [FIGMA_EXPORT.md](./FIGMA_EXPORT.md) | Tactical capture — flag, freeze table, metadata, deployment checklist |
| `ARCHITECTURE.md` | Structural ownership — sections, z-index, tokens |
| `VISUAL_LANGUAGE.md` | Perceptual register — color, type, interaction |
| `AI_RULES.md` | Agent constraints during reconciliation |

---

## 12. Contributor doctrine

This section defines boundaries for humans and AI working on ONI after the landing export layer ships. The goal is **evolutionary polish** — not duplicated design/runtime systems.

### 12.1 Why semantic reconciliation matters

Pixel captures alone cannot sustain ONI. The site is structurally rich: territory grids with `lg:order-*`, section-owned layout, archive registry, motion infrastructure, and decorative layers that do not own geometry.

**Semantic markers** (`data-oni-section`, `data-oni-layer`, etc.) let `generate_figma_design`, html.to.design, and reconciliation agents:

- Map Figma frames to **code-owned boundaries** (not flattened auto-layout guesses)
- Separate **content** from **decorative** from **chrome** during import
- Diff perception deltas without mistaking motion wrappers for editorial structure
- Keep MCP workflows aligned with `ARCHITECTURE.md` instead of inventing parallel sitemaps

Semantic export is how ONI scales the code ↔ Figma ↔ code loop without forking the codebase.

### 12.2 Three layers (operating model)

| Layer | Role | Canonical for |
|-------|------|----------------|
| **Code** | Structural truth | Routes, sections, `TERRITORIES`, `content/field.ts`, archive paths, `SectionContainer` cadence, motion systems, tokens in `tailwind.config.ts` |
| **Figma** | Perception laboratory | Spacing tension, type rhythm at scale, compositional hypotheses, atmospheric weight studies |
| **AI** | Reconciliation layer | Translating perception diffs into minimal code edits; rejecting Figma drift |

Code answers **what exists and how it is built**. Figma answers **how it feels at a given viewport**. AI connects the two — it does not replace either.

### 12.3 Canonical runtime truth (MUST stay in code)

These are **not** negotiable from a Figma file or export capture alone:

| Domain | Canonical source |
|--------|-------------------|
| Routes & page composition | `app/page.tsx`, `app/archive/**` |
| Section ownership & ids | `sections/*`, `id="work"` / `showreel` / `contact` |
| Territory data & order | `TERRITORIES` in `WorkSection` (mobile DOM order; desktop `lg:order-*`) |
| Archive registry & media | `content/field.ts`, `public/archive/objects/[slug]/` |
| Layout shell | `SectionContainer`, `max-w-oni-*`, horizontal padding cadence |
| Hero WebGL (production) | `HeroVisual` → `Scene` + `HeroRoomEnvironment` |
| Navigation model | `components/navigation/` (fixed control surface) |
| Motion infrastructure | `systems/atmosphere/` (reveals, drift, depth field) |
| Visual register | `VISUAL_LANGUAGE.md`, `globals.css` selection tokens |

Figma may inspire changes to these, but **merge requests change code** — not the other way around.

### 12.4 What export mode is allowed to modify

Export mode (`/?export=1`) is a **perception freeze**, not a alternate renderer.

**Allowed (freeze only — reversible when flag is off):**

| Behavior | Mechanism |
|----------|-----------|
| Hero column | `HeroExportFallback` instead of mounting `Scene` |
| Scroll reveals | `PresenceLayer` present immediately; CSS + hook bypass |
| CSS keyframe motion | `html.oni-export` disables drift, breath, float, signal traverse |
| Scroll parallax | `useDepthField` no-op |
| Hero atmosphere onset | `HeroAtmosphere` immediate visible |
| Showreel pointer parallax | `ShowreelMediaCard` rAF skipped |
| SystemArtifact cycling | Intervals not started |
| CTA field transitions | `.oni-cta-field` transition suppressed |

**Not allowed (would make export a parallel system):**

- Different routes, layouts, or section stacks
- Different `TERRITORIES` data or archive links
- Removing decorative DOM (backdrop, continuity, section marks)
- Replacing production WebGL in code (only skip **mount** during capture)
- Global behavior changes on `/archive` or inspect pages
- New design tokens, fonts, or components used only in export

### 12.5 What future contributors should avoid

- **Parallel export routes** (`/export`, duplicate `page.tsx`, shadow registries)
- **Figma-first architecture** (routes/sections born in Figma files)
- **Detached design truth** (Figma component names that do not map to `sections/` or `systems/`)
- **Export-only components** that diverge from production DOM
- **Removing `data-oni-*`** to appease importers — fix the importer workflow instead
- **Broad `html.oni-export` rules** that target selectors unrelated to landing motion (e.g. archive inspect, global typography)
- **Reintroducing remote HDR** (`Environment preset="studio"`) — use local PMREM or self-hosted assets
- **Hero pipeline forks** (async server gates, nested Suspense trees, extra dynamic layers)
- **Tier C wrapper flattening** before evaluating the first real Figma capture

### 12.6 What counts as “too invasive”

Treat these as red flags in review:

| Signal | Why it violates proportionality |
|--------|--------------------------------|
| New `systems/*` hook used only for export | Parallel infrastructure |
| Export logic in `app/layout.tsx` or archive pages | Leak outside landing |
| `useExportMode()` in shared components used on archive | Couples archive to landing freeze |
| Separate typography/spacing tokens “for Figma” | Detached design truth |
| Replacing `Scene` with static image in production | Collapses structural hero |
| Removing `PresenceLayer` / atmosphere to simplify capture | Flattens ONI restraint |
| `html.oni-export` rules without `html` class guard | Global freeze leak |
| More than one hero load path (gate → column → dynamic → suspense) | Runtime instability |
| Implementing `ROADMAP.md` items during a reconciliation pass | Scope creep |

**Proportional surface area today:** `systems/export/` (3 files), `HeroVisual.tsx`, metadata attributes, targeted `useExportMode()` on landing-only motion surfaces, and scoped CSS under `html.oni-export`. That is the intended scale.

### 12.7 MCP / import tool expectations

| Tool | ONI usage |
|------|-----------|
| **`generate_figma_design`** | Run on `/?export=1`. Screenshot fidelity pass; pair with `use_figma` for structure aligned to `SectionLabel` / territory articles. |
| **html.to.design** | Same URL. Filter by `data-oni-layer` after import; never trust layer order for Work desktop grid. |
| **`get_design_context`** | Design-to-code on isolated nodes — not a substitute for landing reconciliation markers. |

Section hierarchy for importers:

```
data-oni-page="landing"
├── data-oni-layer="decorative" (backdrop, continuity)
├── data-oni-layer="chrome" (ControlSurface)
├── data-oni-section="hero" → HeroVisual → fallback | Scene
├── data-oni-section="work" → articles × 6
├── data-oni-section="showreel"
└── data-oni-section="contact"
```

---

## 13. Atmospheric runtime — architecture & invariants

The atmosphere system is **alive but restrained**. It is not a separate export subsystem. Export only **freezes** motion when `html.oni-export` is present on landing.

### 13.1 Layer taxonomy

| Layer type | Examples | Motion source | Export freeze |
|------------|----------|---------------|---------------|
| **Decorative runtime** | `PageBackdrop`, `ContinuityField`, section `AmbientField` marks, `HeroAtmosphere` rings | CSS keyframes (`oni-ambient-drift`, `oni-breath`) + optional `useDepthField` (hero only) | `animation: none` under `html.oni-export [data-oni-page="landing"]` |
| **Content emergence** | `PresenceLayer` / `FadeIn` / `RevealUp` | IntersectionObserver + opacity/translateY transition | `[data-oni-presence]` forced visible; transform cleared |
| **Semantic extraction** | `data-oni-section`, `data-oni-layer`, `data-oni-page` | None (metadata only) | Never frozen — structure preserved |
| **Export-safe frozen** | Same DOM as production; motion neutralized | CSS + targeted JS guards | Only when `?export=1` |

Archive routes: decorative layers may exist (`PageBackdrop` on browse) but **never** receive `html.oni-export` or `ExportModeProvider`.

### 13.2 Motion stack (canonical)

| System | File | Mechanism | Tuning (do not exceed without review) |
|--------|------|-----------|--------------------------------------|
| **Drift** | `globals.css` → `.oni-ambient-drift` | `translateY(0 → -4px → 0)` over `--atm-drift` (14s) | Amplitude 4px; period 14s |
| **Breath** | `globals.css` → `.oni-breath` | `opacity 1 → 0.78 → 1` over `--atm-breath` (18s) | Peak dip 0.78 |
| **Combined** | `.oni-ambient-drift.oni-breath` | Both animations on one node | Mid hero ring, continuity micro-dot |
| **Parallax** | `useDepthField.ts` | `translateY(scrollY × factor)` via rAF, lerp `0.06` | Factors 0.012–0.04; hero only consumer |
| **Presence** | `PresenceLayer.tsx` | Opacity + optional `translateY(10px)` on reveal | 1200–1400ms; not decorative atmosphere |
| **Hero onset** | `HeroAtmosphere.tsx` | Container opacity 0→1 over 2000ms after 500ms delay | Desktop-only (`lg:block`) |

**Not used for atmosphere:** `translate3d`, `oni-field-pulse` (defined but no current landing consumer). Parallax uses **`translateY` only** on the depth-anchor node.

### 13.3 Transform ownership rules (critical)

**One node must not own both:**

1. React inline centering (`translate(-50%, -50%)` or Tailwind `-translate-x/y-1/2`)
2. `useDepthField` scroll writes (`el.style.transform = translateY(...)`)
3. CSS drift keyframe (`transform` on same element)

**Canonical hero depth-plane stack:**

```
div.absolute [ref=useDepthField]     ← parallax anchor ONLY (left/top, translateY from scroll)
  div.-translate-x-1/2 -translate-y-1/2   ← centering ONLY
    AmbientField.oni-ambient-drift|.oni-breath   ← CSS motion ONLY
      SVG / mark
```

**ContinuityField / WorkSection / Showreel marks:** `AmbientField` only — no `useDepthField`. Safe by default.

**Never attach `useDepthField` ref to a node that also carries centering transform or `oni-ambient-drift`.**

### 13.4 Export / runtime separation guarantees

| Guarantee | How enforced |
|-----------|----------------|
| Export does not change production CSS tokens | `--atm-*` unchanged; freeze uses `animation: none` only under `html.oni-export` |
| Export does not run on `/` without flag | `isExportMode(searchParams)` false → no `oni-export` class; provider sets `initialExportMode` from server |
| Export cannot leak to archive | No provider on archive pages; freeze selectors require `[data-oni-page="landing"]` |
| `useExportMode()` default is `false` | Context default; only landing wraps provider |
| Parallax off in export | `useDepthField` early return when `exportMode` |
| Production WebGL unchanged | `HeroVisual` branch; export skips `Scene` mount only |

**What must NEVER be added to export freeze:**

- Global `*` or `body` animation kills
- `.oni-ambient-drift` / `.oni-breath` **`transform: none`** on production (freeze uses `animation: none` only — do not block drift transform on live `/`)
- `PageBackdrop` SVG removal or opacity overrides
- Archive inspect / masonry / video playback rules
- Reduced `--atm-drift` / `--atm-breath` values “for cleaner capture” in shared `:root`

**What must NEVER overwrite transform stacks:**

- `useDepthField` on centered nodes (use anchor + inner wrapper pattern)
- Export CSS `transform: none` on `.oni-ambient-drift` (would kill drift while leaving breath)
- Inline `transform` on the same element as `AmbientField` drift

### 13.5 Fragile areas (known)

| Area | Risk | Mitigation |
|------|------|------------|
| Hero depth planes | `useDepthField` vs centering vs drift | Three-layer stack (§13.3) |
| `useDepthField` lerp `0.06` | Heavy damping — scroll parallax feels late/subtle | Tune factor before lerp; do not exceed 0.12 factor without review |
| Outer hero ring | `breathe` only (no drift) — weakest orbital motion | By design; mid ring has drift+breathe+inverted parallax |
| `PresenceLayer` `data-oni-presence` | Export `transform: none` — correct scope | Do not add class to decorative wrappers |
| Client import of `AmbientField` in `HeroAtmosphere` | Bundles server component into client tree | Acceptable; CSS classes must remain in bundle |
| Stale production deploy | Pushed build may lack latest atmosphere fix | See §13.6 |

### 13.6 Localhost vs production parity

The atmosphere system is **not fundamentally broken** if localhost shows drift/breath but production feels flatter.

**Typical causes (check in order):**

1. **Deploy drift** — local commits not pushed/deployed (e.g. hero transform ownership fix in `HeroAtmosphere.tsx` + `useDepthField` comment). Compare `git log origin/main -1` with local `HEAD` and uncommitted diff.
2. **Stale edge cache** — redeploy or purge CDN after atmosphere fix; hard-refresh production (`Cmd+Shift+R`).
3. **Viewport** — `HeroAtmosphere` is `hidden lg:block`; mobile has no hero rings. Compare same breakpoint (≥1024px).
4. **`prefers-reduced-motion`** — production OS/browser setting disables all `.oni-ambient-drift` / `.oni-breath` via `globals.css`.
5. **Misattributed flattening** — `ContinuityField` threads are opacity-only (~5% peak); hero rings carry orbital tension. Weak hero parallax reads as “dead atmosphere.”
6. **Not export leak** — verify production `/` has no `html.oni-export` in DevTools → `<html class>`.

**Export stabilization did not globally reduce amplitude** on production `/`: freeze rules apply only when `html.oni-export` is set. The perceptual regression on a pushed build without the transform fix is a **hero parallax/centering collision**, not export CSS mutating live runtime.

### 13.7 Motion tuning constraints (evolutionary polish only)

Allowed without architecture change:

- Adjust `--atm-drift` / `--atm-breath` in `globals.css` (slow direction only — never &lt;8s period)
- Adjust `useDepthField` factors per plane (hero only)
- Adjust negative `animationDelay` on `AmbientField` (phase offsets only)

Requires review (not reconciliation-pass drive-by):

- Lerp rate in `useDepthField` (affects orbital “tension” on scroll)
- Adding `drift` to outer hero ring (changes hero vocabulary)
- `translate3d` migration (compositing change, not required)
- Any export freeze expansion beyond §12.4

Visual target: **stable but alive** — motion below conscious threshold but present on sustained viewing.

---

## 14. Evolution

This workflow is **evolving**. First landing capture cycle may surface Tier C needs (wrapper hygiene), archive export extension, or typography token extraction. Each extension must:

- Preserve canonical `/` architecture
- Avoid parallel export systems
- Keep Figma as laboratory, code as structure

Until the first real Figma export is evaluated, Tier C remains out of scope.
