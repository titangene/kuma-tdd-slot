class Screen {
  constructor(public rawScreen: string[][]) {}
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
    return this.isScreenRowHit(screen, row);
  }

  private getScreen(): Screen {
    const rawScreen: string[][] = [];

    for (let i = 0; i < this.reels.length; i++) {
      rawScreen.push(this.reels[i].slice(this.index, this.index + 3));
    }
    return new Screen(rawScreen);
  }

  private isScreenRowHit(screen: Screen, row: number): boolean {
    const uniqueElements = new Set<string>();

    for (let i = 0; i < screen.rawScreen.length; i++) {
      const screenReel: string[] = screen.rawScreen[i];
      uniqueElements.add(screenReel[row]);
    }

    return uniqueElements.size === 1;
  }

  static create(nextIndex: number, rawReels: string[][]): Reels {
    return new Reels(rawReels, nextIndex);
  }
}
