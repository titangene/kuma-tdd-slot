export class Reel {
  private constructor(private symbols: string[]) {}

  getScreenColumn(index: number) {
    return this.symbols.slice(index, index + 3);
  }

  static from(reel: string[]): Reel {
    return new Reel(reel);
  }
}
