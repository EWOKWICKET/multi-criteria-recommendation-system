import { describe, it, expect } from 'vitest';
import {
  normalizeMatrix,
  calculatePriorityVector,
  calculateConsistencyRatio,
  calculateGlobalPriorities,
  solveAHP,
} from '../src/services/baseline/index.js';

// 3x3 criteria matrix from Saaty's classic example
const CRITERIA_MATRIX = [
  [1, 3, 5],
  [1 / 3, 1, 3],
  [1 / 5, 1 / 3, 1],
];

const ALT_MATRICES = {
  Price: [
    [1, 3, 5],
    [1 / 3, 1, 3],
    [1 / 5, 1 / 3, 1],
  ],
  Quality: [
    [1, 1 / 2, 2],
    [2, 1, 3],
    [1 / 2, 1 / 3, 1],
  ],
  Delivery: [
    [1, 2, 1 / 2],
    [1 / 2, 1, 1 / 3],
    [2, 3, 1],
  ],
};

describe('normalizeMatrix', () => {
  it('normalizes columns to sum to 1', () => {
    const result = normalizeMatrix(CRITERIA_MATRIX);

    for (let j = 0; j < result[0].length; j++) {
      const colSum = result.reduce((sum, row) => sum + row[j], 0);
      expect(colSum).toBeCloseTo(1, 10);
    }
  });

  it('preserves matrix dimensions', () => {
    const result = normalizeMatrix(CRITERIA_MATRIX);
    expect(result).toHaveLength(3);
    expect(result[0]).toHaveLength(3);
  });
});

describe('calculatePriorityVector', () => {
  it('returns a vector that sums to 1', () => {
    const pv = calculatePriorityVector(CRITERIA_MATRIX);
    const sum = pv.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it('returns correct relative ordering (first > second > third)', () => {
    const pv = calculatePriorityVector(CRITERIA_MATRIX);
    expect(pv[0]).toBeGreaterThan(pv[1]);
    expect(pv[1]).toBeGreaterThan(pv[2]);
  });

  it('returns [0.5, 0.5] for a 2x2 identity', () => {
    const pv = calculatePriorityVector([
      [1, 1],
      [1, 1],
    ]);
    expect(pv[0]).toBeCloseTo(0.5);
    expect(pv[1]).toBeCloseTo(0.5);
  });
});

describe('calculateConsistencyRatio', () => {
  it('returns 0 for a 2x2 matrix', () => {
    const matrix = [
      [1, 3],
      [1 / 3, 1],
    ];
    const pv = calculatePriorityVector(matrix);
    expect(calculateConsistencyRatio(matrix, pv)).toBe(0);
  });

  it('returns CR < 0.1 for a consistent 3x3 matrix', () => {
    const pv = calculatePriorityVector(CRITERIA_MATRIX);
    const cr = calculateConsistencyRatio(CRITERIA_MATRIX, pv);
    expect(cr).toBeLessThan(0.1);
    expect(cr).toBeGreaterThanOrEqual(0);
  });

  it('returns high CR for an inconsistent matrix', () => {
    const inconsistent = [
      [1, 9, 1 / 3],
      [1 / 9, 1, 7],
      [3, 1 / 7, 1],
    ];
    const pv = calculatePriorityVector(inconsistent);
    const cr = calculateConsistencyRatio(inconsistent, pv);
    expect(cr).toBeGreaterThan(0.1);
  });
});

describe('calculateGlobalPriorities', () => {
  it('returns values that sum to ~1', () => {
    const weights = [0.6, 0.3, 0.1];
    const localPriorities = {
      A: [0.5, 0.3, 0.2],
      B: [0.2, 0.5, 0.3],
      C: [0.3, 0.2, 0.5],
    };
    const globals = calculateGlobalPriorities(weights, localPriorities, ['A', 'B', 'C']);
    const sum = globals.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it('computes correct weighted sum', () => {
    const weights = [0.5, 0.5];
    const localPriorities = {
      X: [0.8, 0.2],
      Y: [0.4, 0.6],
    };
    const globals = calculateGlobalPriorities(weights, localPriorities, ['X', 'Y']);
    // alt0: 0.5*0.8 + 0.5*0.4 = 0.6
    // alt1: 0.5*0.2 + 0.5*0.6 = 0.4
    expect(globals[0]).toBeCloseTo(0.6);
    expect(globals[1]).toBeCloseTo(0.4);
  });
});

describe('solveAHP', () => {
  const criteriaNames = ['Price', 'Quality', 'Delivery'];
  const alternativeNames = ['A1', 'A2', 'A3'];

  it('returns a complete AhpResult', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });

    expect(result.criteriaWeights).toHaveLength(3);
    expect(result.globalPriorities).toHaveLength(3);
    expect(result.winner).toBeDefined();
    expect(typeof result.isConsistent).toBe('boolean');
  });

  it('criteria weights sum to 1', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });
    const sum = result.criteriaWeights.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it('global priorities are sorted descending', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });
    for (let i = 1; i < result.globalPriorities.length; i++) {
      expect(result.globalPriorities[i - 1].priority).toBeGreaterThanOrEqual(result.globalPriorities[i].priority);
    }
  });

  it('winner is the first in sorted global priorities', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });
    expect(result.winner).toBe(result.globalPriorities[0].name);
  });

  it('has consistency ratios for criteria and each alternative matrix', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });
    expect(result.consistencyRatios).toHaveProperty('criteria');
    for (const name of criteriaNames) {
      expect(result.consistencyRatios).toHaveProperty(name);
    }
  });

  it('marks consistent matrices as consistent', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });
    expect(result.isConsistent).toBe(true);
  });

  it('local priorities per criterion sum to ~1', () => {
    const result = solveAHP({ criteriaMatrix: CRITERIA_MATRIX, alternativeMatrices: ALT_MATRICES, criteriaNames, alternativeNames });
    for (const name of criteriaNames) {
      const sum = result.localPriorities[name].reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1, 5);
    }
  });
});
