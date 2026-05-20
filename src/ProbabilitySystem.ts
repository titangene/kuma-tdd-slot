import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';
import { SpinResult } from './SpinResult.ts';
import type { Screen } from '@/Screen.ts';

class SlotGame {
  constructor(
    private theReels: Reels,
    private thePayTable: PayTable,
    private calculateFreeGameIncrement: (screen: Screen) => number
  ) {}
}

export class ProbabilitySystem {
  private freeGameCount: number = 0;

  private constructor(
    private reels: Reels,
    private payTable: PayTable,
    private freeGameReels: Reels,
    private freeGamePayTable: PayTable
  ) {}

  spin(bet: Bet): SpinResult {
    const { odd, screen, freeGameIncrement } = this.doSpinFlow(
      bet,
      this.reels,
      this.payTable,
      (screen: Screen): number => (screen.countSymbol('S') >= 3 ? 10 : 0)
    );

    this.freeGameCount += freeGameIncrement;

    return SpinResult.of(odd, screen, this.getNextGameType());
  }

  spinFree(): SpinResult {
    const bet: Bet = new Bet(
      ...this.freeGamePayTable.payLines.map(payLine => payLine.getName())
    );

    const { odd, screen, freeGameIncrement } = this.doSpinFlow(
      bet,
      this.freeGameReels,
      this.freeGamePayTable,
      (screen: Screen): number => (screen.countSymbol('S') >= 5 ? 10 : 0)
    );

    this.freeGameCount += freeGameIncrement;

    this.freeGameCount--;

    return SpinResult.of(odd, screen, this.getNextGameType());
  }

  private doSpinFlow(
    bet: Bet,
    theReels: Reels,
    thePayTable: PayTable,
    calculateFreeGameIncrement: (screen: Screen) => number
  ): { odd: number; screen: string[][]; freeGameIncrement: number } {
    theReels.spin();

    const screen = theReels.getScreen();

    return {
      odd: thePayTable.getOdd(screen, bet),
      screen: screen.getRawScreenClone(),
      freeGameIncrement: calculateFreeGameIncrement(screen)
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
