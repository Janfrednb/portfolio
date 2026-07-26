"use client";

import Reveal from "./Reveal";
import Badge from "./Badge";
import { useLanguage } from "./i18n";
import {
  FirebaseLogo,
  NextLogo,
  ReactLogo,
  TypeScriptLogo,
  TailwindLogo,
  GitLogo,
  ClaudeLogo,
} from "./Logos";

const tools = [
  { name: "Firebase", Logo: FirebaseLogo },
  { name: "Next.js", Logo: NextLogo },
  { name: "React", Logo: ReactLogo },
  { name: "TypeScript", Logo: TypeScriptLogo },
  { name: "Tailwind CSS", Logo: TailwindLogo },
  { name: "Git", Logo: GitLogo },
  { name: "Claude", Logo: ClaudeLogo },
];

export default function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <Badge>{t.stack.badge}</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Stack
        </h2>
        <div className="mt-8 grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-7">
          {tools.map(({ name, Logo }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-7 transition-transform hover:-translate-y-1 dark:border-zinc-800 dark:bg-white/5"
            >
              <Logo className="h-11 w-11" />
              <span className="text-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
