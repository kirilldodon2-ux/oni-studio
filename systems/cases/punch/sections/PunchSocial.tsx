"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseMotionImage } from "@/systems/cases/components/CaseMotionImage";

const PURPLE = "#8f62c7";

const IMG = {
  phoneLarge: punchSrc("10aa3444c95c4253f46440f0ef2aac8ccec8b61e.png"),
  phoneSmall: punchSrc("357158fc1890baecb5c5e89ea5c1ce0fd88ae697.png"),
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
        className="pointer-events-none absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "55vw",
          height: "55vw",
          background: `radial-gradient(circle, rgba(143,98,199,0.2) 0%, transparent 65%)`,
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

      {/* Left — text always on top, full width for headings */}
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

      {/* Center — large phone (×2.5, height-bounded so layout stays stable) */}
      <motion.div
        className="pointer-events-none absolute z-10"
        style={{
          left: "clamp(18rem, 32vw, 26rem)",
          top: "50%",
          translateY: "-50%",
          width: "clamp(26rem, 48vw, 42rem)",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <CaseMotionImage
          src={IMG.phoneLarge}
          alt="Большой телефон с Telegram"
          sectionInView={isInView}
          className="h-auto w-full"
          style={{
            maxHeight: "88vh",
            filter: "drop-shadow(0 0 50px rgba(143,98,199,0.4)) drop-shadow(0 24px 40px rgba(0,0,0,0.75))",
          }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>

      {/* Right — secondary phone (×2, pinned inside frame) */}
      <motion.div
        className="pointer-events-none absolute z-20"
        style={{
          right: "clamp(1.5rem, 4vw, 3rem)",
          top: "50%",
          translateY: "-50%",
          width: "clamp(14rem, 22vw, 22rem)",
        }}
        initial={{ opacity: 0, y: 30, rotate: 10 }}
        animate={isInView ? { opacity: 1, y: 0, rotate: 5 } : { opacity: 0, y: 30, rotate: 10 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <CaseMotionImage
          src={IMG.phoneSmall}
          alt="Телефон с постером"
          sectionInView={isInView}
          className="h-auto w-full"
          style={{
            opacity: 0.9,
            transform: "rotate(5deg)",
            filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.65))",
          }}
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    </section>
  );
}
