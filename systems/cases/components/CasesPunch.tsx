"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { punchSrc } from "@/systems/cases/punch/punchAssets";
import { CaseMotionImage } from "@/systems/cases/components/CaseMotionImage";
import { punchSectionStyle } from "@/systems/cases/punch/punchLayout";

const BG = "#06040c";

const IMG = {
  planet: punchSrc("planet.png"),
} as const;

export function CasesPunch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden" style={punchSectionStyle(BG)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 28% 38%, rgba(143,98,199,0.14) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          bottom: "-32%",
          left: "62%",
          translateX: "-42%",
          width: "clamp(38rem, 92vw, 78rem)",
          zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.05 }}
        aria-hidden="true"
      >
        <CaseMotionImage
          src={IMG.planet}
          alt=""
          sectionInView={isInView}
          style={{
            width: "100%",
            display: "block",
            filter: "drop-shadow(0 0 60px rgba(143,98,199,0.22))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 hidden md:block"
        style={{
          height: "55%",
          zIndex: 4,
          background: `linear-gradient(to top, ${BG} 0%, ${BG} 18%, rgba(6,4,12,0.75) 45%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 md:px-14 md:pb-20 lg:px-20">
        <div className="pointer-events-none mb-6 block md:hidden" aria-hidden="true">
          <CaseMotionImage
            src={IMG.planet}
            alt=""
            sectionInView={isInView}
            style={{
              width: "88vw",
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 0 30px rgba(143,98,199,0.35))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          />
        </div>

        <motion.p
          className="mb-3 text-[10px] font-medium tracking-[0.32em] text-white/35 md:mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          ПУНШ 26&apos;
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}
            initial={{ y: "105%" }}
            animate={isInView ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            PARTY
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white/28"
            style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}
            initial={{ y: "105%" }}
            animate={isInView ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            IDENTITY
          </motion.h2>
        </div>

        <motion.div
          className="mt-7 border-t border-white/[0.08] pt-4 md:mt-9"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link
            href="/cases/punch"
            className="text-[11px] font-semibold tracking-[0.26em] text-white transition-opacity hover:opacity-60"
          >
            WATCH FULL →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
