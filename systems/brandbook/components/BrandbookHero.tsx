"use client";

import { motion } from "motion/react";
import heroSvgPaths from "../imports/heroSvgPaths";
import { BrandbookHeroMetallicDrift } from "./BrandbookHeroMetallicDrift";

const TITLE_LINES = ["ONI(ОНИ)", "BRANDBOOK", "2026"];

export function BrandbookHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      <BrandbookHeroMetallicDrift />

      <motion.span
        className="absolute left-10 top-10 font-mono text-[11px] tracking-[0.3em] text-[#B2B2B2]"
        style={{ fontFamily: "var(--font-mono)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        01 / 06
      </motion.span>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <svg
            viewBox="0 0 272 312.18"
            className="h-auto w-28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d={heroSvgPaths.p17d3a380}
              fill="#070707"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </svg>
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-0.5">
          {TITLE_LINES.map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.p
                className="text-center text-[13px] tracking-[0.35em] text-[#B2B2B2]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "normal",
                  fontWeight: 400,
                }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.9 + i * 0.12,
                }}
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: 96 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
        >
          <div className="h-24 w-[2px] rounded-full bg-[#070707]" />
        </motion.div>
      </div>
    </section>
  );
}
