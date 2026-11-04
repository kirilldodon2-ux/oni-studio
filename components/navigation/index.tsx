"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { useBrandbookSectionOptional } from "@/systems/brandbook/BrandbookSectionContext";
import { usePunchSectionOptional } from "@/systems/cases/punch/PunchSectionContext";
import { NavHome } from "./NavHome";
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
 * Two zones: [ IDENTITY ] [ ACTION ]. Decorative telemetry is not mounted.
 *
 * Closed surface is identical at all scroll positions — no scroll-state (DEC-004).
 */
export function ControlSurface() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const brandbook = useBrandbookSectionOptional();
  const punch = usePunchSectionOptional();
  const light = !menuOpen && (brandbook
    ? [1, 2, 3].includes(brandbook.activeSection)
    : punch ? ![4, 7].includes(punch.activeSection) : pathname.startsWith("/cases"));

  return (
    <>
      <NavOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <header
        data-oni-layer="chrome"
        className={[
          "pointer-events-none fixed left-0 right-0 top-0 flex items-center justify-between",
          "px-6 py-5 md:px-10 lg:px-14 lg:py-7",
          menuOpen ? "z-50" : "z-40",
        ].join(" ")}
      >
        <NavHome light={light} />
        <div className="flex items-center gap-3 md:gap-6">
          <LanguageSwitch light={light} />
          <NavMenuTrigger light={light} isOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
        </div>
      </header>
    </>
  );
}
