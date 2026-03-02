import { describe, it, expect } from 'vitest';
import { localLeader } from '../../src/services/recommendations';

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

describe('localLeader (Algorithm 2)', () => {
  it('still generates steps for the global winner since it is not best in every criterion', () => {
    const result = localLeader(makeParams(0));

    // A1 is the global winner but not the local leader in Quality (A2) or Delivery (A3)
    expect(result.totalSteps).toBeGreaterThan(0);
    expect(result.newGlobalPriority).toBeGreaterThanOrEqual(result.originalGlobalPriority);
  });

  it('generates steps to improve a losing alternative', () => {
    const result = localLeader(makeParams(2));

    expect(result.totalSteps).toBeGreaterThan(0);
    expect(result.steps).toHaveLength(result.totalSteps);
    expect(result.originalGlobalPriority).toBeLessThan(result.leaderGlobalPriority);
  });

  it('steps are sequentially numbered and have valid fields', () => {
    const result = localLeader(makeParams(2));

    for (let i = 0; i < result.steps.length; i++) {
      const step = result.steps[i];
      expect(step.stepNumber).toBe(i + 1);
      expect(CRITERIA_NAMES).toContain(step.criterion);
      expect(ALT_NAMES).toContain(step.comparedTo);
      expect(step.newValue).toBeGreaterThan(step.oldValue);
    }
  });

  it('new global priority matches the last step', () => {
    const result = localLeader(makeParams(2));

    if (result.steps.length > 0) {
      expect(result.newGlobalPriority).toBeCloseTo(result.steps[result.steps.length - 1].globalPriorityAfterStep);
    }
  });

  it('returns modified matrices that differ from originals', () => {
    const result = localLeader(makeParams(2));

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

  it('may produce different results than global-leader for the same input', () => {
    const result = localLeader(makeParams(1));

    expect(result.newGlobalPriority).toBeGreaterThanOrEqual(result.originalGlobalPriority);
  });
});
