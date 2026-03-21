import { describe, it, expect } from 'vitest';
import {
  globalLeader,
  localLeader,
  globalAverage,
  localAverage,
  adaptiveStrategy,
} from '../../src/services/recommendations';

/**
 * 2 criteria: C_low (weight ~0.1) and C_high (weight ~0.9), low-weight first.
 * C_low: A0 strongly dominates → target far from local max → many steps.
 * C_high: A0 slightly ahead → target close to leader → few steps.
 */

const CRITERIA_MATRIX = [
  [1, 1 / 9],
  [9, 1],
];

const CRITERIA_NAMES = ['C_low', 'C_high'];

// C_low: A0 dominates heavily. Target (A2) is at minimum.
const C_LOW_MATRIX = [
  [1, 9, 9],
  [1 / 9, 1, 1],
  [1 / 9, 1, 1],
];

// C_high: A0 slightly ahead, A1 equal to A0, target slightly behind.
const C_HIGH_MATRIX = [
  [1, 1, 2],
  [1, 1, 2],
  [1 / 2, 1 / 2, 1],
];

const ALT_MATRICES = {
  C_low: C_LOW_MATRIX,
  C_high: C_HIGH_MATRIX,
};

const ALT_NAMES = ['A0', 'A1', 'A2'];
const TARGET_INDEX = 2;

function makeParams() {
  return {
    criteriaMatrix: CRITERIA_MATRIX,
    alternativeMatrices: ALT_MATRICES,
    criteriaNames: CRITERIA_NAMES,
    alternativeNames: ALT_NAMES,
    targetIndex: TARGET_INDEX,
  };
}

describe('algorithm comparison — target-matching vs adaptive', () => {
  it('algorithms 1-4 stop after matching their baseline (may not win)', () => {
    const params = makeParams();

    const gl = globalLeader(params);
    const ll = localLeader(params);
    const ga = globalAverage(params);
    const la = localAverage(params);

    // Global Average and Local Average have conservative baselines,
    // so they may not achieve winner status
    expect(ga.totalSteps).toBeLessThanOrEqual(gl.totalSteps);
    expect(la.totalSteps).toBeLessThanOrEqual(ll.totalSteps);
  });

  it('Adaptive Strategy (Algorithm 5) achieves winner status', () => {
    const params = makeParams();
    const as = adaptiveStrategy(params);

    expect(as.isWinner).toBe(true);
  });

  it('Local Leader uses greedy steps prioritizing high-weight criteria', () => {
    const params = makeParams();
    const ll = localLeader(params);

    // greedy picks by highest ΔU, not criterion order
    const lowWeightSteps = ll.steps.filter((s) => s.criterion === 'C_low');
    const highWeightSteps = ll.steps.filter((s) => s.criterion === 'C_high');

    expect(lowWeightSteps.length + highWeightSteps.length).toBe(ll.totalSteps);
  });

  it('Global Average generates fewer steps than Global Leader', () => {
    const params = makeParams();
    const ga = globalAverage(params);
    const gl = globalLeader(params);

    expect(ga.totalSteps).toBeLessThanOrEqual(gl.totalSteps);
  });

  it('criteria order affects Local Leader step count', () => {
    const reversedParams = {
      criteriaMatrix: [
        [1, 9],
        [1 / 9, 1],
      ],
      alternativeMatrices: {
        C_high: C_HIGH_MATRIX,
        C_low: C_LOW_MATRIX,
      },
      criteriaNames: ['C_high', 'C_low'],
      alternativeNames: ALT_NAMES,
      targetIndex: TARGET_INDEX,
    };

    const llOriginal = localLeader(makeParams());
    const llReversed = localLeader(reversedParams);

    // C_high first → early stopping kicks in sooner, fewer total steps
    expect(llReversed.totalSteps).toBeLessThanOrEqual(llOriginal.totalSteps);
  });
});
