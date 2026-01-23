import { Screen } from './Screen.ts';
import { Reel } from './Reel.ts';
import { DesignatedNumberGenerator } from './DesignatedNumberGenerator.ts';

export class Reels {
  private reels: Reel[];

  private constructor(
    reels: string[][],
    randomNumberGenerator: DesignatedNumberGenerator
  ) {
    this.reels = reels.map(reel => Reel.from(reel, randomNumberGenerator));
  }

  spin() {
    for (let i = 0; i < this.reels.length; ++i) {
      this.reels[i].spin();
    }
  }

  isRowHit(row: number): boolean {
    const screen = this.getScreen();
    return screen.isScreenRowHit(row);
  }

  private getScreen(): Screen {
    const rawScreen: string[][] = [];
    for (let i = 0; i < this.reels.length; i++) {
      rawScreen.push(this.reels[i].getScreenColumn());
    }
    return Screen.from(rawScreen);
  }

  static create(
    randomNumberGenerator: DesignatedNumberGenerator,
    rawReels: string[][]
  ): Reels {
    return new Reels(rawReels, randomNumberGenerator);
  }
}
