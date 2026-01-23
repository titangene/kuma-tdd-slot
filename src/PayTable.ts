import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';
import { PayLine } from './PayLine.ts';

export class PayTable {
  payLines: PayLine[];

  constructor() {
    this.payLines = [
      new PayLine('L1', [0, 0, 0, 0, 0]),
      new PayLine('L2', [1, 1, 1, 1, 1]),
      new PayLine('L3', [2, 2, 2, 2, 2]),
      new PayLine('L4', [0, 1, 2, 1, 0])
    ];
  }

  getOdd(screen: Screen, bet: Bet): number {
    return this.payLines.reduce(
      (odd, payLine) => odd + payLine.getOdd(screen, bet),
      0
    );
  }
}
