"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const PURPLE = "#8f62c7";
const LOGO   = "/cases/punch/punch-logo.png";

export function PunchAbout() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.25 });

  return (
    <section
      ref={ref}
      className="relative flex overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#0d0010" }}
    >
      {/* LEFT COLUMN — purple band full-height with logo centered */}
      <motion.div
        className="relative flex flex-shrink-0 flex-col items-center justify-center"
        style={{ width: "clamp(12rem, 30vw, 24rem)", backgroundColor: PURPLE }}
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        {/* Watermark ПУНШ */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-bebas text-white leading-none"
            style={{ fontSize: "clamp(7rem, 18vw, 14rem)", opacity: 0.08, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            ПУНШ
          </span>
        </div>

        {/* Section label — vertical */}
        <motion.p
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-medium tracking-[0.36em] text-white/50 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateX(50%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          SECTION 03 / ABOUT
        </motion.p>

        {/* Logo */}
        <motion.div
          className="relative z-10"
          style={{ width: "clamp(7rem, 18vw, 14rem)" }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <img
            src={LOGO}
            alt="ПУНШ NEVER SLEEP"
            className="h-auto w-full"
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.4))" }}
          />
        </motion.div>
      </motion.div>

      {/* RIGHT COLUMN — dark, all text */}
      <div
        className="relative flex flex-1 flex-col justify-center px-8 md:px-10 lg:px-14"
        style={{ paddingTop: "calc(var(--oni-header-h, 4rem) + 1.5rem)" }}
      >
        {/* "ABOUT" heading */}
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.9] text-white"
            style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            ABOUT
          </motion.h2>
        </div>

        {/* Divider */}
        <motion.div
          className="my-5 h-px md:my-6"
          style={{ width: "3rem", backgroundColor: PURPLE, opacity: 0.7 }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Lead paragraph */}
        <motion.p
          className="max-w-[32rem] text-[13px] font-medium leading-[1.8] tracking-[0.025em] text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          PUNCH — вечеринка от организаторов Мурманска.
        </motion.p>

        {/* Body text */}
        <motion.p
          className="mt-4 max-w-[32rem] text-[12px] leading-[1.85] text-white/45"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          Задача: создать дерзкий узнаваемый айдентити для серии клубных мероприятий,
          который будет работать во всех точках контакта — от постеров до мерча
          и оформления площадки.
        </motion.p>

        <motion.p
          className="mt-4 max-w-[32rem] text-[12px] leading-[1.85] text-white/30"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          Стиль строим на уличной эстетике: гранж, балончик, рваные текстуры
          и насыщенный пурпур. Это язык ночного города, который не спит —
          отсюда слоган{" "}
          <span style={{ color: PURPLE }}>NEVER SLEEP</span>.
          Кириллическое лого «ПУНШ» стало ядром системы: жёсткое, угловатое,
          мгновенно читаемое.
        </motion.p>

        {/* Scope tags */}
        <motion.div
          className="mt-6 flex flex-wrap gap-2 md:mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {["Event Branding", "Visual Identity", "Merch", "Posters", "Social Media"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-[9px] tracking-[0.2em] text-white/30"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
