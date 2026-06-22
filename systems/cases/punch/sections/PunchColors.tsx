"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const SWATCHES = [
  { name: "PURPLE",   hex: "#8f62c7", rgb: "148 · 98 · 199",  text: "#ffffff" },
  { name: "CHARCOAL", hex: "#2a2929", rgb: "42 · 41 · 41",    text: "#d9d9d9" },
  { name: "DEEP",     hex: "#101010", rgb: "16 · 16 · 16",    text: "#d9d9d9" },
  { name: "MIST",     hex: "#d9d9d9", rgb: "217 · 217 · 217", text: "#101010" },
];

export function PunchColors() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#d9d9d9" }}
    >
      <div
        className="relative z-10 flex shrink-0 items-start justify-between px-8 md:px-10 lg:px-14"
        style={{ paddingTop: "calc(var(--oni-header-h, 4rem) + 1rem)" }}
      >
        <motion.p
          className="text-[9px] font-medium tracking-[0.38em] text-black/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 04 / BRAND COLOURS
        </motion.p>
        <motion.p
          className="text-[9px] font-medium tracking-[0.28em] text-black/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          PUNCH · 2026
        </motion.p>
      </div>

      <div className="relative z-10 shrink-0 overflow-hidden px-8 pt-3 md:px-10 lg:px-14">
        <motion.h2
          className="font-bebas leading-[0.9] text-black"
          style={{ fontSize: "clamp(3rem, 14vw, 9rem)" }}
          initial={{ y: "110%" }}
          animate={isInView ? { y: "0%" } : { y: "110%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          COLOURS
        </motion.h2>
      </div>

      <motion.p
        className="relative z-10 shrink-0 px-8 pb-2 pt-2 text-[10px] leading-[1.75] tracking-[0.03em] text-black/40 md:px-10 lg:max-w-[55%] lg:px-14"
        initial={{ opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Каждый цвет выбран с весом: фиолетовый — ночь и избыток,
        антрацит — бетон и грязь, туман — дым перед рассветом.
      </motion.p>

      {/* Mobile: 2×2 grid — Desktop: horizontal row */}
      <div className="relative z-10 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-1 px-8 pb-8 pt-4 md:flex md:gap-[2px] md:px-10 md:pb-10 md:pt-6 lg:px-14">
        {SWATCHES.map((sw, i) => (
          <motion.div
            key={sw.name}
            className="flex min-h-0 flex-col justify-end overflow-hidden rounded-sm p-3 md:flex-1 md:p-5"
            style={{ backgroundColor: sw.hex }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2 + i * 0.08,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.06 }}
            >
              <p
                className="text-[8px] font-medium tracking-[0.28em] md:text-[9px] md:tracking-[0.32em]"
                style={{ color: sw.text, opacity: 0.5 }}
              >
                {sw.name}
              </p>
              <p
                className="mt-0.5 font-bebas text-[1rem] leading-none md:mt-1 md:text-[1.2rem]"
                style={{ color: sw.text }}
              >
                {sw.hex.toUpperCase()}
              </p>
              <p
                className="mt-0.5 hidden font-mono text-[9px] md:block"
                style={{ color: sw.text, opacity: 0.35 }}
              >
                RGB {sw.rgb}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
