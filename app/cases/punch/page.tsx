import Link from "next/link";
import { ControlSurface } from "@/components/navigation";
import { PunchExperience } from "@/systems/cases/punch/PunchExperience";

/**
 * /cases/punch — full PUNCH NEVER SLEEP brand identity landing.
 * Renders the Figma Make canvas scaled to viewport width.
 * ControlSurface mounted for nav; a fixed back link provides cases return.
 */
export default function PunchCasePage() {
  return (
    <div className="relative w-full bg-white">
      {/* Dark gradient behind nav — keeps HOME + MENU readable on light/dark sections */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-30"
        style={{
          height: "6rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <ControlSurface />

      {/* ← CASES back link — fixed bottom-left, subtle */}
      <Link
        href="/cases"
        className="fixed bottom-8 left-8 z-40 flex items-center gap-2 text-[10px] font-medium tracking-[0.26em] text-white/60 transition-opacity duration-150 hover:opacity-100 md:bottom-10 md:left-10 lg:left-14"
      >
        <span aria-hidden="true">←</span>
        CASES
      </Link>

      <PunchExperience />
    </div>
  );
}
