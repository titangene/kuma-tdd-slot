export class Reels {
  constructor(private reels: Array<Array<string>>) {}

  isRow1Hit() {
    return this.isRowHit(0);
  }

  isRow2Hit() {
    return this.isRowHit(1);
  }

  isRowHit(row: number): boolean {
    const uniqueElements = new Set<string>();

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      uniqueElements.add(reel[row]);
    }

    return uniqueElements.size === 1;
  }
}
