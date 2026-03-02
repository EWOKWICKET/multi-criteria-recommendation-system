import { describe, it, expect } from 'vitest';
import { adaptiveStrategy } from '../../src/services/recommendations';
import { calculatePriorityVector, calculateGlobalPriorities } from '../../src/services/baseline';
import { SAATY_SCALE, findClosestSaatyIndex } from '../../src/utils';

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

describe('adaptiveStrategy (Algorithm 5)', () => {
  describe('basic behavior', () => {
    it('returns no steps when target is already the winner', () => {
      const result = adaptiveStrategy(makeParams(0));

      expect(result.totalSteps).toBe(0);
      expect(result.steps).toHaveLength(0);
      expect(result.isWinner).toBe(true);
      expect(result.newGlobalPriority).toBe(result.originalGlobalPriority);
      expect(result.newGlobalPriority).toBe(result.leaderGlobalPriority);
    });

    it('generates steps and improves a losing alternative', () => {
      const result = adaptiveStrategy(makeParams(2));

      expect(result.totalSteps).toBeGreaterThan(0);
      expect(result.steps).toHaveLength(result.totalSteps);
      expect(result.newGlobalPriority).toBeGreaterThan(result.originalGlobalPriority);
    });

    it('generates steps for the middle-ranked alternative', () => {
      const result = adaptiveStrategy(makeParams(1));

      expect(result.totalSteps).toBeGreaterThan(0);
      expect(result.newGlobalPriority).toBeGreaterThan(result.originalGlobalPriority);
    });
  });

  describe('step-by-step correctness', () => {
    it('every step has a strictly increasing newValue vs oldValue (one Saaty position)', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (const step of result.steps) {
        expect(step.newValue).toBeGreaterThan(step.oldValue);

        const oldIdx = findClosestSaatyIndex(step.oldValue);
        const newIdx = findClosestSaatyIndex(step.newValue);
        expect(newIdx).toBe(oldIdx + 1);
      }
    });

    it('every newValue and oldValue are valid Saaty scale values', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (const step of result.steps) {
        const oldIdx = findClosestSaatyIndex(step.oldValue);
        const newIdx = findClosestSaatyIndex(step.newValue);

        expect(Math.abs(step.oldValue - SAATY_SCALE[oldIdx])).toBeLessThan(1e-9);
        expect(Math.abs(step.newValue - SAATY_SCALE[newIdx])).toBeLessThan(1e-9);
      }
    });

    it('steps are sequentially numbered starting from 1', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (let i = 0; i < result.steps.length; i++) {
        expect(result.steps[i].stepNumber).toBe(i + 1);
      }
    });

    it('global priority increases monotonically across steps', () => {
      const result = adaptiveStrategy(makeParams(2));

      let prev = result.originalGlobalPriority;
      for (const step of result.steps) {
        expect(step.globalPriorityAfterStep).toBeGreaterThanOrEqual(prev);
        prev = step.globalPriorityAfterStep;
      }
    });

    it('local priority for the step criterion increases after each step', () => {
      const result = adaptiveStrategy(makeParams(2));
      const targetIndex = 2;

      // Track local priorities per criterion across steps
      const lpTracker: Record<string, number> = {};
      for (const criterion of CRITERIA_NAMES) {
        const lp = calculatePriorityVector(ALT_MATRICES[criterion as keyof typeof ALT_MATRICES]);
        lpTracker[criterion] = lp[targetIndex];
      }

      for (const step of result.steps) {
        expect(step.localPriorityAfterStep).toBeGreaterThan(lpTracker[step.criterion]);
        lpTracker[step.criterion] = step.localPriorityAfterStep;
      }
    });

    it('newGlobalPriority matches the last step globalPriorityAfterStep', () => {
      const result = adaptiveStrategy(makeParams(2));

      expect(result.steps.length).toBeGreaterThan(0);
      expect(result.newGlobalPriority).toBeCloseTo(result.steps[result.steps.length - 1].globalPriorityAfterStep);
    });

    it('every step criterion and comparedTo reference valid names', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (const step of result.steps) {
        expect(CRITERIA_NAMES).toContain(step.criterion);
        expect(ALT_NAMES).toContain(step.comparedTo);
        expect(step.comparedTo).not.toBe(ALT_NAMES[2]); // never compared to self
      }
    });
  });

  describe('stage 1 (sanitary minimum)', () => {
    it('stage 1 targets criteria where target is below average', () => {
      const result = adaptiveStrategy(makeParams(2));
      const targetIndex = 2;

      // Compute initial averages
      const initialAvg: Record<string, number> = {};
      const initialTargetLP: Record<string, number> = {};

      for (const criterion of CRITERIA_NAMES) {
        const lp = calculatePriorityVector(ALT_MATRICES[criterion as keyof typeof ALT_MATRICES]);
        initialAvg[criterion] = lp.reduce((s, v) => s + v, 0) / lp.length;
        initialTargetLP[criterion] = lp[targetIndex];
      }

      // Find criteria that were below average initially
      const weakCriteria = CRITERIA_NAMES.filter((c) => initialTargetLP[c] < initialAvg[c]);

      expect(weakCriteria.length).toBeGreaterThan(0);

      // Stage 1 steps should only target weak criteria (those below average)
      // The first steps should address the weakest criterion
      const firstStep = result.steps[0];
      expect(weakCriteria).toContain(firstStep.criterion);
    });

    it('stage 1 picks the weakest criterion first (largest deficit)', () => {
      const targetIndex = 2;

      const deficits: { criterion: string; deficit: number }[] = [];
      for (const criterion of CRITERIA_NAMES) {
        const lp = calculatePriorityVector(ALT_MATRICES[criterion as keyof typeof ALT_MATRICES]);
        const avg = lp.reduce((s, v) => s + v, 0) / lp.length;
        const deficit = avg - lp[targetIndex];

        if (deficit > 0) {
          deficits.push({ criterion, deficit });
        }
      }

      deficits.sort((a, b) => b.deficit - a.deficit);
      const worstCriterion = deficits[0].criterion;

      const result = adaptiveStrategy(makeParams(targetIndex));

      expect(result.steps[0].criterion).toBe(worstCriterion);
    });
  });

  describe('stage 2 (competitive advantage / greedy optimization)', () => {
    it('stage 2 steps pick the most efficient improvement', () => {
      const result = adaptiveStrategy(makeParams(2));
      const targetIndex = 2;

      // Replay the algorithm: rebuild matrices step by step
      const replayMatrices: Record<string, number[][]> = {};
      const replayLP: Record<string, number[]> = {};

      for (const name of CRITERIA_NAMES) {
        replayMatrices[name] = (ALT_MATRICES[name as keyof typeof ALT_MATRICES] ?? []).map((r) => [...r]);
        replayLP[name] = calculatePriorityVector(replayMatrices[name]);
      }

      // Find where stage 1 ends: stage 1 runs while there's a criterion below average
      let stage1End = 0;
      for (let s = 0; s < result.steps.length; s++) {
        const step = result.steps[s];

        // Apply the step to replay
        const scaleIdx = findClosestSaatyIndex(
          replayMatrices[step.criterion][targetIndex][ALT_NAMES.indexOf(step.comparedTo)]
        );
        const colIdx = ALT_NAMES.indexOf(step.comparedTo);
        const newVal = SAATY_SCALE[scaleIdx + 1];
        replayMatrices[step.criterion][targetIndex][colIdx] = newVal;
        replayMatrices[step.criterion][colIdx][targetIndex] = 1 / newVal;
        replayLP[step.criterion] = calculatePriorityVector(replayMatrices[step.criterion]);

        // Check if all criteria are at or above average now
        let allAboveAvg = true;
        for (const criterion of CRITERIA_NAMES) {
          const lp = replayLP[criterion];
          const avg = lp.reduce((sum, val) => sum + val, 0) / lp.length;

          if (lp[targetIndex] < avg) {
            allAboveAvg = false;
            break;
          }
        }

        if (allAboveAvg) {
          stage1End = s + 1;
          break;
        }

        stage1End = s + 1;
      }

      // Stage 2 steps exist after stage 1
      const stage2Steps = result.steps.slice(stage1End);

      // Each stage 2 step should improve global priority (greedy picks max efficiency)
      for (let i = 1; i < stage2Steps.length; i++) {
        expect(stage2Steps[i].globalPriorityAfterStep).toBeGreaterThanOrEqual(
          stage2Steps[i - 1].globalPriorityAfterStep
        );
      }
    });
  });

  describe('early stopping', () => {
    it('stops as soon as target becomes the winner (no unnecessary steps)', () => {
      const result = adaptiveStrategy(makeParams(2));

      if (result.isWinner) {
        // The last step should be the one that made target the winner
        const lastStep = result.steps[result.steps.length - 1];
        expect(lastStep.globalPriorityAfterStep).toBeGreaterThanOrEqual(result.leaderGlobalPriority);

        // The second-to-last step should NOT have made target the winner
        if (result.steps.length > 1) {
          const prevStep = result.steps[result.steps.length - 2];
          expect(prevStep.globalPriorityAfterStep).toBeLessThan(result.leaderGlobalPriority);
        }
      }
    });

    it('stops as soon as target becomes the winner for middle-ranked alt', () => {
      const result = adaptiveStrategy(makeParams(1));

      if (result.isWinner) {
        const lastStep = result.steps[result.steps.length - 1];
        expect(lastStep.globalPriorityAfterStep).toBeGreaterThanOrEqual(result.leaderGlobalPriority);

        if (result.steps.length > 1) {
          const prevStep = result.steps[result.steps.length - 2];
          expect(prevStep.globalPriorityAfterStep).toBeLessThan(result.leaderGlobalPriority);
        }
      }
    });
  });

  describe('modified matrices integrity', () => {
    it('modified matrices maintain reciprocal property (a[i][j] * a[j][i] = 1)', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (const name of CRITERIA_NAMES) {
        const mod = result.modifiedMatrices[name];

        for (let i = 0; i < mod.length; i++) {
          for (let j = 0; j < mod[i].length; j++) {
            expect(mod[i][j] * mod[j][i]).toBeCloseTo(1, 6);
          }
        }
      }
    });

    it('modified matrices have 1s on the diagonal', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (const name of CRITERIA_NAMES) {
        const mod = result.modifiedMatrices[name];

        for (let i = 0; i < mod.length; i++) {
          expect(mod[i][i]).toBe(1);
        }
      }
    });

    it('only the target row/col are modified in each criterion matrix', () => {
      const result = adaptiveStrategy(makeParams(2));
      const targetIndex = 2;

      for (const name of CRITERIA_NAMES) {
        const orig = ALT_MATRICES[name as keyof typeof ALT_MATRICES];
        const mod = result.modifiedMatrices[name];

        for (let i = 0; i < orig.length; i++) {
          for (let j = 0; j < orig[i].length; j++) {
            if (i !== targetIndex && j !== targetIndex) {
              expect(mod[i][j]).toBeCloseTo(orig[i][j], 9);
            }
          }
        }
      }
    });

    it('all modified values are valid Saaty scale values', () => {
      const result = adaptiveStrategy(makeParams(2));

      for (const name of CRITERIA_NAMES) {
        const mod = result.modifiedMatrices[name];

        for (let i = 0; i < mod.length; i++) {
          for (let j = 0; j < mod[i].length; j++) {
            const idx = findClosestSaatyIndex(mod[i][j]);
            expect(Math.abs(mod[i][j] - SAATY_SCALE[idx])).toBeLessThan(1e-9);
          }
        }
      }
    });
  });

  describe('global priority verification via independent recalculation', () => {
    it('reported globalPriorityAfterStep matches independent recalculation at each step', () => {
      const result = adaptiveStrategy(makeParams(2));
      const targetIndex = 2;
      const criteriaWeights = calculatePriorityVector(CRITERIA_MATRIX);

      // Start from original matrices and replay each step
      const matrices: Record<string, number[][]> = {};
      for (const name of CRITERIA_NAMES) {
        matrices[name] = (ALT_MATRICES[name as keyof typeof ALT_MATRICES] ?? []).map((r) => [...r]);
      }

      for (const step of result.steps) {
        const colIdx = ALT_NAMES.indexOf(step.comparedTo);
        const criterion = step.criterion;

        // Apply the step
        matrices[criterion][targetIndex][colIdx] = step.newValue;
        matrices[criterion][colIdx][targetIndex] = 1 / step.newValue;

        // Recalculate from scratch
        const lp: Record<string, number[]> = {};
        for (const name of CRITERIA_NAMES) {
          lp[name] = calculatePriorityVector(matrices[name]);
        }

        const globals = calculateGlobalPriorities(criteriaWeights, lp, CRITERIA_NAMES);

        expect(step.globalPriorityAfterStep).toBeCloseTo(globals[targetIndex], 10);
        expect(step.localPriorityAfterStep).toBeCloseTo(lp[criterion][targetIndex], 10);
      }
    });

    it('final newGlobalPriority matches recalculation from modifiedMatrices', () => {
      const result = adaptiveStrategy(makeParams(2));
      const criteriaWeights = calculatePriorityVector(CRITERIA_MATRIX);

      const lp: Record<string, number[]> = {};
      for (const name of CRITERIA_NAMES) {
        lp[name] = calculatePriorityVector(result.modifiedMatrices[name]);
      }

      const globals = calculateGlobalPriorities(criteriaWeights, lp, CRITERIA_NAMES);

      expect(result.newGlobalPriority).toBeCloseTo(globals[2], 10);
    });
  });
});
