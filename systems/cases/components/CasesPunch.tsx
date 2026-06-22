"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { punchSrc } from "@/systems/cases/punch/punchAssets";

const PUNCH_PURPLE = "#8f62c7";
const BG = "#06040c";
const SCOPE = ["Event Branding", "Visual Identity", "Merch", "Posters"];

const IMG = {
  rapper: punchSrc("216be9907372b69d0e269a72403e810c8a85e1e9.png"),
  planet: punchSrc("planet.png"),
  cup:    punchSrc("0911e0cbaf2f31314e861e459b1a42d26baf1d47.png"),
} as const;

export function CasesPunch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: BG }}
    >
      {/* Ambient glow — purple radial in left zone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 28% 38%, rgba(143,98,199,0.18) 0%, rgba(143,98,199,0.04) 60%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Left accent strip */}
      <motion.div
        className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
        style={{ backgroundColor: PUNCH_PURPLE }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
      />

      {/* Ghost "01" */}
      <div
        className="pointer-events-none absolute -bottom-4 -right-4 select-none font-bebas leading-none text-white"
        style={{ fontSize: "clamp(10rem, 30vw, 24rem)", opacity: 0.02 }}
        aria-hidden="true"
      >01</div>

      {/* Category + year */}
      <motion.div
        className="absolute left-8 z-20 flex items-center gap-4 md:left-10 lg:left-14"
        style={{ top: "calc(var(--oni-header-h, 4rem) + 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
      >
        <span className="text-[10px] font-medium tracking-[0.30em] text-white/30">IDENTITY</span>
        <span className="h-px w-4 bg-white/15" />
        <span className="text-[10px] font-medium tracking-[0.30em] text-white/20">2026</span>
      </motion.div>

      {/* PLANET — huge, right-shifted, behind artist (z=0) */}
      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          bottom: "-32%",
          left: "62%",
          translateX: "-42%",
          width: "clamp(38rem, 92vw, 78rem)",
          zIndex: 0,
        }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        aria-hidden="true"
      >
        <motion.img
          src={IMG.planet}
          alt=""
          style={{
            width: "100%",
            display: "block",
            filter: "drop-shadow(0 0 80px rgba(143,98,199,0.28)) drop-shadow(0 0 30px rgba(143,98,199,0.15))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      {/* RAPPER — z=1, left column */}
      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "-2%",
          top: "50%",
          translateY: "-40%",
          width: "clamp(22rem, 42vw, 36rem)",
          mixBlendMode: "screen",
          zIndex: 1,
          filter: "drop-shadow(0 0 30px rgba(143,98,199,0.25))",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            x: [0, -4, 3, -2, 0],
            filter: [
              "hue-rotate(0deg)",
              "hue-rotate(60deg) saturate(2)",
              "hue-rotate(-40deg)",
              "hue-rotate(0deg)",
            ],
          }}
          transition={{ duration: 0.25, times: [0, 0.2, 0.6, 1], repeat: Infinity, repeatDelay: 5.8, delay: 2 }}
        >
          <img src={IMG.rapper} alt="" className="h-auto w-full" />
        </motion.div>
      </motion.div>

      {/* CUP — z=3, near rapper hands */}
      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "clamp(18rem, 30vw, 28rem)",
          top: "clamp(30%, 44vh, 58%)",
          zIndex: 3,
          width: "clamp(2.8rem, 4.5vw, 4rem)",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        aria-hidden="true"
      >
        <motion.img
          src={IMG.cup}
          alt=""
          style={{
            width: "100%",
            mixBlendMode: "screen",
            filter: "drop-shadow(0 0 14px rgba(143,98,199,0.95)) drop-shadow(0 0 5px rgba(200,160,255,0.5))",
          }}
          animate={{
            x: [0, 18, 6, -10, 0],
            y: [0, -12, -20, -8, 0],
            rotate: [-15, -8, -20, -10, -15],
          }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      {/* Bottom gradient — z=4 */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 hidden md:block"
        style={{
          height: "55%",
          zIndex: 4,
          background: `linear-gradient(to top, ${BG} 0%, ${BG} 18%, rgba(6,4,12,0.75) 45%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* TEXT — bottom-left, z=10 */}
      <div className="absolute bottom-0 left-0 z-10 flex flex-col px-8 pb-10 md:max-w-[54%] md:px-10 md:pb-12 lg:max-w-[48%] lg:px-14 lg:pb-14">

        {/* Mobile: planet */}
        <div className="pointer-events-none mb-4 block md:hidden" aria-hidden="true">
          <motion.img
            src={IMG.planet}
            alt=""
            style={{
              width: "88vw",
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 0 30px rgba(143,98,199,0.4))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          />
        </div>

        <motion.p
          className="mb-2 text-[10px] font-medium tracking-[0.40em] text-white/22 md:mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          NEVER SLEEP
        </motion.p>

        <motion.p
          className="mb-1 text-[10px] font-medium tracking-[0.32em]"
          style={{ color: PUNCH_PURPLE }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          PUNCH · ПУНШ
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.6rem, 8.5vw, 7rem)" }}
            initial={{ y: "105%" }}
            animate={isInView ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            PARTY EVENT DESIGN
          </motion.h2>
        </div>

        <motion.div
          className="mt-4 flex flex-wrap gap-2 md:mt-5"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: 0.38 }}
        >
          {SCOPE.map((tag) => (
            <span key={tag} className="border border-white/[0.1] px-2.5 py-1 text-[10px] tracking-[0.22em] text-white/40">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-5 md:mt-6"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: 0.52 }}
        >
          <Link
            href="/cases/punch"
            className="group inline-flex items-center gap-3 px-5 py-3 text-[11px] font-medium tracking-[0.22em] text-white transition-opacity duration-200 hover:opacity-75"
            style={{ backgroundColor: PUNCH_PURPLE }}
          >
            WATCH FULL
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
