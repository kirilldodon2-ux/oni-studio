import { type ReactNode } from "react";

interface SectionContainerProps {
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  /** Reconciliation key for code ↔ Figma workflows (landing export prep) */
  "data-oni-section"?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Shared section shell.
 * Owns: relative z-10 + overflow-hidden (sections must contain their own overflow
 * per ARCHITECTURE.md) + the horizontal padding cadence (px-6 → md:px-10 → lg:px-14).
 * Each section passes its own vertical padding and any other section-specific classes
 * via `className`.
 */
export function SectionContainer({
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
  "data-oni-section": dataOniSection,
  className,
  children,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
      data-oni-section={dataOniSection}
      data-oni-layer="content"
      className={`relative z-10 overflow-hidden px-6 md:px-10 lg:px-14${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}
