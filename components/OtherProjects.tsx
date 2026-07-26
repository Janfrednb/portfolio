"use client";

import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Badge from "./Badge";
import { useLanguage } from "./i18n";

const accents = ["violet", "fuchsia", "orange"] as const;
const accentText: Record<(typeof accents)[number], string> = {
  violet: "text-violet-600 dark:text-violet-400",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
  orange: "text-orange-600 dark:text-orange-400",
};

const projectsBase = [
  {
    key: "solutar" as const,
    name: "Solutar",
    demoUrl: "https://www.solutar.com.co",
    image: "/screenshots/solutar.png",
  },
  {
    key: "microtaller" as const,
    name: "MicroTaller",
    tech: "Python · Flask · Bootstrap",
    demoUrl: "https://microsoftware-taller.onrender.com/",
    repoUrl: "https://github.com/Janfrednb/microsoftware-taller",
    image: "/screenshots/microsoftware.png",
  },
  {
    key: "citas" as const,
    name: "API de Citas",
    tech: "Python · Flask · SQLAlchemy",
    repoUrl: "https://github.com/Janfrednb/api-gestion-citas",
    image: "/screenshots/api-citas.png",
  },
];

export default function OtherProjects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <Badge>{t.other.badge}</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          {t.other.title}
        </h2>
      </Reveal>
      <div className="mt-12 flex flex-col gap-16">
        {projectsBase.map((project, i) => {
          const accent = accents[i % accents.length];
          const info = t.other.projects[project.key];
          const tech = "tech" in info ? info.tech : project.tech;
          return (
            <Reveal key={project.name} delay={i * 100}>
              <div
                className={`group flex flex-col items-center gap-10 sm:flex-row ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <a
                  href={project.demoUrl ?? project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-3/5"
                >
                  <BrowserFrame
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    accent={accent}
                  />
                </a>
                <div className="w-full sm:w-2/5">
                  <h3 className={`text-2xl font-semibold ${accentText[accent]}`}>
                    {project.name}
                  </h3>
                  <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                    {info.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                    {tech}
                  </p>
                  <div className="mt-4 flex gap-4 text-sm font-medium">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-950 underline underline-offset-2 dark:text-zinc-50"
                      >
                        {t.other.demo}
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 underline underline-offset-2 dark:text-zinc-400"
                      >
                        {t.other.code}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
