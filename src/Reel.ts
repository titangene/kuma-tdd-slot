import { DesignatedNumberGenerator } from './DesignatedNumberGenerator.ts';

export class Reel {
  private index: number;

  private constructor(
    private symbols: string[],
    private randomNumberGenerator: DesignatedNumberGenerator
  ) {
    this.index = 0;
  }

  spin() {
    this.index = this.randomNumberGenerator.nextInteger();
  }

  getScreenColumn(): string[] {
    const screenColumn: string[] = Array.from(
      { length: 3 },
      (_, k) => this.symbols[(this.index + k) % this.symbols.length]
    );

    if (screenColumn.length !== 3) {
      throw new Error('Invalid Column size');
    }

    return screenColumn;
  }

  static from(
    reel: string[],
    randomNumberGenerator: DesignatedNumberGenerator
  ): Reel {
    return new Reel(reel, randomNumberGenerator);
  }
}
