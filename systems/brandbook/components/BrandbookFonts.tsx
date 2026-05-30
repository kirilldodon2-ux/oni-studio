"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const CYRILLIC =
  "А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я";
const LATIN = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";

const TYPEFACES = [
  {
    name: "Cascadia Code",
    role: "MONOSPACE / BODY",
    fontFamily: "var(--font-mono)",
    weight: 400,
    specimen: CYRILLIC,
  },
  {
    name: "Bounded",
    role: "DISPLAY / HEADINGS",
    fontFamily: "var(--font-display)",
    weight: 700,
    specimen: CYRILLIC,
  },
];

export function BrandbookFonts() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { amount: 0.3 });

  return (
    <section
      className="relative overflow-hidden bg-[#F7F7F7]"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 top-0">
        <motion.div
          className="h-full w-full"
          initial={{ scaleY: 0, originY: "50%" }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <svg className="h-full" width="3" fill="none">
            <line
              x1="1.5"
              y1="0"
              x2="1.5"
              y2="100%"
              stroke="#B2B2B2"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>
        </motion.div>
      </div>

      <div ref={contentRef} className="relative z-10 flex h-full flex-col md:flex-row">
        <div className="flex w-full flex-none flex-col justify-center px-8 pt-20 max-md:pb-4 md:w-1/2 md:px-[7%] md:pt-0 md:pb-0">
          <div className="overflow-hidden">
            <motion.h2
              className="leading-none text-[#070707]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(60px, 12vw, 108px)",
              }}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              FONTS
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="leading-none text-[#B2B2B2]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(60px, 12vw, 108px)",
              }}
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              ШРИФТЫ
            </motion.p>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col justify-center gap-10 px-8 pb-14 max-md:gap-9 md:w-1/2 md:gap-8 md:px-[6%] md:pb-0">
          {TYPEFACES.map((face, i) => (
            <motion.div
              key={face.name}
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 + i * 0.2 }}
            >
              <p
                className="mb-1 text-[#0D0D0D]"
                style={{
                  fontFamily: face.fontFamily,
                  fontWeight: face.weight,
                  fontSize: "clamp(22px, 5.5vw, 36px)",
                }}
              >
                {face.name}
              </p>
              <p
                className="mb-3 tracking-widest text-[#B2B2B2]"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 300,
                }}
              >
                {face.role}
              </p>
              <motion.p
                className="break-words text-black"
                style={{
                  fontFamily: face.fontFamily,
                  fontWeight: 300,
                  fontSize: "clamp(14px, 3.6vw, 18px)",
                  lineHeight: 1.9,
                  letterSpacing: "0.05em",
                }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.25 }}
              >
                {face.specimen}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
