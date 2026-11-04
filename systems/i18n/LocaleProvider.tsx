"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translate, type Locale } from "./messages";

const STORAGE_KEY = "oni.locale";
type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (value: string) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "ru" || stored === "en") updateLocale(stored);
    } catch { /* Storage can be disabled; in-memory switching still works. */ }
    const sync = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) updateLocale(event.newValue === "ru" ? "ru" : "en");
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    updateLocale(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Optional persistence. */ }
  }, []);

  const value = useMemo(() => ({ locale, setLocale, t: (text: string) => translate(text, locale) }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}

export function LocalizedText({ value }: { value: string }) {
  const { t } = useLocale();
  return <>{t(value)}</>;
}
