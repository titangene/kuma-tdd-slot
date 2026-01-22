import { describe, expect, test } from 'vitest';
import { ProbabilitySystem } from '@/ProbabilitySystem.ts';

describe('probability system', () => {
  test('Row1 hit, bet L2 -> 0', () => {
    const sut = new ProbabilitySystem();
    expect(sut.spin('L2')).toBe(0);
  });

  test('Row1 hit, bet L1 -> 20', () => {
    const sut = new ProbabilitySystem();
    expect(sut.spin('L1')).toBe(20);
  });

  // test('Row2 hit, bet L2 -> 0', () => {
  //   const sut = new ProbabilitySystem();
  //   expect(sut.spin('L2')).toBe(20);
  // });
});
