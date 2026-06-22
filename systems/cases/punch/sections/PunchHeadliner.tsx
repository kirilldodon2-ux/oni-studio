"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";

const PURPLE = "#8f62c7";

const IMG = {
  rapper: punchSrc("xxxmanera-headliner.png"),
};

const PLATFORMS = [
  {
    id:    "yandex",
    abbr:  "YM",
    name:  "Яндекс Музыка",
    href:  "https://music.yandex.ru/search?text=xxxmanera",
    color: "#FFCC00",
  },
  {
    id:    "apple",
    abbr:  "AM",
    name:  "Apple Music",
    href:  "https://music.apple.com/us/search?term=xxxmanera",
    color: "#fa243c",
  },
  {
    id:      "spotify",
    abbr:    "SP",
    name:    "Spotify",
    href:    "https://open.spotify.com/search/xxxmanera",
    color:  "#1DB954",
  },
];

export function PunchHeadliner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#06040c" }}
    >
      {/* Purple ambient glow behind the figure */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-0"
        style={{
          width: "50vw",
          height: "100%",
          background: `radial-gradient(ellipse 80% 70% at 20% 50%, rgba(143,98,199,0.22) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Ghost "XXXMANERA" watermark */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none font-bebas leading-none text-white"
        style={{ fontSize: "clamp(6rem, 20vw, 18rem)", opacity: 0.03, letterSpacing: "0.04em", whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        XXXMANERA
      </div>

      {/* Left: XXXMANERA — framed portrait (506×1021), full height, centered */}
      <div className="relative z-10 flex w-1/2 items-center justify-center overflow-hidden" style={{ height: "100%" }}>

        {/* Contour glow — purple radial behind the figure */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 85% at 50% 42%, rgba(143,98,199,0.48) 0%, rgba(143,98,199,0.10) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        {/* Photo — pre-framed asset, contain fit preserves composition */}
        <motion.div
          className="pointer-events-none relative z-10 flex h-full items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.15 }}
        >
          <CaseImage
            src={IMG.rapper}
            alt="XXXMANERA"
            className="h-full w-auto max-w-full object-contain"
            sectionInView={isInView}
            style={{ filter: "brightness(1.06) saturate(0.95) contrast(1.04) drop-shadow(0 0 24px rgba(143,98,199,0.2))" }}
          />
        </motion.div>

        {/* Bottom fade — soft blend into section bg */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20"
          style={{
            height: "28%",
            background: "linear-gradient(to top, #06040c 0%, rgba(6,4,12,0.5) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Purple vertical edge accent */}
        <motion.div
          className="absolute right-0 top-0 z-30 h-full w-[2px]"
          style={{ backgroundColor: PURPLE, opacity: 0.5 }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          aria-hidden="true"
        />
      </div>

      {/* Right: text content */}
      <div
        className="relative z-10 flex w-1/2 flex-col justify-center pr-8 md:pr-10 lg:pr-14"
        style={{ paddingLeft: "clamp(1.5rem, 3vw, 2.5rem)" }}
      >
        {/* Section label */}
        <motion.p
          className="mb-5 text-[9px] font-medium tracking-[0.38em] text-white/25"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 02 / ARTIST
        </motion.p>

        {/* "HEADLINER" */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            HEADLINER
          </motion.h2>
        </div>

        {/* "XXXMANERA" */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            XXXMANERA
          </motion.h2>
        </div>

        {/* Bio text */}
        <motion.p
          className="mt-6 max-w-[26rem] text-[12px] leading-[1.85] tracking-[0.02em] text-white/45 md:mt-7"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Хедлайнер вечера — XXXMANERA. Автор хитов «Скажи мне кто ты» и «Never Broke Again»,
          крутящих мир на повторе. Готовьтесь к сотням лиц и самому мощному вайбу.
        </motion.p>

        {/* Music platform cards */}
        <motion.div
          className="mt-8 flex flex-col gap-2 md:mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border border-white/8 px-4 py-3 transition-opacity hover:opacity-60"
              style={{ textDecoration: "none" }}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 + i * 0.08 }}
            >
              {/* Platform colour dot */}
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: p.color, opacity: 0.8 }}
              />
              {/* Abbreviation */}
              <span className="w-6 text-[9px] font-mono tracking-[0.18em] text-white/25">
                {p.abbr}
              </span>
              {/* Name */}
              <span className="text-[11px] tracking-[0.06em] text-white/50">
                {p.name}
              </span>
              {/* CTA */}
              <span className="ml-auto text-[9px] tracking-[0.28em] text-white/20">
                СЛУШАТЬ →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
