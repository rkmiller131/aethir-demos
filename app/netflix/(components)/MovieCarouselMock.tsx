import { Movie } from "@/app/lib/types/netflix.types";
import Image from "next/image";

interface MovieCarouselMockProps {
  movieList: Movie[];
  header: string;
}

export default function MovieCarouselMock({ movieList, header }: MovieCarouselMockProps) {

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <span className="font-semi-bold text-lg md:text-3xl">{header}</span>
      <div className="flex gap-2 mt-4">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="w-[145px] h-[82px] sm:h-min-content sm:w-[113px] md:w-[300px] md:h-[169px] rounded-sm shrink-0 cursor-not-allowed"
          >
            <Image
              src={movie.thumbnail}
              alt="movie thumbnail"
              height={169}
              width={300}
              className="object-fit"
            />
          </div>
        ))}
      </div>
    </div>
  );
}