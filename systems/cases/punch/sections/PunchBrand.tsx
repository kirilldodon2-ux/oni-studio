"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const IMG = {
  main: punchSrc("66233c76db34d637b5f0a2da5208a41b8cc8b3ff.png"),
  wall: punchSrc("brand-wall-texture.png"),
};

export function PunchBrand() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden md:flex-row"
      style={punchSectionStyle("#101010")}
    >
      <PunchSectionMeta index="02" label="BRAND" visible={isInView} />

      <div className="relative z-10 min-h-0 flex-1 md:order-2">
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          aria-hidden="true"
        >
          <CaseImage
            src={IMG.wall}
            alt=""
            sectionInView={isInView}
            className="h-full w-full object-cover"
            style={{ objectPosition: "42% center", filter: "brightness(0.42) contrast(1.1) saturate(0.6)" }}
          />
        </motion.div>

        <div className="relative z-10 flex h-full items-center justify-center px-6 pb-10 pt-[calc(var(--oni-header-h,4rem)+3.5rem)] md:pb-0 md:pt-0">
          <motion.div
            style={{
              width: "clamp(12rem, 62vw, 30rem)",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.12 }}
          >
            <CaseImage src={IMG.main} alt="PUNCH sticker art" className="h-auto w-full" sectionInView={isInView} />
          </motion.div>
        </div>
      </div>

      <PunchCaption className="absolute bottom-8 left-8 z-20 md:bottom-10 md:left-10 lg:left-14" visible={isInView}>
        Club event identity
      </PunchCaption>
    </section>
  );
}
