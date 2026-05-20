import { Reels } from './Reels.ts';
import { PayTable } from './PayTable.ts';
import { Bet } from './Bet.ts';
import { SpinResult } from './SpinResult.ts';
import type { Screen } from '@/Screen.ts';
import { SlotGame } from './SlotGame';

export class ProbabilitySystem {
  private baseGame: SlotGame;
  private freeGame: SlotGame;

  private freeGameCount: number = 0;
  private maxBet: Bet;

  private constructor(
    reels: Reels,
    payTable: PayTable,
    freeGameReels: Reels,
    freeGamePayTable: PayTable
  ) {
    this.baseGame = new SlotGame(reels, payTable, (screen: Screen): number =>
      screen.countSymbol('S') >= 3 ? 10 : 0
    );
    this.freeGame = new SlotGame(
      freeGameReels,
      freeGamePayTable,
      (screen: Screen): number => (screen.countSymbol('S') >= 5 ? 10 : 0)
    );

    this.maxBet = new Bet(
      ...freeGamePayTable.payLines.map(payLine => payLine.getName())
    );
  }

  spin(bet: Bet): SpinResult {
    const { odd, screen, freeGameIncrement } = this.baseGame.doSpinFlow(bet);

    this.freeGameCount += freeGameIncrement;

    return SpinResult.of(odd, screen, this.getNextGameType());
  }

  spinFree(): SpinResult {
    const { odd, screen, freeGameIncrement } = this.freeGame.doSpinFlow(
      this.maxBet
    );

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
      ? this.baseGame.getScreen()
      : this.freeGame.getScreen();
  }

  getNextGameType(): string {
    return this.freeGameCount > 0 ? 'FREE_GAME' : 'BASE_GAME';
  }
}
