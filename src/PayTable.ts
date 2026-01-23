import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';

export class PayTable {
  getOdd(screen: Screen, bet: Bet): number {
    if (screen.isScreenRowHit(0) && bet.includes('L1')) {
      return 20;
    }

    if (screen.isScreenRowHit(1) && bet.includes('L2')) {
      return 20;
    }

    if (screen.isScreenRowHit(2) && bet.includes('L3')) {
      return 20;
    }

    return 0;
  }
}
