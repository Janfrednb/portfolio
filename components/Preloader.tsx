"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;

    let frame: number;
    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setHidden(true), 600);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-[600ms] dark:bg-black ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-mono text-sm text-fuchsia-500">{progress}%</span>
      <p className="mt-3 font-mono text-lg font-semibold text-zinc-950 sm:text-2xl dark:text-zinc-50">
        TRANSFORMO IDEAS EN SOFTWARE
        <span className="text-zinc-400 dark:text-zinc-600"> · JANFRED NARANJO</span>
      </p>
    </div>
  );
}
