"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  rapper: "/cases/punch/216be9907372b69d0e269a72403e810c8a85e1e9.png",
  s1:     "/cases/punch/7dd49aa878b92dd7d27210878de79a8b07d14f7d.png",
  s2:     "/cases/punch/2978c4726895f4bd7680251dc60f90da5cbf99c5.png",
  s3:     "/cases/punch/a461b2a2a462a7968b2791db415de0e33cd452ea.png",
  s4:     "/cases/punch/0e7865bf374b74f7203d80ffd3651f47646214b4.png",
  s5:     "/cases/punch/66233c76db34d637b5f0a2da5208a41b8cc8b3ff.png",
  s6:     "/cases/punch/386398f5faf9366a6343534c166c85faf25c7779.png",
  cup:    "/cases/punch/0911e0cbaf2f31314e861e459b1a42d26baf1d47.png",
};

interface Sticker {
  src: string;
  top: string;
  left: string;
  width: string;
  initRotate: number;
  animRotate: number;
  delay: number;
  blend?: boolean;
}

const STICKERS: Sticker[] = [
  { src: IMG.s1, top: "8%",  left: "5%",  width: "9rem",  initRotate: -15, animRotate: -10, delay: 0.3, blend: false },
  { src: IMG.s2, top: "5%",  left: "60%", width: "7rem",  initRotate: 10,  animRotate: 6,   delay: 0.4, blend: false },
  { src: IMG.s3, top: "15%", left: "78%", width: "11rem", initRotate: -5,  animRotate: -2,  delay: 0.5, blend: false },
  { src: IMG.s4, top: "55%", left: "3%",  width: "8rem",  initRotate: 8,   animRotate: 5,   delay: 0.55, blend: false },
  { src: IMG.s5, top: "65%", left: "68%", width: "12rem", initRotate: -8,  animRotate: -4,  delay: 0.6, blend: false },
  { src: IMG.s6, top: "72%", left: "82%", width: "7rem",  initRotate: 12,  animRotate: 8,   delay: 0.65, blend: false },
  { src: IMG.cup, top: "30%", left: "72%", width: "6rem", initRotate: -20, animRotate: -12, delay: 0.7, blend: false },
];

export function PunchStickers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#f8f8f8" }}
    >
      {/* Ghost "STICKERS" */}
      <div
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 select-none font-bebas leading-none text-black"
        style={{ fontSize: "clamp(6rem, 24vw, 20rem)", opacity: 0.04, whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        STICKERS
      </div>

      {/* Scattered sticker elements */}
      {STICKERS.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ top: s.top, left: s.left, width: s.width, zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.6, rotate: s.initRotate }}
          animate={isInView
            ? { opacity: 1, scale: 1, rotate: s.animRotate }
            : { opacity: 0, scale: 0.6, rotate: s.initRotate }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: s.delay }}
        >
          <motion.img
            src={s.src}
            alt=""
            className="h-auto w-full drop-shadow-lg"
            animate={{ rotate: [s.animRotate, s.animRotate + 4, s.animRotate] }}
            transition={{
              duration: 3 + i * 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </motion.div>
      ))}

      {/* Rapper figure — large, screen blend so dark is transparent */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-[55%]"
        style={{ width: "clamp(18rem, 45vw, 38rem)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        aria-hidden="true"
      >
        <img
          src={IMG.rapper}
          alt=""
          className="h-auto w-full"
          style={{ mixBlendMode: "multiply" }}
        />
      </motion.div>

      {/* Content — top-right */}
      <div className="relative z-30 flex justify-end px-8 pt-10 md:px-10 lg:px-14">
        <div className="text-right">
          <motion.p
            className="mb-4 text-[9px] font-medium tracking-[0.38em] text-black/25"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            SECTION 05 / MERCH & STICKERS
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-bebas leading-[0.9] text-black"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              STICKER
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-bebas leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: PURPLE }}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              KIT
            </motion.h2>
          </div>
          <motion.p
            className="mt-4 max-w-[14rem] text-right text-[10px] leading-[1.7] text-black/35"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Merch prints, digital sticker packs,
            and collectible art for the event.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
