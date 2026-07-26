import Reveal from "./Reveal";
import GymVibeIllustration from "./GymVibeIllustration";

const stack = ["Next.js", "Firebase", "TypeScript", "Tailwind CSS"];

export default function FeaturedProject() {
  return (
    <section id="gymvibe" className="mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">
          Proyecto destacado
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          GymVibe
        </h2>
      </Reveal>

      <Reveal delay={100} className="mt-8">
        <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm dark:border-zinc-800">
          <GymVibeIllustration />
        </div>
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
      </Reveal>
    </section>
  );
}
