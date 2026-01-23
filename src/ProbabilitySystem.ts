import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';
import { SpinResult } from './SpinResult.ts';

export class ProbabilitySystem {
  private constructor(
    private reels: Reels,
    private payTable: PayTable
  ) {}

  spin(bet: Bet): SpinResult {
    this.reels.spin();
    const screen = this.reels.getScreen();

    return SpinResult.of(
      this.payTable.getOdd(screen, bet),
      screen.getRawScreenClone()
    );
  }

  static create(reels: Reels, payTable: PayTable): ProbabilitySystem {
    return new ProbabilitySystem(reels, payTable);
  }
}
