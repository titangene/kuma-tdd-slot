export class Screen {
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
