import NavMock from "./(components)/NavMock";
import BannerMovie from "./(components)/banner/BannerMovie";
import MovieCarouselMock from "./(components)/MovieCarouselMock";
import movies from "@/app/lib/movies.json";

export default function Netflix() {
  const movieRow1 = movies;
  const movieRow2 = movies.slice().reverse();

  return (
    // <main className="flex flex-col text-white font-sans h-[150vh]">
    <main className="flex flex-col text-white font-sans">
      <NavMock />
      <BannerMovie />
      {/* <div className="mt-[-10%] pl-20 text-2xl flex-grow"> */}
      <div className="mt-[-5%] pb-[5%] relative flex flex-col gap-20 justify-evenly pl-20 text-2xl">
        {/* <div className="relative flex flex-col h-full w-full justify-evenly"> */}
          <MovieCarouselMock movieList={movieRow1} header="Your Next Watch" />
          <MovieCarouselMock movieList={movieRow2} header="Top Searches" />
        {/* </div> */}
      </div>
    </main>
  );
}
