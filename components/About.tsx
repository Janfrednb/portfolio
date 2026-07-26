"use client";

import Reveal from "./Reveal";
import Badge from "./Badge";
import { useLanguage } from "./i18n";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Badge>{t.about.badge}</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              {t.about.title}
            </h2>
          </div>
          <p className="leading-8 text-zinc-600 sm:col-span-2 dark:text-zinc-400">
            {t.about.paragraph}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
