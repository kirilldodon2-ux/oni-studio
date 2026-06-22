"use client";

import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { punchSrc } from "../punchAssets";
import { CaseImage } from "@/systems/cases/components/CaseImage";
import { PunchCaption, PunchSectionMeta, punchSectionStyle } from "../punchLayout";

const BG = "#eceaf0";
const GRUNGE = punchSrc("33c8208a5b3400514fadf44d21a7c8d9cfce2062.png");

/** Editorial story order — main → artist → lineup → product → venue → touchpoints */
const POSTERS = [
  punchSrc("f47d65df327279b35fa097c276fd5e5261f519fe.png"),
  punchSrc("ae2c09d84ca24b2aeee87b4189a59e6e39b1f5b5.png"),
  punchSrc("c5323e4366fbf3ead2c2af85b31275b52c4f7ecd.png"),
  punchSrc("c4b0bf49266c7ebbed7ded91e0b5fd91e489cff2.png"),
  punchSrc("3d72723582f1b340a8ca95e20708bcd1802238bf.png"),
  punchSrc("0eca43d41f131fe927487ddbe01c702362fe4414.png"),
  punchSrc("5ad50bd3a5b8b9f8b22f796d983943d793075179.png"),
  punchSrc("10aa3444c95c4253f46440f0ef2aac8ccec8b61e.png"),
  punchSrc("f2876a742250ce847a5689c7aea6781f2f71c47c.png"),
];

const PHONE = punchSrc("phone-telegram.png");

const GHOST_A = POSTERS[0];
const GHOST_B = POSTERS[3];

export function PunchPosters() {
  const ref = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.12 });

  const syncParallax = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      if (backRef.current) backRef.current.style.transform = "";
      if (phoneRef.current) phoneRef.current.style.transform = "";
      return;
    }

    const sl = strip.scrollLeft;
    if (backRef.current) {
      backRef.current.style.transform = `translate3d(${sl * 0.3}px, 0, 0)`;
    }
    if (phoneRef.current) {
      phoneRef.current.style.transform = `translate3d(${sl * -0.05}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    syncParallax();
    strip.addEventListener("scroll", syncParallax, { passive: true });
    return () => strip.removeEventListener("scroll", syncParallax);
  }, [syncParallax]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden"
      style={punchSectionStyle(BG)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: isInView ? `url(${GRUNGE})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.045,
        }}
        aria-hidden="true"
      />

      <PunchSectionMeta index="05" label="POSTERS" light visible={isInView} />

      <motion.p
        className="relative z-20 shrink-0 px-8 pt-[calc(var(--oni-header-h,4rem)+3.75rem)] text-[9px] tracking-[0.24em] text-black/28 md:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        SWIPE →
      </motion.p>

      <div
        className="relative z-10 min-h-0 flex-1 md:pt-[calc(var(--oni-header-h,4rem)+3.5rem)] md:pb-10"
      >
        {/* Depth layer — slow parallax ghosts */}
        <div
          ref={backRef}
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          <div
            className="absolute -left-[8%] top-[18%] w-[55vw] opacity-[0.07] blur-[6px] md:w-[32rem]"
            style={{ transform: "rotate(-4deg)" }}
          >
            <CaseImage src={GHOST_A} alt="" className="h-auto w-full" sectionInView={isInView} />
          </div>
          <div
            className="absolute -right-[12%] bottom-[12%] w-[50vw] opacity-[0.06] blur-[8px] md:w-[28rem]"
            style={{ transform: "rotate(5deg)" }}
          >
            <CaseImage src={GHOST_B} alt="" className="h-auto w-full" sectionInView={isInView} />
          </div>
        </div>

        {/* Film strip — horizontal scroll, mobile-first */}
        <div
          ref={stripRef}
          className="relative z-10 flex h-full min-h-0 items-center gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[7vw] pb-8 pt-3 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-type:x_mandatory] [scroll-padding-inline:7vw] md:gap-8 md:px-[10vw] md:pb-0 md:pt-0 md:[scroll-padding-inline:10vw] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {POSTERS.map((src, i) => (
            <motion.div
              key={src}
              className="flex h-[54vh] w-[84vw] shrink-0 snap-center items-center justify-center md:h-[min(68vh,40rem)] md:w-[min(38vw,20rem)]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.06 + i * 0.04 }}
            >
              <CaseImage
                src={src}
                alt=""
                className="max-h-full max-w-full object-contain"
                sectionInView={isInView}
                style={{
                  filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.14))",
                }}
              />
            </motion.div>
          ))}

          <motion.div
            ref={phoneRef}
            className="flex h-[54vh] w-[72vw] shrink-0 snap-center items-center justify-center will-change-transform md:h-[min(68vh,40rem)] md:w-[min(30vw,16rem)]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
          >
            <CaseImage
              src={PHONE}
              alt="Telegram announcement"
              className="max-h-[88%] max-w-full object-contain"
              sectionInView={isInView}
              style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.22))" }}
            />
          </motion.div>
        </div>
      </div>

      <PunchCaption
        className="absolute bottom-8 left-8 md:bottom-10 md:left-10 lg:left-14"
        light
        visible={isInView}
      >
        Print &amp; digital
      </PunchCaption>
    </section>
  );
}
