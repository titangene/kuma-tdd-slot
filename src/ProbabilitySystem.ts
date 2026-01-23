import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';

export class ProbabilitySystem {
  private constructor(
    private reels: Reels,
    private payTable: PayTable
  ) {}

  spin(...betLines: string[]): number {
    this.reels.spin();
    return this.payTable.getOdd(betLines, this.reels);
  }

  static create(reels: Reels, payTable: PayTable): ProbabilitySystem {
    return new ProbabilitySystem(reels, payTable);
  }
}
