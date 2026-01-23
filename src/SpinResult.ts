export class SpinResult {
  private constructor(
    public odd: number,
    public screen: string[][],
    public nextGameType: string
  ) {}

  static of(odd: number, screen: string[][], nextGameType: string): SpinResult {
    return new SpinResult(odd, screen, nextGameType);
  }
}
