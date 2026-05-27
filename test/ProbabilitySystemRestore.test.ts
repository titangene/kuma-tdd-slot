import { describe, expect, test } from 'vitest';
import { ProbabilitySystem } from '@/ProbabilitySystem.ts';
import { SlotGame } from '@/SlotGame.ts';
import { Reels } from '@/Reels.ts';
import { DesignatedNumberGenerator } from '@/DesignatedNumberGenerator.ts';
import { PayTable } from '@/PayTable.ts';
import { PayLine } from '@/PayLine.ts';
import { Odds } from '@/Odds.ts';
import { Odd } from '@/Odd.ts';
import { Screen } from '@/Screen.ts';
import { Bet } from '@/Bet.ts';
import type { Characteristic } from '@/Characteristic.ts';

export function create_probability_system(): ProbabilitySystem {
  const baseGame = SlotGame.of(
    Reels.create(new DesignatedNumberGenerator(1, 1, 1, 1, 1), [
      ['K', 'Q', 'A', 'A'],
      ['K', '10', 'J', 'A'],
      ['K', 'Q', 'A', 'J'],
      ['K', 'Q', 'A', 'K'],
      ['K', '10', 'J', 'Q']
    ]),
    new PayTable(
      [PayLine.from('L1', [0, 0, 0, 0, 0])],
      new Odds([new Odd('A', 5, 20)])
    ),
    (screen: Screen): number => (screen.countSymbol('S') >= 3 ? 10 : 0)
  );
  const freeGame = SlotGame.of(
    Reels.create(new DesignatedNumberGenerator(0, 0, 0, 0, 0), [
      ['K', 'J', 'Q', 'A'],
      ['K', 'Q', 'K', 'A'],
      ['Q', 'K', '10', 'K'],
      ['10', 'K', 'Q', 'A'],
      ['J', 'Q', 'K', 'A']
    ]),
    new PayTable(
      [PayLine.from('L1', [0, 0, 0, 0, 0])],
      new Odds([new Odd('A', 5, 2_000)])
    ),
    (screen: Screen): number => (screen.countSymbol('S') >= 5 ? 10 : 0)
  );
  const original = ProbabilitySystem.create(baseGame, freeGame);
  return original;
}

describe('probability system restores', () => {
  test('Recovery BaseGame', () => {
    const original = create_probability_system();

    original.spin(new Bet('L1'));

    const characteristic: Characteristic = original.getCharacteristic();

    const restored: ProbabilitySystem = create_probability_system();

    restored.restore(characteristic);

    expect(restored.getNextGameType()).toBe('BASE_GAME');
    expect(restored.getScreen()).toStrictEqual(
      Screen.from([
        ['Q', 'A', 'A'],
        ['10', 'J', 'A'],
        ['Q', 'A', 'J'],
        ['Q', 'A', 'K'],
        ['10', 'J', 'Q']
      ])
    );
  });
});
