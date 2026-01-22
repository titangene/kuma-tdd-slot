export class ProbabilitySystem {
  reels: Array<Array<string>> = [
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', '10', 'J']
  ];

  spin(betLine: string): number {
    const firstElementsSet = new Set<string>();

    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      firstElementsSet.add(reel[0]);
    }

    if (firstElementsSet.size === 1 && betLine === 'L1') {
      return 20;
    }
    return 0;
  }
}
