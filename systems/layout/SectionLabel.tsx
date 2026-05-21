import { type ReactNode } from "react";

interface SectionLabelProps {
  /** id forwarded to the h2 — referenced by aria-labelledby on the parent section */
  id: string;
  /** Wrapper className — use for margin-bottom and any stacking context the section needs */
  className?: string;
  children: ReactNode;
}

/**
 * Section title + accent bar pattern.
 * Preserves exact typography (11px / tracking-[0.28em]) and accent rule (h-1 w-11).
 */
export function SectionLabel({ id, className, children }: SectionLabelProps) {
  return (
    <div className={className}>
      <h2
        id={id}
        className="text-[11px] font-semibold uppercase tracking-[0.28em] text-oni-accent"
      >
        {children}
      </h2>
      <div className="mt-2 h-1 w-11 bg-oni-accent" aria-hidden />
    </div>
  );
}
