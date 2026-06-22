"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const IMG = {
  group: punchSrc("686511ca33145121b787176964fce5dda072d7a3.png"),
  suits: punchSrc("7574754a58983ab6d7aceca6d269603f69699401.png"),
};

export function PunchPeople() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle("#0a0a0a")}>
      <PunchSectionMeta index="06" label="EVENT" visible={isInView} />

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
            src={IMG.group}
            alt="PUNCH event — crowd atmosphere"
            className="h-full w-full object-cover"
            sectionInView={isInView}
            style={{ objectPosition: "50% 42%" }}
          />
        </motion.div>

        <motion.div
          className="relative min-h-0 flex-1 overflow-hidden bg-[#0a0a0a]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.16 }}
        >
          <CaseImage
            src={IMG.suits}
            alt="PUNCH event — branded staff"
            className="h-full w-full object-cover"
            sectionInView={isInView}
            style={{ objectPosition: "50% 38%" }}
          />
        </motion.div>
      </div>

      <PunchCaption className="absolute bottom-8 right-8 text-right md:bottom-10 md:right-10 lg:right-14" visible={isInView}>
        Murmansk · 1700 guests
      </PunchCaption>
    </section>
  );
}
