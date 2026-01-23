import type { Hit } from './Hit.ts';

export class Odd {
  constructor(
    public symbol: string,
    public hitLength: number,
    public odd: number
  ) {}

  matches(hit: Hit) {
    return this.symbol === hit.symbol && this.hitLength === hit.length;
  }
}
