import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { isCurrentWinner } from './current-winner.js';
import { applyGreedyStep, type StepContext } from './apply-position-step.js';

type AdaptiveStrategyParams = {
  criteriaMatrix: PairwiseMatrix;
  alternativeMatrices: AlternativeMatrices;
  criteriaNames: string[];
  alternativeNames: string[];
  targetIndex: number;
};

export function adaptiveStrategy({
  criteriaMatrix,
  alternativeMatrices,
  criteriaNames,
  alternativeNames,
  targetIndex,
}: AdaptiveStrategyParams): RecommendationResult {
  const criteriaWeights = calculatePriorityVector(criteriaMatrix);

  const localPriorities: Record<string, number[]> = {};
  const currentMatrices: Record<string, PairwiseMatrix> = {};

  for (const name of criteriaNames) {
    currentMatrices[name] = (alternativeMatrices[name] ?? []).map((r) => [...r]);
    localPriorities[name] = calculatePriorityVector(currentMatrices[name]);
  }

  const globalValues = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const originalGlobalPriority = globalValues[targetIndex];

  let bestIndex = 0;

  for (let i = 1; i < globalValues.length; i++) {
    if (globalValues[i] > globalValues[bestIndex]) bestIndex = i;
  }

  const leaderGlobalPriority = globalValues[bestIndex];

  if (targetIndex === bestIndex) {
    return {
      originalGlobalPriority,
      newGlobalPriority: originalGlobalPriority,
      leaderGlobalPriority,
      leaderGlobalPriorityAfter: leaderGlobalPriority,
      isWinner: true,
      totalSteps: 0,
      steps: [],
      modifiedMatrices: currentMatrices,
    };
  }

  // Snapshot baselines
  const avgLP: Record<string, number> = {};
  const maxLP: Record<string, number> = {};

  for (const c of criteriaNames) {
    const lp = localPriorities[c] ?? [];
    avgLP[c] = lp.reduce((acc, val) => acc + val, 0) / lp.length;
    maxLP[c] = Math.max(...lp);
  }

  const ctx: StepContext = {
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    steps: [],
  };

  // Stage 1: Local Average — run to FULL completion (target >= avg LP on all criteria)
  runFullStage(ctx, (c) => (localPriorities[c] ?? [])[targetIndex] < avgLP[c]);

  // Check if already winner after Stage 1
  const stage1Globals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

  if (!isCurrentWinner(stage1Globals, targetIndex, bestIndex)) {
    // Stage 2: Local Leader
    runStageWithEarlyStopping(ctx, bestIndex, (c) => (localPriorities[c] ?? [])[targetIndex] < maxLP[c]);
  }

  const finalGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

  return {
    originalGlobalPriority,
    newGlobalPriority: finalGlobals[targetIndex],
    leaderGlobalPriority,
    leaderGlobalPriorityAfter: finalGlobals[bestIndex],
    isWinner: isCurrentWinner(finalGlobals, targetIndex, bestIndex),
    totalSteps: ctx.steps.length,
    steps: ctx.steps,

    modifiedMatrices: currentMatrices,
  };
}

/** Run until no more eligible steps — no early winner check. */
function runFullStage(ctx: StepContext, isEligible: (c: string) => boolean): void {
  for (;;) {
    const { applied } = applyGreedyStep(ctx, isEligible);

    if (!applied) break;
  }
}

/** Run with early stopping — exit as soon as target becomes winner. */
function runStageWithEarlyStopping(ctx: StepContext, leaderIndex: number, isEligible: (c: string) => boolean): void {
  for (;;) {
    const { applied, newGlobals } = applyGreedyStep(ctx, isEligible);

    if (!applied) break;

    if (isCurrentWinner(newGlobals, ctx.targetIndex, leaderIndex)) break;
  }
}
