"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const compactRef = useRef(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFine);
    if (!isFine) return;

    document.documentElement.classList.add("custom-cursor-active");

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const labelEl = el?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelEl?.dataset.cursorLabel ?? null);
      compactRef.current = labelEl?.dataset.cursorVariant === "compact";
      setCompact(compactRef.current);
      setHovering(!!el?.closest("a, button"));
    }

    let frame: number;
    function raf() {
      // Compact labels behave like a tooltip and stick to the pointer.
      const ease = compactRef.current ? 1 : 0.18;
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 transition-opacity duration-150 ${
          label && !compact ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[90] flex items-center justify-center rounded-full border transition-[width,height,padding,opacity,background-color,translate] duration-200 ${
          label && compact
            ? "h-6 w-auto translate-x-3 translate-y-4 whitespace-nowrap border-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-2 opacity-90"
            : "-translate-x-1/2 -translate-y-1/2"
        } ${
          label && compact
            ? ""
            : label
            ? "h-10 w-auto whitespace-nowrap border-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-3 opacity-100"
            : hovering
              ? "h-12 w-12 border-fuchsia-500/60 opacity-100"
              : "h-8 w-8 border-fuchsia-500/60 opacity-60"
        }`}
      >
        {label && (
          <span
            className={`font-mono font-semibold whitespace-nowrap text-white ${
              compact ? "text-[10px]" : "text-xs"
            }`}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
