"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PUNCH_PURPLE = "#8f62c7";

const SCOPE = ["Event Branding", "Visual Identity", "Merch", "Posters"];

// Image hashes from public/cases/punch/ — keyed to Figma Make sections
const IMG = {
  // Section 2 — main sticker art, used as hero visual
  stickerArt:   "/cases/punch/66233c76db34d637b5f0a2da5208a41b8cc8b3ff.png",
  // Section 9 — photo grid, person shot
  people:       "/cases/punch/686511ca33145121b787176964fce5dda072d7a3.png",
  // Section 8 — social media mockup
  social:       "/cases/punch/460a75927eb6d9dabab8d77627b44a8ec788bdf6.png",
  // Section 12.3 — sticker grid item
  stickerGrid1: "/cases/punch/0e7865bf374b74f7203d80ffd3651f47646214b4.png",
  // Cosmic scene: XXXMANERA cutout (transparent bg), ПУНШ Earth, ПУНШ cup
  rapper:       "/cases/punch/216be9907372b69d0e269a72403e810c8a85e1e9.png",
  planet:       "/cases/punch/73f66c1ea445178c5f4724f0e9f11f454db905cf.png",
  cup:          "/cases/punch/0911e0cbaf2f31314e861e459b1a42d26baf1d47.png",
} as const;

/**
 * CasesPunch — PUNCH (ПУНШ) event brand identity case.
 * Renders TWO 100vh scroll-snap sections:
 *   1. Brand identity slide (dark, purple accent, sticker art)
 *   2. Cosmic scene — Манера holds the ПУНШ Earth, cup orbits as satellite
 */
export function CasesPunch() {
  const ref1 = useRef<HTMLElement>(null);
  const ref2 = useRef<HTMLElement>(null);
  const isInView1 = useInView(ref1, { amount: 0.35 });
  const isInView2 = useInView(ref2, { amount: 0.35 });

  return (
    <>
      {/* ── Slide 1: Brand Identity ──────────────────────────────────── */}
      <section
        ref={ref1}
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

        {/* Purple accent strip — left edge, desktop */}
        <motion.div
          className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
          style={{ backgroundColor: PUNCH_PURPLE }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView1 ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
        />

        {/* Purple accent block — top-right decorative field */}
        <motion.div
          className="absolute hidden md:block"
          style={{
            backgroundColor: PUNCH_PURPLE,
            right: "clamp(4rem, 15vw, 18rem)",
            top: 0,
            width: "clamp(2rem, 4vw, 5rem)",
            height: "clamp(6rem, 20vh, 16rem)",
            opacity: 0.55,
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView1 ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          aria-hidden="true"
        />

        {/* Main sticker art image — right zone, rotated */}
        <motion.div
          className="absolute right-4 top-[8%] hidden md:block"
          style={{
            width: "clamp(16rem, 28vw, 24rem)",
            transform: "rotate(2.5deg)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          aria-hidden="true"
        >
          <img
            src={IMG.stickerArt}
            alt=""
            className="h-auto w-full object-cover"
            style={{ aspectRatio: "3/4" }}
          />
        </motion.div>

        {/* Secondary image — bottom-right, counter-rotated */}
        <motion.div
          className="absolute bottom-[12%] right-[28%] hidden lg:block"
          style={{
            width: "clamp(8rem, 12vw, 11rem)",
            transform: "rotate(-4deg)",
          }}
          initial={{ opacity: 0 }}
          animate={isInView1 ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          aria-hidden="true"
        >
          <img
            src={IMG.stickerGrid1}
            alt=""
            className="h-auto w-full object-cover"
            style={{ aspectRatio: "1/1" }}
          />
        </motion.div>

        {/* Category + year header */}
        <motion.div
          className="absolute left-8 flex items-center gap-4 md:left-10 lg:left-14"
          style={{ top: "calc(var(--oni-header-h) + 1.75rem)" }}
          initial={{ opacity: 0 }}
          animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
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
        <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-14 md:px-10 md:pb-16 lg:px-14 lg:pb-20">
          {/* "NEVER SLEEP" secondary tagline */}
          <motion.p
            className="mb-2 text-[10px] font-medium tracking-[0.40em] text-white/20 md:mb-3"
            initial={{ opacity: 0 }}
            animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            NEVER SLEEP
          </motion.p>

          {/* Client signal */}
          <motion.p
            className="mb-1 text-[10px] font-medium tracking-[0.32em]"
            style={{ color: PUNCH_PURPLE }}
            initial={{ opacity: 0 }}
            animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            PUNCH · ПУНШ
          </motion.p>

          {/* Project title */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-bebas leading-[0.9] text-white"
              style={{ fontSize: "clamp(3.25rem, 11vw, 8.5rem)" }}
              initial={{ y: "105%" }}
              animate={isInView1 ? { y: "0%" } : { y: "105%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              BRAND IDENTITY
            </motion.h2>
          </div>

          {/* Scope tags */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2 md:mt-6"
            initial={{ opacity: 0, y: 6 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
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
        </div>

        {/* Mobile image — shown below header on small screens */}
        <motion.div
          className="absolute left-1/2 top-[16%] -translate-x-1/2 block md:hidden"
          style={{ width: "min(80vw, 18rem)" }}
          initial={{ opacity: 0 }}
          animate={isInView1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          aria-hidden="true"
        >
          <img
            src={IMG.stickerArt}
            alt=""
            className="h-auto w-full object-cover"
            style={{ aspectRatio: "3/4" }}
          />
        </motion.div>
      </section>

      {/* ── Slide 2: Cosmic — NEVER SLEEP ───────────────────────────── */}
      <section
        ref={ref2}
        className="relative overflow-hidden"
        style={{
          height: "100vh",
          scrollSnapAlign: "start",
          flexShrink: 0,
          backgroundColor: "#050508",
        }}
      >
        {/* Space ambient glow — centered radial haze */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 46%, rgba(143,98,199,0.11) 0%, rgba(143,98,199,0.04) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Ghost "NEVER SLEEP" — giant bottom flood */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden text-center font-bebas leading-none text-white"
          style={{ fontSize: "clamp(5rem, 22vw, 18rem)", opacity: 0.035, lineHeight: 0.85 }}
          aria-hidden="true"
        >
          NEVER SLEEP
        </div>

        {/* ── RAPPER — full-width on mobile, scaled cutout on desktop ── */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full md:left-1/2 md:w-[clamp(22rem,40vw,34rem)] md:-translate-x-1/2"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView2 ? { opacity: 0.92, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <img
              src={IMG.rapper}
              alt=""
              className="h-auto w-full scale-[1.06] md:scale-100"
            />
          </motion.div>
        </div>

        {/* ── PLANET + ORBIT — oversized on mobile (crops off-screen), contained on desktop ── */}
        <div
          className="pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 md:top-[46%]"
          style={{ zIndex: 2 }}
          aria-hidden="true"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={isInView2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.72 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Planet — ~155vw on mobile so edges bleed past viewport */}
            <motion.img
              src={IMG.planet}
              alt=""
              className="block w-[155vw] max-w-none md:w-[clamp(12rem,26vw,22rem)]"
              style={{
                filter:
                  "brightness(0.92) saturate(1.08) drop-shadow(0 12px 40px rgba(0,0,0,0.7))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            />

            {/* Orbit anchor — cup path scales with planet size */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-0 w-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, ease: "linear", repeat: Infinity }}
            >
              <div
                className="absolute left-[calc(77.5vw+0.4rem)] top-0 -translate-y-1/2 md:left-[clamp(7.5rem,13.5vw,12rem)]"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 9, ease: "linear", repeat: Infinity }}
                >
                  <motion.img
                    src={IMG.cup}
                    alt=""
                    className="w-12 md:w-[clamp(2.5rem,4.5vw,4rem)]"
                    style={{
                      filter:
                        "drop-shadow(0 0 10px rgba(143,98,199,0.65)) drop-shadow(0 0 4px rgba(200,180,255,0.2))",
                    }}
                    animate={{
                      scale:   [1.0, 0.80, 0.55, 0.80, 1.0],
                      opacity: [1.0, 0.85, 0.35, 0.85, 1.0],
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

        {/* Caption — bottom-left */}
        <motion.div
          className="absolute bottom-12 left-8 z-10 md:bottom-14 md:left-10 lg:bottom-16 lg:left-14"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.55 }}
        >
          <p
            className="text-[9px] font-medium tracking-[0.38em]"
            style={{ color: PUNCH_PURPLE }}
          >
            PUNCH · ПУНШ
          </p>
          <p
            className="mt-0.5 font-bebas text-white"
            style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.5rem)" }}
          >
            NEVER SLEEP
          </p>
        </motion.div>

        {/* Ghost "01" — bottom-right corner flood */}
        <div
          className="pointer-events-none absolute -bottom-6 -right-4 select-none font-bebas leading-none text-white"
          style={{ fontSize: "clamp(8rem, 26vw, 20rem)", opacity: 0.03 }}
          aria-hidden="true"
        >
          01
        </div>
      </section>
    </>
  );
}
