"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const stk = (file: string) => punchSrc(`stickers/${file}`);

const STICKERS = [
  stk("s-root-123.png"),
  stk("s-root-stakan.png"),
  stk("stk-hh-1.png"),
  stk("stk-hh-2.png"),
  stk("stk-mobiland-2.png"),
  stk("stk-mobiland-7.png"),
  stk("stk-plazma-1.png"),
  stk("stk-plazma-4.png"),
  stk("stk-samedi-1.png"),
  stk("stk-samedi-4.png"),
  stk("stk-new-2.png"),
  stk("stk-new-5.png"),
];

export function PunchStickers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.12 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle("#0a000f")}>
      <PunchSectionMeta index="07" label="STICKERS" visible={isInView} />

      <div
        className="absolute inset-x-0 bottom-0 top-[calc(var(--oni-header-h,4rem)+4.25rem)] grid grid-cols-3 grid-rows-4 gap-px bg-white/[0.05] px-8 pb-8 md:grid-cols-4 md:grid-rows-3 md:px-10 md:pb-10 lg:px-14 lg:pb-12"
      >
        {STICKERS.map((src, i) => (
          <motion.div
            key={src}
            className="relative flex items-center justify-center overflow-hidden bg-[#0a000f] p-2 md:p-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.04 + i * 0.03 }}
          >
            <CaseImage
              src={src}
              alt=""
              className="h-auto max-h-full w-full max-w-full object-contain"
              sectionInView={isInView}
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
