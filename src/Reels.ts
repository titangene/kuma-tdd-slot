export class Reels {
  constructor(private reels: Array<Array<string>>) {}

  isRow1Hit() {
    const row = 0;
    return this.isRowHit(row);
  }

  isRow2Hit() {
    const row = 1;
    return this.isRowHit(row);
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
