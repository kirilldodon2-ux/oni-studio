import { LocalizedText } from "@/systems/i18n/LocaleProvider";
export function ViewWorkLink({ className }: { className?: string }) {
  return (
    <a
      href="#projects"
      className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-oni-accent transition-opacity duration-150 hover:opacity-70 ${className ?? ""}`}
    >
      <span aria-hidden className="text-base font-light leading-none">
        →
      </span><LocalizedText value={"View Projects"} /></a>
  );
}
