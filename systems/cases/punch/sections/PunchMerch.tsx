"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";

const PURPLE = "#8f62c7";

const IMG = {
  event:  punchSrc("merch-event.png"),
  purple: punchSrc("merch-shirt-purple.png"),
  black:  punchSrc("merch-shirt-black.png"),
};

export function PunchMerch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#080808" }}
    >
      {/* Left 58% — atmospheric event photo */}
      <motion.div
        className="relative overflow-hidden"
        style={{ width: "58%" }}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <img
          src={IMG.event}
          alt="PUNCH merch — event atmosphere"
          className="h-full w-full object-cover object-center"
          style={{ filter: "brightness(0.78) saturate(0.9)" }}
        />
        {/* Right edge fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to right, transparent 55%, rgba(8,8,8,0.85) 100%)" }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Right 42% — two product shots stacked */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Top: purple bg shirt */}
        <motion.div
          className="relative flex-1 overflow-hidden border-b border-white/[0.06]"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <img
            src={IMG.purple}
            alt="PUNCH merch — purple"
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.85)" }}
          />
          {/* Left + bottom fade */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, transparent 60%, rgba(8,8,8,0.6) 100%), linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 40%)",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Bottom: black bg shirt */}
        <motion.div
          className="relative flex-1 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <img
            src={IMG.black}
            alt="PUNCH merch — black"
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.9)" }}
          />
          {/* Left + top fade */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, transparent 60%, rgba(8,8,8,0.6) 100%), linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 40%)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Global overlays */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 22%, transparent 72%, rgba(8,8,8,0.8) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-10 md:px-10 lg:px-14">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          SECTION 08 / MERCH
        </motion.p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9] text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              >
                CLOTHES &
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: PURPLE }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
              >
                MERCH
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="hidden max-w-[18rem] text-right text-[10px] leading-[1.75] text-white/28 lg:block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Фирменный мерч: брендинг вышел за экран и стал частью реальной жизни.
            Мурманск на груди — пункш на спине.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
