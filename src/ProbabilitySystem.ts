import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';
import { SpinResult } from './SpinResult.ts';

export class ProbabilitySystem {
  private constructor(
    private reels: Reels,
    private payTable: PayTable,
    private freeGameReels: Reels
  ) {}

  spin(bet: Bet): SpinResult {
    this.reels.spin();

    const screen = this.reels.getScreen();

    const count = screen.countSymbol('S');

    return SpinResult.of(
      this.payTable.getOdd(screen, bet),
      screen.getRawScreenClone(),
      count >= 3 ? 'FREE_GAME' : 'BASE_GAME'
    );
  }

  static create(
    reels: Reels,
    payTable: PayTable,
    freeGameReels: Reels
  ): ProbabilitySystem {
    return new ProbabilitySystem(reels, payTable, freeGameReels);
  }

  getScreen() {
    return this.freeGameReels.getScreen();
  }
}
