"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";

const PURPLE = "#8f62c7";
const LOGO   = punchSrc("punch-logo.png");
const PLANET = punchSrc("planet.png");

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
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(143,98,199,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Planet — huge ambient BG, bottom-right, slow spin */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          bottom: "-28%",
          right: "-18%",
          width: "clamp(28rem, 62vw, 56rem)",
          zIndex: 0,
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 0.22, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        aria-hidden="true"
      >
        <motion.img
          src={PLANET}
          alt=""
          className="h-auto w-full"
          style={{ filter: "drop-shadow(0 0 60px rgba(143,98,199,0.35))" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">

        {/* ПУНШ logo — the actual brand mark with glitch effect */}
        <motion.div
          className="relative"
          style={{ width: "clamp(14rem, 42vw, 36rem)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Base logo */}
          <img
            src={LOGO}
            alt="ПУНШ NEVER SLEEP"
            className="h-auto w-full"
            style={{ filter: "drop-shadow(0 0 40px rgba(143,98,199,0.55))" }}
          />

          {/* Red glitch layer */}
          <motion.img
            src={LOGO}
            alt=""
            className="pointer-events-none absolute inset-0 h-auto w-full"
            style={{ mixBlendMode: "screen" }}
            animate={{
              x:       [0, -6, 0, 5, 0],
              opacity: [0, 0.7, 0, 0.6, 0],
              filter:  [
                "hue-rotate(0deg) saturate(3)",
                "hue-rotate(330deg) saturate(4)",
                "hue-rotate(0deg) saturate(3)",
                "hue-rotate(300deg) saturate(4)",
                "hue-rotate(0deg) saturate(3)",
              ],
            }}
            transition={{
              duration: 0.3,
              times: [0, 0.15, 0.4, 0.65, 1],
              repeat: Infinity,
              repeatDelay: 5,
              delay: 1.2,
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
              x:       [0, 6, 0, -5, 0],
              opacity: [0, 0.55, 0, 0.5, 0],
              filter:  [
                "hue-rotate(0deg) saturate(3)",
                "hue-rotate(160deg) saturate(4)",
                "hue-rotate(0deg) saturate(3)",
                "hue-rotate(180deg) saturate(4)",
                "hue-rotate(0deg) saturate(3)",
              ],
            }}
            transition={{
              duration: 0.3,
              times: [0, 0.15, 0.4, 0.65, 1],
              repeat: Infinity,
              repeatDelay: 5,
              delay: 1.23,
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="my-5 h-px bg-white/15 md:my-6"
          style={{ width: "clamp(3rem, 7vw, 4.5rem)" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />

        {/* Descriptor */}
        <motion.p
          className="text-[10px] font-medium tracking-[0.32em] text-white/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          PARTY EVENT DESIGN · BRAND IDENTITY · 2026
        </motion.p>
      </div>

      {/* Bottom annotation */}
      <motion.div
        className="absolute bottom-8 left-8 z-10 md:bottom-10 md:left-10 lg:left-14"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
      >
        <p className="text-[9px] tracking-[0.28em] text-white/25">PUNCH · ПУНШ</p>
        <p className="mt-0.5 text-[9px] tracking-[0.28em] text-white/15">FULL CASE · ONI STUDIO</p>
      </motion.div>

      {/* Scroll line */}
      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={isInView ? { height: 64 } : { height: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.3 }}
        >
          <div className="h-16 w-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
