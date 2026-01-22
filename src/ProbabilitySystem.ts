import { Reels } from './Reels.ts';

export class ProbabilitySystem {
  private constructor(private reels: Reels) {}

  spin(betLine: string): number {
    if (this.reels.isRowHit(0) && betLine === 'L1') {
      return 20;
    }

    if (this.reels.isRowHit(1) && betLine === 'L2') {
      return 20;
    }

    return 0;
  }

  static create(reels: Reels): ProbabilitySystem {
    return new ProbabilitySystem(reels);
  }
}
