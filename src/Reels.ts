import { Screen } from './Screen.ts';
import { Reel } from './Reel.ts';
import type { RandomNumberGenerator } from './RandomNumberGenerator.ts';
import { DbcTool } from '@/DbcTool.ts';

export class Reels {
  private reels: Reel[];

  private constructor(
    reels: string[][],
    randomNumberGenerator: RandomNumberGenerator
  ) {
    this.reels = reels.map(reel => Reel.from(reel, randomNumberGenerator));
  }

  spin() {
    for (let i = 0; i < this.reels.length; ++i) {
      this.reels[i].spin();
    }
  }

  getScreen(): Screen {
    const rawScreen: string[][] = [];
    for (let i = 0; i < this.reels.length; i++) {
      rawScreen.push(this.reels[i].getScreenColumn());
    }
    return Screen.from(rawScreen);
  }

  static create(
    randomNumberGenerator: RandomNumberGenerator,
    rawReels: string[][]
  ): Reels {
    return new Reels(rawReels, randomNumberGenerator);
  }

  getIndexes(): number[] {
    return this.reels.map((reel: Reel): number => reel.getIndex());
  }

  setIndexes(reelsIndexes: number[]) {
    DbcTool.require(
      () => reelsIndexes.length === this.reels.length,
      'Invalid reels indexes length'
    );

    for (let i = 0; i < reelsIndexes.length; i++) {
      this.reels[i].setIndex(reelsIndexes[i]);
    }
  }
}
