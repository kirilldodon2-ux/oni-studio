"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const GRUNGE = "/cases/punch/33c8208a5b3400514fadf44d21a7c8d9cfce2062.png";

/**
 * All available posters — portrait + landscape mixed.
 * w: relative flex width, rot: resting tilt.
 */
const POSTERS = [
  { src: "/cases/punch/ae2c09d84ca24b2aeee87b4189a59e6e39b1f5b5.png", w: 1.4, rot:  1.5, delay: 0.10 },
  { src: "/cases/punch/0eca43d41f131fe927487ddbe01c702362fe4414.png", w: 1.0, rot: -2.0, delay: 0.18 },
  { src: "/cases/punch/c5323e4366fbf3ead2c2af85b31275b52c4f7ecd.png", w: 1.0, rot:  2.5, delay: 0.26 },
  { src: "/cases/punch/f47d65df327279b35fa097c276fd5e5261f519fe.png", w: 1.0, rot: -1.2, delay: 0.34 },
  { src: "/cases/punch/3d72723582f1b340a8ca95e20708bcd1802238bf.png", w: 1.0, rot:  1.8, delay: 0.42 },
  { src: "/cases/punch/5ad50bd3a5b8b9f8b22f796d983943d793075179.png", w: 1.0, rot: -2.2, delay: 0.50 },
  { src: "/cases/punch/c4b0bf49266c7ebbed7ded91e0b5fd91e489cff2.png", w: 1.0, rot:  1.0, delay: 0.58 },
  { src: "/cases/punch/10aa3444c95c4253f46440f0ef2aac8ccec8b61e.png", w: 1.0, rot: -1.5, delay: 0.66 },
  { src: "/cases/punch/f2876a742250ce847a5689c7aea6781f2f71c47c.png", w: 1.0, rot:  2.0, delay: 0.74 },
];

export function PunchPosters() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#f0eef4" }}
    >
      {/* Grunge texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${GRUNGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.05,
        }}
        aria-hidden="true"
      />

      {/* Ghost word */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none font-bebas leading-none text-black"
        style={{ fontSize: "clamp(10rem, 35vw, 30rem)", opacity: 0.04, letterSpacing: "0.04em" }}
        aria-hidden="true"
      >
        POSTERS
      </div>

      {/* Section header — nav-cleared */}
      <div
        className="relative z-20 flex items-center justify-between px-8 md:px-10 lg:px-14"
        style={{ paddingTop: "calc(var(--oni-header-h, 4rem) + 1.5rem)" }}
      >
        <motion.p
          className="text-[9px] font-medium tracking-[0.38em] text-black/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 05 / EVENT POSTERS
        </motion.p>
        <motion.p
          className="text-[9px] font-medium tracking-[0.28em] text-black/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          PUNCH · ПУНШ · 2026
        </motion.p>
      </div>

      {/* Poster row — fills remaining height, no overflow */}
      <div className="relative z-20 flex flex-1 items-end gap-2 overflow-hidden px-6 pb-8 pt-3 md:gap-3 md:px-8 md:pb-10 lg:px-10">
        {POSTERS.map((p, i) => (
          <motion.div
            key={p.src}
            className="relative h-full shrink-0"
            style={{ flex: p.w, minWidth: 0 }}
            initial={{ opacity: 0, y: 55, rotate: p.rot + (i % 2 === 0 ? 4 : -4) }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotate: p.rot }
                : { opacity: 0, y: 55, rotate: p.rot + (i % 2 === 0 ? 4 : -4) }
            }
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: p.delay }}
          >
            <img
              src={p.src}
              alt=""
              className="h-full w-full object-cover shadow-xl"
              style={{
                borderRadius: "2px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
