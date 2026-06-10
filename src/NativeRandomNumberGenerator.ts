import { RandomNumberGenerator } from './RandomNumberGenerator.ts';

export class NativeRandomNumberGenerator implements RandomNumberGenerator {
  nextInteger(upperBoundExclusive: number): number {
    return Math.floor(Math.random() * upperBoundExclusive);
  }
}
