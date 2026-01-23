import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';

class PayLine {
  constructor(
    private name: string,
    private rows: number[]
  ) {}

  getOdd(screen: Screen, bet: Bet): number {
    return screen.isHit(this.rows) && bet.includes(this.name) ? 20 : 0;
  }
}

export class PayTable {
  payLines: PayLine[] = [
    new PayLine('L1', [0, 0, 0, 0, 0]),
    new PayLine('L2', [1, 1, 1, 1, 1]),
    new PayLine('L3', [2, 2, 2, 2, 2]),
    new PayLine('L4', [0, 1, 2, 1, 0])
  ];

  getOdd(screen: Screen, bet: Bet): number {
    let odd = 0;

    for (const payLine of this.payLines) {
      odd += payLine.getOdd(screen, bet);
    }

    return odd;
  }
}
