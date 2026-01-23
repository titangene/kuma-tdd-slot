import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';
import { PayLine } from './PayLine.ts';
import { Odds } from './Odds.ts';
import { Odd } from './Odd.ts';

export class PayTable {
  constructor(public payLines: PayLine[]) {}

  getOdd(screen: Screen, bet: Bet): number {
    return this.payLines.reduce(
      (odd, payLine) =>
        odd +
        payLine.getOdd(
          screen,
          bet,
          new Odds([
            new Odd('A', 5, 20),
            new Odd('A', 4, 15),
            new Odd('A', 3, 10),
            new Odd('K', 5, 15),
            new Odd('K', 4, 10),
            new Odd('K', 3, 8)
          ])
        ),
      0
    );
  }
}
