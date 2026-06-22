"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const PUNCH_PURPLE = "#8f62c7";

const SCOPE = ["Event Branding", "Visual Identity", "Merch", "Posters"];

const IMG = {
  // Transparent planet — Earth with ПУНШ NEVER SLEEP in clouds
  planet: "/cases/punch/73f66c1ea445178c5f4724f0e9f11f454db905cf.png",
  // Purple ПУНШ cup — satellite
  cup:    "/cases/punch/0911e0cbaf2f31314e861e459b1a42d26baf1d47.png",
  // XXXMANERA rapper from behind (rim-lit; mix-blend-mode:screen removes dark bg)
  rapper: "/cases/punch/9c4b5265bef96a23df48b66a20fdefac5f3870bf.png",
} as const;

/**
 * CasesPunch — single 100vh snap section.
 * Left: typography stack + WATCH FULL.
 * Right: ПУНШ planet spinning, cup orbiting as satellite.
 * WATCH FULL → /cases/punch (full Figma Make landing).
 */
export function CasesPunch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{
        height: "100vh",
        scrollSnapAlign: "start",
        flexShrink: 0,
        backgroundColor: "#06040c",
      }}
    >
      {/* ── Space ambient: radial purple haze anchored to planet zone ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 72% 44%, rgba(143,98,199,0.18) 0%, rgba(143,98,199,0.06) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      {/* ── Purple accent strip — left edge ── */}
      <motion.div
        className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
        style={{ backgroundColor: PUNCH_PURPLE }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
      />

      {/* Ghost case number — bottom-right flood */}
      <div
        className="pointer-events-none absolute -bottom-4 -right-4 select-none font-bebas leading-none text-white"
        style={{ fontSize: "clamp(10rem, 32vw, 26rem)", opacity: 0.022 }}
        aria-hidden="true"
      >
        01
      </div>

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

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* PLANET + ORBIT SYSTEM — right side desktop, top center mobile     */}
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* Desktop: right 60% zone, vertically centered at 44% */}
      <div
        className="pointer-events-none absolute hidden md:block"
        style={{
          right: "clamp(-8rem, -4vw, -2rem)",
          top: "44%",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Planet — transparent, spinning */}
          <motion.img
            src={IMG.planet}
            alt=""
            style={{
              width: "clamp(18rem, 34vw, 30rem)",
              display: "block",
              filter: "drop-shadow(0 0 60px rgba(143,98,199,0.35)) drop-shadow(0 0 20px rgba(143,98,199,0.2))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          />

          {/* Orbit anchor — rotates to drive cup path */}
          <motion.div
            style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          >
            {/* Cup — positioned at orbit radius, counter-rotates to stay upright */}
            <div
              style={{
                position: "absolute",
                left: "clamp(9.5rem, 18.5vw, 16.5rem)",
                top: 0,
                transform: "translateY(-50%)",
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 9, ease: "linear", repeat: Infinity }}
              >
                {/* Depth cue: fades + shrinks when "behind" planet */}
                <motion.img
                  src={IMG.cup}
                  alt=""
                  style={{
                    width: "clamp(2.75rem, 4.5vw, 4rem)",
                    filter:
                      "drop-shadow(0 0 12px rgba(143,98,199,0.8)) drop-shadow(0 0 5px rgba(220,190,255,0.3))",
                  }}
                  animate={{
                    scale:   [1.0, 0.82, 0.5, 0.82, 1.0],
                    opacity: [1.0, 0.88, 0.28, 0.88, 1.0],
                  }}
                  transition={{
                    duration: 9,
                    ease: "linear",
                    repeat: Infinity,
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: planet at top, wide, bleeds off sides */}
      <div
        className="pointer-events-none absolute left-1/2 top-[22%] block -translate-x-1/2 -translate-y-1/2 md:hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <motion.img
            src={IMG.planet}
            alt=""
            style={{
              width: "110vw",
              maxWidth: "none",
              display: "block",
              filter: "drop-shadow(0 0 40px rgba(143,98,199,0.4))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          />
          {/* Mobile orbit */}
          <motion.div
            style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          >
            <div
              style={{
                position: "absolute",
                left: "56vw",
                top: 0,
                transform: "translateY(-50%)",
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 9, ease: "linear", repeat: Infinity }}
              >
                <motion.img
                  src={IMG.cup}
                  alt=""
                  style={{ width: "10vw", minWidth: "2.5rem" }}
                  animate={{
                    scale:   [1.0, 0.8, 0.45, 0.8, 1.0],
                    opacity: [1.0, 0.85, 0.25, 0.85, 1.0],
                  }}
                  transition={{
                    duration: 9,
                    ease: "linear",
                    repeat: Infinity,
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TEXT CONTENT — bottom-left, z-10 (above planet layer)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-10 md:max-w-[58%] md:px-10 md:pb-12 lg:max-w-[52%] lg:px-14 lg:pb-14">

        {/* XXXMANERA — tiny screen-blend silhouette, floats above title */}
        <motion.div
          className="pointer-events-none mb-1 select-none"
          style={{
            width: "clamp(3rem, 5.5vw, 5rem)",
            mixBlendMode: "screen",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView
            ? { opacity: 0.8, y: [0, -6, 0] }
            : { opacity: 0, y: 8 }}
          transition={isInView ? {
            opacity: { duration: 0.8, delay: 0.08 },
            y: { duration: 3.2, ease: "easeInOut", repeat: Infinity, delay: 0.9 },
          } : { duration: 0.4 }}
          aria-hidden="true"
        >
          <img src={IMG.rapper} alt="" className="h-auto w-full" />
        </motion.div>

        {/* "NEVER SLEEP" */}
        <motion.p
          className="mb-2 text-[10px] font-medium tracking-[0.40em] text-white/22 md:mb-3"
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

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.6rem, 8.5vw, 7rem)" }}
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
          className="mt-5 md:mt-6"
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
    </section>
  );
}
