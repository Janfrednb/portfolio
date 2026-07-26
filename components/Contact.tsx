"use client";

import Reveal from "./Reveal";
import Badge from "./Badge";
import { useLanguage } from "./i18n";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal>
        <Badge>{t.contact.badge}</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          {t.contact.title}
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">{t.contact.subtitle}</p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:janfrednb@gmail.com"
            className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            janfrednb@gmail.com
          </a>
          <a
            href="https://github.com/Janfrednb"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform hover:scale-105 dark:border-zinc-700 dark:text-zinc-50"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/janfred-naranjo-53a3a016b"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform hover:scale-105 dark:border-zinc-700 dark:text-zinc-50"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}
