import { Screen } from './Screen.ts';
import { Reel } from './Reel.ts';
import { RandomNumberGenerator } from './RandomNumberGenerator.ts';

export class Reels {
  private reels: Reel[];
  private indices: number[];
  // private index: number = 0;
  // private nextIndex: number;

  private constructor(
    reels: string[][],
    private randomNumberGenerator: RandomNumberGenerator
  ) {
    this.reels = reels.map(reel => Reel.from(reel));
    // this.nextIndex = randomNumberGenerator.nextInteger();
    this.indices = [0, 0, 0, 0, 0];
  }

  spin() {
    for (let i = 0; i < this.indices.length; ++i) {
      this.indices[i] = this.randomNumberGenerator.nextInteger();
    }
    // this.index = this.nextIndex;
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

    // const rawScreen = [];
    // for (let i = 0; i < this.reels.length; i++){
    //   const reel = this.reels[i];
    //   rawScreen.push(reel.getScreenColumn(this.index));
    // }
    // return Screen.from(rawScreen);
  }

  static create(
    randomNumberGenerator: RandomNumberGenerator,
    rawReels: string[][]
  ): Reels {
    return new Reels(rawReels, randomNumberGenerator);
  }
}
