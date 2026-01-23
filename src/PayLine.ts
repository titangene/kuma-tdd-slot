import { Screen } from './Screen.ts';
import { Bet } from './Bet.ts';

export class PayLine {
  constructor(
    private name: string,
    private rows: number[]
  ) {}

  getOdd(screen: Screen, bet: Bet): number {
    return screen.isHit(this.rows) && bet.includes(this.name) ? 20 : 0;
  }
}
