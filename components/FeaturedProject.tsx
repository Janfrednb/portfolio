"use client";

import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Badge from "./Badge";
import Tilt from "./Tilt";
import { useLanguage } from "./i18n";

const stack = [
  "HTML5",
  "JavaScript",
  "Firebase",
  "Firestore",
  "Tailwind CSS",
  "Chart.js",
  "FullCalendar",
];

export default function FeaturedProject() {
  const { t } = useLanguage();

  return (
    <section id="gymvibe" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <Badge>{t.featured.badge}</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          GymVibe
        </h2>
      </Reveal>

      <Reveal delay={100} className="mt-8">
        <Tilt>
          <a
            href="https://fitsaas-e9f94.web.app/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <BrowserFrame
              src="/screenshots/gymvibe-dashboard.png"
              alt="GymVibe dashboard screenshot"
              accent="fuchsia"
              aspect="aspect-[1912/937]"
            />
          </a>
        </Tilt>
      </Reveal>

      <Reveal delay={150} className="mt-8 grid gap-8 sm:grid-cols-3">
        <p className="leading-8 text-zinc-600 sm:col-span-2 dark:text-zinc-400">
          {t.featured.description}
        </p>
        <div>
          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-start">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href="https://fitsaas-e9f94.web.app/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-zinc-950 underline underline-offset-2 dark:text-zinc-50"
          >
            {t.featured.liveLink}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
