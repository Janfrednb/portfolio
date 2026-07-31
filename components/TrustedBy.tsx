"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLanguage } from "./i18n";

const logos = [
  {
    name: "Solutar",
    src: "/logos/solutar-logo.png",
    href: "https://www.solutar.com.co",
    kind: "site" as const,
  },
  {
    name: "Lumen",
    src: "/logos/lumen.jpeg",
    href: "https://www.instagram.com/lumen_med?igsh=MW91MG1nemx1YzFvbA==",
    kind: "instagram" as const,
  },
  {
    name: "GSP Training",
    src: "/logos/gsp-training.jpeg",
    href: "https://www.instagram.com/gsp.training?igsh=YXZwNHBoa3g5dnR1",
    kind: "instagram" as const,
  },
];

export default function TrustedBy() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-4">
      <Reveal className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <span className="font-mono text-xs tracking-wide text-zinc-400 uppercase dark:text-zinc-500">
          {t.trustedBy.label}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {logos.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label={logo.kind === "site" ? t.trustedBy.viewSite : t.trustedBy.viewInstagram}
              className="group relative flex h-14 w-32 items-center justify-center overflow-hidden rounded-lg bg-white p-2 opacity-70 shadow-sm grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain p-2"
              />
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
