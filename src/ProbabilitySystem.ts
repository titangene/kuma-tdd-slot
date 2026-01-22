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
    if (this.isRow1Hit() && betLine === 'L1') {
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

    return firstElementsSet.size === 1;
  }
}
