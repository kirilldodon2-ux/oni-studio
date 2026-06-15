"use client";

import { SectionContainer } from "@/systems/layout/SectionContainer";
import { RevealUp } from "@/systems/atmosphere";
import { ProjectContactForm } from "./ProjectContactForm";

const FOOTER_NAV = [
  { label: "WORKS", href: "/works" },
  { label: "ARCHIVE", href: "/archive" },
  { label: "IDENTITY", href: "#identity" },
  { label: "SHOWREEL", href: "#showreel" },
  { label: "CONTACT", href: "/#contact" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/oni_visual_studio" },
  { label: "TELEGRAM", href: "https://t.me/ONIvisual" },
] as const;

export function ContactFooterSection() {
  return (
    <SectionContainer
      id="contact"
      data-oni-section="contact"
      aria-labelledby="contact-heading"
      className="pt-24 pb-10 md:pt-20 md:pb-10 lg:pt-20 lg:pb-10"
    >
      <RevealUp>
        <div className="relative mx-auto max-w-oni-contact">
          <h2
            id="contact-heading"
            className="font-bebas text-[clamp(5rem,22vw,9.5rem)] uppercase leading-[0.86] tracking-[-0.01em] text-black"
          >
            <span className="block">Let&apos;s</span>
            <span className="block">Work</span>
            <span className="block">Together</span>
          </h2>

          <p className="mt-6 max-w-md font-sans text-[13px] leading-relaxed tracking-[0.02em] text-neutral-500 md:mt-8">
            Tell us about your project.
          </p>

          <ProjectContactForm />

          <div className="mt-12 flex flex-col gap-1 md:mt-16">
            <a
              href="mailto:hello@onidigital.net"
              className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
            >
              hello@onidigital.net
            </a>
            <a
              href="https://www.instagram.com/oni_visual_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
            >
              @oni_visual_studio
            </a>
            <a
              href="https://t.me/ONIvisual"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
            >
              @ONIvisual
            </a>
          </div>

          <footer className="mt-16 border-t border-black/[0.08] pt-7 md:mt-28 md:pt-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <nav aria-label="Footer navigation">
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
                        {item.label}
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
