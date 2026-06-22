"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { punchSectionStyle } from "../punchLayout";

const BG   = "#CBCAC5";
const INK  = "#111111";
const MUTE = "rgba(0,0,0,0.32)";

const LINKS = [
  { label: "telegram",  handle: "@onidigital",             href: "https://t.me/ONIdigital" },
  { label: "instagram", handle: "@onidigital_studio",      href: "https://www.instagram.com/onidigital_studio" },
  { label: "email",     handle: "onivisualstudio@gmail.com", href: "mailto:onivisualstudio@gmail.com" },
];

export function PunchFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section ref={ref} className="relative flex flex-col overflow-hidden" style={punchSectionStyle(BG)}>
      <motion.div
        className="absolute px-8 md:px-10 lg:px-14"
        style={{ top: "calc(var(--oni-header-h, 4rem) + 1.75rem)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
      >
        <p className="text-[10px] font-medium tracking-[0.30em]" style={{ color: MUTE }}>
          09 — END
        </p>
      </motion.div>

      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        >
          <CaseImage
            src={punchSrc("punch-logo.png")}
            alt="ПУНШ NEVER SLEEP"
            sectionInView={isInView}
            style={{
              width: "clamp(9rem, 20vw, 16rem)",
              display: "block",
              filter: "invert(1)",
              opacity: 0.85,
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col gap-6 border-t px-8 pb-10 pt-7 md:flex-row md:items-end md:justify-between md:px-10 lg:px-14"
        style={{ borderColor: "rgba(0,0,0,0.14)" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col gap-4">
          <p className="text-[9px] font-medium tracking-[0.36em]" style={{ color: INK, opacity: 0.38 }}>
            LINKS
          </p>
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.04em] transition-opacity hover:opacity-60"
                style={{ color: MUTE }}
              >
                {link.label} — {link.handle}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-[10px] tracking-[0.22em]" style={{ color: INK, opacity: 0.35 }}>
            Created by ONI Studio · 2026
          </p>
          <Link
            href="/cases"
            className="border-t border-black/[0.12] pt-3 text-[11px] font-semibold tracking-[0.26em] text-black transition-opacity hover:opacity-60"
          >
            ALL CASES →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
