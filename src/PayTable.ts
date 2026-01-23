import type { Reels } from './Reels.ts';
import { Bet } from './Bet.ts';

export class PayTable {
  getOdd(bet: Bet, reels: Reels): number {
    if (reels.isRowHit(0) && bet.includes('L1')) {
      return 20;
    }

    if (reels.isRowHit(1) && bet.includes('L2')) {
      return 20;
    }

    if (reels.isRowHit(2) && bet.includes('L3')) {
      return 20;
    }

    return 0;
  }
}
