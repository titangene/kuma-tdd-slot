import { Hit } from './Hit.ts';

export class Screen {
  private constructor(private rawScreen: string[][]) {}

  countSymbol(target: string) {
    return this.rawScreen.reduce((totalCount, row) => {
      const count = row.filter(symbol => symbol === target).length;
      return totalCount + count;
    }, 0);
  }

  getHit(rows: number[]): Hit {
    if (rows.length !== this.rawScreen.length) {
      throw new Error('Invalid row number');
    }

    const firstSymbol = this.rawScreen[0][rows[0]];
    let longestHit = 1; // Start from 1 since the first element is always counted

    for (let i = 1; i < rows.length; i++) {
      if (this.rawScreen[i][rows[i]] !== firstSymbol) {
        break;
      }

      longestHit++;
    }

    return new Hit(firstSymbol, longestHit);
  }

  static from(rawScreen: Array<Array<string>>) {
    return new Screen(rawScreen);
  }

  getRawScreenClone(): string[][] {
    return this.rawScreen.map(row => [...row]);
  }
}
