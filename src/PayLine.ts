import { Screen } from './Screen.ts';
import { Bet } from './Bet.ts';

class Odd {
  constructor(
    public hitLength: number,
    public odd: number
  ) {}
}

export class PayLine {
  private constructor(
    private name: string,
    private rows: number[]
  ) {}

  getOdd(screen: Screen, bet: Bet): number {
    if (!bet.includes(this.name)) {
      return 0;
    }

    const odds: Odd[] = [new Odd(5, 20), new Odd(4, 15)];

    return (
      odds.find(odd => odd.hitLength === screen.getHitLength(this.rows))?.odd ??
      0
    );

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
