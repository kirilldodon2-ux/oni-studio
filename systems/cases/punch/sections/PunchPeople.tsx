"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";

const PURPLE = "#8f62c7";

const IMG = {
  group: punchSrc("686511ca33145121b787176964fce5dda072d7a3.png"),
  suits: punchSrc("7574754a58983ab6d7aceca6d269603f69699401.png"),
};

export function PunchPeople() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#080808" }}
    >
      {/* Full-bleed image grid */}
      <div className="absolute inset-0 grid grid-cols-2">
        {/* Left photo */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <img
            src={IMG.group}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.65) saturate(0.8)" }}
          />
        </motion.div>

        {/* Right photo */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
        >
          <img
            src={IMG.suits}
            alt=""
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.55) saturate(0.7)" }}
          />
        </motion.div>
      </div>

      {/* Overlay gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Center divider line */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 w-px -translate-x-1/2 bg-white/10"
        style={{ height: "100%" }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Bottom content */}
      <div className="relative z-20 mt-auto px-8 pb-10 md:px-10 lg:px-14">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          SECTION 07 / EVENT
        </motion.p>

        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9] text-white"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              >
                EVENT
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9]"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: PURPLE }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
              >
                ATMOSPHERE
              </motion.h2>
            </div>
          </div>

          <div className="hidden flex-col items-end gap-4 lg:flex">
            <motion.p
              className="max-w-[18rem] text-right text-[10px] leading-[1.75] text-white/30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              1700 гостей. Одна ночь. Каждый брендированный элемент —
              от арки входа до стакана в руке — говорил на одном визуальном языке.
            </motion.p>
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              {[["1700", "ГОСТЕЙ"], ["1", "НОЧЬ"], ["∞", "ВАЙБ"]].map(([num, label]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="font-bebas text-[1.6rem] leading-none text-white">{num}</span>
                  <span className="text-[8px] tracking-[0.30em] text-white/25">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Top-left label — cleared below fixed navbar */}
      <motion.div
        className="absolute left-8 z-20 md:left-10 lg:left-14"
        style={{ top: "calc(var(--oni-header-h, 4rem) + 1.5rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <p className="text-[9px] tracking-[0.28em] text-white/20">PUNCH · ПУНШ</p>
      </motion.div>
    </section>
  );
}
