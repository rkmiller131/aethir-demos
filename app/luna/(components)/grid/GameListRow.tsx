import { LunaGame, LunaGameList } from "@/app/lib/types/luna.types";
import Image from "next/image";
import { ReactNode } from "react";
import Icon from "../icons/Icon";
import CaretRight from "../icons/CaretRight";

interface GameListRow {
  header: ReactNode;
  gameList: LunaGameList;
}

export default function GameListRow({ header, gameList }: GameListRow) {
  return (
    <div className="mt-6 flex flex-col gap-2 cursor-not-allowed">
      <div className="flex gap-4 px-16 py-0">
        {header}
      </div>
      <div className="relative  px-16 flex gap-6">
        {gameList.map((game: LunaGame) => (
          <Image
            src={game.src}
            alt="Game Thumbnail"
            width={450}
            height={253}
            key={game.id}
            className="w-[338px] h-auto rounded-lg"
          />
        ))}
        <div className="absolute right-4 bottom-[50%]">
          <Icon>{<CaretRight />}</Icon>
        </div>
      </div>
    </div>
  );
}