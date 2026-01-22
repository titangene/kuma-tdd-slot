export class ProbabilitySystem {
  spin(betLine: string): number {
    if (betLine === 'L1') {
      return 20;
    }
    return 0;
  }
}
