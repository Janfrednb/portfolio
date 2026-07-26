import Reveal from "./Reveal";
import Badge from "./Badge";

const tools = [
  { name: "Firebase", emoji: "🔥" },
  { name: "Next.js", emoji: "▲" },
  { name: "React", emoji: "⚛️" },
  { name: "TypeScript", emoji: "🔷" },
  { name: "Tailwind CSS", emoji: "🎨" },
  { name: "Git", emoji: "🌿" },
];

export default function Stack() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <Badge>Herramientas</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          Stack
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool.name}
              className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-transform hover:-translate-y-0.5 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <span>{tool.emoji}</span>
              {tool.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
