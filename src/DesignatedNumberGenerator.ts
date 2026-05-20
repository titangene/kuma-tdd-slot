import type { RandomNumberGenerator } from './RandomNumberGenerator.ts';

export class DesignatedNumberGenerator implements RandomNumberGenerator {
  private integers: number[];

  constructor(...numbers: number[]) {
    this.integers = numbers;
  }

  nextInteger(): number {
    const shift: number = <number>this.integers.shift();

    this.integers.push(shift); // to make a circular queue

    return shift;
  }
}
