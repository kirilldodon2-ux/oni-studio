"use client";

import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { useRef } from "react";

type CaseMotionImageProps = Omit<HTMLMotionProps<"img">, "src" | "loading"> & {
  src: string;
  priority?: boolean;
  sectionInView?: boolean;
};

/** motion.img with viewport-gated src — for animated case media */
export function CaseMotionImage({
  src,
  priority = false,
  sectionInView,
  alt = "",
  ...rest
}: CaseMotionImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const inView = useInView(ref, { amount: 0, margin: "320px 0px" });
  const shouldLoad = priority || sectionInView === true || (sectionInView === undefined && inView);

  return (
    <motion.img
      ref={ref}
      src={shouldLoad ? src : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...rest}
    />
  );
}
