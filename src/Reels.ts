class Screen {
  constructor(private rawScreen: string[][]) {}

  isScreenRowHit(row: number): boolean {
    const uniqueElements = new Set<string>();

    for (let i = 0; i < this.rawScreen.length; i++) {
      const screenReel: string[] = this.rawScreen[i];
      uniqueElements.add(screenReel[row]);
    }

    return uniqueElements.size === 1;
  }
}

export class Reels {
  private index: number = 0;

  private constructor(
    private reels: string[][],
    private nextIndex: number
  ) {}

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
      rawScreen.push(this.reels[i].slice(this.index, this.index + 3));
    }
    return new Screen(rawScreen);
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
