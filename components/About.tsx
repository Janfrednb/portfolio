import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Sobre mí
        </h2>
        <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
          Soy Janfred, developer junior enfocado en construir productos reales, no solo proyectos
          de práctica. Actualmente estoy construyendo GymVibe, un SaaS para gestión de gimnasios
          pequeños en LATAM. Aprendo rápido apoyándome en IA y herramientas modernas para pasar de
          idea a producto funcionando.
        </p>
      </Reveal>
    </section>
  );
}
