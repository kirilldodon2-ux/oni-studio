"use client";

import { motion } from "motion/react";

export function CasesCover() {
  return (
    <section
      className="relative flex flex-col overflow-hidden bg-[#070707]"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      {/* ─────────────────────────────────────────────────────
          ONI LOGO — right zone, lunar ghost
          • invert(1) → white on dark
          • radial mask: bright top-left, fades to void bottom-right
          • blur(0.5px) + drop-shadow → atmospheric glow
          • slow CW rotation (100s)
          • entrance: scale 0.88→1, opacity 0→1
      ───────────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          right: "-4%",
          top: "50%",
          translateY: "-50%",
          width: "clamp(18rem, 40vw, 36rem)",
          zIndex: 1,
        }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        aria-hidden="true"
      >
        <motion.img
          src="/logo/oni_logo_black.svg"
          alt=""
          className="h-auto w-full"
          style={{
            /* Invert black→white, soft atmospheric blur, faint glow */
            filter: "invert(1) blur(0.5px) drop-shadow(0 0 45px rgba(255,255,255,0.07))",
            /*
             * Lunar radial mask — gradient origin in upper-left quadrant.
             * Logo is bright top-left, dissolves toward bottom-right void.
             */
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 64% at 36% 34%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.12) 62%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 62% 64% at 36% 34%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.12) 62%, transparent 80%)",
            opacity: 0.48,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 100, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      {/* ─────────────────────────────────────────────────────
          ANNOTATION — moved to bottom-right (was top-8, overlapped MENU)
      ───────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute right-6 z-10 select-none text-right text-[9px] font-medium tracking-[0.28em] text-white/15 md:right-10 lg:right-14"
        style={{ bottom: "clamp(2.5rem, 6vh, 4rem)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        aria-hidden="true"
      >
        <span className="block">MMXXVI</span>
        <span className="mt-0.5 block">ONI STUDIO</span>
      </motion.div>

      {/* ─────────────────────────────────────────────────────
          MAIN TITLE — bottom-left
      ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 md:px-14 md:pb-20 lg:px-20">
        <motion.p
          className="mb-3 text-[10px] font-medium tracking-[0.32em] text-white/35 md:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          CASE STUDIES · 2026
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            26&apos;
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="font-bebas leading-[0.88] text-white/28"
            style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            CASES
          </motion.h1>
        </div>

        <motion.div
          className="mt-7 h-px bg-white/12 md:mt-9"
          style={{ width: "clamp(2.5rem, 8vw, 5rem)" }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
        />
      </div>

      {/* Vertical scroll cue — bottom center */}
      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex">
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
        >
          <div className="h-20 w-px rounded-full bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
