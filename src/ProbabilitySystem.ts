import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';
import { SpinResult } from './SpinResult.ts';
import type { Screen } from '@/Screen.ts';

export class ProbabilitySystem {
  private freeGameCount: number = 0;

  private constructor(
    private reels: Reels,
    private payTable: PayTable,
    private freeGameReels: Reels,
    private freeGamePayTable: PayTable
  ) {}

  spin(bet: Bet): SpinResult {
    const { odd, screen } = this.doSpinFlow(bet, this.reels, this.payTable);

    const calculateFreeGameIncrement = (screen: Screen) =>
      screen.countSymbol('S') >= 3 ? 10 : 0;

    const freeGameIncrement = calculateFreeGameIncrement(
      this.reels.getScreen()
    );
    this.freeGameCount += freeGameIncrement;

    return SpinResult.of(odd, screen, this.getNextGameType());
  }

  spinFree(): SpinResult {
    const bet: Bet = new Bet(
      ...this.freeGamePayTable.payLines.map(payLine => payLine.getName())
    );

    const { odd, screen } = this.doSpinFlow(
      bet,
      this.freeGameReels,
      this.freeGamePayTable
    );

    const calculateFreeGameIncrement = (screen: Screen) =>
      screen.countSymbol('S') >= 5 ? 10 : 0;

    const freeGameIncrement = calculateFreeGameIncrement(
      this.freeGameReels.getScreen()
    );
    this.freeGameCount += freeGameIncrement;

    this.freeGameCount--;

    return SpinResult.of(odd, screen, this.getNextGameType());
  }

  private doSpinFlow(
    bet: Bet,
    theReels: Reels,
    thePayTable: PayTable
  ): { odd: number; screen: string[][] } {
    theReels.spin();

    const screen = theReels.getScreen();

    return {
      odd: thePayTable.getOdd(screen, bet),
      screen: screen.getRawScreenClone()
    };
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
    return this.getNextGameType() === 'BASE_GAME'
      ? this.reels.getScreen()
      : this.freeGameReels.getScreen();
  }

  getNextGameType(): string {
    return this.freeGameCount > 0 ? 'FREE_GAME' : 'BASE_GAME';
  }
}
