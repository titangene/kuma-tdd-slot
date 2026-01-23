import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';

export class ProbabilitySystem {
  private constructor(
    private reels: Reels,
    private payTable: PayTable
  ) {}

  spin(...betLines: string[]): number {
    this.reels.spin();
    return this.getOdd(betLines, this.reels);
  }

  private getOdd(betLines: string[], reels: Reels): number {
    if (reels.isRowHit(0) && this.isHit(betLines, 'L1')) {
      return 20;
    }

    if (reels.isRowHit(1) && this.isHit(betLines, 'L2')) {
      return 20;
    }

    if (reels.isRowHit(2) && this.isHit(betLines, 'L3')) {
      return 20;
    }

    return 0;
  }

  private isHit(betLines: string[], line: string) {
    return betLines.filter(betLine => betLine === line).length > 0;
  }

  static create(reels: Reels): ProbabilitySystem {
    return new ProbabilitySystem(reels, new PayTable());
  }
}
