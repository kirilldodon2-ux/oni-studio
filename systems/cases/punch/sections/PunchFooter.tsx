"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";

const BG   = "#CBCAC5";
const INK  = "#111111";
const MUTE = "rgba(0,0,0,0.32)";

const LINKS = [
  { label: "telegram",  handle: "@onidigital",          href: "https://t.me/ONIdigital" },
  { label: "instagram", handle: "@onidigital_studio",   href: "https://www.instagram.com/onidigital_studio" },
  { label: "email",     handle: "onivisualstudio@gmail.com", href: "mailto:onivisualstudio@gmail.com" },
];

/** PunchFooter — final section of the PUNCH case.
 *  Light gray, editorial label vibe, rises over the dark content above.
 *  Template for all future case landing footers.
 */
export function PunchFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: BG }}
    >
      {/* Ghost "ПУНШ" watermark — upper area */}
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 select-none font-bebas leading-none"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)", color: INK, opacity: 0.05, whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        ПУНШ
      </div>

      {/* Top-left: case identifier */}
      <motion.div
        className="absolute px-8 md:px-10 lg:px-14"
        style={{ top: "calc(var(--oni-header-h, 4rem) + 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <p
          className="text-[9px] font-medium tracking-[0.38em]"
          style={{ color: MUTE }}
        >
          ONI STUDIO · PUNCH · 2026
        </p>
      </motion.div>

      {/* Center logo — PUNCH badge, rises into view */}
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <img
            src={punchSrc("punch-logo.png")}
            alt="ПУНШ NEVER SLEEP"
            style={{
              width: "clamp(10rem, 22vw, 18rem)",
              display: "block",
              filter: "invert(1)",
              opacity: 0.88,
            }}
          />
        </motion.div>
      </div>

      {/* Bottom footer strip — main content */}
      <motion.div
        className="relative z-10 flex flex-col gap-0 border-t px-8 pb-10 pt-7 md:flex-row md:items-start md:gap-0 md:px-10 lg:px-14"
        style={{ borderColor: "rgba(0,0,0,0.14)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        {/* Left: LINKS */}
        <div className="flex flex-col gap-5 md:w-[38%] lg:w-[32%]">
          <p
            className="text-[9px] font-medium tracking-[0.40em]"
            style={{ color: INK, opacity: 0.4 }}
          >
            LINKS
          </p>
          <div className="relative flex flex-col gap-4 pl-5">
            {/* Dashed vertical line */}
            <div className="absolute bottom-1 left-0 top-0 w-px">
              <svg className="h-full" width="2" fill="none">
                <line
                  x1="1" y1="0" x2="1" y2="100%"
                  stroke={INK} strokeOpacity="0.2"
                  strokeWidth="1" strokeDasharray="5 5"
                />
              </svg>
            </div>

            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2 no-underline transition-opacity hover:opacity-60"
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.09 }}
              >
                <span
                  className="h-[5px] w-[5px] shrink-0 self-center"
                  style={{ backgroundColor: INK, opacity: 0.4 }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10px] tracking-[0.04em]"
                  style={{ color: MUTE, fontFamily: "var(--font-mono, monospace)" }}
                >
                  {link.label}
                  <span style={{ opacity: 0.5 }}>^ </span>
                </span>
                <span
                  className="text-[10px] tracking-[0.02em]"
                  style={{ color: INK, opacity: 0.65 }}
                >
                  {link.handle}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Center: description */}
        <div className="mt-6 flex flex-col md:mt-0 md:flex-1 md:items-end md:justify-between">
          <motion.p
            className="max-w-[20rem] text-[11px] leading-[1.85] tracking-[0.02em] md:text-right"
            style={{ color: INK, opacity: 0.42 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.42 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            Full event and social media branding —<br />
            визуальная система, стикер-кит и мерч-айдентика<br />
            для серии клубных ивентов ПУНШ NEVER SLEEP.
          </motion.p>
        </div>

        {/* Right: ONI attribution */}
        <div className="mt-6 flex flex-col items-start md:mt-0 md:w-[22%] md:items-end lg:w-[20%]">
          <motion.div
            className="flex flex-col items-end gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            <img
              src={punchSrc("7dd49aa878b92dd7d27210878de79a8b07d14f7d.png")}
              alt="ПУНШ logo"
              style={{
                width: "clamp(4rem, 8vw, 6rem)",
                height: "auto",
                display: "block",
                filter: "brightness(0) saturate(0)",
                opacity: 0.6,
              }}
            />
            <p
              className="text-right text-[8px] tracking-[0.30em]"
              style={{ color: INK, opacity: 0.35, fontFamily: "var(--font-mono, monospace)" }}
            >
              created by ONI
            </p>
            <p
              className="text-right text-[8px] tracking-[0.20em]"
              style={{ color: INK, opacity: 0.22 }}
            >
              ONI VISUAL STUDIO © 2026
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
