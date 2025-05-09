export interface LunaGame {
  id: number;
  name: string;
  src: string;
}

export type LunaGameList = Array<LunaGame>;
export type LunaGamesData = Array<LunaGameList>;