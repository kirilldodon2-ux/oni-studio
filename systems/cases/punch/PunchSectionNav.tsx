"use client";

import { motion } from "motion/react";
import { usePunchSection } from "./PunchSectionContext";

const LABELS = ["INTRO", "BRAND", "POSTERS", "DIGITAL", "EVENT", "STICKERS", "FIN"];

/** Dark-on-dark sections → always light dots. */
const DARK_SECTIONS = new Set([0, 1, 3, 4, 6]);

export function PunchSectionNav() {
  const { activeSection, scrollToSection } = usePunchSection();
  const isDark = DARK_SECTIONS.has(activeSection);
  const DOT_ACTIVE   = isDark ? "#F7F7F7" : "#070707";
  const DOT_INACTIVE = isDark ? "rgba(200,200,200,0.3)" : "rgba(60,60,60,0.35)";

  return (
    <nav
      className="fixed right-6 top-1/2 z-[30] hidden -translate-y-1/2 flex-col items-end gap-3 md:right-8 lg:flex"
      aria-label="Punch case sections"
      data-oni-layer="decorative"
    >
      {LABELS.map((label, i) => {
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
              animate={{ color: isActive ? DOT_ACTIVE : DOT_INACTIVE }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>

            <div className="relative flex h-4 w-4 items-center justify-center">
              <motion.div
                className="rounded-full"
                animate={{
                  width:           isActive ? 8 : 3,
                  height:          isActive ? 8 : 3,
                  backgroundColor: isActive ? DOT_ACTIVE : DOT_INACTIVE,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              {isActive && (
                <motion.div
                  className="absolute rounded-full"
                  style={{ border: `1px solid ${DOT_ACTIVE}`, width: 14, height: 14, opacity: 0.55 }}
                  initial={{ scale: 0.5, opacity: 0.55 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatDelay: 1.4 }}
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
