"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const POSTERS = [
  punchSrc("ae2c09d84ca24b2aeee87b4189a59e6e39b1f5b5.png"),
  punchSrc("c5323e4366fbf3ead2c2af85b31275b52c4f7ecd.png"),
];

const PHONE = punchSrc("phone-telegram.png");

export function PunchPosters() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle("#0a0a0a")}>
      <PunchSectionMeta index="05" label="POSTERS" visible={isInView} />

      <div
        className="absolute inset-x-0 bottom-0 top-[calc(var(--oni-header-h,4rem)+4.25rem)] flex flex-col gap-px bg-white/[0.06] px-8 pb-8 md:flex-row md:px-10 md:pb-10 lg:px-14 lg:pb-12"
      >
        {POSTERS.map((src, i) => (
          <motion.div
            key={src}
            className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.08 + i * 0.1 }}
          >
            <CaseImage src={src} alt="" className="h-full w-full object-cover" sectionInView={isInView} />
          </motion.div>
        ))}

        <motion.div
          className="relative flex min-h-[28vh] shrink-0 items-center justify-center overflow-hidden bg-[#0d0010] md:min-h-0 md:w-[min(28vw,16rem)] md:shrink-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.28 }}
        >
          <CaseImage
            src={PHONE}
            alt="Telegram announcement"
            className="h-auto w-[min(72vw,11rem)] md:w-[88%]"
            sectionInView={isInView}
            style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))" }}
          />
        </motion.div>
      </div>

      <PunchCaption className="absolute bottom-8 left-8 md:bottom-10 md:left-10 lg:left-14" visible={isInView}>
        Print &amp; digital
      </PunchCaption>
    </section>
  );
}
