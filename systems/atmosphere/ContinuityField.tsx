import { AmbientField } from "./AmbientField";

/**
 * ContinuityField
 *
 * Page-level spatial continuity layer.
 *
 * Renders near-invisible horizon threads and accent marks in the three
 * section transition zones — the depths where one section ends and the next
 * begins. These elements are felt more than seen: they create the subconscious
 * sense of one continuous spatial field rather than discrete stacked sections.
 *
 * Architecture:
 *   z-[5] — between ambient backdrop (z-0) and section content (z-10)
 *   pointer-events-none, aria-hidden — decorative, no interaction
 *   Server component — zero JS; all motion is pure CSS keyframes.
 *
 * Three zones keyed to approximate section transition depths:
 *   Zone A — Hero → Work      (top: 100svh)
 *   Zone B — Work → Showreel  (top: 175svh)
 *   Zone C — Showreel → Contact (top: 252svh)
 *
 * Horizon threads — gradient dividers (~1px) that read as spatial page creases
 * in an editorial object. Peak opacity ~0.05 — virtually invisible.
 *
 * Accent marks — tiny squares and dots in the ONI geometric vocabulary,
 * echoing the backdrop's marker language. All phase offsets are negative
 * (pre-started) so they're never in sync with HeroAtmosphere.
 *
 * Thread opacity uses only `breathe` (opacity oscillation); `drift` (translateY)
 * is reserved for the accent marks so threads don't visibly shift vertically.
 */
export function ContinuityField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 select-none"
      aria-hidden="true"
    >
      {/* ── Zone A: Hero → Work ──────────────────────────────────────── */}

      {/* Horizon thread — left-biased, faintest mark, page crease language */}
      <div
        className="absolute left-[6%] right-[8%]"
        style={{ top: "calc(100svh - 1px)" }}
      >
        <AmbientField breathe delay={-6800}>
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.052) 24%, rgba(0,0,0,0.044) 74%, transparent 100%)",
            }}
          />
        </AmbientField>
      </div>

      {/* Accent mark — small orange square, backdrop vocabulary */}
      <div
        className="absolute"
        style={{ top: "calc(100svh - 1.5rem)", left: "72.5%" }}
      >
        <AmbientField breathe delay={-8200}>
          <div
            style={{ width: 4, height: 4, background: "#FF4A1A", opacity: 0.26 }}
          />
        </AmbientField>
      </div>

      {/* Micro dot — environmental residue below the thread */}
      <div
        className="absolute"
        style={{ top: "calc(100svh + 0.875rem)", left: "34%" }}
      >
        <AmbientField drift breathe delay={-4400}>
          <div
            style={{
              width: 2.5,
              height: 2.5,
              borderRadius: "50%",
              background: "#000",
              opacity: 0.17,
            }}
          />
        </AmbientField>
      </div>

      {/* ── Zone B: Work → Showreel ──────────────────────────────────── */}

      {/* Horizon thread — offset right start, different proportions from A */}
      <div
        className="absolute left-[12%] right-[5%]"
        style={{ top: "calc(175svh)" }}
      >
        <AmbientField breathe delay={-3100}>
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.044) 34%, rgba(0,0,0,0.036) 78%, transparent 100%)",
            }}
          />
        </AmbientField>
      </div>

      {/* Accent mark — slightly larger, left-side placement */}
      <div
        className="absolute"
        style={{ top: "calc(175svh - 1.25rem)", left: "24.5%" }}
      >
        <AmbientField breathe delay={-10800}>
          <div
            style={{ width: 5, height: 5, background: "#FF4A1A", opacity: 0.19 }}
          />
        </AmbientField>
      </div>

      {/* ── Zone C: Showreel → Contact ───────────────────────────────── */}

      {/* Horizon thread — most faded, right-biased span */}
      <div
        className="absolute left-[8%] right-[14%]"
        style={{ top: "calc(252svh)" }}
      >
        <AmbientField breathe delay={-14200}>
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.038) 40%, rgba(0,0,0,0.030) 72%, transparent 100%)",
            }}
          />
        </AmbientField>
      </div>

      {/* Accent mark — black dot, most minimal presence */}
      <div
        className="absolute"
        style={{ top: "calc(252svh + 0.875rem)", left: "81.5%" }}
      >
        <AmbientField breathe delay={-7700}>
          <div
            style={{
              width: 4,
              height: 4,
              background: "#000",
              opacity: 0.13,
              borderRadius: 1,
            }}
          />
        </AmbientField>
      </div>
    </div>
  );
}
