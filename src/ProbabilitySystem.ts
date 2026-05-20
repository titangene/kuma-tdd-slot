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

  doSpinFlow(bet: Bet): {
    odd: number;
    screen: string[][];
    freeGameIncrement: number;
  } {
    this.theReels.spin();

    const screen = this.theReels.getScreen();

    return {
      odd: this.thePayTable.getOdd(screen, bet),
      screen: screen.getRawScreenClone(),
      freeGameIncrement: this.calculateFreeGameIncrement(screen)
    };
  }
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
    const slotGame = new SlotGame(
      this.reels,
      this.payTable,
      (screen: Screen): number => (screen.countSymbol('S') >= 3 ? 10 : 0)
    );
    const { odd, screen, freeGameIncrement } = slotGame.doSpinFlow(bet);

    this.freeGameCount += freeGameIncrement;

    return SpinResult.of(odd, screen, this.getNextGameType());
  }

  spinFree(): SpinResult {
    const bet: Bet = new Bet(
      ...this.freeGamePayTable.payLines.map(payLine => payLine.getName())
    );

    const slotGame = new SlotGame(
      this.freeGameReels,
      this.freeGamePayTable,
      (screen: Screen): number => (screen.countSymbol('S') >= 5 ? 10 : 0)
    );
    const { odd, screen, freeGameIncrement } = slotGame.doSpinFlow(bet);

    this.freeGameCount += freeGameIncrement;

    this.freeGameCount--;

    return SpinResult.of(odd, screen, this.getNextGameType());
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
