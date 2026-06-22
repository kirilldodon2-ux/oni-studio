"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { CaseMotionImage } from "@/systems/cases/components/CaseMotionImage";
import { punchSectionStyle } from "../punchLayout";

const LOGO   = punchSrc("punch-logo.png");
const PLANET = punchSrc("planet.png");

export function PunchCover() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle("#06040c")}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(143,98,199,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute"
        style={{ bottom: "-28%", right: "-18%", width: "clamp(28rem, 62vw, 56rem)", zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        aria-hidden="true"
      >
        <CaseMotionImage
          src={PLANET}
          alt=""
          priority
          className="h-auto w-full"
          style={{ filter: "drop-shadow(0 0 60px rgba(143,98,199,0.25))" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
        <motion.div
          style={{ width: "clamp(14rem, 42vw, 36rem)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        >
          <CaseImage
            src={LOGO}
            alt="ПУНШ NEVER SLEEP"
            priority
            className="h-auto w-full"
            style={{ filter: "drop-shadow(0 0 32px rgba(143,98,199,0.35))" }}
          />
        </motion.div>

        <motion.p
          className="mt-6 text-[10px] font-medium tracking-[0.32em] text-white/28"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          PUNCH · 2026
        </motion.p>
      </div>

      <motion.p
        className="absolute bottom-8 left-8 z-10 text-[9px] tracking-[0.28em] text-white/18 md:bottom-10 md:left-10 lg:left-14"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        ONI STUDIO
      </motion.p>
    </section>
  );
}
