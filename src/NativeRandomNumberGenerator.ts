import { RandomNumberGenerator } from './RandomNumberGenerator.ts';

export class NativeRandomNumberGenerator implements RandomNumberGenerator {
  constructor(private upperBound: number) {}

  nextInteger(): number {
    return Math.floor(Math.random() * this.upperBound);
  }
}
