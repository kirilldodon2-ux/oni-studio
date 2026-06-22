"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const IMG = { rapper: punchSrc("xxxmanera-headliner.png") };

const PLATFORMS = [
  { name: "Yandex Music", href: "https://music.yandex.ru/search?text=xxxmanera" },
  { name: "Apple Music",  href: "https://music.apple.com/us/search?term=xxxmanera" },
  { name: "Spotify",      href: "https://open.spotify.com/search/xxxmanera" },
];

export function PunchHeadliner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden md:flex-row"
      style={punchSectionStyle("#06040c")}
    >
      <PunchSectionMeta index="03" label="ARTIST" visible={isInView} />

      <div className="relative z-10 flex h-[46vh] shrink-0 items-center justify-center overflow-hidden md:h-full md:flex-1">
        <motion.div
          className="relative flex h-full items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.08 }}
        >
          <CaseImage
            src={IMG.rapper}
            alt="XXXMANERA"
            className="h-full w-auto max-w-full object-contain"
            sectionInView={isInView}
            priority
          />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-8 pb-10 pt-4 md:w-[34%] md:shrink-0 md:justify-center md:pb-0 md:pr-10 lg:pr-14">
        <motion.p
          className="font-bebas text-[clamp(2.5rem,9vw,4.5rem)] leading-[0.9] text-white"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          XXXMANERA
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col gap-2 border-t border-white/[0.08] pt-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.22em] text-white/35 transition-opacity hover:opacity-60"
            >
              {p.name} →
            </a>
          ))}
        </motion.div>
      </div>

      <PunchCaption className="absolute bottom-8 right-8 z-20 hidden text-right md:block md:bottom-10 md:right-10 lg:right-14" visible={isInView}>
        Headliner
      </PunchCaption>
    </section>
  );
}
