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
    return this.doSpinFlow(
      bet,
      this.reels,
      this.payTable,
      (screen: Screen): string =>
        screen.countSymbol('S') >= 3 ? 'FREE_GAME' : 'BASE_GAME'
    );
  }

  spinFree(): SpinResult {
    const bet: Bet = new Bet(
      ...this.freeGamePayTable.payLines.map(payLine => payLine.getName())
    );

    return this.doSpinFlow(
      bet,
      this.freeGameReels,
      this.freeGamePayTable,
      (_screen: Screen): string => 'FREE_GAME'
    );
  }

  private doSpinFlow(
    bet: Bet,
    theReels: Reels,
    thePayTable: PayTable,
    getNext: (screen: Screen) => string
  ): SpinResult {
    theReels.spin();

    const screen = theReels.getScreen();

    this.nextGameType = getNext(screen);

    return SpinResult.of(
      thePayTable.getOdd(screen, bet),
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
