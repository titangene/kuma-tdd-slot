import { Bet } from './Bet.ts';
import { Screen } from './Screen.ts';

class PayLine {
  get rows(): number[] {
    return this._rows;
  }

  get name(): string {
    return this._name;
  }

  private _name: string;
  private _rows: number[];

  constructor(name: string, rows: number[]) {
    this._name = name;
    this._rows = rows;
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
      const oddTemp = this.getOddTemp(screen, payLine, bet);
      odd += oddTemp;
    }

    return odd;
  }

  private getOddTemp(screen: Screen, payLine: PayLine, bet: Bet) {
    let oddTemp: number = 0;

    if (screen.isHit(payLine.rows) && bet.includes(payLine.name)) {
      oddTemp = 20;
    }

    return oddTemp;
  }
}
