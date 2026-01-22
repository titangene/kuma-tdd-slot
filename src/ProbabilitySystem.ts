class Reels {
  constructor(public reels: Array<Array<string>>) {}
}

export class ProbabilitySystem {
  reels: Reels = new Reels([
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', 'Q', 'K'],
    ['A', '10', 'J']
  ]);

  spin(betLine: string): number {
    const firstElementsSet = new Set<string>();

    for (let i = 0; i < this.reels.reels.length; i++) {
      const reel = this.reels.reels[i];
      firstElementsSet.add(reel[0]);
    }

    if (firstElementsSet.size === 1 && betLine === 'L1') {
      return 20;
    }
    return 0;
  }
}
