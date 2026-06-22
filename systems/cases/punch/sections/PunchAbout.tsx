"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const LOGO = punchSrc("punch-logo.png");

const SWATCHES = [
  { hex: "#8f62c7" },
  { hex: "#2a2929" },
  { hex: "#101010" },
  { hex: "#d9d9d9" },
];

export function PunchAbout() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle("#0d0010")}>
      <PunchSectionMeta index="04" label="ABOUT" visible={isInView} />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-8 pt-[calc(var(--oni-header-h,4rem)+3rem)]">
        <motion.div
          style={{ width: "clamp(7rem, 32vw, 13rem)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <CaseImage src={LOGO} alt="ПУНШ NEVER SLEEP" className="h-auto w-full" sectionInView={isInView} />
        </motion.div>

        <motion.p
          className="mt-8 max-w-[22rem] text-center text-[11px] leading-[1.75] tracking-[0.06em] text-white/40"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
        >
          Club event identity — Murmansk, 2026.
        </motion.p>
      </div>

      <div className="relative z-10 shrink-0 px-8 pb-8 md:px-10 lg:px-14 lg:pb-10">
        <div className="flex h-16 gap-px bg-white/[0.06] md:h-20">
          {SWATCHES.map((sw, i) => (
            <motion.div
              key={sw.hex}
              className="min-w-0 flex-1"
              style={{ backgroundColor: sw.hex }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <PunchCaption className="absolute bottom-8 right-8 text-right md:bottom-10 md:right-10 lg:right-14" visible={isInView}>
        Brand colours
      </PunchCaption>
    </section>
  );
}
