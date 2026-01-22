export class Reels {
  private index: number = 0;

  private constructor(
    private reels: string[][],
    private nextIndex: number
  ) {}

  spin() {
    this.index = this.nextIndex;
  }

  isRowHit(row: number): boolean {
    const localRow: number = row + this.nextIndex;

    const uniqueElements = new Set<string>();

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      uniqueElements.add(reel[localRow]);
    }

    return uniqueElements.size === 1;
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
