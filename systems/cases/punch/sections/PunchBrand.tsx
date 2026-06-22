"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";

const PURPLE = "#8f62c7";

const IMG = {
  main:  punchSrc("66233c76db34d637b5f0a2da5208a41b8cc8b3ff.png"),
  badge: punchSrc("386398f5faf9366a6343534c166c85faf25c7779.png"),
  logo:  punchSrc("7dd49aa878b92dd7d27210878de79a8b07d14f7d.png"),
  wall:  punchSrc("brand-wall-texture.png"),
};

export function PunchBrand() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden md:flex-row"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#101010" }}
    >
      <div
        className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 select-none font-bebas leading-none text-white md:block"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)", opacity: 0.028, writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        BRAND
      </div>

      {/* Copy — top on mobile, left on desktop */}
      <div className="relative z-20 flex shrink-0 flex-col justify-center px-8 py-8 md:w-1/2 md:py-0 md:pl-10 md:pr-6 lg:pl-14">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25 md:mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 01 / BRAND
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.75rem, 12vw, 7rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            BRAND
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88]"
            style={{ fontSize: "clamp(2.75rem, 12vw, 7rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            IDENTITY
          </motion.h2>
        </div>

        <motion.p
          className="mt-4 max-w-sm text-[10px] leading-[1.75] tracking-[0.04em] text-white/35 md:mt-6 md:max-w-xs md:text-[11px] md:leading-[1.8]"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Задача: создать визуальную систему для многодневного клубного ивента.
          Дерзко, уличного, невозможного игнорировать. Бренд должен был работать везде —
          от постера форматом 2×3 до принта на худи.
        </motion.p>

        <motion.div
          className="mt-5 flex items-center gap-5 md:mt-8"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <CaseImage src={IMG.logo} alt="" className="h-auto w-12 md:w-14" sectionInView={isInView} />
          <CaseImage src={IMG.badge} alt="" className="h-auto w-12 md:w-14" sectionInView={isInView} />
        </motion.div>
      </div>

      {/* Visual — bottom on mobile, right on desktop */}
      <div className="relative z-10 min-h-0 flex-1 md:w-1/2">
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.08 }}
          aria-hidden="true"
        >
          <CaseImage
            src={IMG.wall}
            alt=""
            sectionInView={isInView}
            className="h-full w-full object-cover"
            style={{
              objectPosition: "42% center",
              filter: "brightness(0.38) contrast(1.18) saturate(0.55)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #101010 0%, rgba(16,16,16,0.75) 18%, rgba(16,16,16,0.2) 45%, transparent 62%), linear-gradient(to right, #101010 0%, rgba(16,16,16,0.94) 14%, rgba(16,16,16,0.55) 32%, rgba(16,16,16,0.15) 52%, transparent 68%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 58% 42%, rgba(143,98,199,0.14) 0%, transparent 72%)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(16,16,16,0.55) 0%, transparent 22%, transparent 78%, rgba(16,16,16,0.7) 100%)",
            }}
          />
        </motion.div>

        <div className="relative z-10 flex h-full items-center justify-center px-6 pb-8 pt-2 md:pr-10 md:pb-0">
          <motion.div
            style={{
              width: "clamp(11rem, 58vw, 28rem)",
              transform: "rotate(2deg)",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55)) drop-shadow(0 0 32px rgba(143,98,199,0.18))",
            }}
            initial={{ opacity: 0, y: 28, rotate: 8 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 28, rotate: 8 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <CaseImage src={IMG.main} alt="PUNCH sticker art" className="h-auto w-full" sectionInView={isInView} />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 z-20 h-[3px] w-full md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:w-[3px]"
        style={{ backgroundColor: PURPLE }}
        initial={{ scaleX: 0, scaleY: 0, originX: 0, originY: 0 }}
        animate={isInView ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      />
    </section>
  );
}
