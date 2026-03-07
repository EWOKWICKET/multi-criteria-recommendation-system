import { describe, it, expect } from 'vitest';
import { globalLeader, localLeader, globalAverage, localAverage, adaptiveStrategy } from '../../src/services/recommendations';

/**
 * Test scenario: Local Leader processes criteria in order of `criteriaNames`.
 * When a low-weight criterion appears first with a large local gap, Local Leader
 * wastes steps grinding through it (each step gives tiny global gain due to low weight).
 * Meanwhile, greedy algorithms (Adaptive Stage 2, improveUntilWinner) immediately
 * target the high-weight criterion for maximum efficiency.
 *
 * Setup:
 * - 2 criteria: C_low (weight ~0.1), C_high (weight ~0.9)
 * - criteriaNames = ["C_low", "C_high"] — low-weight FIRST
 * - C_low: A0 strongly dominates → target far from local max → many steps needed
 * - C_high: A0 slightly ahead → target close to leader → few steps needed
 * - Local Leader: grinds through C_low first → many wasted steps
 * - Other algorithms with greedy Phase 2: skip C_low, target C_high → fewer steps
 */

// Criteria matrix: C_low weight ~0.1, C_high weight ~0.9
// [[1, 1/9], [9, 1]] → priorities [0.1, 0.9]
const CRITERIA_MATRIX = [
  [1, 1 / 9],
  [9, 1],
];

const CRITERIA_NAMES = ['C_low', 'C_high'];

// C_low: A0 dominates heavily. Target (A2) is at minimum.
// LP ≈ [0.82, 0.09, 0.09]
const C_LOW_MATRIX = [
  [1, 9, 9],
  [1 / 9, 1, 1],
  [1 / 9, 1, 1],
];

// C_high: A0 slightly ahead, A1 equal to A0, target slightly behind.
// LP ≈ [0.40, 0.40, 0.20]
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
const TARGET_INDEX = 2; // A2 — the weakest alternative

function makeParams() {
  return {
    criteriaMatrix: CRITERIA_MATRIX,
    alternativeMatrices: ALT_MATRICES,
    criteriaNames: CRITERIA_NAMES,
    alternativeNames: ALT_NAMES,
    targetIndex: TARGET_INDEX,
  };
}

describe('algorithm comparison — Local Leader is not always best', () => {
  it('all algorithms achieve winner status', () => {
    const params = makeParams();

    const gl = globalLeader(params);
    const ll = localLeader(params);
    const ga = globalAverage(params);
    const la = localAverage(params);
    const as = adaptiveStrategy(params);

    expect(gl.isWinner).toBe(true);
    expect(ll.isWinner).toBe(true);
    expect(ga.isWinner).toBe(true);
    expect(la.isWinner).toBe(true);
    expect(as.isWinner).toBe(true);
  });

  it('Local Leader takes more steps than at least one other algorithm when low-weight criterion is listed first', () => {
    const params = makeParams();

    const ll = localLeader(params);
    const gl = globalLeader(params);
    const ga = globalAverage(params);
    const la = localAverage(params);
    const as = adaptiveStrategy(params);

    const otherSteps = [gl.totalSteps, ga.totalSteps, la.totalSteps, as.totalSteps];
    const minOther = Math.min(...otherSteps);

    // Local Leader should NOT be the most efficient here because it processes
    // C_low first (low weight, large gap to local max) wasting many steps
    expect(ll.totalSteps).toBeGreaterThan(minOther);
  });

  it('Local Leader spends steps on the low-weight criterion in Phase 1', () => {
    const params = makeParams();
    const ll = localLeader(params);

    const lowWeightSteps = ll.steps.filter((s) => s.criterion === 'C_low');
    const highWeightSteps = ll.steps.filter((s) => s.criterion === 'C_high');

    // Local Leader should spend more steps on C_low (pushing to local max)
    // than on C_high (which has much higher impact per step)
    expect(lowWeightSteps.length).toBeGreaterThan(highWeightSteps.length);
  });

  it('Adaptive Strategy takes fewer total steps than Local Leader in this scenario', () => {
    const params = makeParams();
    const as = adaptiveStrategy(params);
    const ll = localLeader(params);

    // Adaptive Strategy's Stage 1 also targets C_low (largest deficit below average),
    // but it only pushes to average (not to local max), then Stage 2 greedily
    // targets the most efficient steps — resulting in fewer total steps
    expect(as.totalSteps).toBeLessThan(ll.totalSteps);
  });

  it('criteria order affects Local Leader but not greedy algorithms', () => {
    // Reversed criteria order: C_high first
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

    // With C_high first, Local Leader targets the important criterion first
    // and may win via early stopping before wasting steps on C_low
    expect(llReversed.totalSteps).toBeLessThan(llOriginal.totalSteps);

    // Adaptive Strategy should be similar regardless of order
    // (its greedy Stage 2 always picks the most efficient step)
    const asOriginal = adaptiveStrategy(makeParams());
    const asReversed = adaptiveStrategy(reversedParams);

    // Greedy algorithms are less sensitive to criteria order
    const asDiff = Math.abs(asOriginal.totalSteps - asReversed.totalSteps);
    const llDiff = Math.abs(llOriginal.totalSteps - llReversed.totalSteps);

    expect(llDiff).toBeGreaterThan(asDiff);
  });
});
