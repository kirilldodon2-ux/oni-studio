"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArtifactConsumptionPair, ONINavigationSigil } from "@/systems/spatial";

interface NavMenuTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Navigation trigger — MENU is temporary interface; sigil is the real object.
 */
export function NavMenuTrigger({ isOpen, onToggle }: NavMenuTriggerProps) {
  const [hovered, setHovered] = useState(false);
  const [impulseKey, setImpulseKey] = useState(0);
  const pathname = usePathname();

  function handleToggle() {
    setImpulseKey((k) => k + 1);
    onToggle();
  }

  const label = isOpen ? "CLOSE" : "MENU";
  const isDark = pathname.startsWith("/cases");
  const textColor = isDark ? "text-white/70" : "text-black/60";

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`pointer-events-auto text-[11px] font-medium ${textColor}`}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="nav-overlay"
    >
      <ArtifactConsumptionPair
        active={hovered}
        interfaceLayer={<span className="inline-block">{label}</span>}
        artifact={
          <ONINavigationSigil hovered={hovered} impulseKey={impulseKey} />
        }
      />
    </button>
  );
}
