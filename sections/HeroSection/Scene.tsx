"use client";

import { Bounds, Center, ContactShadows, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { clone as cloneObject } from "three/examples/jsm/utils/SkeletonUtils.js";
import { PMREMGenerator } from "three";

const MODEL_URL = "/models/ONI_3d_no_texture.glb";

/** Slow environmental rotation: one turn in roughly 24 seconds. */
const Y_SPIN_SPEED = 0.26;

function OniModel() {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => {
    const root = cloneObject(scene);
    root.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const prev = mesh.material;
      mesh.material = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 1,
        roughness: 0,
        envMapIntensity: 1,
      });
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

function SpinOnY({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += Y_SPIN_SPEED * delta;
  });
  return <group ref={group}>{children}</group>;
}

/** Off-axis placement integrates the sculpture with the editorial text field. */
function CinematicOffset({ children }: { children: ReactNode }) {
  const width = useThree((s) => s.size.width);
  const desktop = width >= 1024;
  const pos: [number, number, number] = desktop ? [0.34, 0.1, 0.08] : [0, 0.02, 0];
  return <group position={pos}>{children}</group>;
}

/**
 * Local PMREM environment — same metallic read as studio preset without
 * fetching studio_small_03_1k.hdr from drei-assets (network failures crash R3F).
 */
function HeroRoomEnvironment() {
  const { scene, gl } = useThree();

  useLayoutEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = texture;

    return () => {
      scene.environment = null;
      texture.dispose();
      pmrem.dispose();
    };
  }, [scene, gl]);

  return null;
}

/** Larger margin on wide hero canvas keeps the sculpture restrained inside the frame. */
function ModelFit({ children }: { children: ReactNode }) {
  const width = useThree((s) => s.size.width);
  const desktop = width >= 1024;
  const margin = desktop ? 1.58 : 1.34;

  return (
    <Bounds key={desktop ? "desktop" : "mobile"} fit clip observe margin={margin} maxDuration={0.35}>
      {children}
    </Bounds>
  );
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [3.75, 2.5, 5], fov: 42, near: 0.1, far: 200 }}
      gl={{
        alpha: true,
        antialias: true,
        premultipliedAlpha: false,
      }}
      className="h-full w-full touch-pan-y bg-transparent"
      style={{ background: "transparent", touchAction: "pan-y" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} />
      <HeroRoomEnvironment />
      <ModelFit>
        <CinematicOffset>
          <SpinOnY>
            <OniModel />
          </SpinOnY>
        </CinematicOffset>
      </ModelFit>
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.35}
        scale={16}
        blur={2.4}
        far={6}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
