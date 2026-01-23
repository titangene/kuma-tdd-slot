export class Bet {
  private line: string[];

  constructor(...line: string[]) {
    this.line = line;
  }

  includes(line: string): boolean {
    return this.line.filter(betLine => betLine === line).length > 0;
  }
}
