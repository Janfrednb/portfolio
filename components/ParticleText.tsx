"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useIsDark } from "./useIsDark";

const TARGET_HEIGHT = 1.6;
const SAMPLE_STEP = 3;

function sampleTextPoints(text: string, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Float32Array(0);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${Math.floor(height * 0.72)}px system-ui, sans-serif`;
  ctx.fillText(text, width / 2, height / 2);

  const { data } = ctx.getImageData(0, 0, width, height);
  const pixels: number[] = [];
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let y = 0; y < height; y += SAMPLE_STEP) {
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      if (data[(y * width + x) * 4 + 3] > 128) {
        pixels.push(x, y);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const count = pixels.length / 2;
  const target = new Float32Array(count * 3);
  const scale = TARGET_HEIGHT / Math.max(maxY - minY, 1);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  for (let i = 0; i < count; i++) {
    target[i * 3] = (pixels[i * 2] - cx) * scale;
    target[i * 3 + 1] = -(pixels[i * 2 + 1] - cy) * scale;
    target[i * 3 + 2] = 0;
  }

  return target;
}

function AssemblingLetters({
  text,
  color,
  onSettled,
}: {
  text: string;
  color: string;
  onSettled: () => void;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const startRef = useRef<Float32Array | null>(null);
  const targetRef = useRef<Float32Array | null>(null);
  const progressRef = useRef(0);
  const settledRef = useRef(false);
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const target = sampleTextPoints(text, 480, 160);
    const count = target.length / 3;
    const start = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 2.5;
      start[i * 3] = Math.cos(angle) * radius;
      start[i * 3 + 1] = Math.sin(angle) * radius;
      start[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    startRef.current = start;
    targetRef.current = target;
    progressRef.current = 0;
    settledRef.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(start.slice());
  }, [text]);

  useFrame((_, delta) => {
    if (settledRef.current || !pointsRef.current) return;
    progressRef.current = Math.min(1, progressRef.current + delta / 1.3);
    const eased = 1 - Math.pow(1 - progressRef.current, 3);

    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const start = startRef.current;
    const target = targetRef.current;
    if (!start || !target) return;

    for (let i = 0; i < target.length; i++) {
      (attr.array as Float32Array)[i] = start[i] + (target[i] - start[i]) * eased;
    }
    attr.needsUpdate = true;

    if (progressRef.current >= 1) {
      settledRef.current = true;
      onSettled();
    }
  });

  if (!positions) return null;

  return (
    <Points ref={pointsRef} positions={positions} frustumCulled={false}>
      <PointMaterial
        color={color}
        size={0.032}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

/**
 * Decorative overlay: on mount (client-only, skipped for prefers-reduced-motion
 * or small viewports), briefly hides the real text via onStart, renders it
 * assembling from scattered particles, then hands back control via onSettled
 * once the real text is safely rendered again. The real text stays in the SSR
 * HTML the whole time — this only ever hides it after mount, and only when
 * it's about to immediately replay the same content as particles.
 */
export default function ParticleText({
  text,
  onStart,
  onSettled,
}: {
  text: string;
  onStart: () => void;
  onSettled: () => void;
}) {
  const isDark = useIsDark();
  const color = isDark ? "#f0abfc" : "#7c3aed";
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallViewport = window.innerWidth < 640;
    if (prefersReducedMotion || isSmallViewport) return;

    onStart();
    setActive(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!active) return null;

  return (
    <span className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
      >
        <AssemblingLetters text={text} color={color} onSettled={onSettled} />
      </Canvas>
    </span>
  );
}
