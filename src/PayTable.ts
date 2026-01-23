import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';
import { PayLine } from './PayLine.ts';

export class PayTable {
  constructor(public payLines: PayLine[]) {}

  getOdd(screen: Screen, bet: Bet): number {
    return this.payLines.reduce(
      (odd, payLine) => odd + payLine.getOdd(screen, bet),
      0
    );
  }
}
