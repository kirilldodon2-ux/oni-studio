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

type PunchSectionContextValue = {
  activeSection: number;
  setActiveSection: (index: number) => void;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
  scrollToSection: (index: number) => void;
};

const PunchSectionContext = createContext<PunchSectionContextValue | null>(null);

export function PunchSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: index * container.clientHeight, behavior: "smooth" });
  }, []);

  const value = useMemo(
    () => ({ activeSection, setActiveSection, scrollContainerRef, scrollToSection }),
    [activeSection, scrollToSection]
  );

  return (
    <PunchSectionContext.Provider value={value}>{children}</PunchSectionContext.Provider>
  );
}

export function usePunchSection() {
  const ctx = useContext(PunchSectionContext);
  if (!ctx) throw new Error("usePunchSection requires PunchSectionProvider");
  return ctx;
}
