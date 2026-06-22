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
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden md:flex-row"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#06040c" }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 z-0 h-[45%] w-full md:top-1/2 md:h-full md:w-1/2 md:-translate-y-1/2"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 40%, rgba(143,98,199,0.22) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 select-none font-bebas leading-none text-white md:block"
        style={{ fontSize: "clamp(6rem, 20vw, 18rem)", opacity: 0.03, letterSpacing: "0.04em", whiteSpace: "nowrap" }}
        aria-hidden="true"
      >
        XXXMANERA
      </div>

      {/* Photo — top on mobile, left on desktop */}
      <div className="relative z-10 flex h-[40vh] shrink-0 items-center justify-center overflow-hidden md:h-full md:w-1/2">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 85% at 50% 42%, rgba(143,98,199,0.48) 0%, rgba(143,98,199,0.10) 50%, transparent 75%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          className="pointer-events-none relative z-10 flex h-full items-center justify-center px-4"
          initial={{ opacity: 0, y: -16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <CaseImage
            src={IMG.rapper}
            alt="XXXMANERA"
            className="h-full w-auto max-w-full object-contain"
            sectionInView={isInView}
            priority
            style={{ filter: "brightness(1.06) saturate(0.95) contrast(1.04) drop-shadow(0 0 24px rgba(143,98,199,0.2))" }}
          />
        </motion.div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-1/3 md:h-[28%]"
          style={{
            background: "linear-gradient(to top, #06040c 0%, rgba(6,4,12,0.5) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10 md:hidden"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          aria-hidden="true"
        />
        <motion.div
          className="absolute right-0 top-0 z-30 hidden h-full w-[2px] md:block"
          style={{ backgroundColor: PURPLE, opacity: 0.5 }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          aria-hidden="true"
        />
      </div>

      {/* Copy — bottom on mobile, right on desktop */}
      <div
        className="relative z-10 flex min-h-0 flex-1 flex-col justify-start overflow-y-auto px-8 pb-8 pt-5 md:w-1/2 md:justify-center md:overflow-visible md:pb-0 md:pr-10 md:pt-0 lg:pr-14"
        style={{ paddingLeft: undefined }}
      >
        <motion.p
          className="mb-3 text-[9px] font-medium tracking-[0.38em] text-white/25 md:mb-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          SECTION 02 / ARTIST
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88] text-white"
            style={{ fontSize: "clamp(2.25rem, 10vw, 5.5rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            HEADLINER
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.88]"
            style={{ fontSize: "clamp(2.25rem, 10vw, 5.5rem)", color: PURPLE }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            XXXMANERA
          </motion.h2>
        </div>

        <motion.p
          className="mt-4 max-w-[26rem] text-[12px] leading-[1.85] tracking-[0.02em] text-white/45 md:mt-7"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Хедлайнер вечера — XXXMANERA. Автор хитов «Скажи мне кто ты» и «Never Broke Again»,
          крутящих мир на повторе. Готовьтесь к сотням лиц и самому мощному вайбу.
        </motion.p>

        <motion.div
          className="mt-5 flex flex-col gap-2 md:mt-10"
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
              className="group flex items-center gap-3 border border-white/8 px-3 py-2.5 transition-opacity hover:opacity-60 md:gap-4 md:px-4 md:py-3"
              style={{ textDecoration: "none" }}
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.65 + i * 0.08 }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: p.color, opacity: 0.8 }}
              />
              <span className="w-6 text-[9px] font-mono tracking-[0.18em] text-white/25">
                {p.abbr}
              </span>
              <span className="text-[11px] tracking-[0.06em] text-white/50">
                {p.name}
              </span>
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
