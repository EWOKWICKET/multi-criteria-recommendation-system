import type { PairwiseMatrix } from '../../types/index.js';
import type { PositionStep } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';

export type StepContext = {
  criteriaNames: string[];
  alternativeNames: string[];
  localPriorities: Record<string, number[]>;
  currentMatrices: Record<string, PairwiseMatrix>;
  criteriaWeights: number[];
  targetIndex: number;
  steps: PositionStep[];
  /** Per-criterion LP cap — skip candidates that would overshoot this threshold */
  lpCap?: Record<string, number>;
  /** Per-criterion pairwise cap: pairwiseCap[criterion][j] = max allowed value for matrix[target][j] */
  pairwiseCap?: Record<string, number[]>;
};

type StepResult = {
  applied: boolean;
  newGlobals: number[];
};

/**
 * Compute pairwise caps: for each criterion, the target's pairwise values
 * cannot exceed the local leader's pairwise values on that criterion.
 */
export function computePairwiseCap(
  localPriorities: Record<string, number[]>,
  matrices: Record<string, PairwiseMatrix>,
  criteriaNames: string[],
): Record<string, number[]> {
  const cap: Record<string, number[]> = {};

  for (const c of criteriaNames) {
    const lp = localPriorities[c] ?? [];
    let leaderIdx = 0;

    for (let i = 1; i < lp.length; i++) {
      if (lp[i] > lp[leaderIdx]) leaderIdx = i;
    }

    cap[c] = [...(matrices[c]?.[leaderIdx] ?? [])];
  }

  return cap;
}

type Candidate = {
  criterion: string;
  col: number;
  gain: number;
};

function simulateCandidates(ctx: StepContext, isEligible: (criterion: string) => boolean): Candidate[] {
  const {
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    lpCap,
    pairwiseCap,
  } = ctx;

  const currentGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const currentGlobal = currentGlobals[targetIndex];

  const candidates: Candidate[] = [];

  for (const criterion of criteriaNames) {
    if (!isEligible(criterion)) continue;

    for (let j = 0; j < alternativeNames.length; j++) {
      if (j === targetIndex) continue;

      const currentVal = currentMatrices[criterion][targetIndex][j];
      const scaleIdx = findClosestSaatyIndex(currentVal);

      if (scaleIdx >= SAATY_SCALE.length - 1) continue;

      // Skip if the next pairwise value would exceed the cap for this criterion + column
      const nextPairwise = SAATY_SCALE[scaleIdx + 1];
      const criterionCap = pairwiseCap?.[criterion];

      if (criterionCap && nextPairwise > criterionCap[j] + 1e-9) continue;

      const trialMatrix = currentMatrices[criterion].map((r) => [...r]);
      const stepped = applySaatyStep({
        matrix: trialMatrix,
        row: targetIndex,
        col: j,
        direction: StepDirection.Up,
      });

      const trialLP = calculatePriorityVector(stepped);

      // Skip if this step would overshoot the LP cap for this criterion
      if (lpCap && lpCap[criterion] !== undefined && trialLP[targetIndex] > lpCap[criterion]) {
        continue;
      }

      const trialLocalPriorities = { ...localPriorities, [criterion]: trialLP };
      const trialGlobals = calculateGlobalPriorities(criteriaWeights, trialLocalPriorities, criteriaNames);
      const gain = trialGlobals[targetIndex] - currentGlobal;

      candidates.push({ criterion, col: j, gain });
    }
  }

  return candidates;
}

function applyCandidate(candidate: Candidate, ctx: StepContext): number[] {
  const { localPriorities, currentMatrices, criteriaWeights, criteriaNames, alternativeNames, targetIndex, steps } =
    ctx;

  const { criterion, col } = candidate;
  const oldValue = currentMatrices[criterion][targetIndex][col];

  currentMatrices[criterion] = applySaatyStep({
    matrix: currentMatrices[criterion],
    row: targetIndex,
    col,
    direction: StepDirection.Up,
  });

  const newValue = currentMatrices[criterion][targetIndex][col];

  localPriorities[criterion] = calculatePriorityVector(currentMatrices[criterion]);

  const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

  steps.push({
    stepNumber: steps.length + 1,
    criterion,
    comparedTo: alternativeNames[col],
    oldValue,
    newValue,
    localPriorityAfterStep: (localPriorities[criterion] ?? [])[targetIndex],
    globalPriorityAfterStep: newGlobals[targetIndex],
  });

  return newGlobals;
}

/**
 * Greedy step: evaluate all possible +1 steps across eligible criteria,
 * pick the one with the highest global priority gain (ΔU).
 */
export function applyGreedyStep(ctx: StepContext, isEligible: (criterion: string) => boolean): StepResult {
  const candidates = simulateCandidates(ctx, isEligible);

  // Pick highest ΔU
  let best: Candidate | null = null;

  for (const c of candidates) {
    if (!best || c.gain > best.gain) best = c;
  }

  if (!best || best.gain <= 0) return { applied: false, newGlobals: [] };

  const newGlobals = applyCandidate(best, ctx);

  return { applied: true, newGlobals };
}
