"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const LINKS = [
  {
    platform: "telegram",
    handle: "@ONIvisual",
    url: "https://t.me/ONIvisual",
  },
  {
    platform: "instagram",
    handle: "@oni_visual_studio",
    url: "https://www.instagram.com/oni_visual_studio",
  },
];

export function BrandbookLinks() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { amount: 0.3 });

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ height: "100vh", scrollSnapAlign: "start", flexShrink: 0 }}
    >
      <div className="absolute right-[5%] top-8">
        <div className="overflow-hidden">
          <motion.h2
            className="text-right leading-none text-[#070707]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(60px, 13vw, 130px)",
            }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            LINKS
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="text-right leading-none text-[#B2B2B2]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(60px, 13vw, 130px)",
            }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            ССЫЛКИ
          </motion.p>
        </div>
      </div>

      <div
        ref={contentRef}
        className="absolute bottom-0 left-[6.5%] top-[58%] md:top-[75%]"
      >
        <div className="absolute bottom-0 left-0 top-0 w-[2px]">
          <motion.div
            className="h-full w-full"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
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

        <div className="flex h-full flex-col justify-center gap-8 pl-10 max-md:gap-9 md:gap-6">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 no-underline"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 + i * 0.15 }}
              whileHover={{ x: 6 }}
            >
              <span
                className="text-black"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(16px, 4.2vw, 24px)",
                  fontWeight: 400,
                }}
              >
                {link.platform}
                <span className="text-[#B2B2B2]">^</span>
                {"  "}
                <span className="underline-offset-4 group-hover:underline decoration-[#B2B2B2]">
                  {link.handle}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-6 right-[5%] text-right"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p
          className="text-[11px] tracking-[0.2em] text-[#B2B2B2]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ONI VISUAL STUDIO © 2026
        </p>
      </motion.div>
    </section>
  );
}
