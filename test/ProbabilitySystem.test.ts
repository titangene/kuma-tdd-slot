import { describe, expect, test } from 'vitest';

class ProbabilitySystem {
  spin(): number {
    return 0;
  }
}

describe('probability system', () => {
  test('lose', () => {
    const sut = new ProbabilitySystem();
    expect(sut.spin()).toBe(0);
  });
});
