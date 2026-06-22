"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const PUNCH_PURPLE = "#8f62c7";

const SCOPE = ["Event Branding", "Visual Identity", "Merch", "Posters"];

const IMG = {
  // Event logo badge — purple circle "ПУНШ NEVER SLEEP" with MOBILAND
  logo:   "/cases/punch/386398f5faf9366a6343534c166c85faf25c7779.png",
  // XXXMANERA rapper from behind (rim-lit, dark bg blends via mix-blend-mode: screen)
  rapper: "/cases/punch/9c4b5265bef96a23df48b66a20fdefac5f3870bf.png",
} as const;

/**
 * CasesPunch — PUNCH (ПУНШ) event brand identity case.
 * Single 100vh scroll-snap section.
 * WATCH FULL → links to /cases/punch (full Figma Make landing).
 */
export function CasesPunch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.35 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-[#0d0d0d]"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      {/* Ghost case number */}
      <div
        className="pointer-events-none absolute -right-4 -top-2 select-none font-bebas leading-none text-white"
        style={{ fontSize: "clamp(10rem, 32vw, 26rem)", opacity: 0.025 }}
        aria-hidden="true"
      >
        01
      </div>

      {/* Purple accent strip — left edge */}
      <motion.div
        className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
        style={{ backgroundColor: PUNCH_PURPLE }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
      />

      {/* Event logo badge — right side, desktop */}
      <motion.div
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:block lg:right-14"
        style={{ width: "clamp(9rem, 14vw, 13rem)" }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={isInView ? { opacity: 0.92, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        aria-hidden="true"
      >
        <img src={IMG.logo} alt="" className="h-auto w-full" />
      </motion.div>

      {/* Category + year — top left */}
      <motion.div
        className="absolute left-8 flex items-center gap-4 md:left-10 lg:left-14"
        style={{ top: "calc(var(--oni-header-h, 4rem) + 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
      >
        <span className="text-[10px] font-medium tracking-[0.30em] text-white/30">
          IDENTITY
        </span>
        <span className="h-px w-4 bg-white/15" />
        <span className="text-[10px] font-medium tracking-[0.30em] text-white/20">
          2026
        </span>
      </motion.div>

      {/* Main content — bottom-left */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-12 md:px-10 md:pb-14 lg:px-14 lg:pb-16">

        {/* XXXMANERA rapper — small silhouette above title, screen-blend float */}
        <motion.div
          className="pointer-events-none mb-1 select-none"
          style={{
            width: "clamp(3.5rem, 6vw, 5.5rem)",
            mixBlendMode: "screen",
            opacity: 0.75,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView
            ? { opacity: 0.75, y: [0, -7, 0] }
            : { opacity: 0, y: 10 }}
          transition={isInView ? {
            opacity: { duration: 0.8, delay: 0.05 },
            y: { duration: 3.2, ease: "easeInOut", repeat: Infinity, delay: 0.8 },
          } : { duration: 0.4 }}
          aria-hidden="true"
        >
          <img src={IMG.rapper} alt="" className="h-auto w-full" />
        </motion.div>

        {/* "NEVER SLEEP" tagline */}
        <motion.p
          className="mb-2 text-[10px] font-medium tracking-[0.40em] text-white/20 md:mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          NEVER SLEEP
        </motion.p>

        {/* Client signal */}
        <motion.p
          className="mb-1 text-[10px] font-medium tracking-[0.32em]"
          style={{ color: PUNCH_PURPLE }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          PUNCH · ПУНШ
        </motion.p>

        {/* Project title */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.8rem, 9.5vw, 7.5rem)" }}
            initial={{ y: "105%" }}
            animate={isInView ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            PARTY EVENT DESIGN
          </motion.h2>
        </div>

        {/* Scope tags */}
        <motion.div
          className="mt-4 flex flex-wrap gap-2 md:mt-5"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.38 }}
        >
          {SCOPE.map((tag) => (
            <span
              key={tag}
              className="border border-white/[0.1] px-2.5 py-1 text-[10px] tracking-[0.22em] text-white/40"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* WATCH FULL button */}
        <motion.div
          className="mt-6 md:mt-7"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.52 }}
        >
          <Link
            href="/cases/punch"
            className="group inline-flex items-center gap-3 bg-[#FF4A1A] px-5 py-3 text-[11px] font-medium tracking-[0.22em] text-white transition-opacity duration-200 hover:opacity-80"
          >
            WATCH FULL
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Mobile: logo badge centered upper area */}
      <motion.div
        className="absolute left-1/2 top-[16%] -translate-x-1/2 block md:hidden"
        style={{ width: "min(55vw, 11rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.85 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        aria-hidden="true"
      >
        <img src={IMG.logo} alt="" className="h-auto w-full" />
      </motion.div>
    </section>
  );
}
