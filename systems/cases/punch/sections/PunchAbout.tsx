"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";
const LOGO   = "/cases/punch/punch-logo.png";

export function PunchAbout() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#101010" }}
    >
      {/* Purple diagonal band */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-[45%]"
        style={{ height: "clamp(3rem, 7vw, 5.5rem)", backgroundColor: PURPLE }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        aria-hidden="true"
      />

      {/* Left col — logo + section label */}
      <div className="relative z-10 flex w-2/5 flex-col items-center justify-center px-8 md:px-10 lg:pl-14">
        <motion.p
          className="mb-5 self-start text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 02 / ABOUT
        </motion.p>

        <motion.div
          style={{ width: "clamp(8rem, 18vw, 14rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <img
            src={LOGO}
            alt="ПУНШ NEVER SLEEP"
            className="h-auto w-full"
            style={{ filter: "drop-shadow(0 0 24px rgba(143,98,199,0.4))" }}
          />
        </motion.div>
      </div>

      {/* Right col — text */}
      <div className="relative z-10 flex w-3/5 flex-col justify-center pr-8 md:pr-10 lg:pr-14">
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            ABOUT
          </motion.h2>
        </div>

        <motion.p
          className="mt-5 max-w-[28rem] text-[12px] font-medium leading-[1.85] tracking-[0.025em] text-white/55 md:mt-7"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          PUNCH is a party organizer from Murmansk.
        </motion.p>

        <motion.p
          className="mt-4 max-w-[28rem] text-[11px] leading-[1.85] text-white/30"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.48 }}
        >
          Task: create a bold, recognizable identity for a series of club events
          that will live in all points of contact — from posters to merchandise
          and the design of the venue itself.
        </motion.p>

        <motion.p
          className="mt-4 max-w-[28rem] text-[11px] leading-[1.85] text-white/25"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          We built the style on street aesthetics: grunge, spray can, torn
          textures and rich purple. This is the language of the night city that
          doesn't sleep — hence the slogan{" "}
          <span style={{ color: PURPLE }}>NEVER SLEEP</span>. The Cyrillic logo
          "ПУНШ" became the core of the system: hard, angular, instantly
          readable.
        </motion.p>

        {/* Scope tags */}
        <motion.div
          className="mt-6 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          {["Event Branding", "Visual Identity", "Merch", "Posters", "Social Media"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/12 px-3 py-1 text-[9px] tracking-[0.2em] text-white/25"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
