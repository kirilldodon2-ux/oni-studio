/**
 * Global ambient geometric layer.
 *
 * Covers the full page as a single continuous artboard.
 * Decorative only — no layout influence, no pointer events.
 *
 * Architectural boundaries:
 *
 *   Global ambient   — page-spanning elements that belong here permanently:
 *                      gradient defs, the vertical spine, and the floating
 *                      annotation overlay.
 *
 *   Section-local    — elements visually proximate to a specific section.
 *                      These are candidates for migration into that section's
 *                      own atmosphere system during Phase 4 cinematic polish.
 *                      Until then they remain here so visual output is unchanged.
 *
 * Section-local migration targets (Phase 4):
 *   HeroSection atmosphere        — upper geometric cluster + concentric rings
 *   WorkSection atmosphere        — mid-page lines + circle
 *   ShowreelSection atmosphere    — lower diagonal lines + circle
 *   ContactFooterSection atmosphere — deep-page lines + micro marks
 */
export function PageBackdrop() {
  return (
    <div className="h-full w-full overflow-hidden" aria-hidden>
      <svg
        className="h-full w-full min-h-[100%]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 4200"
      >
        {/* ── Global ambient: gradient definitions ─────────────────────── */}
        <defs>
          <linearGradient id="page-line-fade-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0" />
            <stop offset="38%" stopColor="#d4d4d4" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#d4d4d4" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="page-line-fade-d" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0" />
            <stop offset="48%" stopColor="#d4d4d4" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#d4d4d4" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* ── Global ambient: vertical spine ───────────────────────────── */}
        {/* Page-spanning structural thread — intentionally permanent here */}
        <line x1="480" y1="200" x2="380" y2="4200" stroke="#e2e2e2" strokeWidth="1" opacity="0.72" />

        {/* ── Spine continuity nodes — tick marks at section transition depths */}
        {/* Perpendicular marks at the three spatial transition zones.
            x positions interpolated along the spine's diagonal path:
              y=1450 → x≈449  |  y=2350 → x≈426  |  y=3280 → x≈403     */}
        <line x1="439" y1="1450" x2="459" y2="1450" stroke="#d4d4d4" strokeWidth="0.65" opacity="0.50" />
        <line x1="416" y1="2350" x2="436" y2="2350" stroke="#d4d4d4" strokeWidth="0.65" opacity="0.47" />
        <line x1="393" y1="3280" x2="413" y2="3280" stroke="#d4d4d4" strokeWidth="0.65" opacity="0.43" />

        {/* ── Transition zone A: Hero → Work (y≈1450) ──────────────────── */}
        {/* Faint horizon thread right of spine — spatial page crease       */}
        <line x1="560" y1="1450" x2="1340" y2="1450" stroke="#e8e8e8" strokeWidth="0.7" opacity="0.52" />
        <rect x="1348" y="1447" width="5" height="5" fill="#FF4A1A" opacity="0.22" />

        {/* ── Transition zone B: Work → Showreel (y≈2350) ──────────────── */}
        <line x1="100" y1="2350" x2="860" y2="2350" stroke="url(#page-line-fade-h)" strokeWidth="0.7" opacity="0.46" />
        <rect x="64" y="2347" width="4" height="4" fill="#FF4A1A" opacity="0.18" />

        {/* ── Transition zone C: Showreel → Contact (y≈3280) ───────────── */}
        <line x1="500" y1="3280" x2="1360" y2="3280" stroke="#e8e8e8" strokeWidth="0.6" opacity="0.44" />
        <circle cx="472" cy="3282" r="1.5" fill="#000" opacity="0.15" />

        {/* ── Future HeroSection atmosphere ────────────────────────────── */}
        <line x1="0" y1="180" x2="520" y2="60" stroke="url(#page-line-fade-h)" strokeWidth="1" />
        <line x1="1020" y1="0" x2="1220" y2="260" stroke="#e5e5e5" strokeWidth="1" />
        <line x1="180" y1="920" x2="620" y2="760" stroke="#e8e8e8" strokeWidth="1" />
        <line x1="1100" y1="820" x2="1440" y2="640" stroke="#e5e5e5" strokeWidth="1" />
        <line x1="280" y1="1280" x2="400" y2="1040" stroke="#000" strokeWidth="1" opacity="0.22" />
        <circle cx="1120" cy="520" r="200" fill="none" stroke="#ececec" strokeWidth="1" />
        <circle cx="1120" cy="520" r="248" fill="none" stroke="#f2f2f2" strokeWidth="1" />
        <rect x="108" y="120" width="7" height="7" fill="#FF4A1A" />
        <rect x="1240" y="200" width="6" height="6" fill="#FF4A1A" />
        <rect x="1320" y="560" width="8" height="8" fill="#FF4A1A" />
        <rect x="640" y="360" width="4" height="4" fill="#000" opacity="0.55" />
        <rect x="780" y="720" width="4" height="4" fill="#000" opacity="0.45" />
        <circle cx="200" cy="1400" r="1.5" fill="#000" opacity="0.22" />
        <path d="M820 400 l6 0 M823 394 l0 12" stroke="#000" strokeWidth="0.75" opacity="0.28" />

        {/* ── Future WorkSection atmosphere ────────────────────────────── */}
        <line x1="80" y1="1600" x2="420" y2="1780" stroke="#e5e5e5" strokeWidth="1" />
        <line x1="1320" y1="1500" x2="1040" y2="1820" stroke="#e8e8e8" strokeWidth="1" />
        <line x1="0" y1="2100" x2="380" y2="2280" stroke="url(#page-line-fade-d)" strokeWidth="1" />
        <line x1="1440" y1="2380" x2="960" y2="2220" stroke="#e5e5e5" strokeWidth="1" />
        <circle cx="520" cy="2000" r="160" fill="none" stroke="#efefef" strokeWidth="1" />
        <rect x="920" y="1680" width="6" height="6" fill="#FF4A1A" />
        <rect x="240" y="1920" width="5" height="5" fill="#FF4A1A" />
        <rect x="1280" y="2240" width="7" height="7" fill="#FF4A1A" />

        {/* ── Future ShowreelSection atmosphere ────────────────────────── */}
        <line x1="900" y1="2600" x2="1360" y2="2880" stroke="#e5e5e5" strokeWidth="1" />
        <circle cx="1200" cy="3200" r="170" fill="none" stroke="#efefef" strokeWidth="1" />
        <rect x="1220" y="2880" width="7" height="7" fill="#FF4A1A" />
        <rect x="980" y="3040" width="6" height="6" fill="#FF4A1A" />
        <rect x="420" y="2760" width="5" height="5" fill="#FF4A1A" />
        <circle cx="1280" cy="2600" r="1.5" fill="#000" opacity="0.2" />

        {/* ── Future ContactFooterSection atmosphere ───────────────────── */}
        <line x1="60" y1="3000" x2="340" y2="3340" stroke="#ebebeb" strokeWidth="1" />
        <line x1="1340" y1="3520" x2="1440" y2="3380" stroke="#e5e5e5" strokeWidth="1" />
        <circle cx="900" cy="3800" r="1.5" fill="#000" opacity="0.18" />
        <path d="M720 3100 l5 0 M722.5 3096 l0 8" stroke="#000" strokeWidth="0.75" opacity="0.24" />
      </svg>

      {/* ── Global ambient: floating annotation overlay ───────────────── */}
      <div className="pointer-events-none absolute inset-0 text-[9px] font-medium tracking-[0.18em] text-neutral-400">
        <p className="absolute left-[4%] top-[14%] origin-left -rotate-90">PRSM 001</p>
        <p className="absolute left-[5%] top-[42%]">PRSM 002</p>
        <p className="absolute right-[7%] top-[58%]">PRSM 003</p>
        <p className="absolute right-[6%] top-[18%] origin-right rotate-90 text-[10px] tracking-[0.28em] text-neutral-300">
          ONI
        </p>
        <p className="absolute bottom-[22%] right-[7%] hidden max-w-[200px] text-right text-[9px] leading-snug tracking-[0.14em] md:block">
          MOVEMENT BY CONNECTION
        </p>
      </div>
    </div>
  );
}
