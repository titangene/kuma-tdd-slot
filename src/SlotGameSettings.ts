export interface SlotGameSettings {
  reels: string[][];
  payLines: {
    name: string;
    indexes: number[];
  }[];
  odds: {
    symbol: string;
    count: number;
    odd: number;
  }[];
  freeGameIncrementParameters: {
    symbol: string;
    count: number;
    increment: number;
  };
}
