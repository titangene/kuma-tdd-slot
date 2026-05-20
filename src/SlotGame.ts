import { Reels } from './Reels';
import { PayTable } from './PayTable';
import type { Screen } from './Screen';
import { Bet } from './Bet';

export class SlotGame {
  static of(
    reels: Reels,
    payTable: PayTable,
    calculateFreeGameIncrement: (screen: Screen) => number
  ) {
    return new SlotGame(reels, payTable, calculateFreeGameIncrement);
  }

  private constructor(
    private reels: Reels,
    private payTable: PayTable,
    private calculateFreeGameIncrement: (screen: Screen) => number
  ) {}

  doSpinFlow(bet: Bet): {
    odd: number;
    screen: string[][];
    freeGameIncrement: number;
  } {
    this.reels.spin();

    const screen = this.getScreen();

    return {
      odd: this.payTable.getOdd(screen, bet),
      screen: screen.getRawScreenClone(),
      freeGameIncrement: this.calculateFreeGameIncrement(screen)
    };
  }

  getScreen(): Screen {
    return this.reels.getScreen();
  }
}
