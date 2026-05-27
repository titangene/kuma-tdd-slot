export class Characteristic {
  constructor(
    private baseGameReelsIndexes: number[]
  ) {}

  getBaseGameReelsIndexes(): number[] {
    return this.baseGameReelsIndexes;
  }
}
