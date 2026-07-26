import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Badge from "./Badge";

const accents = ["violet", "fuchsia", "orange"] as const;
const accentText: Record<(typeof accents)[number], string> = {
  violet: "text-violet-600 dark:text-violet-400",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
  orange: "text-orange-600 dark:text-orange-400",
};

const projects = [
  {
    name: "Solutar",
    description:
      "Sitio web para Solutar, empresa de consultoría en Seguridad y Salud en el Trabajo (SST) en Colombia.",
    tech: "Sitio en producción",
    demoUrl: "https://www.solutar.com.co",
    image: "/screenshots/solutar.png",
  },
  {
    name: "MicroTaller",
    description:
      "Sistema de administración para talleres de motos: agenda de citas y checklist de alistamiento, con dashboard en tiempo real.",
    tech: "Python · Flask · Bootstrap",
    demoUrl: "https://microsoftware-taller.onrender.com/",
    demoNote: "El demo puede tardar unos segundos en cargar la primera vez (plan gratuito de Render).",
    repoUrl: "https://github.com/Janfrednb/microsoftware-taller",
    image: "/screenshots/microsoftware.png",
  },
  {
    name: "Panadería Don Carlos",
    description:
      "Práctica de uno de mis primeros cursos de Python — uno de los primeros proyectos que hice.",
    tech: "Python · Flask · Pandas",
    repoUrl: "https://github.com/Janfrednb/panaderia-don-carlos",
    image: "/screenshots/panaderia.png",
  },
];

export default function OtherProjects() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <Badge>Otros proyectos</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Más trabajo
        </h2>
      </Reveal>
      <div className="mt-12 flex flex-col gap-16">
        {projects.map((project, i) => {
          const accent = accents[i % accents.length];
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
                    alt={`Captura de ${project.name}`}
                    accent={accent}
                  />
                </a>
                <div className="w-full sm:w-2/5">
                  <h3 className={`text-2xl font-semibold ${accentText[accent]}`}>
                    {project.name}
                  </h3>
                  <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                    {project.tech}
                  </p>
                  {project.demoNote && (
                    <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                      {project.demoNote}
                    </p>
                  )}
                  <div className="mt-4 flex gap-4 text-sm font-medium">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-950 underline underline-offset-2 dark:text-zinc-50"
                      >
                        Ver demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 underline underline-offset-2 dark:text-zinc-400"
                      >
                        Código
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
