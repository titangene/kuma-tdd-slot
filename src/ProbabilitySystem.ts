import { Reels } from './Reels.ts';

export class ProbabilitySystem {
  constructor(private reels: Reels) {}

  spin(betLine: string): number {
    if (this.reels.isRow1Hit() && betLine === 'L1') {
      return 20;
    }
    return 0;
  }
}
