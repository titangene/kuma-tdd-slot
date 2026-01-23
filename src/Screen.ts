export class Screen {
  private constructor(private rawScreen: string[][]) {}

  isScreenRowHit(row: number): boolean {
    const uniqueElements = new Set<string>();

    for (let i = 0; i < this.rawScreen.length; i++) {
      const screenReel: string[] = this.rawScreen[i];
      uniqueElements.add(screenReel[row]);
    }

    return uniqueElements.size === 1;
  }

  isHit() {
    return (
      this.rawScreen[0][0] === this.rawScreen[1][1] &&
      this.rawScreen[1][1] === this.rawScreen[2][2] &&
      this.rawScreen[2][2] === this.rawScreen[3][1] &&
      this.rawScreen[3][1] === this.rawScreen[4][0]
    );
  }

  static from(rawScreen: Array<Array<string>>) {
    return new Screen(rawScreen);
  }
}
