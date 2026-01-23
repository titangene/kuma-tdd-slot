import { Screen } from './Screen.ts';
import { Bet } from './Bet.ts';
import { Odd } from './Odd.ts';
import type { Hit } from './Hit.ts';

export class PayLine {
  private constructor(
    private name: string,
    private rows: number[]
  ) {}

  getOdd(screen: Screen, bet: Bet): number {
    if (!bet.includes(this.name)) {
      return 0;
    }

    const odds: Odd[] = [
      new Odd('A', 5, 20),
      new Odd('A', 4, 15),
      new Odd('A', 3, 10),
      new Odd('K', 5, 15),
      new Odd('K', 4, 10),
      new Odd('K', 3, 8)
    ];

    const hit = screen.getHit(this.rows);
    return odds.find(odd => this.matches(odd, hit))?.odd ?? 0;
  }

  private matches(odd: Odd, hit: Hit) {
    return odd.symbol === hit.symbol && odd.hitLength === hit.length;
  }

  static from(name: string, rows: number[]): PayLine {
    return new PayLine(name, rows);
  }
}
