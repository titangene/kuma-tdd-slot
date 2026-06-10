import type { RandomNumberGenerator } from './RandomNumberGenerator.ts';
import { DbcTool } from '@/DbcTool.ts';

export class Reel {
  private index: number;

  private constructor(
    private symbols: string[],
    private randomNumberGenerator: RandomNumberGenerator
  ) {
    this.index = 0;
  }

  spin() {
    this.index = this.randomNumberGenerator.nextInteger(this.symbols.length);
  }

  getScreenColumn(): string[] {
    const screenColumn: string[] = Array.from(
      { length: 3 },
      (_, k) => this.symbols[(this.index + k) % this.symbols.length]
    );

    DbcTool.ensure(() => screenColumn.length === 3, 'Invalid Column size');

    return screenColumn;
  }

  static from(
    reel: string[],
    randomNumberGenerator: RandomNumberGenerator
  ): Reel {
    return new Reel(reel, randomNumberGenerator);
  }

  getIndex(): number {
    return this.index;
  }

  setIndex(index: number) {
    this.index = index;
  }
}
