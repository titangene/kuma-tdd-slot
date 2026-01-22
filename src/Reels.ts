import { Screen } from './Screen.ts';
import { Reel } from './Reel.ts';
import { RandomNumberGenerator } from './RandomNumberGenerator.ts';

export class Reels {
  private reels: Reel[];
  private index: number = 0;
  private nextIndex: number;

  private constructor(
    reels: string[][],
    randomNumberGenerator: RandomNumberGenerator
  ) {
    this.reels = reels.map(reel => Reel.from(reel));
    this.nextIndex = randomNumberGenerator.nextInteger();
  }

  spin() {
    this.index = this.nextIndex;
  }

  isRowHit(row: number): boolean {
    const screen = this.getScreen();
    return screen.isScreenRowHit(row);
  }

  private getScreen(): Screen {
    const rawScreen: string[][] = this.reels.map(reel =>
      reel.getScreenColumn(this.index)
    );
    return Screen.from(rawScreen);
  }

  static create(
    randomNumberGenerator: RandomNumberGenerator,
    rawReels: string[][]
  ): Reels {
    return new Reels(rawReels, randomNumberGenerator);
  }
}
