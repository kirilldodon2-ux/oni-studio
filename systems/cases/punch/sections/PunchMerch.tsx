"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";

const PURPLE = "#8f62c7";

const IMG = {
  event:  punchSrc("merch-event.png"),
  purple: punchSrc("merch-shirt-purple.png"),
  black:  punchSrc("merch-shirt-black.png"),
};

export function PunchMerch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden md:flex-row"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#080808" }}
    >
      {/* Event atmosphere — top on mobile */}
      <motion.div
        className="relative h-[34vh] shrink-0 overflow-hidden md:h-full md:w-[58%]"
        initial={{ opacity: 0, y: -24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <CaseImage
          src={IMG.event}
          alt="PUNCH merch — event atmosphere"
          className="h-full w-full object-cover object-center"
          sectionInView={isInView}
          style={{ filter: "brightness(0.78) saturate(0.9)" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.85) 100%), linear-gradient(to right, transparent 55%, rgba(8,8,8,0.85) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Shirts — stacked on mobile, column on desktop right */}
      <div className="relative flex min-h-0 flex-1 flex-col md:flex-1">
        <motion.div
          className="relative min-h-0 flex-1 overflow-hidden border-b border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <CaseImage
            src={IMG.purple}
            alt="PUNCH merch — purple"
            className="h-full w-full object-cover object-center"
            sectionInView={isInView}
            style={{ filter: "brightness(0.85)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 45%)",
            }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          className="relative min-h-0 flex-1 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          <CaseImage
            src={IMG.black}
            alt="PUNCH merch — black"
            className="h-full w-full object-cover object-center"
            sectionInView={isInView}
            style={{ filter: "brightness(0.9)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 45%)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 18%, transparent 70%, rgba(8,8,8,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-10 md:px-10 lg:px-14">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          SECTION 08 / MERCH
        </motion.p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9] text-white"
                style={{ fontSize: "clamp(2.25rem, 10vw, 5.5rem)" }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              >
                CLOTHES &
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9]"
                style={{ fontSize: "clamp(2.25rem, 10vw, 5.5rem)", color: PURPLE }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
              >
                MERCH
              </motion.h2>
            </div>
          </div>
          <motion.p
            className="max-w-[18rem] text-[10px] leading-[1.75] text-white/28 md:text-right"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Фирменный мерч: брендинг вышел за экран и стал частью реальной жизни.
            Мурманск на груди — пункш на спине.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
