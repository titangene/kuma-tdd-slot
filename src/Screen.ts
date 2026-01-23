export class Screen {
  private constructor(private rawScreen: string[][]) {}

  getHitLength(rows: number[]): number {
    if (rows.length !== this.rawScreen.length) {
      throw new Error('Invalid row number');
    }

    const uniqueElements = new Set<string>();
    let longestHit: number = 0;

    for (let i: number = 0; i < rows.length; i++) {
      const symbol: string = this.rawScreen[i][rows[i]];
      uniqueElements.add(symbol);

      if (uniqueElements.size > 1) {
        break;
      }

      longestHit++;
    }

    return longestHit;
  }

  static from(rawScreen: Array<Array<string>>) {
    return new Screen(rawScreen);
  }
}
