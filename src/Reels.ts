import { Screen } from './Screen.ts';
import { Reel } from './Reel.ts';

export class Reels {
  private index: number = 0;
  private reels: Reel[];

  private constructor(
    reels: string[][],
    private nextIndex: number
  ) {
    this.reels = reels.map(reel => new Reel(reel));
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
    return new Screen(rawScreen);
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
