import { describe, it, expect } from 'vitest';
import { globalAverage } from '../../src/services/recommendations';

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

const CRITERIA_NAMES = ['Price', 'Quality', 'Delivery'];
const ALT_NAMES = ['A1', 'A2', 'A3'];

const makeParams = (targetIndex: number) => ({
  criteriaMatrix: CRITERIA_MATRIX,
  alternativeMatrices: ALT_MATRICES,
  criteriaNames: CRITERIA_NAMES,
  alternativeNames: ALT_NAMES,
  targetIndex,
});

describe('globalAverage (Algorithm 3)', () => {
  it('generates steps to improve a weak alternative toward the median', () => {
    const result = globalAverage(makeParams(2));

    expect(result.totalSteps).toBeGreaterThan(0);
    expect(result.steps).toHaveLength(result.totalSteps);
    expect(result.newGlobalPriority).toBeGreaterThan(result.originalGlobalPriority);
  });

  it('steps are sequentially numbered and have valid fields', () => {
    const result = globalAverage(makeParams(2));

    for (let i = 0; i < result.steps.length; i++) {
      const step = result.steps[i];
      expect(step.stepNumber).toBe(i + 1);
      expect(CRITERIA_NAMES).toContain(step.criterion);
      expect(ALT_NAMES).toContain(step.comparedTo);
      expect(step.newValue).toBeGreaterThan(step.oldValue);
    }
  });

  it('improves global priority for a middle-ranked alternative', () => {
    const result = globalAverage(makeParams(1));

    expect(result.newGlobalPriority).toBeGreaterThanOrEqual(result.originalGlobalPriority);
  });

  it('new global priority matches the last step', () => {
    const result = globalAverage(makeParams(2));

    if (result.steps.length > 0) {
      expect(result.newGlobalPriority).toBeCloseTo(result.steps[result.steps.length - 1].globalPriorityAfterStep);
    }
  });

  it('returns modified matrices that differ from originals', () => {
    const result = globalAverage(makeParams(2));

    let anyChanged = false;
    for (const name of CRITERIA_NAMES) {
      const orig = ALT_MATRICES[name as keyof typeof ALT_MATRICES];
      const mod = result.modifiedMatrices[name];

      for (let i = 0; i < orig.length; i++) {
        for (let j = 0; j < orig[i].length; j++) {
          if (Math.abs(orig[i][j] - mod[i][j]) > 1e-9) {
            anyChanged = true;
          }
        }
      }
    }

    expect(anyChanged).toBe(true);
  });

  it('skips phase 1 for the median but still improves in phase 2', () => {
    // With 3 alternatives sorted by global priority, index 1 (A2) is the median
    const result = globalAverage(makeParams(1));

    // Phase 1 has no work (median matches itself), but phase 2 keeps improving toward winner
    expect(result.totalSteps).toBeGreaterThan(0);
    expect(result.newGlobalPriority).toBeGreaterThan(result.originalGlobalPriority);
  });
});
