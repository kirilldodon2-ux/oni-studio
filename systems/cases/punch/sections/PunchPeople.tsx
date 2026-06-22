"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";

const PURPLE = "#8f62c7";

const IMG = {
  group: punchSrc("686511ca33145121b787176964fce5dda072d7a3.png"),
  suits: punchSrc("7574754a58983ab6d7aceca6d269603f69699401.png"),
};

export function PunchPeople() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#080808" }}
    >
      {/* Photos — stacked on mobile, side-by-side on desktop */}
      <div className="absolute inset-0 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <motion.div
          className="relative min-h-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <CaseImage
            src={IMG.group}
            alt=""
            className="h-full w-full object-cover"
            sectionInView={isInView}
            style={{ filter: "brightness(0.65) saturate(0.8)" }}
          />
        </motion.div>

        <motion.div
          className="relative min-h-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
        >
          <CaseImage
            src={IMG.suits}
            alt=""
            className="h-full w-full object-cover"
            sectionInView={isInView}
            style={{ filter: "brightness(0.55) saturate(0.7)" }}
          />
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.35) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Divider — horizontal on mobile, vertical on desktop */}
      <motion.div
        className="absolute left-0 top-1/2 z-20 h-px w-full -translate-y-1/2 bg-white/10 md:left-1/2 md:top-0 md:h-full md:w-px md:-translate-x-1/2 md:translate-y-0"
        initial={{ scaleX: 0, scaleY: 0 }}
        animate={isInView ? { scaleX: 1, scaleY: 1 } : { scaleX: 0, scaleY: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ originX: 0, originY: 0 }}
        aria-hidden="true"
      />

      <div className="relative z-20 mt-auto px-8 pb-10 md:px-10 lg:px-14">
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          SECTION 07 / EVENT
        </motion.p>

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9] text-white"
                style={{ fontSize: "clamp(2.5rem, 11vw, 6rem)" }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              >
                EVENT
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="font-bebas leading-[0.9]"
                style={{ fontSize: "clamp(2.5rem, 11vw, 6rem)", color: PURPLE }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
              >
                ATMOSPHERE
              </motion.h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <motion.p
              className="max-w-[18rem] text-[10px] leading-[1.75] text-white/30 md:text-right"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              1700 гостей. Одна ночь. Каждый брендированный элемент —
              от арки входа до стакана в руке — говорил на одном визуальном языке.
            </motion.p>
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              {[["1700", "ГОСТЕЙ"], ["1", "НОЧЬ"], ["∞", "ВАЙБ"]].map(([num, label]) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="font-bebas text-[1.4rem] leading-none text-white md:text-[1.6rem]">{num}</span>
                  <span className="text-[8px] tracking-[0.30em] text-white/25">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
