export class Characteristic {
  constructor(
    private baseGameReelsIndexes: number[],
    private freeGameCount: number
  ) {}

  getBaseGameReelsIndexes(): number[] {
    return this.baseGameReelsIndexes;
  }

  getFreeGameCount(): number {
    return this.freeGameCount;
  }
}
