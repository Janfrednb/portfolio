import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";

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
    <section className="mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Otros proyectos
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 100}>
            <div className="group">
              <a
                href={project.demoUrl ?? project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrowserFrame src={project.image} alt={`Captura de ${project.name}`} />
              </a>
              <h3 className="mt-4 font-medium text-zinc-950 dark:text-zinc-50">{project.name}</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <p className="mt-2 text-xs font-medium text-fuchsia-600 dark:text-fuchsia-400">
                {project.tech}
              </p>
              {project.demoNote && (
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{project.demoNote}</p>
              )}
              <div className="mt-2 flex gap-4 text-xs font-medium">
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
