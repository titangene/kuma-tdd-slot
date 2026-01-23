import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';

export class PayTable {
  getOdd(screen: Screen, bet: Bet): number {
    let odd = 0;

    if (screen.isHit([0, 0, 0, 0, 0]) && bet.includes('L1')) {
      odd += 20;
    }
    if (screen.isHit([1, 1, 1, 1, 1]) && bet.includes('L2')) {
      odd += 20;
    }
    if (screen.isHit([2, 2, 2, 2, 2]) && bet.includes('L3')) {
      odd += 20;
    }

    if (screen.isHit([0, 1, 2, 1, 0]) && bet.includes('L4')) {
      odd += 20;
    }

    return odd;
  }
}
