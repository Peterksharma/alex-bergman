import Image from "next/image";

export default function ClippedPortrait() {
  return (
    <div className="relative">
      <div className="w-[240px] h-[420px] sm:w-[320px] sm:h-[560px] md:w-[400px] md:h-[700px] lg:w-[480px] lg:h-[840px] rounded-full overflow-hidden border-2 sm:border-4 border-line/60 shadow-2xl ring-2 sm:ring-4 ring-line/20 ring-offset-2 sm:ring-offset-4 ring-offset-ink">
        <Image
          src='/assets/profile.jpg'
          alt='A bust shot of Alex standing in front of a nice wall.'
          width={480}
          height={840}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}