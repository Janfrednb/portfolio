import Image from "next/image";

export default function DeviceMockup({
  mainSrc,
  mainAlt,
  secondarySrc,
  secondaryAlt,
}: {
  mainSrc: string;
  mainAlt: string;
  secondarySrc: string;
  secondaryAlt: string;
}) {
  return (
    <div className="relative mx-auto mt-16 mb-8 w-full max-w-2xl px-4 pb-10">
      <div className="[perspective:1200px]">
        <div className="relative z-10 rounded-t-2xl border-[6px] border-b-0 border-zinc-800 bg-zinc-900 p-2 shadow-2xl [transform:rotateY(-8deg)_rotateX(2deg)]">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
            <Image src={mainSrc} alt={mainAlt} fill className="object-cover object-top" />
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto h-3 w-[88%] rounded-b-lg bg-zinc-800" />
      <div className="relative z-10 mx-auto h-2 w-[96%] rounded-b-xl bg-zinc-700" />

      <div className="absolute right-0 bottom-0 z-20 w-36 rotate-6 rounded-xl border-[5px] border-zinc-800 bg-zinc-900 p-1.5 shadow-2xl transition-transform duration-300 hover:rotate-0 sm:w-48">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md">
          <Image src={secondarySrc} alt={secondaryAlt} fill className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}
