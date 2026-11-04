"use client";

import { LocalizedText, useLocale } from "@/systems/i18n/LocaleProvider";

import { SectionContainer } from "@/systems/layout/SectionContainer";
import { RevealUp } from "@/systems/atmosphere";

const FOOTER_NAV = [
  { label: "PROJECTS", href: "/#projects" },
  { label: "BRANDBOOK", href: "/brandbook" },
  { label: "SHOWREEL", href: "#showreel" },
  { label: "CONTACT", href: "/#contact" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/onidigital_studio" },
  { label: "TELEGRAM", href: "https://t.me/ONIdigital" },
] as const;

export function ContactFooterSection() {
  const { t } = useLocale();
  return (
    <SectionContainer
      id="contact"
      data-oni-section="contact"
      aria-labelledby="contact-heading"
      className="pt-14 pb-10 md:pt-16 md:pb-10 lg:pt-16 lg:pb-10"
    >
      <RevealUp>
        <div className="relative mx-auto max-w-oni-contact">
          <h2
            id="contact-heading"
            className="font-display text-[2rem] font-bold uppercase leading-[1.08] tracking-normal text-black min-[375px]:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block"><LocalizedText value={"Let's"} /></span>
            <span className="block"><LocalizedText value={"Work"} /></span>
            <span className="block"><LocalizedText value={"Together"} /></span>
          </h2>

          <p className="mt-6 max-w-md font-sans text-[13px] leading-relaxed tracking-[0.02em] text-neutral-500 md:mt-8"><LocalizedText value={"Tell us about your project."} /></p>

          <div className="mt-12 flex flex-col gap-1 md:mt-16">
            <a
              href="mailto:hello@onidigital.net"
              className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
            >
              hello@onidigital.net
            </a>
            <a
              href="https://www.instagram.com/onidigital_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
            >
              @onidigital_studio
            </a>
            <a
              href="https://t.me/ONIdigital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
            >
              @ONIdigital
            </a>
          </div>

          <footer className="mt-12 border-t border-black/[0.08] pt-7 md:mt-20 md:pt-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <nav aria-label={t("Footer navigation")}>
                <ul className="flex flex-wrap items-center gap-y-2 font-sans text-[10px] font-medium uppercase tracking-[0.20em] text-neutral-400">
                  {FOOTER_NAV.map((item, i) => (
                    <li key={item.label} className="flex items-center">
                      <a
                        href={item.href}
                        className="text-neutral-400 transition-colors duration-300 hover:text-neutral-600"
                        {...(item.label === "INSTAGRAM" || item.label === "TELEGRAM"
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <LocalizedText value={item.label} />
                      </a>
                      {i < FOOTER_NAV.length - 1 ? (
                        <span className="mx-2.5 text-neutral-300" aria-hidden>
                          /
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-1.5 md:items-end">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                  ONI Studio © 2026
                </p>
              </div>
            </div>
          </footer>
        </div>
      </RevealUp>
    </SectionContainer>
  );
}
