import { Reels } from './Reels.ts';

export class ProbabilitySystem {
  constructor(private reels: Reels) {}

  spin(betLine: string): number {
    if (this.reels.isRow1Hit() && betLine === 'L1') {
      return 20;
    }

    if (this.reels.isRow2Hit() && betLine === 'L2') {
      return 20;
    }

    return 0;
  }
}
