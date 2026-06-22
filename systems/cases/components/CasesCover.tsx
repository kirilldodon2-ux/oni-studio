"use client";

import { motion } from "motion/react";

export function CasesCover() {
  return (
    <section
      className="relative flex flex-col overflow-hidden bg-[#070707]"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      {/* Top-right annotation */}
      <div
        className="pointer-events-none absolute right-6 top-8 select-none text-right text-[10px] font-medium tracking-[0.28em] text-white/20 md:right-10 lg:right-14"
        aria-hidden="true"
      >
        <span className="block">MMXXVI</span>
        <span className="mt-0.5 block">ONI STUDIO</span>
      </div>

      {/* Main title — bottom-left anchored */}
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

      {/* Vertical scroll cue — bottom center, desktop */}
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
