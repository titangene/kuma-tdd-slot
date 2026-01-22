import { Screen } from './Screen.ts';

class Reel {
  constructor(public symbols: string[]) {}
}

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
    const rawScreen: string[][] = [];

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      const index = this.index;
      rawScreen.push(this.getScreenColumn(reel, index));
    }
    return new Screen(rawScreen);
  }

  private getScreenColumn(reel: Reel, index: number) {
    return reel.symbols.slice(index, index + 3);
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
