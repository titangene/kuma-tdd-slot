import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';
import { SpinResult } from './SpinResult.ts';
import type { Screen } from '@/Screen.ts';

export class ProbabilitySystem {
  private nextGameType: string = 'BASE_GAME';

  private constructor(
    private reels: Reels,
    private payTable: PayTable,
    private freeGameReels: Reels,
    private freeGamePayTable: PayTable
  ) {}

  spin(bet: Bet): SpinResult {
    this.reels.spin();

    const screen = this.reels.getScreen();

    const count = screen.countSymbol('S');

    this.nextGameType = count >= 3 ? 'FREE_GAME' : 'BASE_GAME';

    return SpinResult.of(
      this.payTable.getOdd(screen, bet),
      screen.getRawScreenClone(),
      this.nextGameType
    );
  }

  spinFree() {
    this.freeGameReels.spin();

    const screen: Screen = this.freeGameReels.getScreen();

    this.nextGameType = 'FREE_GAME';

    const names: string[] = this.freeGamePayTable.payLines.map(payLine =>
      payLine.getName()
    );
    const bet: Bet = new Bet(...names);

    return SpinResult.of(
      this.freeGamePayTable.getOdd(screen, bet),
      screen.getRawScreenClone(),
      this.nextGameType
    );
  }

  static create(
    reels: Reels,
    payTable: PayTable,
    freeGameReels: Reels,
    freeGamePayTable: PayTable
  ): ProbabilitySystem {
    return new ProbabilitySystem(
      reels,
      payTable,
      freeGameReels,
      freeGamePayTable
    );
  }

  getScreen(): Screen {
    return this.nextGameType === 'BASE_GAME'
      ? this.reels.getScreen()
      : this.freeGameReels.getScreen();
  }
}
