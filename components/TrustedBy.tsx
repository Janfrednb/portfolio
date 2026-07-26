"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLanguage } from "./i18n";

export default function TrustedBy() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-4">
      <Reveal className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <span className="font-mono text-xs tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
          {t.trustedBy.label}
        </span>
        <a
          href="https://www.solutar.com.co"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative h-12 w-40 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        >
          <Image src="/logos/solutar-logo.png" alt="Solutar" fill className="object-contain" />
        </a>
      </Reveal>
    </section>
  );
}
