import type { ProbabilitySystemSettings } from '@/ProbabilitySystemSettings.ts';
import { ProbabilitySystem } from '@/ProbabilitySystem.ts';
import { SlotGame } from '@/SlotGame.ts';
import { Reels } from '@/Reels.ts';
import { NativeRandomNumberGenerator } from '@/NativeRandomNumberGenerator.ts';
import { PayTable } from '@/PayTable.ts';
import { PayLine } from '@/PayLine.ts';
import { Odds } from '@/Odds.ts';
import { Odd } from '@/Odd.ts';
import { Screen } from '@/Screen.ts';

export function createProbabilitySystem(
  settings: ProbabilitySystemSettings
): ProbabilitySystem {
  const baseGameSettings = settings.baseGameSettings;
  const baseGame: SlotGame = SlotGame.of(
    Reels.create(new NativeRandomNumberGenerator(), baseGameSettings.reels),
    new PayTable(
      baseGameSettings.payLines.map(payLine =>
        PayLine.from(payLine.name, payLine.indexes)
      ),
      new Odds(
        baseGameSettings.odds.map(
          odd => new Odd(odd.symbol, odd.count, odd.odd)
        )
      )
    ),
    (screen: Screen): number =>
      screen.countSymbol(baseGameSettings.freeGameIncrementParameters.symbol) >=
      baseGameSettings.freeGameIncrementParameters.count
        ? baseGameSettings.freeGameIncrementParameters.increment
        : 0
  );

  const freeGameSettings = settings.freeGameSettings;
  const freeGame: SlotGame = SlotGame.of(
    Reels.create(new NativeRandomNumberGenerator(), freeGameSettings.reels),
    new PayTable(
      freeGameSettings.payLines.map(payLine =>
        PayLine.from(payLine.name, payLine.indexes)
      ),
      new Odds(
        freeGameSettings.odds.map(
          odd => new Odd(odd.symbol, odd.count, odd.odd)
        )
      )
    ),
    (screen: Screen): number =>
      screen.countSymbol(freeGameSettings.freeGameIncrementParameters.symbol) >=
      freeGameSettings.freeGameIncrementParameters.count
        ? freeGameSettings.freeGameIncrementParameters.increment
        : 0
  );

  return ProbabilitySystem.create(baseGame, freeGame);
}
