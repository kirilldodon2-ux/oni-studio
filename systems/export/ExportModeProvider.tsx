"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { ONI_EXPORT_HTML_CLASS } from "./exportMode";

const ExportModeContext = createContext(false);

export function ExportModeProvider({
  children,
  initialExportMode,
}: {
  children: ReactNode;
  initialExportMode: boolean;
}) {
  useEffect(() => {
    const root = document.documentElement;
    if (initialExportMode) {
      root.classList.add(ONI_EXPORT_HTML_CLASS);
      root.dataset.oniExportMode = "1";
    } else {
      root.classList.remove(ONI_EXPORT_HTML_CLASS);
      delete root.dataset.oniExportMode;
    }
    return () => {
      root.classList.remove(ONI_EXPORT_HTML_CLASS);
      delete root.dataset.oniExportMode;
    };
  }, [initialExportMode]);

  return (
    <ExportModeContext.Provider value={initialExportMode}>
      {children}
    </ExportModeContext.Provider>
  );
}

export function useExportMode(): boolean {
  return useContext(ExportModeContext);
}
