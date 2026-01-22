import { Screen } from './Screen.ts';

class Reel {
  constructor(private symbols: string[]) {}

  getScreenColumn(index: number) {
    return this.symbols.slice(index, index + 3);
  }
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
      rawScreen.push(reel.getScreenColumn(this.index));
    }
    return new Screen(rawScreen);
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
