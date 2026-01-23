import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';
import { PayLine } from './PayLine.ts';
import { Odds } from './Odds.ts';
import { Odd } from './Odd.ts';

export class PayTable {
  constructor(public payLines: PayLine[]) {}

  private odds = new Odds([
    new Odd('A', 5, 20),
    new Odd('A', 4, 15),
    new Odd('A', 3, 10),
    new Odd('K', 5, 15),
    new Odd('K', 4, 10),
    new Odd('K', 3, 8)
  ]);

  getOdd(screen: Screen, bet: Bet): number {
    return this.payLines.reduce(
      (totalOdd, payLine) => totalOdd + payLine.getOdd(screen, bet, this.odds),
      0
    );
  }
}
