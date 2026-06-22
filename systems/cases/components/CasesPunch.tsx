"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

const PUNCH_PURPLE = "#8f62c7";
const BG = "#06040c";

const SCOPE = ["Event Branding", "Visual Identity", "Merch", "Posters"];

const IMG = {
  planet: "/cases/punch/73f66c1ea445178c5f4724f0e9f11f454db905cf.png",
  cup:    "/cases/punch/0911e0cbaf2f31314e861e459b1a42d26baf1d47.png",
  rapper: "/cases/punch/9c4b5265bef96a23df48b66a20fdefac5f3870bf.png",
  // Right-side brand sticker collage
  s1:     "/cases/punch/7dd49aa878b92dd7d27210878de79a8b07d14f7d.png",
  s2:     "/cases/punch/2978c4726895f4bd7680251dc60f90da5cbf99c5.png",
  s3:     "/cases/punch/a461b2a2a462a7968b2791db415de0e33cd452ea.png",
  s4:     "/cases/punch/33c8208a5b3400514fadf44d21a7c8d9cfce2062.png",
  s5:     "/cases/punch/0e7865bf374b74f7203d80ffd3651f47646214b4.png",
  s6:     "/cases/punch/386398f5faf9366a6343534c166c85faf25c7779.png",
} as const;

// Sticker collage — right zone, absolute positions + oscillating tilt
const STICKERS = [
  { src: IMG.s1, left: "60%", top:  "6%", w: "clamp(7rem,12vw,10.5rem)", rot: -11, amp: 4.5, dur: 2.9, delay: 0.0 },
  { src: IMG.s3, left: "78%", top:  "3%", w: "clamp(5rem, 9vw, 8rem)",   rot:  7,  amp: 3.5, dur: 3.5, delay: 0.3 },
  { src: IMG.s2, left: "57%", top: "36%", w: "clamp(8rem,14vw,12rem)",   rot: -5,  amp: 5.0, dur: 3.1, delay: 0.7 },
  { src: IMG.s6, left: "75%", top: "42%", w: "clamp(6rem,10vw, 9rem)",   rot: 17,  amp: 4.0, dur: 2.6, delay: 0.2 },
  { src: IMG.s4, left: "63%", top: "63%", w: "clamp(7rem,12vw,10rem)",   rot:-22,  amp: 5.5, dur: 3.8, delay: 0.9 },
  { src: IMG.s5, left: "81%", top: "60%", w: "clamp(4.5rem,7vw,6.5rem)", rot:  9,  amp: 3.0, dur: 2.7, delay: 1.1 },
] as const;

export function CasesPunch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: BG }}
    >
      {/* ── Purple ambient glow behind rapper/planet area ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 75% at 30% 35%, rgba(143,98,199,0.16) 0%, rgba(143,98,199,0.05) 55%, transparent 78%)",
        }}
        aria-hidden="true"
      />

      {/* ── Purple accent strip left ── */}
      <motion.div
        className="absolute left-0 top-0 hidden h-full w-[3px] md:block"
        style={{ backgroundColor: PUNCH_PURPLE }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
      />

      {/* ── Ghost "01" — bottom-right ── */}
      <div
        className="pointer-events-none absolute -bottom-4 -right-4 select-none font-bebas leading-none text-white"
        style={{ fontSize: "clamp(10rem, 30vw, 24rem)", opacity: 0.02 }}
        aria-hidden="true"
      >
        01
      </div>

      {/* ── Category + year — top left ── */}
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

      {/* ════════════════════════════════════════════════════════════════
          RAPPER — upper left, screen blend, behind planet (z-1)
      ════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "clamp(0.5rem, 2vw, 3rem)",
          top: "-6%",
          width: "clamp(16rem, 26vw, 23rem)",
          mixBlendMode: "screen",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 0.88, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        aria-hidden="true"
      >
        <img src={IMG.rapper} alt="" className="h-auto w-full" />
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════
          PLANET + ORBIT — upper-left, in front of rapper (z-2)
      ════════════════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "clamp(5rem, 14vw, 13rem)",
          top: "4%",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Planet */}
          <motion.img
            src={IMG.planet}
            alt=""
            style={{
              width: "clamp(16rem, 28vw, 25rem)",
              display: "block",
              filter:
                "drop-shadow(0 0 55px rgba(143,98,199,0.45)) drop-shadow(0 0 18px rgba(143,98,199,0.25))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          />

          {/* Orbit anchor */}
          <motion.div
            style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          >
            <div style={{ position: "absolute", left: "clamp(8.5rem,14.5vw,13rem)", top: 0, transform: "translateY(-50%)" }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 9, ease: "linear", repeat: Infinity }}
              >
                <motion.img
                  src={IMG.cup}
                  alt=""
                  style={{
                    width: "clamp(2.5rem,4vw,3.75rem)",
                    filter: "drop-shadow(0 0 10px rgba(143,98,199,0.9)) drop-shadow(0 0 4px rgba(200,170,255,0.3))",
                  }}
                  animate={{
                    scale:   [1.0, 0.82, 0.48, 0.82, 1.0],
                    opacity: [1.0, 0.88, 0.25, 0.88, 1.0],
                  }}
                  transition={{ duration: 9, ease: "linear", repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom gradient — fades planet/rapper into bg, reveals text ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[3] hidden md:block"
        style={{
          width: "58%",
          height: "55%",
          background: `linear-gradient(to top, ${BG} 0%, ${BG} 30%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════════════════════════
          RIGHT ZONE — sticker collage (z-5)
      ════════════════════════════════════════════════════════════════ */}
      {STICKERS.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden md:block"
          style={{ left: s.left, top: s.top, width: s.w, zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.82, rotate: s.rot }}
          animate={isInView
            ? {
                opacity: 1,
                scale: 1,
                rotate: [s.rot - s.amp, s.rot + s.amp, s.rot - s.amp],
              }
            : { opacity: 0, scale: 0.82, rotate: s.rot }}
          transition={isInView ? {
            opacity:  { duration: 0.7, delay: s.delay + 0.3 },
            scale:    { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: s.delay + 0.3 },
            rotate:   { duration: s.dur, ease: "easeInOut", repeat: Infinity, delay: s.delay + 0.6 },
          } : { duration: 0.4 }}
          aria-hidden="true"
        >
          <img src={s.src} alt="" className="h-auto w-full" />
        </motion.div>
      ))}

      {/* ════════════════════════════════════════════════════════════════
          TEXT CONTENT — bottom-left, z-10
      ════════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 z-10 flex flex-col px-8 pb-10 md:max-w-[55%] md:px-10 md:pb-12 lg:max-w-[50%] lg:px-14 lg:pb-14">

        {/* Mobile: planet — scaled, top-center */}
        <div className="pointer-events-none mb-4 block md:hidden" aria-hidden="true">
          <motion.img
            src={IMG.planet}
            alt=""
            style={{
              width: "70vw",
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 0 30px rgba(143,98,199,0.5))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
          />
        </div>

        {/* "NEVER SLEEP" */}
        <motion.p
          className="mb-2 text-[10px] font-medium tracking-[0.40em] text-white/22 md:mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          NEVER SLEEP
        </motion.p>

        {/* Client */}
        <motion.p
          className="mb-1 text-[10px] font-medium tracking-[0.32em]"
          style={{ color: PUNCH_PURPLE }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          PUNCH · ПУНШ
        </motion.p>

        {/* Title */}
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

        {/* Scope tags */}
        <motion.div
          className="mt-4 flex flex-wrap gap-2 md:mt-5"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.38 }}
        >
          {SCOPE.map((tag) => (
            <span
              key={tag}
              className="border border-white/[0.1] px-2.5 py-1 text-[10px] tracking-[0.22em] text-white/40"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* WATCH FULL — PUNCH purple */}
        <motion.div
          className="mt-5 md:mt-6"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.52 }}
        >
          <Link
            href="/cases/punch"
            className="group inline-flex items-center gap-3 px-5 py-3 text-[11px] font-medium tracking-[0.22em] text-white transition-opacity duration-200 hover:opacity-75"
            style={{ backgroundColor: PUNCH_PURPLE }}
          >
            WATCH FULL
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
