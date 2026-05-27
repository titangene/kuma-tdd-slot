export class Memento {
  constructor(
    private baseGameReelsIndexes: number[],
    private freeGameReelsIndexes: number[],
    private freeGameCount: number
  ) {}

  getBaseGameReelsIndexes(): number[] {
    return this.baseGameReelsIndexes;
  }

  getFreeGameReelsIndexes(): number[] {
    return this.freeGameReelsIndexes;
  }

  getFreeGameCount(): number {
    return this.freeGameCount;
  }
}
