import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';
import { PayLine } from './PayLine.ts';
import { Odds } from './Odds.ts';

export class PayTable {
  constructor(
    public payLines: PayLine[],
    private odds: Odds
  ) {}

  getOdd(screen: Screen, bet: Bet): number {
    return this.payLines.reduce(
      (totalOdd, payLine) => totalOdd + payLine.getOdd(screen, bet, this.odds),
      0
    );
  }
}
