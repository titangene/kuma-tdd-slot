import { Reels } from './Reels.ts';

export class ProbabilitySystem {
  reels: Reels = new Reels([
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', '10', 'J']
  ]);

  spin(betLine: string): number {
    const isRow1Hit = this.isRow1Hit();
    if (isRow1Hit && betLine === 'L1') {
      return 20;
    }
    return 0;
  }

  private isRow1Hit() {
    const firstElementsSet = new Set<string>();

    for (let i = 0; i < this.reels.reels.length; i++) {
      const reel = this.reels.reels[i];
      firstElementsSet.add(reel[0]);
    }

    const isRow1Hit = firstElementsSet.size === 1;
    return isRow1Hit;
  }
}
