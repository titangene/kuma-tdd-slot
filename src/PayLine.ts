import { Screen } from './Screen.ts';
import { Bet } from './Bet.ts';
import { Odds } from './Odds.ts';

export class PayLine {
  private constructor(
    private name: string,
    private rows: number[]
  ) {}

  getOdd(screen: Screen, bet: Bet, odds: Odds): number {
    if (!bet.includes(this.name)) {
      return 0;
    }

    const hit = screen.getHit(this.rows);
    return odds.rawOdds.find(odd => odd.matches(hit))?.odd ?? 0;
  }

  static from(name: string, rows: number[]): PayLine {
    return new PayLine(name, rows);
  }
}
