"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";

const IMG = {
  phone: "/cases/punch/357158fc1890baecb5c5e89ea5c1ce0fd88ae697.png",
  extra: "/cases/punch/ac4d7bed4406252e0a53e85280bac753e014229a.png",
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
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60vw",
          height: "60vw",
          background: `radial-gradient(circle, rgba(143,98,199,0.18) 0%, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Ghost section number */}
      <div
        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-bebas text-white"
        style={{ fontSize: "clamp(14rem, 35vw, 32rem)", opacity: 0.025, lineHeight: 1 }}
        aria-hidden="true"
      >
        03
      </div>

      {/* Left — label + copy */}
      <div className="relative z-10 flex w-1/2 flex-col justify-center pl-8 md:pl-10 lg:pl-14">
        <motion.p
          className="mb-4 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 03 / DIGITAL
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
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
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            SOCIAL
          </motion.h2>
        </div>

        <motion.p
          className="mt-6 max-w-[20rem] text-[11px] leading-[1.8] tracking-[0.03em] text-white/30 md:mt-8"
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Telegram announcements, social banners, and digital assets —
          all carrying the same visual energy as the physical print materials.
        </motion.p>

        <motion.div
          className="mt-6 flex gap-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {["TELEGRAM", "INSTAGRAM", "VK"].map((platform) => (
            <span key={platform} className="text-[9px] tracking-[0.32em] text-white/20">
              {platform}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right — phone mockup with float */}
      <div className="relative z-10 flex w-1/2 items-center justify-center pr-6 md:pr-10">
        <motion.div
          style={{ width: "clamp(14rem, 30vw, 22rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <motion.img
            src={IMG.phone}
            alt="Telegram social media mockup"
            className="h-auto w-full"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
