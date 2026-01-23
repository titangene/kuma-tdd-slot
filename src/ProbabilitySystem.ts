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

    const target = 'S';
    let count = 0;
    for (const row of screen.rawScreen) {
      row.filter(symbol => symbol === target).length > 0
        ? count++
        : (count = count);
    }

    return SpinResult.of(
      this.payTable.getOdd(screen, bet),
      screen.getRawScreenClone(),
      count >= 3 ? 'FREE_GAME' : 'BASE_GAME'
    );
  }

  static create(reels: Reels, payTable: PayTable): ProbabilitySystem {
    return new ProbabilitySystem(reels, payTable);
  }
}
