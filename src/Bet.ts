export class Bet {
  constructor(public betLines: string[]) {}

  includes(line: string): boolean {
    return this.betLines.filter(betLine => betLine === line).length > 0;
  }
}
