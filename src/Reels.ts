import { Screen } from './Screen.ts';
import { Reel } from './Reel.ts';
import { RandomNumberGenerator } from './RandomNumberGenerator.ts';

export class Reels {
  private reels: Reel[];
  private indices: number[];

  private constructor(
    reels: string[][],
    private randomNumberGenerator: RandomNumberGenerator
  ) {
    this.reels = reels.map(reel => Reel.from(reel));
    this.indices = [0, 0, 0, 0, 0];
  }

  spin() {
    for (let i = 0; i < this.indices.length; ++i) {
      this.indices[i] = this.randomNumberGenerator.nextInteger();
    }
  }

  isRowHit(row: number): boolean {
    const screen = this.getScreen();
    return screen.isScreenRowHit(row);
  }

  private getScreen(): Screen {
    const rawScreen: string[][] = [];
    for (let i = 0; i < this.reels.length; i++) {
      rawScreen.push(this.reels[i].getScreenColumn(this.indices[i]));
    }
    return Screen.from(rawScreen);
  }

  static create(
    randomNumberGenerator: RandomNumberGenerator,
    rawReels: string[][]
  ): Reels {
    return new Reels(rawReels, randomNumberGenerator);
  }
}
