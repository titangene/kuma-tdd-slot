export class Reels {
  private constructor(
    private reels: Array<Array<string>>,
    private nextIndex: number
  ) {}

  isRowHit(row: number): boolean {
    const uniqueElements = new Set<string>();

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      uniqueElements.add(reel[row]);
    }

    return uniqueElements.size === 1;
  }

  static create(nextIndex: number, rawReels: Array<Array<string>>): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
