import NavMock from "./(components)/NavMock";
import BannerMovie from "./(components)/banner/BannerMovie";
import MovieCarouselMock from "./(components)/MovieCarouselMock";
import movies from "@/app/lib/movies.json";

export default function Netflix() {
  const movieRow1 = movies;
  const movieRow2 = movies.slice().reverse();

  return (
    <main className="flex flex-col text-white font-sans">
      <NavMock />
      <BannerMovie />
      <div className="mt-[-4%] pb-[5%] relative flex flex-col gap-5 lg:gap-20 justify-evenly pl-5 lg:pl-20">
          <MovieCarouselMock movieList={movieRow1} header="Your Next Watch" />
          <MovieCarouselMock movieList={movieRow2} header="Top Searches" />
      </div>
    </main>
  );
}
