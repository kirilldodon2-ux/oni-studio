"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  dark:  "/cases/punch/1e2883204045a1bf2ec7e8d609cd34ac932ced5c.png",
  light: "/cases/punch/16694f0603c5866c29bb58303fa0a90fd95bf968.png",
};

export function PunchMerch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#101010" }}
    >
      {/* Left half — dark merch full-bleed */}
      <motion.div
        className="relative w-1/2 overflow-hidden"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      >
        <img
          src={IMG.dark}
          alt="PUNCH merch dark"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.85)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to right, transparent 60%, rgba(16,16,16,0.6) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Right half — light merch full-bleed */}
      <motion.div
        className="relative w-1/2 overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <img
          src={IMG.light}
          alt="PUNCH merch light"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.9)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to left, transparent 60%, rgba(16,16,16,0.6) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Vertical divider */}
      <motion.div
        className="absolute left-1/2 top-0 z-20 w-[2px] -translate-x-1/2 bg-white/10"
        style={{ height: "100%" }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, delay: 0.35 }}
      />

      {/* Overlay gradient — top + bottom */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(16,16,16,0.5) 0%, transparent 25%, transparent 75%, rgba(16,16,16,0.7) 100%)",
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
          SECTION 07 / MERCH
        </motion.p>
        <div className="flex items-end justify-between">
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
            className="hidden max-w-[14rem] text-right text-[10px] leading-[1.7] text-white/30 lg:block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Branded clothing line — the identity taken off-screen and into the real world.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
