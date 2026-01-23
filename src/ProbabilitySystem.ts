import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';

export class ProbabilitySystem {
  private constructor(
    private reels: Reels,
    private payTable: PayTable
  ) {}

  spin(bet: Bet): number {
    this.reels.spin();
    const screen = this.reels.getScreen();
    return this.payTable.getOdd(screen, bet);
  }

  static create(reels: Reels, payTable: PayTable): ProbabilitySystem {
    return new ProbabilitySystem(reels, payTable);
  }
}
