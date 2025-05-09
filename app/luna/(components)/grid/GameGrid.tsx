import ContinuePlaying from "./ContinuePlaying";
import games from "@/app/lib/luna.games.json";
import GameGridHeaders from "./GameGridHeaders";
import GameListRow from "./GameListRow";
import { LunaGameList, LunaGamesData } from "@/app/lib/types/luna.types";


export default function GameGrid() {
  const gameList: LunaGamesData = games;
  const gameGridHeaders = [
    <GameGridHeaders variant={0} key={165456}/>,
    <GameGridHeaders variant={1} key={245321}/>,
    <GameGridHeaders variant={2} key={567971}/>
  ];

  return (
    <div>
      <ContinuePlaying />
      {gameList.map((list: LunaGameList, index) => {
        const header = gameGridHeaders[index];
        return <GameListRow header={header} gameList={list} key={index}/>;
      })}
    </div>
  );
}