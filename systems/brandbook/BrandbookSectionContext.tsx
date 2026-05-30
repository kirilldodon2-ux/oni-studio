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

type BrandbookSectionContextValue = {
  activeSection: number;
  setActiveSection: (index: number) => void;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
  scrollToSection: (index: number) => void;
};

const BrandbookSectionContext = createContext<BrandbookSectionContextValue | null>(
  null
);

export function BrandbookSectionProvider({ children }: { children: ReactNode }) {
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
    () => ({
      activeSection,
      setActiveSection,
      scrollContainerRef,
      scrollToSection,
    }),
    [activeSection, scrollToSection]
  );

  return (
    <BrandbookSectionContext.Provider value={value}>
      {children}
    </BrandbookSectionContext.Provider>
  );
}

export function useBrandbookSection() {
  const ctx = useContext(BrandbookSectionContext);
  if (!ctx) {
    throw new Error("useBrandbookSection requires BrandbookSectionProvider");
  }
  return ctx;
}

export function useBrandbookSectionOptional() {
  return useContext(BrandbookSectionContext);
}

export function formatBrandbookSectionIndex(index: number): string {
  return String(Math.min(Math.max(index, 0), 5) + 1).padStart(2, "0");
}
