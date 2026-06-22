"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * POSTERS section — grunge aesthetic.
 * Three event posters + a noise/graffiti texture overlay for grungy depth.
 */

const IMG = {
  poster1: "/cases/punch/ae2c09d84ca24b2aeee87b4189a59e6e39b1f5b5.png",
  poster2: "/cases/punch/f47d65df327279b35fa097c276fd5e5261f519fe.png",
  poster3: "/cases/punch/5ad50bd3a5b8b9f8b22f796d983943d793075179.png",
  grunge:  "/cases/punch/33c8208a5b3400514fadf44d21a7c8d9cfce2062.png",
};

export function PunchPosters() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#f4f4f4" }}
    >
      {/* Grunge texture overlay — mix-blend-mode:multiply */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${IMG.grunge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      {/* Ghost "POSTERS" in bg */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none font-bebas leading-none text-black"
        style={{ fontSize: "clamp(8rem, 30vw, 25rem)", opacity: 0.03, letterSpacing: "0.04em" }}
        aria-hidden="true"
      >
        POSTERS
      </div>

      {/* Section header */}
      <div className="relative z-20 flex items-center justify-between px-8 pt-10 md:px-10 lg:px-14">
        <motion.p
          className="text-[9px] font-medium tracking-[0.38em] text-black/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 02 / EVENT POSTERS
        </motion.p>
        <motion.p
          className="text-[9px] font-medium tracking-[0.28em] text-black/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          PUNCH · ПУНШ · 2026
        </motion.p>
      </div>

      {/* Poster grid */}
      <div className="relative z-20 flex flex-1 items-end gap-4 px-8 pb-10 md:gap-6 md:px-10 lg:px-14">

        {/* Poster 1 — dominant, rotated */}
        <motion.div
          className="relative"
          style={{ width: "clamp(14rem, 36vw, 28rem)", flexShrink: 0 }}
          initial={{ opacity: 0, y: 60, rotate: 4 }}
          animate={isInView
            ? { opacity: 1, y: 0, rotate: -1.5 }
            : { opacity: 0, y: 60, rotate: 4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <img
            src={IMG.poster1}
            alt="XXXMANERA event poster"
            className="h-auto w-full shadow-2xl"
          />
        </motion.div>

        {/* Right column — two stacked posters */}
        <div className="flex flex-1 flex-col gap-4 md:gap-6">
          {/* Poster 2 */}
          <motion.div
            style={{ width: "clamp(9rem, 22vw, 18rem)", marginLeft: "auto" }}
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={isInView
              ? { opacity: 1, y: 0, rotate: 1.2 }
              : { opacity: 0, y: 40, rotate: -3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <img
              src={IMG.poster2}
              alt="Event poster"
              className="h-auto w-full shadow-xl"
            />
          </motion.div>

          {/* Poster 3 */}
          <motion.div
            style={{ width: "clamp(9rem, 22vw, 18rem)" }}
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            animate={isInView
              ? { opacity: 1, y: 0, rotate: -0.8 }
              : { opacity: 0, y: 40, rotate: 3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <img
              src={IMG.poster3}
              alt="Secret guest poster"
              className="h-auto w-full shadow-xl"
            />
          </motion.div>
        </div>

        {/* Title floating right */}
        <motion.div
          className="hidden flex-col items-end justify-end pb-2 lg:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          <h2 className="font-bebas leading-[0.9] text-black" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
            EVENT
          </h2>
          <h2 className="font-bebas leading-[0.9] text-black/30" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
            POSTERS
          </h2>
          <p className="mt-3 max-w-[11rem] text-right text-[10px] leading-[1.6] text-black/35">
            Print collateral for the PUNCH NEVER SLEEP event series.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
