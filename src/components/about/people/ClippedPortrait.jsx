import Image from "next/image";

export default function ClippedPortrait() {
  return (
    <div className="relative">
      <div className="w-[480px] h-[840px] rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl ring-4 ring-gray-700 ring-offset-4 ring-offset-gray-900">
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