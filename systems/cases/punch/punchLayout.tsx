import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";

export function punchSectionStyle(bg: string): CSSProperties {
  return {
    height: "100dvh",
    minHeight: "100dvh",
    maxHeight: "100dvh",
    scrollSnapAlign: "start",
    scrollSnapStop: "always",
    flexShrink: 0,
    backgroundColor: bg,
  };
}

export const PUNCH_SCROLL_STYLE: CSSProperties = {
  scrollSnapType: "y mandatory",
  overscrollBehaviorY: "contain",
  WebkitOverflowScrolling: "touch",
};

type PunchSectionMetaProps = {
  index: string;
  label: string;
  light?: boolean;
  visible?: boolean;
};

export function PunchSectionMeta({ index, label, light = false, visible = true }: PunchSectionMetaProps) {
  const ink = light ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.30)";
  const mute = light ? "rgba(0,0,0,0.20)" : "rgba(255,255,255,0.20)";
  const rule = light ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.15)";

  return (
    <motion.div
      className="absolute left-8 z-20 flex items-center gap-4 md:left-10 lg:left-14"
      style={{ top: "calc(var(--oni-header-h, 4rem) + 1.75rem)" }}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.05 }}
    >
      <span className="text-[10px] font-medium tracking-[0.30em]" style={{ color: ink }}>
        {index}
      </span>
      <span className="h-px w-4" style={{ backgroundColor: rule }} aria-hidden="true" />
      <span className="text-[10px] font-medium tracking-[0.30em]" style={{ color: mute }}>
        {label}
      </span>
    </motion.div>
  );
}

export function PunchCaption({
  children,
  className = "",
  visible = true,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  visible?: boolean;
  light?: boolean;
}) {
  return (
    <motion.p
      className={`text-[10px] leading-[1.7] tracking-[0.18em] ${className}`}
      style={{ color: light ? "rgba(0,0,0,0.28)" : "rgba(255,255,255,0.24)" }}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      {children}
    </motion.p>
  );
}
