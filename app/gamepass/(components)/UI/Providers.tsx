import Image from 'next/image';

export default function GamingProviders() {
  return (
    <div className="flex flex-row py-12 max-w-7xl mx-auto gap-x-4">
      <div className="bg-gradient-to-r from-red-600 to-orange-400 py-4 px-12 rounded-md flex items-center gap-2 cursor-not-allowed hover:brightness-90 transition">
        <Image src="/riot.svg" width={48} height={48} alt="gg" />
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          Riot Games
        </h1>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-[#0e7a0d] py-4 px-12 rounded-md flex items-center gap-2 cursor-not-allowed hover:brightness-90 transition">
        <Image
          src="/xbox1.svg"
          width={32}
          height={32}
          alt="gg"
          className="w-[32px] h-[32px]"
        />
        <h1 className="text-black font-bold text-lg whitespace-nowrap">
          XBOX Game Studios
        </h1>
      </div>
      <div className="bg-gradient-to-r from-[#FF4040] to-red-500 py-4 px-12 rounded-md flex items-center gap-2 cursor-not-allowed hover:brightness-90 transition">
        <Image src="/ea.svg" width={48} height={48} alt="gg" />
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          Electronic Arts
        </h1>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 py-4 px-12 rounded-md flex items-center gap-2 cursor-not-allowed hover:brightness-90 transition">
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          All Games
        </h1>
      </div>
    </div>
  );
}
