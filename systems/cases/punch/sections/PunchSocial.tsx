"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  phoneLarge: "/cases/punch/10aa3444c95c4253f46440f0ef2aac8ccec8b61e.png",
  phoneSmall: "/cases/punch/357158fc1890baecb5c5e89ea5c1ce0fd88ae697.png",
};

export function PunchSocial() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#0d0010" }}
    >
      {/* Background glow — centered */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "70vw",
          height: "70vw",
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

      {/* Left — label + copy */}
      <div className="relative z-10 flex w-[20%] min-w-[10rem] flex-col justify-center pl-8 md:pl-10 lg:pl-14">
        <motion.p
          className="mb-4 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 06 / DIGITAL
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            DIGITAL &
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            SOCIAL
          </motion.h2>
        </div>

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

      {/* Center — LARGE phone (×2.5) */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <motion.div
          style={{ width: "clamp(45rem, 85vw, 75rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <motion.img
            src={IMG.phoneLarge}
            alt="Большой телефон с Telegram"
            className="h-auto w-full"
            style={{ filter: "drop-shadow(0 0 50px rgba(143,98,199,0.4)) drop-shadow(0 24px 40px rgba(0,0,0,0.75))" }}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Right — secondary phone (×2) */}
      <div className="relative z-10 flex w-[24%] items-center justify-start pr-2 md:pr-4">
        <motion.div
          style={{ width: "clamp(18rem, 30vw, 26rem)", transform: "rotate(5deg)" }}
          initial={{ opacity: 0, y: 30, rotate: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 5 } : { opacity: 0, y: 30, rotate: 10 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <motion.img
            src={IMG.phoneSmall}
            alt="Телефон с постером"
            className="h-auto w-full"
            style={{ opacity: 0.9, filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.65))" }}
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
