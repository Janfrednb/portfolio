"use client";

import Image from "next/image";
import { ReactLogo, NextLogo, FirebaseLogo, TypeScriptLogo, TailwindLogo } from "./Logos";
import { useLanguage } from "./i18n";

const techIcons = [ReactLogo, NextLogo, FirebaseLogo, TypeScriptLogo, TailwindLogo];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-dot-grid relative overflow-hidden px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl dark:bg-fuchsia-500/25" />
        <div className="animate-blob animation-delay-2000 absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-500/25" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 sm:flex-row">
        <div className="flex-1 text-center sm:text-left">
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
            <span className="text-fuchsia-500">{"<span>"}</span>
            {t.hero.greeting}
            <span className="text-fuchsia-500">{"</span>"}</span>
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-6xl dark:text-zinc-50">
            {t.hero.headingPre}
            <span className="text-fuchsia-500">{"{"}</span>
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
              {t.hero.headingHighlight}
            </span>
            <span className="text-fuchsia-500">{"}"}</span>
            {t.hero.headingPost}
          </h1>
          <p className="mt-5 font-mono leading-8 text-zinc-600 dark:text-zinc-400">
            <span className="text-fuchsia-500">{"<p>"}</span> {t.hero.paragraphPre}
            <span className="font-semibold text-zinc-950 dark:text-zinc-50">GymVibe</span>
            {t.hero.paragraphPost}
            <span className="text-fuchsia-500">{"</p>"}</span>
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
            {techIcons.map((Icon, i) => (
              <div
                key={i}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-white/5"
              >
                <Icon />
              </div>
            ))}
            <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500">
              {t.hero.more}
            </span>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:justify-start">
            <a
              href="#gymvibe"
              className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-105"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform hover:scale-105 dark:border-zinc-700 dark:text-zinc-50"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative h-72 w-64 shrink-0 sm:h-96 sm:w-80">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]" />
          <div className="absolute inset-1.5 overflow-hidden [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]">
            <Image src="/profile.jpg" alt="Janfred Naranjo" fill className="object-cover" />
          </div>
          <span className="absolute bottom-2 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 font-mono text-white shadow-lg">
            {"</>"}
          </span>
        </div>
      </div>
    </section>
  );
}
