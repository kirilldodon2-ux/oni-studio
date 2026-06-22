"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";

const PURPLE = "#8f62c7";

const stk = (file: string) => punchSrc(`stickers/${file}`);

/**
 * All 28 stickers from НАКЛЕЙКИ project folder.
 * Each has: src, size weight (1=base, 1.4=large), tilt, entrance direction, timing.
 */
const STICKERS: Array<{
  src: string;
  size: number;  // relative flex size
  rot: number;   // final tilt deg
  from: "top" | "left" | "right" | "bottom";
  delay: number;
}> = [
  // Root stickers
  { src: stk("s-root-123.png"),       size: 1.3, rot:  -8, from: "top",    delay: 0.00 },
  { src: stk("s-root-naklika.png"),   size: 1.0, rot:   6, from: "left",   delay: 0.05 },
  { src: stk("s-root-nekurit.png"),   size: 0.9, rot: -12, from: "right",  delay: 0.08 },
  { src: stk("s-root-stakan.png"),    size: 1.1, rot:   9, from: "bottom", delay: 0.12 },
  // МОБИЛЭНД × ПУНШ
  { src: stk("stk-mobiland-1.png"),   size: 1.0, rot:  -5, from: "top",    delay: 0.14 },
  { src: stk("stk-mobiland-2.png"),   size: 1.2, rot:  14, from: "right",  delay: 0.18 },
  { src: stk("stk-mobiland-3.png"),   size: 0.85,rot:  -9, from: "left",   delay: 0.22 },
  { src: stk("stk-mobiland-4.png"),   size: 1.0, rot:   7, from: "bottom", delay: 0.26 },
  { src: stk("stk-mobiland-5.png"),   size: 1.1, rot: -16, from: "top",    delay: 0.30 },
  { src: stk("stk-mobiland-6.png"),   size: 0.9, rot:  11, from: "right",  delay: 0.34 },
  { src: stk("stk-mobiland-7.png"),   size: 1.3, rot:  -6, from: "left",   delay: 0.38 },
  // ПЛАЗМА × ПУНШ
  { src: stk("stk-plazma-1.png"),     size: 1.2, rot:  18, from: "top",    delay: 0.20 },
  { src: stk("stk-plazma-2.png"),     size: 1.0, rot:  -4, from: "bottom", delay: 0.24 },
  { src: stk("stk-plazma-3.png"),     size: 0.9, rot:  12, from: "left",   delay: 0.28 },
  { src: stk("stk-plazma-4.png"),     size: 1.1, rot:  -8, from: "right",  delay: 0.32 },
  { src: stk("stk-plazma-5.png"),     size: 1.0, rot:   5, from: "top",    delay: 0.36 },
  // САМЕДИ × ПУНШ
  { src: stk("stk-samedi-1.png"),     size: 1.3, rot: -10, from: "left",   delay: 0.16 },
  { src: stk("stk-samedi-2.png"),     size: 1.0, rot:   8, from: "top",    delay: 0.21 },
  { src: stk("stk-samedi-3.png"),     size: 0.9, rot: -14, from: "right",  delay: 0.25 },
  { src: stk("stk-samedi-4.png"),     size: 1.1, rot:   6, from: "bottom", delay: 0.29 },
  // ХХ
  { src: stk("stk-hh-1.png"),         size: 1.4, rot:  10, from: "top",    delay: 0.10 },
  { src: stk("stk-hh-2.png"),         size: 1.0, rot:  -7, from: "right",  delay: 0.15 },
  { src: stk("stk-hh-3.png"),         size: 1.2, rot:  13, from: "left",   delay: 0.19 },
  // Новая папка
  { src: stk("stk-new-1.png"),        size: 1.0, rot:  -9, from: "bottom", delay: 0.06 },
  { src: stk("stk-new-2.png"),        size: 1.2, rot:  15, from: "top",    delay: 0.11 },
  { src: stk("stk-new-3.png"),        size: 0.85,rot:  -5, from: "right",  delay: 0.17 },
  { src: stk("stk-new-4.png"),        size: 1.0, rot:  11, from: "left",   delay: 0.23 },
  { src: stk("stk-new-5.png"),        size: 1.3, rot:  -3, from: "bottom", delay: 0.27 },
];

function getInitialPos(from: "top" | "left" | "right" | "bottom") {
  switch (from) {
    case "top":    return { y: -60, x: 0 };
    case "bottom": return { y:  60, x: 0 };
    case "left":   return { x: -60, y: 0 };
    case "right":  return { x:  60, y: 0 };
  }
}

export function PunchStickers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#0a000f" }}
    >
      {/* Ambient purple glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(143,98,199,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Header row — below navbar */}
      <div
        className="relative z-20 flex items-center justify-between px-8 md:px-10 lg:px-14"
        style={{ paddingTop: "calc(var(--oni-header-h, 4rem) + 1.2rem)" }}
      >
        <div className="flex items-baseline gap-5">
          <motion.h2
            className="font-bebas leading-none text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            STICKER
          </motion.h2>
          <motion.h2
            className="font-bebas leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: PURPLE }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            KIT
          </motion.h2>
        </div>
        <motion.p
          className="text-[9px] font-medium tracking-[0.38em] text-white/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          SECTION 09 / STICKER KIT
        </motion.p>
      </div>

      {/* Sticker grid — fills remaining space */}
      <div
        className="relative z-10 flex flex-1 flex-wrap content-start gap-2 overflow-hidden px-6 pb-6 pt-3 md:gap-3 md:px-8 md:pb-8 lg:px-10"
        style={{ alignContent: "space-evenly" }}
      >
        {STICKERS.map((s, i) => {
          const init = getInitialPos(s.from);
          return (
            <motion.div
              key={i}
              className="relative shrink-0"
              style={{
                width: `clamp(${5 * s.size}rem, ${7 * s.size}vw, ${8 * s.size}rem)`,
                rotate: s.rot,
              }}
              initial={{ opacity: 0, ...init, scale: 0.6 }}
              animate={
                isInView
                  ? { opacity: 1, x: 0, y: 0, scale: 1 }
                  : { opacity: 0, ...init, scale: 0.6 }
              }
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: s.delay + 0.15,
              }}
              aria-hidden="true"
            >
              {/* Subtle float */}
              <motion.img
                src={s.src}
                alt=""
                className="h-auto w-full"
                style={{ mixBlendMode: "screen" }}
                animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                transition={{
                  duration: 3 + (i % 5) * 0.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
