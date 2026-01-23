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
    const theReels = this.reels;
    const thePayTable = this.payTable;
    const getNext = this.getNext;

    theReels.spin();

    const screen = theReels.getScreen();

    this.nextGameType = getNext(screen);

    return SpinResult.of(
      thePayTable.getOdd(screen, bet),
      screen.getRawScreenClone(),
      this.nextGameType
    );
  }

  private getNext(screen: Screen) {
    return screen.countSymbol('S') >= 3 ? 'FREE_GAME' : 'BASE_GAME';
  }

  spinFree() {
    const bet: Bet = new Bet(
      ...this.freeGamePayTable.payLines.map(payLine => payLine.getName())
    );
    const theReels = this.freeGameReels;
    const thePayTable = this.freeGamePayTable;
    const getNext = () => 'FREE_GAME';

    theReels.spin();

    const screen = theReels.getScreen();

    this.nextGameType = getNext();

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
