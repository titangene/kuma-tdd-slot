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
    const uniqueElements = new Set<string>();

    const screen: string[][] = [];

    for (let i = 0; i < this.reels.length; i++) {
      screen.push(this.reels[i].slice(this.index, this.index + 3));
    }

    for (let i = 0; i < screen.length; i++) {
      const screenReel: string[] = screen[i];
      uniqueElements.add(screenReel[row]);
    }

    return uniqueElements.size === 1;

    const localRow: number = row + this.nextIndex;

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
