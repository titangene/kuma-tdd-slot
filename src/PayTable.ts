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
  getOdd(screen: Screen, bet: Bet): number {
    let odd = 0;

    const payLine1: PayLine = new PayLine('L1', [0, 0, 0, 0, 0]);
    if (screen.isHit(payLine1.rows) && bet.includes(payLine1.name)) {
      odd += 20;
    }
    const payLine2: PayLine = new PayLine('L2', [1, 1, 1, 1, 1]);
    if (screen.isHit(payLine2.rows) && bet.includes(payLine2.name)) {
      odd += 20;
    }
    const payLine3: PayLine = new PayLine('L3', [2, 2, 2, 2, 2]);
    if (screen.isHit(payLine3.rows) && bet.includes(payLine3.name)) {
      odd += 20;
    }
    const payLine4: PayLine = new PayLine('L4', [0, 1, 2, 1, 0]);
    if (screen.isHit(payLine4.rows) && bet.includes(payLine4.name)) {
      odd += 20;
    }

    return odd;
  }
}
