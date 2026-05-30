"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useExportMode } from "@/systems/export";
import {
  MANIFESTO_BLACK_MASS,
  MANIFESTO_MASS_PARALLAX,
  MANIFESTO_PARALLAX,
  MANIFESTO_PRIMARY,
  MANIFESTO_REVEAL_DURATION,
  MANIFESTO_TYPO_DRIFT,
} from "./manifestoLines";

type TypoDrift = {
  x: number;
  y: number;
  letterSpacing: number;
  scaleX: number;
};

type MassDrift = { x: number; y: number };

const TYPO_REST: TypoDrift = {
  x: 0,
  y: 0,
  letterSpacing: MANIFESTO_PRIMARY.letterSpacing,
  scaleX: 1,
};

const MASS_REST: MassDrift = { x: 0, y: 0 };

/**
 * Compressed poster — ОНИ + unexplained black mass.
 */
export function IdentityManifesto() {
  const exportMode = useExportMode();
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  const [typo, setTypo] = useState<TypoDrift>(TYPO_REST);
  const [mass, setMass] = useState<MassDrift>(MASS_REST);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || revealedRef.current) return;

    const reduced = !motionOk;
    const block = root.querySelector<HTMLElement>(
      `[data-manifesto-block="${MANIFESTO_PRIMARY.id}"]`
    );
    if (!block) return;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;

      if (exportMode || reduced) {
        gsap.set(block, { x: "101%" });
        return;
      }

      gsap.fromTo(
        block,
        { x: "0%" },
        { x: "101%", duration: MANIFESTO_REVEAL_DURATION, ease: "power3.inOut" }
      );
    };

    if (exportMode) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -2% 0px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [exportMode, motionOk]);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const field = fieldRef.current;
      if (!field || !motionOk) return;

      const fieldRect = field.getBoundingClientRect();
      const nx = (clientX - fieldRect.left) / fieldRect.width - 0.5;
      const ny = (clientY - fieldRect.top) / fieldRect.height - 0.5;

      setTypo({
        x: nx * MANIFESTO_PARALLAX.x,
        y: ny * MANIFESTO_PARALLAX.y,
        letterSpacing:
          MANIFESTO_PRIMARY.letterSpacing + nx * MANIFESTO_TYPO_DRIFT.letterSpacing,
        scaleX: 1 + nx * MANIFESTO_TYPO_DRIFT.scaleX,
      });

      setMass({
        x: -nx * MANIFESTO_MASS_PARALLAX.x,
        y: -ny * MANIFESTO_MASS_PARALLAX.y,
      });
    },
    [motionOk]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setTypo(TYPO_REST);
    setMass(MASS_REST);
  };

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative block overflow-hidden"
      data-oni-layer="identity-manifesto"
    >
      <div
        ref={fieldRef}
        className="relative h-[clamp(152px,28vw,252px)] min-h-[148px] overflow-hidden lg:h-[min(20vw,272px)] lg:min-h-[164px]"
      >
        {/* Black mass — upper-right counterweight */}
        <div
          className={`absolute ${MANIFESTO_BLACK_MASS.className} z-[3] bg-black will-change-transform`}
          style={
            motionOk
              ? { transform: `translate(${mass.x}px, ${mass.y}px)` }
              : undefined
          }
          aria-hidden
        />

        {/* ОНИ — cropped poster fragment */}
        <div
          className={`absolute ${MANIFESTO_PRIMARY.className} z-[2] origin-bottom-left will-change-transform`}
          style={
            motionOk
              ? {
                  transform: `translate(${typo.x}px, ${typo.y}px) scaleX(${typo.scaleX})`,
                }
              : undefined
          }
        >
          <div className="relative w-[152%]">
            <span
              className="block font-bebas uppercase leading-[0.7] text-black"
              style={{
                fontSize: MANIFESTO_PRIMARY.size,
                letterSpacing: `${typo.letterSpacing}em`,
              }}
            >
              {MANIFESTO_PRIMARY.text}
            </span>
            <span
              data-manifesto-block={MANIFESTO_PRIMARY.id}
              className="pointer-events-none absolute inset-0 bg-black will-change-transform"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
