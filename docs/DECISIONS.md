# ONI — Architecture Decisions

Operational decision log. Read before changing navigation, content lanes, or control-surface behavior.

**Status:** ACTIVE  
**Format:** newest decisions first

---

## DEC-004 — ControlSurface: no scroll-state (2026-05-29)

**Supersedes:** DEC-003

**Context:** DEC-003 reduced scroll feedback to hairline border only after `scrollY > 100`. Evaluation (2026-05-29): border-only provides negligible orientation value — closed surface exposes no route/section position; user already knows they scrolled; full-width edge still reads as a frame, contradicting `NAVIGATION_ARCHITECTURE.md` §2 (“no border, not a bar”) and Environmental Control Layer intent.

**Decision:** **Remove scroll-state entirely.** Closed ControlSurface is **identical at all scroll positions** — transparent, no border, no background, no backdrop blur, no scroll listener.

**Rejected:** Keeping border-only as permanent scroll feedback — residual generic nav pattern, not ONI orientation infrastructure.

**Implementation:** Remove `useControlSurfaceScroll` and all scroll-conditional header classes from `components/navigation/index.tsx`. Delete `useControlSurfaceScroll.ts`.

**Reintroduction gate:** Only if a future need is explicit and ONI-specific (e.g. scroll-indexed telemetry, evidenced trigger illegibility on a specific route) — not generic “user scrolled” chrome.

**See also:** `NAVIGATION_ARCHITECTURE.md` §2 Visual Character · `ARCHITECTURE.md` Environmental Control Layer

---

## DEC-003 — ControlSurface scroll feedback: border only (2026-05-29) — SUPERSEDED

**Status:** Superseded by DEC-004. Retained for history.

**Context:** Phase 5 scroll state used `bg-white/[0.03]` + `backdrop-blur-[2px]` on the full-width fixed `<header>` after `scrollY > 100`. This read as a conventional sticky glass navbar — contradicting Environmental Control Layer doctrine (no persistent panel, blur, or full-width material on the closed control surface).

**Decision:** Scroll feedback is **hairline border only** — `border-b border-black/[0.06]` after threshold. No background fill. No `backdrop-filter` on the closed control surface at any scroll position.

**Rejected:** Full-width glass strip (background + blur). Reads as SaaS navbar; severs atmospheric continuity.

**Implementation:** `components/navigation/index.tsx` — `useControlSurfaceScroll` unchanged (100px threshold, 500ms border transition).

**See also:** `NAVIGATION_ARCHITECTURE.md` §6 Scroll State Transition · `ARCHITECTURE.md` Navigation System → Environmental Control Layer

---

## DEC-002 — Overlay primary routes: WORK + ARCHIVE (2026-05-29)

**Context:** Layer 1 introduced `/works` and `/archive` as permanent content routes. The overlay was home-centric: WORK → `#work` (homepage territory section); ARCHIVE had no link (only decorative `ARCHIVE OPEN` annotation and Hero `View Archive` CTA).

**Decision:**

| Label | href | Rationale |
|-------|------|-----------|
| WORK | `/works` | Studio output index — primary archetype lane, not homepage `#work` scroll target |
| ARCHIVE | `/archive` | Cross-archetype browse field — first-class route alongside Works |

Overlay order: **HOME · WORK · ARCHIVE · STUDIO · CONTACT**

- WORK keeps dominant typography tier and `md:-ml-3` offset (index 1).
- ARCHIVE reuses STUDIO’s existing mid-weight tier — no new visual language.
- STUDIO / CONTACT remain `#showreel` / `#contact` (home section anchors) until a separate cross-route pass.

**Rejected:** Leaving WORK on `#work` after `/works` exists — breaks multi-route site model. Omitting ARCHIVE from overlay — archive is a primary surface, not discoverable only via Hero CTA.

**Implementation:** `components/navigation/NavOverlay.tsx` — `NAV_ITEMS` only.

**See also:** `ROADMAP.md` Layer 1 URL targets · `NAVIGATION_ARCHITECTURE.md` §7 NavOverlay

---

## DEC-001 — Works Lean Path vertical slice (2026-05-29)

**Context:** Layer 1 Batch 2 goal — prove multi-archetype scalability beyond archive without Layer 1 maturity work (MDX, Zod, `shared/content/`) blocking delivery.

**Decision:** Ship a **parallel Works lane** with minimum surface area:

| Layer | Location |
|-------|----------|
| Registry | `content/works/field.ts` + `types.ts` |
| Territory | `public/works/[slug]/` (`00-cover.*`) |
| Routes | `/works`, `/works/[slug]` — static SSG |
| Render | `systems/works/` — typographic index + document shell |

**Explicitly deferred:** MDX narrative, Zod validation, `shared/content/`, evidence sequences, R2 upload for works assets, archive cross-links.

**Proof criteria met when:** second registry + territory + render system coexist with archive; index is not masonry; detail is not inspect; archive untouched.

**Rejected:** Full Architecture Path (MDX + Zod + `getWorkAssets` + production pipeline) as Batch 2 gate — conflates “prove lane scales” with “Works production system complete.” Filtering `archiveObjects` by `archetype: "Work"` for `/works` — breaks parallel registry doctrine.

**See also:** `content/works/field.ts` · `FOLDER_MAP.md` · `ROADMAP.md` Delivered early

---

## Document relations

| Document | Role |
|----------|------|
| `ROADMAP.md` | Delivery status — sync when decisions ship |
| `NAVIGATION_ARCHITECTURE.md` | Navigation runtime spec |
| `ARCHITECTURE.md` | Infrastructure truth |
| `AI_RULES.md` | Agent constraints — points here for nav/content lane decisions |
