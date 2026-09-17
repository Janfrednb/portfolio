"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 900;

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function Dust({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const target = useRef({ x: 0, y: 0 });

  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(arr);
  }, []);

  useFrame((state, delta) => {
    target.current.x = state.pointer.x;
    target.current.y = state.pointer.y;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        target.current.y * 0.15,
        0.03
      );
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        pointsRef.current.rotation.y + target.current.x * 0.05,
        0.03
      );
    }
  });

  if (!positions) return null;

  return (
    <Points ref={pointsRef} positions={positions} frustumCulled={false}>
      <PointMaterial
        color={color}
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticleField() {
  const isDark = useIsDark();
  const color = isDark ? "#f0abfc" : "#7c3aed";

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
    >
      <Dust color={color} />
    </Canvas>
  );
}
