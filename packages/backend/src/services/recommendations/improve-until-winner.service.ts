/** Tolerance for considering the target "close enough" to be the winner */
export const WINNER_EPSILON = 1e-4;

export function isCloseEnoughToWin(targetGlobal: number, leaderGlobal: number): boolean {
  return targetGlobal >= leaderGlobal - WINNER_EPSILON;
}

/** Check if target is the current winner (or within epsilon of the best) */
export function isCurrentWinner(globals: number[], targetIndex: number): boolean {
  let maxGlobal = -1;

  for (let i = 0; i < globals.length; i++) {
    if (i !== targetIndex && globals[i] > maxGlobal) {
      maxGlobal = globals[i];
    }
  }

  return isCloseEnoughToWin(globals[targetIndex], maxGlobal);
}
