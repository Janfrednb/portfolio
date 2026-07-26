export default function GymVibeIllustration() {
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="relative flex w-full max-w-xs flex-col gap-3 rounded-xl bg-white/10 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏋️</span>
          <span className="font-semibold text-white">GymVibe</span>
        </div>
        <div className="h-2.5 w-3/4 rounded-full bg-white/40" />
        <div className="h-2.5 w-full rounded-full bg-white/25" />
        <div className="mt-1 grid grid-cols-3 gap-2">
          <div className="h-12 rounded-lg bg-white/20" />
          <div className="h-12 rounded-lg bg-white/30" />
          <div className="h-12 rounded-lg bg-white/20" />
        </div>
      </div>
      <span className="absolute top-3 right-3 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white">
        En construcción
      </span>
    </div>
  );
}
