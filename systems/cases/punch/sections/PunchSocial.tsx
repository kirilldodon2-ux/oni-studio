"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseMotionImage } from "@/systems/cases/components/CaseMotionImage";

const PURPLE = "#8f62c7";

const IMG = {
  phoneMain:   punchSrc("phone-telegram.png"),
  phoneAccent: punchSrc("phone-poster.png"),
};

export function PunchSocial() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#0d0010" }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "70vw",
          height: "70vw",
          background: `radial-gradient(circle, rgba(143,98,199,0.22) 0%, transparent 62%)`,
        }}
        aria-hidden="true"
      />

      {/* Ghost section number */}
      <div
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-bebas text-white"
        style={{ fontSize: "clamp(14rem, 35vw, 30rem)", opacity: 0.02, lineHeight: 1 }}
        aria-hidden="true"
      >
        06
      </div>

      {/* Left — copy */}
      <div
        className="relative z-30 flex flex-col justify-center pl-8 md:pl-10 lg:pl-14"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "clamp(16rem, 30vw, 22rem)",
        }}
      >
        <motion.p
          className="mb-4 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 06 / DIGITAL
        </motion.p>

        <motion.h2
          className="font-bebas leading-[0.88] text-white"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          DIGITAL &
        </motion.h2>
        <motion.h2
          className="font-bebas leading-[0.88]"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: PURPLE }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        >
          SOCIAL
        </motion.h2>

        <motion.p
          className="mt-5 max-w-[16rem] text-[11px] leading-[1.8] tracking-[0.02em] text-white/30 md:mt-7"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Telegram-анонсы, социальные баннеры и диджитал-ассеты —
          с той же энергией, что и в печатных материалах.
        </motion.p>

        <motion.div
          className="mt-5 flex gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {["TELEGRAM", "VK"].map((platform) => (
            <span key={platform} className="text-[9px] tracking-[0.32em] text-white/20">
              {platform}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Telegram phone — hero scale, bleeds off bottom/right */}
      <motion.div
        className="pointer-events-none absolute z-10"
        style={{
          left: "clamp(8rem, 18vw, 14rem)",
          bottom: "-16%",
          width: "clamp(46rem, 88vw, 72rem)",
          rotate: "-6deg",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        aria-hidden="true"
      >
        <CaseMotionImage
          src={IMG.phoneMain}
          alt="Telegram-анонс ПУНШ"
          sectionInView={isInView}
          className="h-auto w-full"
          style={{
            filter:
              "drop-shadow(0 0 60px rgba(143,98,199,0.35)) drop-shadow(0 32px 64px rgba(0,0,0,0.85))",
          }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      {/* Poster phone — accent, bleeds off top/right */}
      <motion.div
        className="pointer-events-none absolute z-20"
        style={{
          right: "-12%",
          top: "-10%",
          width: "clamp(34rem, 58vw, 52rem)",
          rotate: "12deg",
        }}
        initial={{ opacity: 0, y: -40, rotate: 18 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: 12 } : { opacity: 0, y: -40, rotate: 18 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        aria-hidden="true"
      >
        <CaseMotionImage
          src={IMG.phoneAccent}
          alt="Постер в телефоне"
          sectionInView={isInView}
          className="h-auto w-full"
          style={{
            filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.75)) drop-shadow(0 0 40px rgba(143,98,199,0.2))",
          }}
          animate={{ y: [12, -12, 12] }}
          transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 0.4 }}
        />
      </motion.div>

      {/* Edge vignette — phones feel cropped by viewport */}
      <div
        className="pointer-events-none absolute inset-0 z-[25]"
        style={{
          background:
            "linear-gradient(to right, #0d0010 0%, transparent 18%), linear-gradient(to top, #0d0010 0%, transparent 12%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
