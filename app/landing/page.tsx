import Image from "next/image";
import NavMock from "@/components/UI/NavMock";
import BannerMovie from "@/components/UI/banner/BannerMovie";
import movies from "@/app/lib/movies.json";

export default function Landing() {
  return (
    <main className="flex flex-col text-white font-sans h-[150vh]">
      <NavMock />
      <BannerMovie />
      <div className="mt-[-10%] pl-20 text-2xl flex-grow">
        <div className="relative flex flex-col h-full w-full justify-evenly">
          <div className="overflow-hidden whitespace-nowrap">
            <span>Your Next Watch</span>
            <div className="flex gap-2 mt-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-[275px] h-[155px] rounded-sm shrink-0 cursor-not-allowed"
                >
                  <Image
                    src={movie.thumbnail}
                    alt="movie thumbnail"
                    height={155}
                    width={275}
                    className="object-fit"
                  />

                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden whitespace-nowrap">
            <span>Top Searches</span>
            <div className="flex gap-2 mt-4">
              {movies.slice().reverse().map((movie) => (
                <div
                  key={movie.id}
                  className="w-[275px] h-[155px] rounded-sm shrink-0 cursor-not-allowed"
                >
                  <Image
                    src={movie.thumbnail}
                    alt="movie thumbnail"
                    height={155}
                    width={275}
                    className="object-fit"
                  />

                </div>
              ))}
            </div>
          </div>

          {/* GAMES - No more :( */}
          {/* <div className="overflow-x-hidden whitespace-nowrap">
            <div className="flex gap-2 items-center">
              <span>Games</span>
              <span className="font-bold text-sm px-2 border border-b-red-500 border-t-pink-600 border-l-pink-500 border-r-orange-500 rounded-lg">
                BETA
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
              <div className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
