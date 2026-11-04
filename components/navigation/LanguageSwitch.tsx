"use client";

import { useLocale } from "@/systems/i18n/LocaleProvider";

export function LanguageSwitch({ light = false }: { light?: boolean }) {
  const { locale, setLocale } = useLocale();
  return (
    <div role="group" aria-label={locale === "en" ? "Language" : "Язык"} className={`pointer-events-auto flex shrink-0 gap-2 text-[11px] ${light ? "text-white" : "text-black"}`}>
      {(["en", "ru"] as const).map(language => (
        <button key={language} type="button" lang={language} aria-label={language === "en" ? "English" : "Русский"} aria-pressed={locale === language} onClick={() => setLocale(language)} className={`min-h-9 min-w-8 border-b px-1 uppercase transition-opacity hover:opacity-60 ${locale === language ? "border-current" : "border-transparent opacity-50"}`}>
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
