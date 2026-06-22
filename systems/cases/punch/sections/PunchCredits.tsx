"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const PURPLE = "#8f62c7";
const LOGO   = "/cases/punch/punch-logo.png";

const IMG = {
  rapper: "/cases/punch/216be9907372b69d0e269a72403e810c8a85e1e9.png",
  planet: "/cases/punch/planet.png",
};

export function PunchCredits() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#06040c" }}
    >
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(6,4,12,0.55) 0%, rgba(6,4,12,0.97) 80%)",
        }}
        aria-hidden="true"
      />

      {/* Left: XXXMANERA in deep shadow */}
      <motion.div
        className="pointer-events-none absolute left-[-10%] top-1/2 -translate-y-1/2 z-[2]"
        style={{ width: "clamp(18rem, 44vw, 38rem)" }}
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 0.13, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
        aria-hidden="true"
      >
        <img
          src={IMG.rapper}
          alt=""
          className="h-auto w-full"
          style={{ mixBlendMode: "screen", filter: "brightness(0.6) saturate(0.5)" }}
        />
      </motion.div>

      {/* Right: planet in slow spin */}
      <motion.div
        className="pointer-events-none absolute right-[-14%] top-1/2 -translate-y-1/2 z-[2]"
        style={{ width: "clamp(22rem, 48vw, 44rem)", opacity: 0.16 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <img src={IMG.planet} alt="" className="h-auto w-full" style={{ mixBlendMode: "screen" }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">

        {/* Main logo — the real brand mark */}
        <motion.div
          className="relative mb-8"
          style={{ width: "clamp(12rem, 34vw, 28rem)" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Base logo */}
          <img
            src={LOGO}
            alt="ПУНШ NEVER SLEEP"
            className="h-auto w-full"
            style={{ filter: `drop-shadow(0 0 40px rgba(143,98,199,0.5))` }}
          />
          {/* Intermittent red glitch layer */}
          <motion.img
            src={LOGO}
            alt=""
            className="pointer-events-none absolute inset-0 h-auto w-full"
            style={{ mixBlendMode: "screen" }}
            animate={{
              x:       [0, -5, 0, 4, 0],
              opacity: [0, 0.65, 0, 0.55, 0],
              filter:  [
                "hue-rotate(0deg) saturate(3)",
                "hue-rotate(330deg) saturate(4)",
                "hue-rotate(0deg)",
                "hue-rotate(300deg) saturate(4)",
                "hue-rotate(0deg)",
              ],
            }}
            transition={{
              duration: 0.28,
              times: [0, 0.15, 0.4, 0.65, 1],
              repeat: Infinity,
              repeatDelay: 6,
              delay: 2,
            }}
            aria-hidden="true"
          />
          {/* Cyan glitch layer */}
          <motion.img
            src={LOGO}
            alt=""
            className="pointer-events-none absolute inset-0 h-auto w-full"
            style={{ mixBlendMode: "screen" }}
            animate={{
              x:       [0, 5, 0, -4, 0],
              opacity: [0, 0.5, 0, 0.45, 0],
              filter:  [
                "hue-rotate(0deg) saturate(3)",
                "hue-rotate(160deg) saturate(4)",
                "hue-rotate(0deg)",
                "hue-rotate(180deg) saturate(4)",
                "hue-rotate(0deg)",
              ],
            }}
            transition={{
              duration: 0.28,
              times: [0, 0.15, 0.4, 0.65, 1],
              repeat: Infinity,
              repeatDelay: 6,
              delay: 2.03,
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mb-6 h-px bg-white/10 md:mb-8"
          style={{ width: "clamp(3rem, 8vw, 5rem)" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        />

        {/* Credits row */}
        <motion.p
          className="text-[10px] tracking-[0.4em] text-white/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          CREATED BY ONI STUDIO · 2026
        </motion.p>

        {/* Role tags */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {["Event Branding", "Visual Identity", "Merch", "Posters"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-[9px] tracking-[0.22em] text-white/20"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Back to cases */}
        <motion.div
          className="mt-10 md:mt-12"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Link
            href="/cases"
            className="group inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.35em] text-white/30 transition-opacity hover:opacity-60"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            ALL CASES
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
