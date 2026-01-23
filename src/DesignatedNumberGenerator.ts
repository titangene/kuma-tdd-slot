export class DesignatedNumberGenerator {
  private integers: number[];

  constructor(...numbers: number[]) {
    this.integers = numbers;
  }

  nextInteger(): number {
    return this.integers.shift() as number;
  }
}
