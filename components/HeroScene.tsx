"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

// ─── Palette ─────────────────────────────────────────────────────────────────
const RED       = "#ff3a4a";
const RED_DEEP  = "#e8192c";
const RED_RIM   = "#ff2233";
const STEEL     = "#64646f";
const STEEL_LT  = "#b2b2c0";
const STEEL_BR  = "#d6d6e2";
const STEEL_DK  = "#383840";
const BG        = "#14141a";

// ─── Hooks ───────────────────────────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [v, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => set(mq.matches);
    upd(); mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);
  return v;
}

function useIsMobile() {
  const [v, set] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const upd = () => set(mq.matches);
    upd(); mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);
  return v;
}

// ─── Materials ───────────────────────────────────────────────────────────────
function SteelMat({ bright = false }: { bright?: boolean }) {
  return (
    <meshStandardMaterial
      color={bright ? STEEL_BR : STEEL_LT}
      emissive={STEEL_LT}
      emissiveIntensity={bright ? 0.1 : 0.05}
      metalness={0.92}
      roughness={bright ? 0.1 : 0.22}
    />
  );
}

function RedMat({ emissive = 0.5 }: { emissive?: number }) {
  return (
    <meshStandardMaterial
      color={RED}
      emissive={RED_DEEP}
      emissiveIntensity={emissive}
      metalness={0.7}
      roughness={0.22}
    />
  );
}

// ─── Weight Plate ─────────────────────────────────────────────────────────────
function WeightPlate({
  radius = 0.42,
  thickness = 0.072,
  color = "red",
  segments = 40,
}: {
  radius?: number;
  thickness?: number;
  color?: "red" | "steel";
  segments?: number;
}) {
  const mat =
    color === "red" ? (
      <RedMat />
    ) : (
      <meshStandardMaterial
        color={STEEL}
        emissive={STEEL_LT}
        emissiveIntensity={0.08}
        metalness={0.88}
        roughness={0.25}
      />
    );

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* Outer rim */}
      <mesh>
        <cylinderGeometry args={[radius, radius, thickness * 0.5, segments]} />
        {mat}
      </mesh>
      {/* Inner face */}
      <mesh>
        <cylinderGeometry args={[radius * 0.88, radius * 0.88, thickness, segments]} />
        {mat}
      </mesh>
      {/* Hub hole */}
      <mesh>
        <cylinderGeometry
          args={[radius * 0.19, radius * 0.19, thickness + 0.02, 20]}
        />
        <meshStandardMaterial color="#111118" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

// ─── Barbell ──────────────────────────────────────────────────────────────────
// Pushed far down (low Y) and far back (negative Z) so it sits below the text
function Barbell({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  mobile = false,
}) {
  const plateSets = mobile
    ? [
        { x: -1.38, color: "red" as const, s: 1 },
        { x: -1.30, color: "steel" as const, s: 0.76 },
        { x: 1.38, color: "red" as const, s: 1 },
        { x: 1.30, color: "steel" as const, s: 0.76 },
      ]
    : [
        { x: -1.44, color: "red" as const, s: 1 },
        { x: -1.36, color: "steel" as const, s: 0.82 },
        { x: -1.29, color: "red" as const, s: 0.64 },
        { x: 1.44, color: "red" as const, s: 1 },
        { x: 1.36, color: "steel" as const, s: 0.82 },
        { x: 1.29, color: "red" as const, s: 0.64 },
      ];

  const seg = mobile ? 24 : 40;

  return (
    <group position={position} scale={scale} rotation={[0.012, 0.04, 0]}>
      {/* Shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.044, 0.044, 3.0, seg]} />
        <SteelMat bright />
      </mesh>
      {/* Knurling bands */}
      {[-0.55, -0.35, -0.15, 0.15, 0.35, 0.55].map((kx) => (
        <mesh key={kx} position={[kx, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.048, 0.04, seg]} />
          <meshStandardMaterial color={STEEL_DK} metalness={0.9} roughness={0.35} />
        </mesh>
      ))}
      {/* Sleeves */}
      {([-1.22, 1.22] as number[]).map((sx) => (
        <mesh key={sx} position={[sx, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.056, 0.056, 0.38, seg]} />
          <SteelMat />
        </mesh>
      ))}
      {/* Plates */}
      {plateSets.map((p) => (
        <group key={p.x} position={[p.x, 0, 0]} scale={p.s}>
          <WeightPlate color={p.color} segments={seg} />
        </group>
      ))}
      {/* Collars */}
      {([-1.5, 1.5] as number[]).map((cx) => (
        <mesh key={cx} position={[cx, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.068, 0.068, 0.1, 20]} />
          <meshStandardMaterial color={STEEL_DK} metalness={0.88} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Dumbbell ─────────────────────────────────────────────────────────────────
// rotation[2] drives the lean/tilt — pass a non-zero Z to slant it
function Dumbbell({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
  mobile = false,
}) {
  const seg = mobile ? 18 : 30;
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.032, 0.032, 0.34, seg]} />
        <SteelMat bright />
      </mesh>
      {/* Knurl rings */}
      {([-0.08, 0, 0.08] as number[]).map((kx) => (
        <mesh key={kx} position={[kx, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.036, 0.036, 0.028, seg]} />
          <meshStandardMaterial color={STEEL_DK} metalness={0.9} roughness={0.4} />
        </mesh>
      ))}
      {/* Heads */}
      <group position={[-0.21, 0, 0]}>
        <WeightPlate radius={0.155} thickness={0.24} color="red" segments={seg} />
      </group>
      <group position={[0.21, 0, 0]}>
        <WeightPlate radius={0.155} thickness={0.24} color="steel" segments={seg} />
      </group>
    </group>
  );
}

// ─── Equipment layout ─────────────────────────────────────────────────────────
// FLOOR_Y is low so equipment sits in the bottom third of the viewport
const FLOOR_Y = -1.18;

function GymEquipment({
  reduced,
  mobile,
  isVisible,
}: {
  reduced: boolean;
  mobile: boolean;
  isVisible: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const tRef = useRef(0);
  const ptr = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });

  const onPointer = useCallback((e: PointerEvent) => {
    ptr.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    ptr.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    if (mobile || reduced) return;
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => window.removeEventListener("pointermove", onPointer);
  }, [mobile, reduced, onPointer]);

  useFrame((_, delta) => {
    if (!isVisible || !groupRef.current) return;
    tRef.current += delta;
    if (mobile || reduced) {
      groupRef.current.rotation.y = Math.sin(tRef.current * 0.16) * 0.035;
    } else {
      targetRot.current.y = ptr.current.x * 0.05;
      targetRot.current.x = ptr.current.y * 0.018;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRot.current.y,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRot.current.x,
        0.04
      );
    }
  });

  // Barbell sits on the floor
  const bY = FLOOR_Y + 0.42 * 0.9;
  // Dumbbells sit on the floor too (radius 0.155)
  const dbY = FLOOR_Y + 0.155 * 0.7;

  if (mobile) {
    return (
      <group ref={groupRef}>
        {/* Barbell: centred, pushed to bottom */}
        <Barbell position={[0, bY, 3]} scale={0.78} mobile />
        {/*
          Dumbbells: at outer edges, low, angled so they lean interestingly.
          rotation = [tilt_forward, yaw, roll/lean]
          Large Z rotation = lean left/right
          Large X rotation = nose down
        */}
        <Dumbbell
          position={[-3.4, dbY + 0.5, -9]}
          rotation={[0.18, 0.3, 0.38]}
          scale={1}
          mobile
        />
        <Dumbbell
          position={[1.55, dbY + 0.5, 0.3]}
          rotation={[0.18, -0.3, -0.38]}
          scale={0.62}
          mobile
        />
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {/* Barbell: centred, sits low at floor level, pushed back so plates don't crowd headline */}
      <Barbell position={[0, bY, 4]} scale={0.9} />

      {/*
        Left dumbbell: leaning forward-left (roll +0.42 rad ≈ 24°) and
        tilted nose-down (pitch +0.22) so it looks casually dropped on the floor.
      */}
      <Dumbbell
        position={[-3.6, dbY + 0.09, 0.55]}
        rotation={[0.22, 0.35, 0.42]}
        scale={0.9}
      />

      {/* Right dumbbell: mirror lean */}
      <Dumbbell
        position={[3.6, dbY + 0.09, 1.3]}
        rotation={[0.11, -0.35, -0.42]}
        scale={0.9}
      />

      {/*
        Background depth pair: subtler lean, further back — adds layering
        without cluttering the foreground.
      */}
      <Dumbbell
        position={[-2.0, dbY, 0.5]}
        rotation={[0.1, 0.15, 0.28]}
        scale={0.54}
      />
      <Dumbbell
        position={[3.5, dbY, -0.9]}
        rotation={[0.1, -0.15, -0.28]}
        scale={0.54}
      />
    </group>
  );
}

// ─── Fake ground shadows (replaces real-time shadow maps) ─────────────────────
const shadowTexture = (() => {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(0,0,0,0.6)");
  gradient.addColorStop(0.45, "rgba(0,0,0,0.22)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
})();

function FakeShadow({
  position,
  scale = [1.4, 1.4] as [number, number],
  opacity = 0.42,
}: {
  position: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const map = shadowTexture;
  if (!map) return null;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} renderOrder={-1}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function GroundShadows({ mobile }: { mobile: boolean }) {
  const y = FLOOR_Y + 0.003;

  if (mobile) {
    return (
      <>
        <FakeShadow position={[0, y, 3]} scale={[3.2, 1.1]} opacity={0.48} />
        <FakeShadow position={[-3.4, y, -9]} scale={[1.1, 0.75]} opacity={0.32} />
        <FakeShadow position={[1.55, y, 0.3]} scale={[0.85, 0.6]} opacity={0.28} />
      </>
    );
  }

  return (
    <>
      <FakeShadow position={[0, y, 4]} scale={[3.6, 1.2]} opacity={0.5} />
      <FakeShadow position={[-3.6, y, 0.55]} scale={[1.15, 0.8]} opacity={0.36} />
      <FakeShadow position={[3.6, y, 1.3]} scale={[1.15, 0.8]} opacity={0.36} />
      <FakeShadow position={[-2.0, y, 0.5]} scale={[0.75, 0.55]} opacity={0.22} />
      <FakeShadow position={[3.5, y, -0.9]} scale={[0.75, 0.55]} opacity={0.22} />
    </>
  );
}

// ─── Lighting ─────────────────────────────────────────────────────────────────
// No gold/yellow at all — pure red + white palette
function SceneLighting({ mobile }: { mobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.72} color="#ffffff" />
      <hemisphereLight
        args={
          [
            "#ffe0e6",
            "#1a1020",
            1.1,
          ] as unknown as [
            THREE.ColorRepresentation,
            THREE.ColorRepresentation,
            number,
          ]
        }
      />
      {/* Key — white, top right */}
      <directionalLight
        position={[2, 6, 5]}
        intensity={2.4}
        color="#ffffff"
      />
      {/* Red rim left */}
      <pointLight
        position={[-4.5, 2.5, 1.5]}
        intensity={70}
        color={RED_RIM}
        distance={24}
      />
      {/* Red rim right */}
      <pointLight
        position={[4.5, 2, 1.5]}
        intensity={55}
        color={RED}
        distance={22}
      />
      {/* Soft red fill from below-front — replaces the gold */}
      <pointLight
        position={[0, -0.4, 5]}
        intensity={22}
        color="#cc1020"
        distance={14}
      />
      {/* Cool white top spot */}
      <spotLight
        position={[0, 7, 2]}
        angle={0.48}
        penumbra={0.88}
        intensity={mobile ? 40 : 72}
        color="#dce8ff"
      />
      {/* Dark back fill — prevents silhouette going fully black */}
      <pointLight
        position={[0, 1.5, -4]}
        intensity={14}
        color="#1e0818"
        distance={14}
      />
    </>
  );
}

// ─── Floor ────────────────────────────────────────────────────────────────────
function GymFloor({ mobile }: { mobile: boolean }) {
  return (
    <>
      <Grid
        position={[0, FLOOR_Y, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={mobile ? 0.45 : 0.65}
        cellColor="#242430"
        sectionSize={2.5}
        sectionThickness={mobile ? 1.1 : 1.5}
        sectionColor="#c01828"
        fadeDistance={mobile ? 11 : 18}
        fadeStrength={1.4}
        infiniteGrid
      />
      {/* Matte dark floor — purely dark red emissive, no gold */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, FLOOR_Y - 0.002, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#191920"
          emissive="#200810"
          emissiveIntensity={0.22}
          metalness={0.5}
          roughness={0.68}
        />
      </mesh>
      <GroundShadows mobile={mobile} />
    </>
  );
}

// ─── Camera ───────────────────────────────────────────────────────────────────
// Camera sits higher and looks DOWN more — this pushes equipment to the
// bottom of the frame and frees the upper two-thirds for text.
function CameraRig({ mobile }: { mobile: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    if (mobile) {
      // Mobile: higher up, steeper downward look, narrower FOV
      camera.position.set(0, 1.6, 9.5);
      camera.lookAt(0, -0.8, 0);
    } else {
      // Desktop: elevated, looking down at the floor equipment
      camera.position.set(0, 1.8, 7.8);
      camera.lookAt(0, -1.0, 0);
    }
    if ("fov" in camera) {
      (camera as THREE.PerspectiveCamera).fov = mobile ? 50 : 44;
      camera.updateProjectionMatrix();
    }
  }, [camera, mobile]);
  return null;
}

// Pauses the demand render loop when the hero scrolls off-screen
function VisibilityDriver({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);

  useFrame(() => {
    if (active) invalidate();
  });

  return null;
}

// ─── Scene root ───────────────────────────────────────────────────────────────
function SceneContent({ isVisible }: { isVisible: boolean }) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  return (
    <>
      <color attach="background" args={[BG]} />
      {!mobile && <fog attach="fog" args={[BG, 18, 36]} />}
      <CameraRig mobile={mobile} />
      <VisibilityDriver active={isVisible} />
      <SceneLighting mobile={mobile} />
      <GymFloor mobile={mobile} />
      <GymEquipment reduced={reduced} mobile={mobile} isVisible={isVisible} />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function HeroScene({ isVisible = true }: { isVisible?: boolean }) {
  const [mounted, set] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => set(true), []);

  if (!mounted) {
    return (
      <div className="h-full w-full" style={{ background: "#14141a" }} aria-hidden />
    );
  }

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.25]}
      gl={{
        antialias: !mobile,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: mobile ? 1.5 : 1.78,
      }}
      className="h-full w-full touch-none select-none"
      aria-hidden
    >
      <SceneContent isVisible={isVisible} />
    </Canvas>
  );
}