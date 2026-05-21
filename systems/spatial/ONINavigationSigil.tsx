"use client";

/**
 * ONINavigationSigil — canonical navigational spatial artifact.
 *
 * Idle: oblique drift, low authority. Hover: frontal reveal — rotation settles,
 * emblem legible, motion calms. Respects `prefers-reduced-motion`.
 *
 * Model: `/public/models/ONI_3d_no_texture.glb`
 */

import { Bounds, Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { clone as cloneObject } from "three/examples/jsm/utils/SkeletonUtils.js";

const MODEL_URL = "/models/ONI_3d_no_texture.glb";
const TAU = Math.PI * 2;

/** Idle — slow environmental spin. */
const IDLE_Y_SPEED = 0.14;
const IDLE_Z_SPEED = 0.035;
/** Oblique viewing angle when dormant. */
const IDLE_OBLIQUE_X = 0.22;

/** Frontal emblem pose — faces camera, symbol legible. */
const FRONTAL_X = 0;
const FRONTAL_Y = 0;
const FRONTAL_Z = 0;

const SETTLE_BLEND = 4.4;
const RELEASE_BLEND = 2;
const CLICK_IMPULSE = 0.35;

const SIGIL_MATERIAL = {
  color: "#1c1b19",
  metalness: 0.88,
  roughness: 0.52,
  envMapIntensity: 0.35,
} as const;

function shortestYawLerp(current: number, target: number, t: number): number {
  let delta = target - current;
  while (delta > Math.PI) delta -= TAU;
  while (delta < -Math.PI) delta += TAU;
  return current + delta * t;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function SigilModel() {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => {
    const root = cloneObject(scene);
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const prev = mesh.material;
      mesh.material = new THREE.MeshStandardMaterial(SIGIL_MATERIAL);
      if (Array.isArray(prev)) prev.forEach((m) => (m as THREE.Material).dispose?.());
      else (prev as THREE.Material | undefined)?.dispose?.();
    });
    return root;
  }, [scene]);

  return (
    <Center>
      <primitive object={model} />
    </Center>
  );
}

function SigilMotion({
  children,
  hovered,
  impulseKey,
  reducedMotion,
}: {
  children: ReactNode;
  hovered: boolean;
  impulseKey: number;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const spinY = useRef(0);
  const obliqueX = useRef(IDLE_OBLIQUE_X);
  const spinZ = useRef(0);
  const impulse = useRef(0);

  useEffect(() => {
    if (impulseKey > 0) impulse.current += CLICK_IMPULSE;
  }, [impulseKey]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g || reducedMotion) return;

    const settling = hovered;
    const blendRate = settling ? SETTLE_BLEND : RELEASE_BLEND;
    const blend = 1 - Math.exp(-blendRate * delta);

    if (settling) {
      spinY.current = shortestYawLerp(spinY.current, FRONTAL_Y, blend);
      obliqueX.current = THREE.MathUtils.lerp(obliqueX.current, FRONTAL_X, blend);
      spinZ.current = THREE.MathUtils.lerp(spinZ.current, FRONTAL_Z, blend);
    } else {
      spinY.current += IDLE_Y_SPEED * delta;
      obliqueX.current = THREE.MathUtils.lerp(obliqueX.current, IDLE_OBLIQUE_X, blend);
      spinZ.current = THREE.MathUtils.lerp(spinZ.current, 0, blend * 0.35);
      spinZ.current += IDLE_Z_SPEED * delta;
    }

    g.rotation.set(obliqueX.current, spinY.current, spinZ.current);

    if (impulse.current > 0.002) {
      spinY.current += impulse.current * delta;
      impulse.current *= Math.exp(-6 * delta);
    } else {
      impulse.current = 0;
    }
  });

  return <group ref={group}>{children}</group>;
}

function SigilScene({
  hovered,
  impulseKey,
  reducedMotion,
}: {
  hovered: boolean;
  impulseKey: number;
  reducedMotion: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[2.5, 3.5, 4]} intensity={0.72} />
      <directionalLight position={[-2, 1, -1.5]} intensity={0.18} />
      <Bounds fit clip observe margin={1.22} maxDuration={0.2}>
        <SigilMotion
          hovered={hovered}
          impulseKey={impulseKey}
          reducedMotion={reducedMotion}
        >
          <SigilModel />
        </SigilMotion>
      </Bounds>
    </>
  );
}

export interface ONINavigationSigilProps {
  hovered?: boolean;
  impulseKey?: number;
  className?: string;
}

export function ONINavigationSigil({
  hovered = false,
  impulseKey = 0,
  className = "",
}: ONINavigationSigilProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <span
      className={[
        "relative inline-flex h-7 w-7 shrink-0 items-center justify-center",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.08, 2.65], fov: 32, near: 0.1, far: 20 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        }}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
        className="pointer-events-none"
        onCreated={({ gl, scene: threeScene }) => {
          gl.setClearColor(0x000000, 0);
          threeScene.background = null;
        }}
      >
        <SigilScene
          hovered={hovered}
          impulseKey={impulseKey}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </span>
  );
}

useGLTF.preload(MODEL_URL);
