"use client";

import { useState } from "react";
import { NavLogo } from "./NavLogo";
import { NavTelemetry } from "./NavTelemetry";
import { NavMenuTrigger } from "./NavMenuTrigger";
import { NavOverlay } from "./NavOverlay";
import { useControlSurfaceScroll } from "./useControlSurfaceScroll";

/**
 * ControlSurface — floating navigation instrument.
 *
 * Owns z-40 (default) per the formal z-index table in ARCHITECTURE.md.
 * Elevated to z-50 when the overlay is active so the trigger remains
 * interactive above the overlay. NavOverlay renders before the header in
 * the DOM; at the same z-level, DOM order gives the header the higher stack.
 *
 * Three zones: [ IDENTITY ] [ TELEMETRY ] [ ACTION ]
 * Telemetry is desktop-only (lg+), pointer-events-none, aria-hidden.
 */
export function ControlSurface() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useControlSurfaceScroll();

  return (
    <>
      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <header
        data-oni-layer="chrome"
        data-scrolled={scrolled ? "true" : "false"}
        className={[
          "pointer-events-none fixed left-0 right-0 top-0 flex items-center justify-between",
          "px-6 py-5 md:px-10 lg:px-14 lg:py-7",
          "transition-[border-color,background-color,backdrop-filter] duration-500 ease-out motion-reduce:transition-none",
          scrolled
            ? "border-b border-black/[0.06] bg-white/[0.03] backdrop-blur-[2px]"
            : "border-b border-transparent bg-transparent",
          menuOpen ? "z-50" : "z-40",
        ].join(" ")}
      >
        <NavLogo />
        <NavTelemetry />
        <NavMenuTrigger
          isOpen={menuOpen}
          onToggle={() => setMenuOpen((v) => !v)}
        />
      </header>
    </>
  );
}
