import { Screen } from './Screen.ts';
import { Bet } from './Bet.ts';
import { Odd } from './Odd.ts';

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

    return (
      odds.find(odd => {
        const hit = screen.getHit(this.rows);
        return odd.symbol === hit.symbol && odd.hitLength === hit.length;
      })?.odd ?? 0
    );
  }

  static from(name: string, rows: number[]): PayLine {
    return new PayLine(name, rows);
  }
}
