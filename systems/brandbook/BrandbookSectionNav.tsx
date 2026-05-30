"use client";

import { motion } from "motion/react";
import { useBrandbookSection } from "./BrandbookSectionContext";

const SECTIONS = [
  "COVER",
  "ABOUT",
  "LOGO",
  "COLORS",
  "FONTS",
  "LINKS",
] as const;

/** Sections with dark backgrounds — light dot read (matches source OniNav). */
const DARK_BG_SECTIONS = new Set([1, 2, 3]);

/**
 * Brandbook-internal section rail — restored from Figma Make OniNav.
 * Route-local only: not site navigation. ControlSurface remains primary (z-40/50).
 */
export function BrandbookSectionNav() {
  const { activeSection, scrollToSection } = useBrandbookSection();
  const isDark = DARK_BG_SECTIONS.has(activeSection);
  const dotColor = isDark ? "#F7F7F7" : "#070707";
  const inactiveColor = isDark ? "rgba(178,178,178,0.5)" : "rgba(178,178,178,0.75)";
  const labelColor = "#B2B2B2";

  return (
    <nav
      className="fixed right-6 top-1/2 z-[30] hidden -translate-y-1/2 flex-col items-end gap-3 md:right-8 lg:flex"
      aria-label="Brandbook sections"
      data-oni-layer="decorative"
    >
      {SECTIONS.map((label, i) => {
        const isActive = activeSection === i;
        return (
          <button
            key={label}
            type="button"
            onClick={() => scrollToSection(i)}
            className="group flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0"
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "step" : undefined}
          >
            <motion.span
              className="select-none text-[9px] tracking-[0.22em] opacity-0 transition-opacity duration-200 group-hover:opacity-70"
              style={{
                color: isActive ? dotColor : labelColor,
                fontFamily: "var(--font-mono)",
              }}
              animate={{ color: isActive ? dotColor : labelColor }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>

            <div className="relative flex h-4 w-4 items-center justify-center">
              <motion.div
                className="rounded-full"
                animate={{
                  width: isActive ? 8 : 3,
                  height: isActive ? 8 : 3,
                  backgroundColor: isActive ? dotColor : inactiveColor,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              {isActive ? (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    border: `1px solid ${dotColor}`,
                    width: 14,
                    height: 14,
                    opacity: 0.55,
                  }}
                  initial={{ scale: 0.5, opacity: 0.55 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 1.4,
                  }}
                />
              ) : null}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
