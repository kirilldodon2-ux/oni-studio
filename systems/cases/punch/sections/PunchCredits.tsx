"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  suits:  "/cases/punch/7574754a58983ab6d7aceca6d269603f69699401.png",
  badge:  "/cases/punch/386398f5faf9366a6343534c166c85faf25c7779.png",
  planet: "/cases/punch/73f66c1ea445178c5f4724f0e9f11f454db905cf.png",
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
      {/* Background: "ЛИХО ТЫ ЛИСТАНУЛ" image at very low opacity */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.12 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        aria-hidden="true"
      >
        <img
          src={IMG.suits}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(0.6) brightness(0.5)" }}
        />
      </motion.div>

      {/* Gradient over the bg image */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(6,4,12,0.75) 0%, rgba(6,4,12,0.98) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Spinning planet — subtle */}
      <motion.div
        className="pointer-events-none absolute right-[-8%] top-1/2 -translate-y-1/2"
        style={{ width: "clamp(16rem, 38vw, 32rem)", opacity: 0.12 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <img src={IMG.planet} alt="" className="h-auto w-full" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        {/* Badge */}
        <motion.div
          className="mb-8"
          style={{ width: "clamp(4rem, 8vw, 6rem)" }}
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <img src={IMG.badge} alt="" className="h-auto w-full" />
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            PUNCH
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88]"
            style={{ fontSize: "clamp(4rem, 13vw, 11rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
          >
            ПУНШ
          </motion.h2>
        </div>

        {/* Divider */}
        <motion.div
          className="my-6 h-px bg-white/12 md:my-8"
          style={{ width: "clamp(3rem, 8vw, 5rem)" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        />

        {/* Credits row */}
        <motion.p
          className="text-[10px] tracking-[0.4em] text-white/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          CREATED BY ONI STUDIO · 2026
        </motion.p>

        {/* Role tags */}
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.8, delay: 0.85 }}
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
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link
            href="/cases"
            className="group inline-flex items-center gap-3 text-[10px] font-medium tracking-[0.35em] text-white/30 transition-colors hover:text-white/70"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            ALL CASES
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
