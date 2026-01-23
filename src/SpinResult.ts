export class SpinResult {
  private constructor(
    public odd: number,
    public screen: string[][]
  ) {}

  static of(odd: number, screen: string[][]): SpinResult {
    return new SpinResult(odd, screen);
  }
}
