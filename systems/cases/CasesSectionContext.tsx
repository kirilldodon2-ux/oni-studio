"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";

type CasesSectionContextValue = {
  activeSection: number;
  setActiveSection: (index: number) => void;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
  scrollToSection: (index: number) => void;
};

const CasesSectionContext = createContext<CasesSectionContextValue | null>(null);

export function CasesSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: "smooth",
    });
  }, []);

  const value = useMemo(
    () => ({ activeSection, setActiveSection, scrollContainerRef, scrollToSection }),
    [activeSection, scrollToSection]
  );

  return (
    <CasesSectionContext.Provider value={value}>
      {children}
    </CasesSectionContext.Provider>
  );
}

export function useCasesSection() {
  const ctx = useContext(CasesSectionContext);
  if (!ctx) throw new Error("useCasesSection requires CasesSectionProvider");
  return ctx;
}

export function useCasesSectionOptional() {
  return useContext(CasesSectionContext);
}

export function formatCasesSectionIndex(index: number): string {
  return String(Math.max(index, 0) + 1).padStart(2, "0");
}
