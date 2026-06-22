"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { resolveCasesMediaSrc } from "@/content/casesMediaPaths";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import type { CaseEntry } from "../casesData";

interface CasesCardProps {
  entry: CaseEntry;
}

export function CasesCard({ entry }: CasesCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-[#070707]"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      {/* Ghost case number — environmental depth */}
      <div
        className="pointer-events-none absolute -right-4 -top-2 select-none font-bebas leading-none text-white"
        style={{
          fontSize: "clamp(10rem, 32vw, 26rem)",
          opacity: 0.028,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {entry.id}
      </div>

      {/* Category + year — top-left header line */}
      <motion.div
        className="absolute left-8 flex items-center gap-4 md:left-14 lg:left-20"
        style={{ top: "calc(var(--oni-header-h) + 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
      >
        <span className="text-[10px] font-medium tracking-[0.30em] text-white/30">
          {entry.category}
        </span>
        <span className="h-px w-4 bg-white/15" />
        <span className="text-[10px] font-medium tracking-[0.30em] text-white/20">
          {entry.year}
        </span>
      </motion.div>

      {/* Media placeholder — right zone, desktop */}
      {entry.cover ? (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, delay: 0 }}
        >
          <CaseImage
            src={resolveCasesMediaSrc(entry.cover)}
            alt={`${entry.client} — ${entry.title}`}
            className="h-full w-full object-cover opacity-30"
            sectionInView={isInView}
          />
        </motion.div>
      ) : (
        <motion.div
          className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:block md:right-14 lg:right-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          aria-hidden="true"
        >
          <div
            className="border border-white/[0.06]"
            style={{
              width: "clamp(13rem, 26vw, 22rem)",
              height: "clamp(8rem, 16vw, 14rem)",
            }}
          />
          <div
            className="mt-px border border-white/[0.03]"
            style={{
              width: "clamp(13rem, 26vw, 22rem)",
              height: "clamp(0.5rem, 0.8vw, 1rem)",
            }}
          />
        </motion.div>
      )}

      {/* Main content — bottom-left anchored */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-14 md:px-14 md:pb-16 lg:px-20 lg:pb-20">
        {/* Client signal */}
        <motion.p
          className="mb-1 text-[10px] font-medium tracking-[0.32em] text-[#FF4A1A]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          {entry.client}
        </motion.p>

        {/* Project title */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.9] text-white"
            style={{ fontSize: "clamp(3.25rem, 11vw, 8.5rem)" }}
            initial={{ y: "105%" }}
            animate={isInView ? { y: "0%" } : { y: "105%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {entry.title}
          </motion.h2>
        </div>

        {/* Scope tags */}
        <motion.div
          className="mt-5 flex flex-wrap gap-2 md:mt-6"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.38 }}
        >
          {entry.scope.map((tag) => (
            <span
              key={tag}
              className="border border-white/[0.1] px-2.5 py-1 text-[10px] tracking-[0.22em] text-white/40"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
