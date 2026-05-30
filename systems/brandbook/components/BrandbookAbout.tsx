"use client";

import { motion } from "motion/react";

const BODY_PARAGRAPHS = [
  "ONI (ОНИ)\nВизуальная студия, специализирующаяся на 3D, разработке, моушне и digital-дизайне.",
  "Создаём визуалы, которые цепляют: 3D анимации, афиши, постеры и креатив для брендов, артистов и проектов.",
  "Быстрый темп и нестандартные задачи.\nМожем работать по готовому брифу или собрать концепт вместе с вами, если идеи пока только в голове.",
];

export function BrandbookAbout() {
  return (
    <section
      className="relative overflow-hidden bg-[#070707]"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brandbook/about-wire.png"
          alt=""
          className="absolute object-cover opacity-60"
          style={{ top: "-8%", right: "-5%", width: "55%", height: "115%" }}
          draggable={false}
        />
      </div>

      <motion.span
        className="absolute right-10 top-10 font-mono text-[11px] tracking-[0.3em] text-[#B2B2B2]"
        style={{ fontFamily: "var(--font-mono)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: false }}
      >
        02 / 06
      </motion.span>

      <div className="relative z-10 flex h-full flex-col justify-between px-[5.2%] py-[9%]">
        <div>
          <div className="overflow-hidden">
            <motion.h2
              className="leading-none tracking-tight text-[#F7F7F7]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(60px, 8vw, 130px)",
              }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false }}
            >
              ABOUT US
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="leading-none tracking-tight text-[#B2B2B2]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(60px, 8vw, 130px)",
              }}
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              viewport={{ once: false }}
            >
              О НАС
            </motion.h2>
          </div>
        </div>

        <div className="flex max-w-[460px] flex-col gap-5">
          {BODY_PARAGRAPHS.map((para, i) => (
            <motion.p
              key={i}
              className="whitespace-pre-line text-white"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 300,
                fontSize: "clamp(13px, 1.5vw, 18px)",
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 + i * 0.15 }}
              viewport={{ once: false }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
