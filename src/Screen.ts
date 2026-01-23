export class Screen {
  private constructor(private rawScreen: string[][]) {}

  isHit(rows: number[]) {
    if (rows.length !== this.rawScreen.length) {
      throw new Error('Invalid row number');
    }

    const uniqueElements = new Set<string>();

    for (let i: number = 0; i < rows.length; i++) {
      const column: string[] = this.rawScreen[i];
      const row: number = rows[i];
      const symbol: string = column[row];
      uniqueElements.add(symbol);
    }

    return uniqueElements.size === 1;
  }

  static from(rawScreen: Array<Array<string>>) {
    return new Screen(rawScreen);
  }
}
