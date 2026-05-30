"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import logoSvgPaths from "../imports/logoSvgPaths";

const DESC_LINES = [
  "Одна линия. Шесть фигур. Один круг.",
  "В логотипе нет ни начала, ни конца — все соединены друг с другом. Так же, как в работе: идея художника, рука дизайнера, голова разработчика — всё это один процесс.",
  "По отдельности — линии.\nВместе — образ.",
  "ОНИ — это мы. И те, с кем мы рядом.",
];

export function BrandbookLogo() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { amount: 0.3 });

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      <div className="absolute inset-0 right-1/2 bg-[#070707]" />
      <div className="absolute inset-0 left-1/2 bg-[#F7F7F7]" />

      <div className="pointer-events-none absolute inset-0 right-1/2 overflow-hidden">
        {["20%", "60%"].map((x, i) => (
          <motion.div
            key={`v-${x}`}
            className="absolute bottom-0 top-0 w-[2px]"
            style={{ left: x }}
            initial={{ scaleY: 0, originY: "50%" }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
          >
            <svg className="absolute inset-0 h-full w-full" fill="none">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="#B2B2B2"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
          </motion.div>
        ))}
        {["25%", "50%", "75%"].map((y, i) => (
          <motion.div
            key={`h-${y}`}
            className="absolute left-0 right-0 h-[2px]"
            style={{ top: y }}
            initial={{ scaleX: 0, originX: "50%" }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + i * 0.12 }}
          >
            <svg className="absolute inset-0 h-full w-full" fill="none">
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#B2B2B2"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      <motion.span
        className="absolute left-10 top-10 font-mono text-[11px] tracking-[0.3em] text-[#B2B2B2]"
        style={{ fontFamily: "var(--font-mono)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        03 / 06
      </motion.span>

      <div ref={contentRef} className="relative z-10 flex h-full">
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={
              isInView
                ? { clipPath: "inset(0 0 0% 0)" }
                : { clipPath: "inset(0 0 100% 0)" }
            }
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <svg
              viewBox="0 0 470 539.428"
              style={{ width: "clamp(160px, 20vw, 280px)", height: "auto" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d={logoSvgPaths.p2ae61100}
                fill="none"
                stroke="#F7F7F7"
                strokeWidth="4"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.4, ease: "easeInOut", delay: 0.8 }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4 px-[7%]">
          <div>
            <div className="overflow-hidden">
              <motion.p
                className="leading-none text-[#070707]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(48px, 7vw, 108px)",
                }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                LOGO
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                className="leading-none text-[#B2B2B2]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(48px, 7vw, 108px)",
                }}
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              >
                ЛОГО
              </motion.p>
            </div>
          </div>

          <div className="flex max-w-[440px] flex-col gap-3">
            {DESC_LINES.map((line, i) => (
              <motion.p
                key={i}
                className="whitespace-pre-line text-[#070707]"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 300,
                  fontSize: "clamp(11px, 1.2vw, 16px)",
                  lineHeight: 1.7,
                }}
                initial={{ opacity: 0, x: 16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1 + i * 0.12 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
