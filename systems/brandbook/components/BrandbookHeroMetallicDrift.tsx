"use client";

import { motion, useReducedMotion } from "motion/react";

/** Overscan + origin bias keep edges hidden while motion reads orbital around the logo. */
const DRIFT_ORIGIN = "50% 42%";
const DRIFT_INSET = "-inset-[14%]";

/**
 * Slow ambient drift for hero metallic wire art only.
 * Central ONI mark in BrandbookHero stays static — this layer sits beneath z-10 content.
 */
export function BrandbookHeroMetallicDrift() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className={`absolute ${DRIFT_INSET} will-change-transform`}
        style={{ transformOrigin: DRIFT_ORIGIN }}
        initial={false}
        animate={
          reduceMotion
            ? { rotate: 0, scale: 1.05, x: "0%", y: "0%" }
            : {
                rotate: [0, 0.55, 0.95, 0.4, -0.35, -0.75, -0.2, 0.3, 0],
                scale: [1.05, 1.054, 1.061, 1.057, 1.063, 1.059, 1.056, 1.06, 1.05],
                x: [
                  "0%",
                  "0.28%",
                  "0.48%",
                  "0.22%",
                  "-0.18%",
                  "-0.38%",
                  "-0.12%",
                  "0.14%",
                  "0%",
                ],
                y: [
                  "0%",
                  "-0.22%",
                  "-0.38%",
                  "-0.48%",
                  "-0.3%",
                  "0.08%",
                  "0.28%",
                  "0.16%",
                  "0%",
                ],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 54,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brandbook/hero-wire.png"
          alt=""
          className="h-full w-full object-cover opacity-70"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
