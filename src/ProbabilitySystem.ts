import { Reels } from './Reels.ts';

export class ProbabilitySystem {
  private constructor(private reels: Reels) {}

  spin(...betLines: string[]): number {
    this.reels.spin();

    if (
      this.reels.isRowHit(0) &&
      betLines.filter(betLine => betLine === 'L1').length > 0
    ) {
      return 20;
    }

    if (
      this.reels.isRowHit(1) &&
      betLines.filter(betLine => betLine === 'L2').length > 0
    ) {
      return 20;
    }

    if (
      this.reels.isRowHit(2) &&
      betLines.filter(betLine => betLine === 'L3').length > 0
    ) {
      return 20;
    }

    return 0;
  }

  static create(reels: Reels): ProbabilitySystem {
    return new ProbabilitySystem(reels);
  }
}
