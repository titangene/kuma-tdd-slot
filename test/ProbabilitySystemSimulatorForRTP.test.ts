import { describe, test } from 'vitest';
import { Bet } from '@/Bet.ts';
import { ProbabilitySystemFactory } from '@/ProbabilitySystemFactory.ts';

describe('probability system simulator', () => {
  test('RTP Simulator', () => {
    const sut = new ProbabilitySystemFactory().createProbabilitySystem();

    let nextGameType = sut.getNextGameType();
    const rounds = 1_000_000;
    let totalOdd = 0;
    for (let i = 0; i < rounds; i++) {
      const spinResult =
        'BASE_GAME' === nextGameType
          ? sut.spin(
              new Bet('L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9')
            )
          : sut.spinFree();

      totalOdd += spinResult.odd;
      nextGameType = spinResult.nextGameType;
    }

    console.log(`Total odd: ${totalOdd}, Average odd: ${totalOdd / rounds}`);
  });
});
