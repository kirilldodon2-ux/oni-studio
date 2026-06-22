"use client";

import { useInView } from "motion/react";
import { useRef, type CSSProperties, type ImgHTMLAttributes } from "react";

type CaseImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "loading"> & {
  src: string;
  /** First-screen / hero — load immediately */
  priority?: boolean;
  /** Section-level inView from parent — avoids duplicate observers */
  sectionInView?: boolean;
  style?: CSSProperties;
};

/**
 * Viewport-gated case media — no network fetch until near viewport.
 * Pair with section `useInView` via sectionInView when available.
 */
export function CaseImage({
  src,
  priority = false,
  sectionInView,
  alt = "",
  style,
  className,
  ...rest
}: CaseImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useInView(ref, { amount: 0, margin: "320px 0px" });
  const shouldLoad = priority || sectionInView === true || (sectionInView === undefined && inView);

  return (
    <img
      ref={ref}
      src={shouldLoad ? src : undefined}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...rest}
    />
  );
}
