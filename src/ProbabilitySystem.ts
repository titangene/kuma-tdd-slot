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

  private constructor(baseGame: SlotGame, freeGame: SlotGame) {
    this.baseGame = baseGame;
    this.freeGame = freeGame;

    this.maxBet = this.freeGame.getMaxBet();
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
    freeGamePayTable: PayTable,
    calculateFreeGameIncrement: (screen: Screen) => number,
    calculateFreeGameIncrementForFreeGame: (screen: Screen) => number
  ): ProbabilitySystem {
    return new ProbabilitySystem(
      SlotGame.of(reels, payTable, calculateFreeGameIncrement),
      SlotGame.of(
        freeGameReels,
        freeGamePayTable,
        calculateFreeGameIncrementForFreeGame
      )
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
