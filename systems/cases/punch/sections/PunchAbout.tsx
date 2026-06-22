"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";

const PURPLE = "#8f62c7";
const LOGO   = punchSrc("punch-logo.png");

export function PunchAbout() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0, backgroundColor: "#0d0010" }}
    >
      {/* Purple header band — horizontal on all breakpoints */}
      <motion.div
        className="relative flex shrink-0 flex-col items-center justify-center px-8 py-8 md:py-12"
        style={{ backgroundColor: PURPLE }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-bebas leading-none text-white"
            style={{ fontSize: "clamp(5rem, 22vw, 12rem)", opacity: 0.07 }}
          >
            ПУНШ
          </span>
        </div>

        <motion.p
          className="relative z-10 mb-4 text-[9px] font-medium tracking-[0.36em] text-white/55"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          SECTION 03 / ABOUT
        </motion.p>

        <motion.div
          className="relative z-10"
          style={{ width: "clamp(6rem, 28vw, 11rem)" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <CaseImage
            src={LOGO}
            alt="ПУНШ NEVER SLEEP"
            className="h-auto w-full"
            sectionInView={isInView}
            style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.4))" }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div
        className="relative flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-8 py-6 md:px-10 md:py-8 lg:px-14"
      >
        <div className="overflow-hidden">
          <motion.h2
            className="font-bebas leading-[0.9] text-white"
            style={{ fontSize: "clamp(3rem, 12vw, 8rem)" }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            ABOUT
          </motion.h2>
        </div>

        <motion.div
          className="my-4 h-px md:my-5"
          style={{ width: "3rem", backgroundColor: PURPLE, opacity: 0.7 }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        />

        <motion.p
          className="max-w-[32rem] text-[13px] font-medium leading-[1.8] tracking-[0.025em] text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          PUNCH — вечеринка от организаторов Мурманска.
        </motion.p>

        <motion.p
          className="mt-3 max-w-[32rem] text-[12px] leading-[1.85] text-white/45 md:mt-4"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Задача: создать дерзкий узнаваемый айдентити для серии клубных мероприятий,
          который будет работать во всех точках контакта — от постеров до мерча
          и оформления площадки.
        </motion.p>

        <motion.p
          className="mt-3 max-w-[32rem] text-[12px] leading-[1.85] text-white/30 md:mt-4"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Стиль строим на уличной эстетике: гранж, балончик, рваные текстуры
          и насыщенный пурпур. Это язык ночного города, который не спит —
          отсюда слоган{" "}
          <span style={{ color: PURPLE }}>NEVER SLEEP</span>.
          Кириллическое лого «ПУНШ» стало ядром системы: жёсткое, угловатое,
          мгновенно читаемое.
        </motion.p>

        <motion.div
          className="mt-5 flex flex-wrap gap-2 md:mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
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
