import Badge from "./Badge";
import DeviceMockup from "./DeviceMockup";

const chips = ["Firebase", "Next.js", "Con ayuda de IA"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center gap-6 overflow-hidden px-6 pt-16 pb-8 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl dark:bg-fuchsia-500/25" />
        <div className="animate-blob animation-delay-2000 absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-500/25" />
        <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-500/25" />
      </div>

      <Badge>Janfred Naranjo</Badge>
      <h1 className="max-w-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
        Transformo ideas en software
      </h1>
      <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Developer junior construyendo productos reales — actualmente trabajando en{" "}
        <span className="font-medium text-zinc-950 dark:text-zinc-50">GymVibe</span>, un SaaS de
        gestión para gimnasios en LATAM.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="#gymvibe"
          className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-105"
        >
          Ver GymVibe
        </a>
        <a
          href="#contacto"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-950 transition-transform hover:scale-105 dark:border-zinc-700 dark:text-zinc-50"
        >
          Contáctame
        </a>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/5 dark:text-zinc-400"
          >
            {chip}
          </span>
        ))}
      </div>

      <DeviceMockup
        mainSrc="/screenshots/solutar.png"
        mainAlt="Captura de Solutar"
        secondarySrc="/screenshots/gymvibe.png"
        secondaryAlt="Captura de GymVibe"
      />
    </section>
  );
}
