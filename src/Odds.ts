import { Odd } from './Odd.ts';
import type { Hit } from './Hit.ts';

export class Odds {
  constructor(public rawOdds: Odd[]) {}

  getOdd(hit: Hit) {
    return this.rawOdds.find(odd => odd.matches(hit))?.odd ?? 0;
  }
}
