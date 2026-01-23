import { Reels } from './Reels.ts';

export class ProbabilitySystem {
  private constructor(private reels: Reels) {}

  spin(...betLines: string[]): number {
    this.reels.spin();

    if (this.reels.isRowHit(0) && this.isHit(betLines, 'L1')) {
      return 20;
    }

    if (this.reels.isRowHit(1) && this.isHit(betLines, 'L2')) {
      return 20;
    }

    if (this.reels.isRowHit(2) && this.isHit(betLines, 'L3')) {
      return 20;
    }

    return 0;
  }

  private isHit(betLines: string[], line: string) {
    return betLines.filter(betLine => betLine === line).length > 0;
  }

  static create(reels: Reels): ProbabilitySystem {
    return new ProbabilitySystem(reels);
  }
}
