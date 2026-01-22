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
      rawScreen.push(this.reels[i].symbols.slice(this.index, this.index + 3));
    }
    return new Screen(rawScreen);
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
