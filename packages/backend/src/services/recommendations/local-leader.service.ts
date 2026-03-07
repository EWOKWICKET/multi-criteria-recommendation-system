import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { isCurrentWinner } from './current-winner.js';
import { applyGreedyStep } from './apply-position-step.js';

type LocalLeaderParams = {
  criteriaMatrix: PairwiseMatrix;
  alternativeMatrices: AlternativeMatrices;
  criteriaNames: string[];
  alternativeNames: string[];
  targetIndex: number;
};

export function localLeader({
  criteriaMatrix,
  alternativeMatrices,
  criteriaNames,
  alternativeNames,
  targetIndex,
}: LocalLeaderParams): RecommendationResult {
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

  // Snapshot max local priorities as baseline
  const maxLP: Record<string, number> = {};

  for (const c of criteriaNames) {
    maxLP[c] = Math.max(...(localPriorities[c] ?? []));
  }

  const ctx = {
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    steps: [] as RecommendationResult['steps'],
  };

  // Greedy: pick highest-ΔU step among criteria where target < max LP
  for (;;) {
    const isEligible = (c: string): boolean => (localPriorities[c] ?? [])[targetIndex] < maxLP[c];
    const { applied, newGlobals } = applyGreedyStep(ctx, isEligible);

    if (!applied) break;

    if (isCurrentWinner(newGlobals, targetIndex, bestIndex)) {
      return {
        originalGlobalPriority,
        newGlobalPriority: newGlobals[targetIndex],
        leaderGlobalPriority,
        leaderGlobalPriorityAfter: newGlobals[bestIndex],
        isWinner: true,
        totalSteps: ctx.steps.length,
        steps: ctx.steps,
        modifiedMatrices: currentMatrices,
      };
    }
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
