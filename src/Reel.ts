import { RandomNumberGenerator } from './RandomNumberGenerator';

export class Reel {
  private index: number;

  private constructor(
    private symbols: string[],
    private randomNumberGenerator: RandomNumberGenerator
  ) {
    this.index = 0;
  }

  spin() {
    this.index = this.randomNumberGenerator.nextInteger();
  }

  getScreenColumn(): string[] {
    const screenColumn = this.symbols.slice(this.index, this.index + 3);

    if (screenColumn.length !== 3) {
      throw new Error('Invalid Column size');
    }

    return screenColumn;
  }

  static from(
    reel: string[],
    randomNumberGenerator: RandomNumberGenerator
  ): Reel {
    return new Reel(reel, randomNumberGenerator);
  }
}
