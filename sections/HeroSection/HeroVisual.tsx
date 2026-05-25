"use client";

import dynamic from "next/dynamic";
import { HeroExportFallback } from "./HeroExportFallback";
import { HeroSceneLoading } from "./HeroSceneLoading";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => <HeroSceneLoading />,
});

type HeroVisualProps = {
  exportMode: boolean;
};

/**
 * Landing hero column — single branch: static fallback OR WebGL Scene.
 * When exportMode is true, Scene is not rendered (no R3F mount, no env map).
 */
export function HeroVisual({ exportMode }: HeroVisualProps) {
  if (exportMode) {
    return <HeroExportFallback />;
  }

  return <Scene />;
}
