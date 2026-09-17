"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <ParticleField />
    </div>
  );
}
