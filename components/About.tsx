import Reveal from "./Reveal";
import Badge from "./Badge";

export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Badge>Quién soy</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              Sobre mí
            </h2>
          </div>
          <p className="leading-8 text-zinc-600 sm:col-span-2 dark:text-zinc-400">
            Soy Janfred, developer junior enfocado en construir productos reales, no solo
            proyectos de práctica. Actualmente estoy construyendo GymVibe, un SaaS para gestión de
            gimnasios pequeños en LATAM. Aprendo rápido apoyándome en IA y herramientas modernas
            para pasar de idea a producto funcionando.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
