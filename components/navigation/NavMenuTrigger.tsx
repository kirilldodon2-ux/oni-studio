"use client";

import { useState } from "react";
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

  function handleToggle() {
    setImpulseKey((k) => k + 1);
    onToggle();
  }

  const label = isOpen ? "CLOSE" : "MENU";

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="pointer-events-auto text-[11px] font-medium text-black/60"
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
