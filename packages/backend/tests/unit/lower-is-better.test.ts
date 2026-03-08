import { describe, it, expect } from 'vitest';
import { globalLeader, localLeader, globalAverage, localAverage, adaptiveStrategy } from '../../src/services/recommendations';

/**
 * Regression test for "lower is better" criteria with non-Saaty-aligned pairwise values.
 *
 * Scenario (from real user bug):
 * - 3 alternatives: gb, len, or
 * - price criterion: lower is better → values [45000, 42000, 39000]
 * - memory + ram criteria: all equal → values [1, 1, 1]
 *
 * The pairwise matrix for "lower is better" is: matrix[i][j] = values[j] / values[i]
 * For price: gb vs or = 39000/45000 = 0.8667 — NOT on the Saaty scale.
 *
 * The algorithm must handle stepping to the pairwise cap when the next
 * Saaty scale value would exceed it.
 */

/** Build pairwise matrix the same way the frontend does for "lower is better" */
function lowerIsBetterMatrix(values: number[]): number[][] {
  const n = values.length;
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        matrix[i][j] = values[j] / values[i];
      }
    }
  }

  return matrix;
}

function equalMatrix(n: number): number[][] {
  return Array.from({ length: n }, () => Array(n).fill(1));
}

// 3 criteria, equal weights
const CRITERIA_MATRIX = equalMatrix(3);

const PRICE_VALUES = [45000, 42000, 39000]; // gb=45000, len=42000, or=39000

const ALT_MATRICES = {
  price: lowerIsBetterMatrix(PRICE_VALUES),
  memory: equalMatrix(3),
  ram: equalMatrix(3),
};

const CRITERIA_NAMES = ['price', 'memory', 'ram'];
const ALT_NAMES = ['gb', 'len', 'or'];

const makeParams = (targetIndex: number) => ({
  criteriaMatrix: CRITERIA_MATRIX,
  alternativeMatrices: ALT_MATRICES,
  criteriaNames: CRITERIA_NAMES,
  alternativeNames: ALT_NAMES,
  targetIndex,
});

describe('lower-is-better with non-Saaty-aligned values', () => {
  const algorithms = [
    { name: 'globalLeader', fn: globalLeader },
    { name: 'localLeader', fn: localLeader },
    { name: 'globalAverage', fn: globalAverage },
    { name: 'localAverage', fn: localAverage },
    { name: 'adaptiveStrategy', fn: adaptiveStrategy },
  ];

  const aggressiveAlgorithms = algorithms.filter(({ name }) =>
    ['globalLeader', 'localLeader', 'adaptiveStrategy'].includes(name),
  );

  const conservativeAlgorithms = algorithms.filter(({ name }) =>
    ['globalAverage', 'localAverage'].includes(name),
  );

  for (const { name, fn } of aggressiveAlgorithms) {
    it(`${name}: improves gb (highest price) to become winner`, () => {
      const result = fn(makeParams(0));

      expect(result.totalSteps).toBeGreaterThan(0);
      expect(result.newGlobalPriority).toBeGreaterThan(result.originalGlobalPriority);
      expect(result.isWinner).toBe(true);
    });
  }

  for (const { name, fn } of conservativeAlgorithms) {
    it(`${name}: improves gb's priority (may not become winner)`, () => {
      const result = fn(makeParams(0));

      expect(result.totalSteps).toBeGreaterThan(0);
      expect(result.newGlobalPriority).toBeGreaterThan(result.originalGlobalPriority);
    });
  }

  it('localLeader: modified price matrix has improved pairwise values for gb', () => {
    const result = localLeader(makeParams(0));
    const modifiedPrice = result.modifiedMatrices.price;

    // gb's pairwise values against others should have increased (lower price = higher pairwise)
    const originalPrice = ALT_MATRICES.price;

    for (let j = 1; j < ALT_NAMES.length; j++) {
      expect(modifiedPrice[0][j]).toBeGreaterThanOrEqual(originalPrice[0][j]);
    }
  });

  it('targeting the already-best (or, lowest price) returns 0 steps', () => {
    const result = globalLeader(makeParams(2)); // or = index 2, already best price

    expect(result.totalSteps).toBe(0);
    expect(result.isWinner).toBe(true);
  });
});
