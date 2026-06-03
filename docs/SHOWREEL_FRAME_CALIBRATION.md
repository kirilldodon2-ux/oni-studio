# Showreel Frame Calibration

**Status:** OPERATIONAL — geometry authority for ambient + desktop installation viewer  
**Asset:** `public/frames/showreel_frame.png`  
**Consumers:** `ShowreelMediaCard.tsx`, `ShowreelInstallationViewer.tsx`

Mobile cinema viewer (`ShowreelCinemaViewer.tsx`) does **not** use the frame — calibration applies to homepage ambient and desktop installation only.

---

## Frame asset

| Property | Production value |
|----------|------------------|
| Path | `public/frames/showreel_frame.png` |
| Dimensions | **1536 × 1024** |
| Format | **RGBA** PNG (transparent aperture) |
| Delivery | Git LFS — do not substitute JPEG-in-PNG or downscaled legacy assets |

Deprecated references elsewhere in the repo (1024×682, luma-matte composite) describe **retired** assets. This document is the calibration authority.

---

## Calibrated aperture

Percentages are relative to the frame bitmap width/height. Defined identically in both `ShowreelMediaCard.tsx` and `ShowreelInstallationViewer.tsx`.

```ts
const FRAME_LEFT   = "18.7%";
const FRAME_TOP    = "22.0%";
const FRAME_WIDTH  = "63.4%";
const FRAME_HEIGHT = "57.0%";
```

| Constant | Value |
|----------|-------|
| `FRAME_LEFT` | 18.7% |
| `FRAME_TOP` | 22.0% |
| `FRAME_WIDTH` | 63.4% |
| `FRAME_HEIGHT` | 57.0% |

### Card aspect

The artifact container uses:

```ts
style={{ aspectRatio: "1536 / 1024" }}
```

This locks the card geometry to the frame master — not `aspect-video` (16:9).

### Media-well vignette

Inside the aperture, video is masked with a radial vignette (soft edge blend into frame interior):

```ts
const MEDIA_VIGNETTE =
  "radial-gradient(ellipse 88% 86% at 50% 50%, black 55%, transparent 100%)";
```

Applied via `maskImage` / `WebkitMaskImage` on a wrapper around the `<video>`.

---

## Compositing

### Required approach

- **Native RGBA transparency** in `showreel_frame.png` — video sits in the measured aperture beneath the frame layer.
- **Silhouette shadows only** on the frame layer:

```ts
const FRAME_FILTER = [ONI_SILHOUETTE_CONTACT, ONI_SILHOUETTE_LIFT].join(" ");
```

Imported from `@/systems/spatial/silhouetteGrounding`.

### Do NOT reintroduce

| Forbidden | Reason |
|-----------|--------|
| Luma matte (`#oni-luma-matte` or equivalent) | Breaks true alpha opening on RGBA masters; caused detached-screen artifacts |
| SVG matte reconstruction | Parallel pipeline; duplicates ontology |
| Legacy frame filters / rebuilt mattes | Tied to obsolete 1024×682 black-field asset |
| CSS-only aperture hacks | `mediaAspect`-style fixes belong in metadata/constants, not compensating filters |

Stack order (ambient and installation):

1. Video in percentage-positioned aperture + vignette mask  
2. Frame PNG overlay (`pointer-events-none`, `z-[2]`, silhouette filter)

---

## Measurement methodology

Calibration was performed against the **1536×1024 RGBA** production frame, not against video content.

### 1. Alpha threshold analysis

- Sample frame alpha channel across the bitmap.
- Treat pixels with **alpha ≤ 32** as transparent (aperture / outside frame body).
- Treat higher alpha as opaque frame material.
- Threshold chosen to include anti-aliased edge pixels inside the metal rim without swallowing the opening.

### 2. Flood-fill center aperture

- Seed flood-fill from image center (or centroid of low-alpha region).
- Expand through connected transparent pixels (per threshold above).
- Produces a single contiguous **opening** mask — ignores isolated noise outside the figurative aperture.

### 3. Aperture bounding box

- Compute axis-aligned bounding box of the flood-filled opening in pixel space:
  - `left`, `top`, `width`, `height` in pixels.
- Convert to percentages of full frame:

```
FRAME_LEFT   = (left / 1536) × 100
FRAME_TOP    = (top / 1024) × 100
FRAME_WIDTH  = (width / 1536) × 100
FRAME_HEIGHT = (height / 1024) × 100
```

- Round to one decimal for CSS stability; verify visually on ambient + installation viewer.

### 4. Validation pass

- Overlay debug rectangle (temporary) or screenshot diff at 1× and responsive widths.
- Confirm video does not bleed under opaque frame metal.
- Confirm vignette does not clip title-safe content unexpectedly.
- Check installation viewer at `max-w-[min(92vw,1100px)]` — same ratios must hold.

---

## Future frame replacement workflow

If `showreel_frame.png` changes (new art, new dimensions, or new aperture shape):

1. **Replace asset** — commit new PNG to `public/frames/showreel_frame.png` (LFS). Do not alter `public/archive/`.
2. **Measure aperture** — repeat methodology above on the new master (update pixel dimensions if not 1536×1024).
3. **Update constants** — set `FRAME_*` in **both**:
   - `sections/ShowreelSection/ShowreelMediaCard.tsx`
   - `sections/ShowreelSection/ShowreelInstallationViewer.tsx`
4. **Update card aspect** — `aspectRatio: "[width] / [height]"` to match new bitmap.
5. **Validate desktop viewer** — installation open state: alignment, vignette, silhouette only.
6. **Validate mobile viewer** — unchanged visually (no frame); confirm no regression in open/close.
7. **Validate ambient** — homepage card hover, parallax, `useCinematicVideo` behavior unchanged.

Do not patch misalignment with extra CSS inset tweaks without remeasuring — fix constants at the source.

---

## Video vs frame

Showreel video aspect (e.g. 16:9) may differ from frame aperture aspect. Video uses `object-cover` inside the aperture; letterboxing or crop is intentional. Content edits (trim, re-export) are independent of frame calibration.

Media swap without frame change → `docs/SHOWREEL_SYSTEM.md` § Media pipeline only.

---

## Related docs

- `docs/SHOWREEL_SYSTEM.md` — viewers, R2 path, troubleshooting
- `ARCHITECTURE.md` — showreel section atmosphere, `oni-showreel` max-width token
- `docs/SHOWREEL_SYSTEM.md` — portal lifecycle, viewers, closed-state pointer-events (DEC-007)
- `docs/DECISIONS.md` — DEC-007 · DEC-008
