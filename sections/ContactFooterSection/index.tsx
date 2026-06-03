"use client";

import { useState } from "react";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { RevealUp } from "@/systems/atmosphere";

const FOOTER_NAV = [
  { label: "WORK", href: "#work" },
  { label: "ARCHIVE", href: "#archive" },
  { label: "IDENTITY", href: "#identity" },
  { label: "SHOWREEL", href: "#showreel" },
  { label: "CONTACT", href: "#contact" },
  { label: "INSTAGRAM", href: "https://instagram.com/oni_studio" },
] as const;

export function ContactFooterSection() {
  const [ctaActive, setCtaActive] = useState(false);

  return (
    <SectionContainer
      id="contact"
      data-oni-section="contact"
      aria-labelledby="contact-heading"
      className="pt-24 pb-10 md:pt-20 md:pb-10 lg:pt-20 lg:pb-10"
    >
      {/*
        Environmental activation field.
        Positioned before main content in DOM — main content (relative, later
        in DOM) paints on top due to CSS z-index:auto stacking in DOM order.
        Clipped by SectionContainer overflow-hidden.
      */}
      <div
        aria-hidden="true"
        data-oni-layer="decorative"
        className="pointer-events-none absolute right-0 top-[65%] -translate-y-1/2 select-none"
      >
        <span
          className="block font-bebas uppercase leading-none tracking-[-0.01em] text-[clamp(3rem,22vw,18rem)] text-[#FF4A1A] oni-cta-field"
          style={{
            opacity: ctaActive ? 0.12 : 0,
            clipPath: ctaActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            transform: ctaActive
              ? 'scaleY(1) translateY(0px)'
              : 'scaleY(0.94) translateY(6px)',
            transformOrigin: 'right bottom',
            /*
              State-dependent timing: emergence is slow + cinematic (ease-out),
              recession is faster + clean (ease-in). Reduced-motion override
              is handled by the .oni-cta-field CSS class in globals.css.
            */
            transition: ctaActive
              ? 'opacity 700ms 50ms ease-out, clip-path 850ms 50ms ease-out, transform 850ms 50ms ease-out'
              : 'opacity 380ms ease-in, clip-path 480ms ease-in, transform 380ms ease-in',
            willChange: 'opacity, clip-path, transform',
          }}
        >
          Project
        </span>
      </div>

      {/* Main content — RevealUp gives the poster heading spatial weight on scroll.
          Entire content block arrives with opacity + 10px translateY emergence.
          Renders above environmental activation text (later in DOM, relative z). */}
      <RevealUp>
      <div className="relative mx-auto max-w-oni-contact">

        {/* Editorial poster heading — 3-line vertical stack, Bebas Neue */}
        <h2
          id="contact-heading"
          className="font-bebas text-[clamp(5rem,22vw,9.5rem)] uppercase leading-[0.86] tracking-[-0.01em] text-black"
        >
          <span className="block">Let&apos;s</span>
          <span className="block">Work</span>
          <span className="block">Together</span>
        </h2>

        {/* Contact annotations — infrastructural, no card framing */}
        <div className="mt-8 flex flex-col gap-1 md:mt-10">
          <a
            href="mailto:hello@oni.studio"
            className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
          >
            hello@oni.studio
          </a>
          <a
            href="https://instagram.com/oni_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 hover:opacity-40"
          >
            @oni_studio
          </a>
        </div>

        {/* CTA — spatial activation trigger; hairline-anchored text-link */}
        <div className="mt-8 border-t border-black/[0.06] pt-3 md:mt-12 md:pt-5">
          <a
            href="mailto:hello@oni.studio"
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-black"
            onMouseEnter={() => setCtaActive(true)}
            onMouseLeave={() => setCtaActive(false)}
            onFocus={() => setCtaActive(true)}
            onBlur={() => setCtaActive(false)}
          >
            Start a project
          </a>
        </div>

        {/* Footer cluster — grounded page conclusion */}
        <footer className="mt-16 border-t border-black/[0.08] pt-7 md:mt-28 md:pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* Navigation layer */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-y-2 font-sans text-[10px] font-medium uppercase tracking-[0.20em] text-neutral-400">
                {FOOTER_NAV.map((item, i) => (
                  <li key={item.label} className="flex items-center">
                    <a
                      href={item.href}
                      className="text-neutral-400 transition-colors duration-300 hover:text-neutral-600"
                      {...(item.label === "INSTAGRAM"
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

            {/* Archival layer — copyright + authorship */}
            <div className="flex flex-col gap-1.5 md:items-end">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                ONI Studio © 2026
              </p>
              <p className="font-sans text-[10px] font-medium tracking-[0.08em] text-neutral-300">
                built by{" "}
                <a
                  href="https://dodon.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-60"
                >
                  dodon.one
                </a>
                {" "}with ONI
              </p>
            </div>

          </div>
        </footer>

      </div>
      </RevealUp>
    </SectionContainer>
  );
}
