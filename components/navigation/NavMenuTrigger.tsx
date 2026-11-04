"use client";

import { LocalizedText, useLocale } from "@/systems/i18n/LocaleProvider";

import { useState } from "react";
import { ArtifactConsumptionPair, ONINavigationSigil } from "@/systems/spatial";

interface NavMenuTriggerProps {
  light?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Navigation trigger — MENU is temporary interface; sigil is the real object.
 */
export function NavMenuTrigger({ isOpen, onToggle, light = false }: NavMenuTriggerProps) {
  const { t } = useLocale();
  const [hovered, setHovered] = useState(false);
  const [impulseKey, setImpulseKey] = useState(0);

  function handleToggle() {
    setImpulseKey((k) => k + 1);
    onToggle();
  }

  const label = isOpen ? "CLOSE" : "MENU";
  const textColor = light ? "text-white/70" : "text-black/60";

  return (
    <button
      type="button"
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`pointer-events-auto text-[11px] font-medium ${textColor}`}
      aria-label={t(isOpen ? "Close menu" : "Open menu")}
      aria-expanded={isOpen}
      aria-controls="nav-overlay"
    >
      <ArtifactConsumptionPair
        active={hovered}
        interfaceLayer={<span className="inline-block"><LocalizedText value={label} /></span>}
        artifact={
          <ONINavigationSigil hovered={hovered} impulseKey={impulseKey} className={light ? "invert" : ""} />
        }
      />
    </button>
  );
}
