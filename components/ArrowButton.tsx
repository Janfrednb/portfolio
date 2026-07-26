const colors: Record<string, string> = {
  fuchsia: "bg-fuchsia-500",
  violet: "bg-violet-500",
  orange: "bg-orange-500",
};

export default function ArrowButton({ color = "fuchsia" }: { color?: "fuchsia" | "violet" | "orange" }) {
  return (
    <span
      className={`absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 ${colors[color]}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M7 17L17 7M17 7H9M17 7V15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
