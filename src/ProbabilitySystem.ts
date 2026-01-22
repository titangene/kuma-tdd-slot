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
    if (this.reels.isRow1Hit() && betLine === 'L1') {
      return 20;
    }
    return 0;
  }
}
