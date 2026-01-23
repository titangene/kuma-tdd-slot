import type { Reels } from './Reels.ts';

export class PayTable {
  getOdd(betLines: string[], reels: Reels): number {
    if (reels.isRowHit(0) && this.isHit(betLines, 'L1')) {
      return 20;
    }

    if (reels.isRowHit(1) && this.isHit(betLines, 'L2')) {
      return 20;
    }

    if (reels.isRowHit(2) && this.isHit(betLines, 'L3')) {
      return 20;
    }

    return 0;
  }

  private isHit(betLines: string[], line: string): boolean {
    return betLines.filter(betLine => betLine === line).length > 0;
  }
}
