import type { Reels } from './Reels.ts';
import { Bet } from './Bet.ts';

export class PayTable {
  getOdd(betLines: string[], reels: Reels): number {
    if (reels.isRowHit(0) && this.isHit(betLines, 'L1', new Bet(betLines))) {
      return 20;
    }

    if (reels.isRowHit(1) && this.isHit(betLines, 'L2', new Bet(betLines))) {
      return 20;
    }

    if (reels.isRowHit(2) && this.isHit(betLines, 'L3', new Bet(betLines))) {
      return 20;
    }

    return 0;
  }

  private isHit(betLines: string[], line: string, bet: Bet): boolean {
    return bet.includes(line);
  }
}
