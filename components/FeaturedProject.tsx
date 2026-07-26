import Reveal from "./Reveal";
import BrowserFrame from "./BrowserFrame";
import Badge from "./Badge";

const stack = ["Next.js", "Firebase", "TypeScript", "Tailwind CSS"];

export default function FeaturedProject() {
  return (
    <section id="gymvibe" className="mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <Badge>Proyecto destacado</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          GymVibe
        </h2>
      </Reveal>

      <Reveal delay={100} className="mt-8">
        <a
          href="https://fitsaas-e9f94.web.app/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <BrowserFrame src="/screenshots/gymvibe.png" alt="Captura de GymVibe" accent="fuchsia" />
        </a>
      </Reveal>

      <Reveal delay={150}>
        <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
          SaaS de gestión para gimnasios pequeños en LATAM. Pensado para dueños de gimnasios de
          barrio que hoy llevan sus cobros y membresías en cuadernos o Excel: GymVibe les da
          control de clientes, membresías y pagos en un solo lugar, con cobro manual vía
          Nequi/transferencia (sin comisiones de plataformas de pago).
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
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
          Ver GymVibe en vivo
        </a>
      </Reveal>
    </section>
  );
}
