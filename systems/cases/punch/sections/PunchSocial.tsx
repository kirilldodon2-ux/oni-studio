"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseMotionImage } from "@/systems/cases/components/CaseMotionImage";

const PURPLE = "#8f62c7";

const IMG = {
  phoneMain:   punchSrc("phone-telegram.png"),
  phoneAccent: punchSrc("phone-poster.png"),
};

export function PunchSocial() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden md:block"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#0d0010" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 md:left-[60%] md:top-1/2 md:h-[70vw] md:w-[70vw]"
        style={{
          background: `radial-gradient(circle, rgba(143,98,199,0.22) 0%, transparent 62%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none font-bebas text-white md:block"
        style={{ fontSize: "clamp(14rem, 35vw, 30rem)", opacity: 0.02, lineHeight: 1 }}
        aria-hidden="true"
      >
        06
      </div>

      {/* Copy — top band on mobile */}
      <div className="relative z-30 shrink-0 px-8 pt-[calc(var(--oni-header-h,4rem)+1rem)] md:absolute md:bottom-0 md:left-0 md:top-0 md:flex md:w-[clamp(16rem,30vw,22rem)] md:flex-col md:justify-center md:px-10 md:pt-0 lg:pl-14">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25 md:mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 06 / DIGITAL
        </motion.p>

        <motion.h2
          className="font-bebas leading-[0.88] text-white"
          style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          DIGITAL &
        </motion.h2>
        <motion.h2
          className="font-bebas leading-[0.88]"
          style={{ fontSize: "clamp(2.5rem, 11vw, 4.5rem)", color: PURPLE }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        >
          SOCIAL
        </motion.h2>

        <motion.p
          className="mt-4 max-w-[20rem] text-[10px] leading-[1.75] tracking-[0.02em] text-white/30 md:mt-5 md:max-w-[16rem] md:text-[11px] md:leading-[1.8]"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Telegram-анонсы, социальные баннеры и диджитал-ассеты —
          с той же энергией, что и в печатных материалах.
        </motion.p>

        <motion.div
          className="mt-4 flex gap-4 pb-4 md:mt-5 md:pb-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {["TELEGRAM", "VK"].map((platform) => (
            <span key={platform} className="text-[9px] tracking-[0.32em] text-white/20">
              {platform}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Phones — stacked hero on mobile, epic bleed on desktop */}
      <div className="relative z-10 min-h-0 flex-1 md:absolute md:inset-0">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[52%] w-[min(92vw,22rem)] -translate-x-1/2 -translate-y-1/2 md:left-[clamp(8rem,18vw,14rem)] md:top-auto md:bottom-[-16%] md:w-[clamp(46rem,88vw,72rem)] md:translate-x-0 md:translate-y-0"
          style={{ rotate: "-6deg" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          aria-hidden="true"
        >
          <CaseMotionImage
            src={IMG.phoneMain}
            alt="Telegram-анонс ПУНШ"
            sectionInView={isInView}
            className="h-auto w-full"
            style={{
              filter:
                "drop-shadow(0 0 60px rgba(143,98,199,0.35)) drop-shadow(0 32px 64px rgba(0,0,0,0.85))",
            }}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute right-[-8%] top-[18%] w-[min(58vw,14rem)] md:right-[-12%] md:top-[-10%] md:w-[clamp(34rem,58vw,52rem)]"
          style={{ rotate: "12deg" }}
          initial={{ opacity: 0, y: -24, rotate: 18 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 12 } : { opacity: 0, y: -24, rotate: 18 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          aria-hidden="true"
        >
          <CaseMotionImage
            src={IMG.phoneAccent}
            alt="Постер в телефоне"
            sectionInView={isInView}
            className="h-auto w-full"
            style={{
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.75)) drop-shadow(0 0 40px rgba(143,98,199,0.2))",
            }}
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[25]"
        style={{
          background:
            "linear-gradient(to bottom, #0d0010 0%, rgba(13,0,16,0.55) 22%, transparent 42%), linear-gradient(to right, #0d0010 0%, transparent 18%), linear-gradient(to top, #0d0010 0%, transparent 14%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
