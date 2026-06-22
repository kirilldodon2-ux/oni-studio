"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  main:  "/cases/punch/66233c76db34d637b5f0a2da5208a41b8cc8b3ff.png",
  badge: "/cases/punch/386398f5faf9366a6343534c166c85faf25c7779.png",
  logo:  "/cases/punch/7dd49aa878b92dd7d27210878de79a8b07d14f7d.png",
};

export function PunchBrand() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#101010" }}
    >
      {/* Ghost label */}
      <div
        className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-bebas leading-none text-white"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)", opacity: 0.028, writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        BRAND
      </div>

      {/* Left — section label + text stack */}
      <div className="relative z-10 flex w-1/2 flex-col justify-center pl-8 md:pl-10 lg:pl-14">
        <motion.p
          className="mb-4 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 01 / BRAND MARK
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            BRAND
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            IDENTITY
          </motion.h2>
        </div>

        <motion.p
          className="mt-6 max-w-xs text-[11px] leading-[1.8] tracking-[0.04em] text-white/35 md:mt-8"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Full event branding system for PUNCH NEVER SLEEP — logo, typography,
          colour palette, sticker kit, and merch identity.
        </motion.p>

        {/* Two small logo badges */}
        <motion.div
          className="mt-8 flex items-center gap-5 md:mt-10"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <img src={IMG.logo}  alt="" className="h-auto w-14 md:w-18" />
          <img src={IMG.badge} alt="" className="h-auto w-14 md:w-18" />
        </motion.div>
      </div>

      {/* Right — large sticker art */}
      <div className="relative z-10 flex w-1/2 items-center justify-center pr-6 md:pr-10">
        <motion.div
          style={{ width: "clamp(14rem, 36vw, 28rem)", transform: "rotate(2deg)" }}
          initial={{ opacity: 0, x: 40, rotate: 8 }}
          animate={isInView
            ? { opacity: 1, x: 0, rotate: 2 }
            : { opacity: 0, x: 40, rotate: 8 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <img src={IMG.main} alt="PUNCH sticker art" className="h-auto w-full" />
        </motion.div>
      </div>

      {/* Purple right-edge accent */}
      <motion.div
        className="absolute right-0 top-0 h-full w-[3px]"
        style={{ backgroundColor: PURPLE }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      />
    </section>
  );
}
