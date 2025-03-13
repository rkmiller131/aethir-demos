import { Movie } from "@/app/lib/types/netflix.types";
import Image from "next/image";

interface MovieCarouselMockProps {
  movieList: Movie[];
  header: string;
}

export default function MovieCarouselMock({ movieList, header }: MovieCarouselMockProps) {

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <span>{header}</span>
      <div className="flex gap-2 mt-4">
        {movieList.map((movie) => (
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
  );
}