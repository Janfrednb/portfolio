export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-fuchsia-600 uppercase dark:text-fuchsia-400">
      <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
      {children}
    </span>
  );
}
