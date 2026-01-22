export class Reel {
  constructor(private symbols: string[]) {}

  getScreenColumn(index: number) {
    return this.symbols.slice(index, index + 3);
  }
}
