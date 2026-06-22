"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const IMG = {
  event:  punchSrc("merch-event.png"),
  purple: punchSrc("merch-shirt-purple.png"),
  black:  punchSrc("merch-shirt-black.png"),
};

export function PunchMerch() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle("#0a0a0a")}>
      <PunchSectionMeta index="07" label="MERCH" visible={isInView} />

      <div
        className="absolute inset-x-0 bottom-0 top-[calc(var(--oni-header-h,4rem)+4.25rem)] flex flex-col gap-px bg-white/[0.06] px-8 pb-8 md:flex-row md:px-10 md:pb-10 lg:px-14 lg:pb-12"
      >
        <motion.div
          className="relative min-h-0 flex-[1.35] overflow-hidden bg-[#0a0a0a]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.08 }}
        >
          <CaseImage
            src={IMG.event}
            alt="PUNCH merch — event atmosphere"
            className="h-full w-full object-cover"
            sectionInView={isInView}
            style={{ objectPosition: "50% 45%" }}
          />
        </motion.div>

        <div className="flex min-h-0 flex-1 flex-col gap-px bg-white/[0.06]">
          <motion.div
            className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.14 }}
          >
            <CaseImage
              src={IMG.purple}
              alt="PUNCH merch — purple shirt"
              className="h-full w-full object-cover"
              sectionInView={isInView}
            />
          </motion.div>

          <motion.div
            className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          >
            <CaseImage
              src={IMG.black}
              alt="PUNCH merch — black shirt"
              className="h-full w-full object-cover"
              sectionInView={isInView}
            />
          </motion.div>
        </div>
      </div>

      <PunchCaption className="absolute bottom-8 left-8 md:bottom-10 md:left-10 lg:left-14" visible={isInView}>
        Uniforms &amp; print
      </PunchCaption>
    </section>
  );
}
