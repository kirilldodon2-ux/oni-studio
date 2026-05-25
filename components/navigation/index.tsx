"use client";

import { useState } from "react";
import { NavLogo } from "./NavLogo";
import { NavTelemetry } from "./NavTelemetry";
import { NavMenuTrigger } from "./NavMenuTrigger";
import { NavOverlay } from "./NavOverlay";

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

  return (
    <>
      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <header
        data-oni-layer="chrome"
        className={[
          "pointer-events-none fixed left-0 right-0 top-0 flex items-center justify-between",
          "px-6 py-5 md:px-10 lg:px-14 lg:py-7",
          // No material strip: the control surface is only floating markers.
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
