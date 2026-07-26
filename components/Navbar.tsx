"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./i18n";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggle, t } = useLanguage();

  const links = [
    { href: "#gymvibe", label: t.nav.gymvibe },
    { href: "#proyectos", label: t.nav.proyectos },
    { href: "#sobre-mi", label: t.nav.sobreMi },
    { href: "#stack", label: t.nav.stack },
    { href: "#contacto", label: t.nav.contacto },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-1.5 text-sm font-semibold">
          <span className="text-fuchsia-500">{"</>"}</span>
          <span className="text-zinc-950 dark:text-zinc-50">Janfred</span>
          <span className="text-zinc-400 dark:text-zinc-500">.dev</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-600 sm:flex dark:text-zinc-400">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Janfrednb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 sm:flex dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.55 2.87 8.4 6.84 9.77.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.29 9.29 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="flex h-9 items-center justify-center rounded-full border border-zinc-300 px-3 font-mono text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-white/10"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label={t.nav.openMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 sm:hidden dark:border-zinc-700 dark:text-zinc-300"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-zinc-200 px-6 py-4 sm:hidden dark:border-zinc-800">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
