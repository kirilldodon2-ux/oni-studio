"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";
const PLANET = "/cases/punch/73f66c1ea445178c5f4724f0e9f11f454db905cf.png";

/** RGB-split glitch layer */
function GlitchLayer({ color, delayOffset }: { color: string; delayOffset: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute inset-0 select-none font-bebas leading-none"
      style={{
        color,
        mixBlendMode: "screen",
        fontSize: "clamp(7rem, 24vw, 20rem)",
      }}
      animate={{
        x: [0, color.includes("255,0") ? -5 : 5, 0, color.includes("255,0") ? 4 : -4, 0],
        opacity: [0, 1, 0, 1, 0],
      }}
      transition={{
        duration: 0.35,
        times: [0, 0.15, 0.4, 0.65, 1],
        repeat: Infinity,
        repeatDelay: 5,
        delay: delayOffset,
      }}
      aria-hidden="true"
    >
      ПУНШ
    </motion.span>
  );
}

export function PunchCover() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#06040c" }}
    >
      {/* Ambient purple glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(143,98,199,0.14) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Planet — large ambient background, slow spin */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ width: "clamp(28rem, 55vw, 50rem)", zIndex: 0 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.22, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 2, ease: "easeOut" }}
        aria-hidden="true"
      >
        <motion.img
          src={PLANET}
          alt=""
          className="h-auto w-full"
          style={{ filter: "drop-shadow(0 0 80px rgba(143,98,199,0.5))" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      {/* Content — center of viewport */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">

        {/* ПУНШ — glitch title */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Base text */}
          <span
            className="block select-none font-bebas leading-none text-white"
            style={{ fontSize: "clamp(7rem, 24vw, 20rem)" }}
          >
            ПУНШ
          </span>
          {/* Red channel */}
          <GlitchLayer color="rgba(255,0,80,0.75)"  delayOffset={0.8} />
          {/* Cyan channel */}
          <GlitchLayer color="rgba(0,255,200,0.65)" delayOffset={0.83} />
        </motion.div>

        {/* NEVER SLEEP */}
        <motion.p
          className="mt-2 text-[11px] font-medium tracking-[0.55em] md:mt-3"
          style={{ color: PURPLE }}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          NEVER SLEEP
        </motion.p>

        {/* Divider */}
        <motion.div
          className="my-5 h-px bg-white/15 md:my-6"
          style={{ width: "clamp(3rem, 8vw, 5rem)" }}
          initial={{ scaleX: 0, originX: 0.5 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        />

        {/* Descriptor */}
        <motion.p
          className="text-[10px] font-medium tracking-[0.32em] text-white/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          PARTY EVENT DESIGN · BRAND IDENTITY · 2026
        </motion.p>
      </div>

      {/* Bottom annotation */}
      <motion.div
        className="absolute bottom-8 left-8 z-10 md:bottom-10 md:left-10 lg:left-14"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-[9px] tracking-[0.28em] text-white/25">PUNCH · ПУНШ</p>
        <p className="mt-0.5 text-[9px] tracking-[0.28em] text-white/15">FULL CASE · ONI STUDIO</p>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={isInView ? { height: 72 } : { height: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
        >
          <div className="h-[72px] w-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
