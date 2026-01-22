export class RandomNumberGenerator {
  private _nextInteger: number;

  constructor(nextInteger: number) {
    this._nextInteger = nextInteger;
  }

  nextInteger(): number {
    return this._nextInteger;
  }
}
