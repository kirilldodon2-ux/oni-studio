"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  rapper: "/cases/punch/216be9907372b69d0e269a72403e810c8a85e1e9.png",
  cup:    "/cases/punch/0911e0cbaf2f31314e861e459b1a42d26baf1d47.png",
  /* 12 sticker grid items — from section 12.3 in Figma Make */
  grid: [
    "/cases/punch/0192d7aa82402731c768076d15a8723288da4b2d.png",
    "/cases/punch/c9eb72d915f6e28f08d7e999ac7058849925ca60.png",
    "/cases/punch/7dd49aa878b92dd7d27210878de79a8b07d14f7d.png",
    "/cases/punch/c759dd81a987ba16171e41e95bb6081bc47c411a.png",
    "/cases/punch/fb895568246bf568e7bb2679622ca5715da9d0d1.png",
    "/cases/punch/2978c4726895f4bd7680251dc60f90da5cbf99c5.png",
    "/cases/punch/da6347751165a41a9ae1638e750456b7e87af6de.png",
    "/cases/punch/43481b646499f9a303dc4e0564a3c9a4e4b39c79.png",
    "/cases/punch/386398f5faf9366a6343534c166c85faf25c7779.png",
    "/cases/punch/a461b2a2a462a7968b2791db415de0e33cd452ea.png",
    "/cases/punch/0e7865bf374b74f7203d80ffd3651f47646214b4.png",
    "/cases/punch/888dd8166f9a77ab3219c6d38d87f336b8fe3e5b.png",
  ],
};

export function PunchStickers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#101010" }}
    >
      {/* Purple vertical sidebar */}
      <motion.div
        className="absolute left-0 top-0 z-10 h-full"
        style={{ width: "clamp(3rem, 6vw, 5rem)", backgroundColor: PURPLE }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        aria-hidden="true"
      />

      {/* Left: rapper figure */}
      <div className="relative z-20 flex w-2/5 items-end">
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 w-full"
          style={{ paddingLeft: "clamp(3rem, 6vw, 5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <img
            src={IMG.rapper}
            alt=""
            className="h-auto w-full"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>

        {/* Floating cup */}
        <motion.div
          className="absolute right-[-2rem] top-[12%] z-30"
          style={{ width: "clamp(4rem, 8vw, 7rem)" }}
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={isInView
            ? { opacity: 1, scale: 1, rotate: -12 }
            : { opacity: 0, scale: 0.5, rotate: -30 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <motion.img
            src={IMG.cup}
            alt=""
            className="h-auto w-full drop-shadow-xl"
            animate={{ y: [-6, 6, -6], rotate: [-12, -8, -12] }}
            transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Right: sticker grid */}
      <div className="relative z-20 flex w-3/5 flex-col justify-center px-4 py-10 md:px-6">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          SECTION 09 / STICKER KIT
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.9] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            STICKER
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="mb-4 font-bebas leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            KIT
          </motion.h2>
        </div>

        {/* 3 × 4 sticker grid */}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {IMG.grid.map((src, i) => (
            <motion.div
              key={src}
              className="aspect-square overflow-hidden rounded-sm"
              style={{ backgroundColor: "#1a1a1a" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.7 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3 + i * 0.04,
              }}
            >
              <img src={src} alt="" className="h-full w-full object-contain p-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
