/** Tolerance for considering the target "close enough" to be the winner */
const WINNER_EPSILON = 1e-4;

/** Check if target beats the original leader (or within epsilon) */
export function isCurrentWinner(globals: number[], targetIndex: number, leaderIndex: number): boolean {
  return globals[targetIndex] >= globals[leaderIndex] - WINNER_EPSILON;
}
