"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./i18n";

const SECTION_IDS = ["hero", "gymvibe", "proyectos", "sobre-mi", "stack", "contacto"] as const;

export default function SectionNav() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("hero");
  const ratiosRef = useRef<Record<string, number>>({});

  const labels: Record<string, string> = {
    hero: t.hero.greeting,
    gymvibe: t.nav.gymvibe,
    proyectos: t.nav.proyectos,
    "sobre-mi": t.nav.sobreMi,
    stack: t.nav.stack,
    contacto: t.nav.contacto,
  };

  useEffect(() => {
    const elements = SECTION_IDS.map((id) =>
      id === "hero" ? document.getElementById("top") : document.getElementById(id)
    ).filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratiosRef.current[entry.target.id] = entry.intersectionRatio;
        });
        const topId = Object.entries(ratiosRef.current).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (topId) {
          setActiveId(topId === "top" ? "hero" : topId);
        }
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    const target = id === "hero" ? document.getElementById("top") : document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 sm:flex"
    >
      {SECTION_IDS.map((id) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            aria-label={labels[id]}
            aria-current={isActive}
            onClick={() => scrollToSection(id)}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500"
                  : "h-1.5 w-1.5 bg-zinc-400 group-hover:bg-fuchsia-400 dark:bg-zinc-600"
              }`}
            />
            <span className="pointer-events-none absolute right-6 rounded-md border border-zinc-200 bg-white/90 px-2 py-1 font-mono text-xs whitespace-nowrap text-zinc-600 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 dark:border-zinc-800 dark:bg-black/80 dark:text-zinc-300">
              {labels[id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
