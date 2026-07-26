import Image from "next/image";
import ArrowButton from "./ArrowButton";

export default function BrowserFrame({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent?: "fuchsia" | "violet" | "orange";
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image src={src} alt={alt} fill className="object-cover object-top" />
      </div>
      {accent && <ArrowButton color={accent} />}
    </div>
  );
}
