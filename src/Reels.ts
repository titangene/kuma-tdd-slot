export class Reels {
  constructor(private reels: Array<Array<string>>) {}

  isRow1Hit() {
    const firstElementsSet = new Set<string>();

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      firstElementsSet.add(reel[0]);
    }

    return firstElementsSet.size === 1;
  }

  isRow2Hit() {
    const secondElementsSet = new Set<string>();

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      secondElementsSet.add(reel[1]);
    }

    return secondElementsSet.size === 1;
  }
}
