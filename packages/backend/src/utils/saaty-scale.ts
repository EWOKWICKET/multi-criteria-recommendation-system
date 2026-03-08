import type { PairwiseMatrix } from '../types/index.js';

export enum StepDirection {
  Up = 'up',
  Down = 'down',
}

/**
 * The discrete Saaty scale: {1/9, 1/8, ..., 1/2, 1, 2, ..., 8, 9}
 * Index 8 = 1 (neutral). Left = weaker, right = stronger.
 */
export const SAATY_SCALE = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Find the index in SAATY_SCALE closest to the given value.
 * Uses binary search for efficiency.
 */
export function findClosestSaatyIndex(value: number): number {
  if (value <= SAATY_SCALE[0]) return 0;
  if (value >= SAATY_SCALE[SAATY_SCALE.length - 1]) return SAATY_SCALE.length - 1;

  let lo = 0;
  let hi = SAATY_SCALE.length - 1;

  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (SAATY_SCALE[mid] <= value) lo = mid;
    else hi = mid;
  }

  return Math.abs(SAATY_SCALE[lo] - value) <= Math.abs(SAATY_SCALE[hi] - value) ? lo : hi;
}

/** Move one position step up or down on the Saaty scale. Clamps at boundaries.
 *  If the current value is between scale points, snap to the nearest one first. */
export function getNextSaatyValue(current: number, direction: StepDirection): number {
  const index = findClosestSaatyIndex(current);
  const snapped = SAATY_SCALE[index];

  if (direction === StepDirection.Up) {
    if (current < snapped - 1e-9) return snapped;

    return index < SAATY_SCALE.length - 1 ? SAATY_SCALE[index + 1] : snapped;
  }

  if (current > snapped + 1e-9) return snapped;

  return index > 0 ? SAATY_SCALE[index - 1] : snapped;
}

type ApplySaatyStepParams = {
  matrix: PairwiseMatrix;
  row: number;
  col: number;
  direction: StepDirection;
};

/**
 * Apply a single +1 position step to a PCM at position [row][col].
 * Maintains reciprocal: matrix[col][row] = 1 / matrix[row][col].
 * Returns a new matrix (does not mutate the input).
 */
export function applySaatyStep({ matrix, row, col, direction }: ApplySaatyStepParams): PairwiseMatrix {
  const result = matrix.map((r) => [...r]);
  const newValue = getNextSaatyValue(result[row][col], direction);

  result[row][col] = newValue;
  result[col][row] = 1 / newValue;

  return result;
}
