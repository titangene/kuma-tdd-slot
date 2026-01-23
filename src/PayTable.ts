import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';

export class PayTable {
  getOdd(screen: Screen, bet: Bet): number {
    let odd = 0;

    if (screen.isScreenRowHit(0) && bet.includes('L1')) {
      odd += 20;
    }
    if (screen.isScreenRowHit(1) && bet.includes('L2')) {
      odd += 20;
    }
    if (screen.isScreenRowHit(2) && bet.includes('L3')) {
      odd += 20;
    }

    const rawScreen: string[][] = screen.getRawScreen();

    if (this.isHit(rawScreen) && bet.includes('L4')) {
      odd += 20;
    }

    return odd;
  }
  private isHit(rawScreen: string[][]) {
    return (
      rawScreen[0][0] === rawScreen[1][1] &&
      rawScreen[1][1] === rawScreen[2][2] &&
      rawScreen[2][2] === rawScreen[3][1] &&
      rawScreen[3][1] === rawScreen[4][0]
    );
  }
}
