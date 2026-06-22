"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { punchSrc } from "@/systems/cases/punch/punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { CaseMotionImage } from "@/systems/cases/components/CaseMotionImage";
import { punchSectionStyle } from "@/systems/cases/punch/punchLayout";

const BG = "#06040c";

const IMG = {
  planet: punchSrc("planet.png"),
  cup:    punchSrc("0911e0cbaf2f31314e861e459b1a42d26baf1d47.png"),
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

      <motion.div
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "clamp(7rem, 19vw, 13rem)",
          top: "calc(var(--oni-header-h, 4rem) + 5rem)",
          zIndex: 8,
          width: "clamp(3.6rem, 6vw, 5.5rem)",
        }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        aria-hidden="true"
      >
        <CaseImage
          src={IMG.cup}
          alt=""
          sectionInView={isInView}
          style={{
            width: "100%",
            filter: "drop-shadow(0 0 14px rgba(143,98,199,0.5))",
          }}
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

      <div className="absolute bottom-0 left-0 z-10 flex flex-col px-8 pb-10 md:max-w-[58%] md:px-10 md:pb-12 lg:max-w-[52%] lg:px-14 lg:pb-14">
        <div className="pointer-events-none mb-4 block md:hidden" aria-hidden="true">
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
          className="mb-3 text-[10px] font-medium tracking-[0.36em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          PUNCH · ПУНШ
        </motion.p>

        <motion.h2
          className="font-bebas leading-[0.88] text-white"
          style={{ fontSize: "clamp(3rem, 10.5vw, 8.5rem)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
        >
          PARTY EVENT DESIGN
        </motion.h2>

        <motion.div
          className="mt-6 border-t border-white/[0.08] pt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
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
