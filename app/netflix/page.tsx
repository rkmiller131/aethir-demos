import NavMock from "@/components/UI/NavMock";
import BannerMovie from "@/components/UI/banner/BannerMovie";
import MovieCarouselMock from "@/components/MovieCarouselMock";
import movies from "@/app/lib/movies.json";

export default function Netflix() {
  const movieRow1 = movies;
  const movieRow2 = movies.slice().reverse();

  return (
    <main className="flex flex-col text-white font-sans h-[150vh]">
      <NavMock />
      <BannerMovie />
      <div className="mt-[-10%] pl-20 text-2xl flex-grow">
        <div className="relative flex flex-col h-full w-full justify-evenly">
          <MovieCarouselMock movieList={movieRow1} header="Your Next Watch" />
          <MovieCarouselMock movieList={movieRow2} header="Top Searches" />

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
