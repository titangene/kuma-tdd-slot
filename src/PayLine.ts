import { Screen } from './Screen.ts';
import { Bet } from './Bet.ts';

export class PayLine {
  private constructor(
    private name: string,
    private rows: number[]
  ) {}

  getOdd(screen: Screen, bet: Bet): number {
    if (bet.includes(this.name)) {
      if (screen.getHitLength(this.rows) === 5) {
        return 20;
      } else if (screen.getHitLength(this.rows) === 4) {
        return 15;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  static from(name: string, rows: number[]): PayLine {
    return new PayLine(name, rows);
  }
}
