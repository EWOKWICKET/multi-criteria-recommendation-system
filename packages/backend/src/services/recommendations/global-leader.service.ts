import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { isCurrentWinner } from './current-winner.js';
import { applyGreedyStep, computePairwiseCap } from './apply-position-step.js';

type GlobalLeaderParams = {
  criteriaMatrix: PairwiseMatrix;
  alternativeMatrices: AlternativeMatrices;
  criteriaNames: string[];
  alternativeNames: string[];
  targetIndex: number;
};

export function globalLeader({
  criteriaMatrix,
  alternativeMatrices,
  criteriaNames,
  alternativeNames,
  targetIndex,
}: GlobalLeaderParams): RecommendationResult {
  const criteriaWeights = calculatePriorityVector(criteriaMatrix);

  const localPriorities: Record<string, number[]> = {};
  const currentMatrices: Record<string, PairwiseMatrix> = {};

  for (const name of criteriaNames) {
    currentMatrices[name] = (alternativeMatrices[name] ?? []).map((r) => [...r]);
    localPriorities[name] = calculatePriorityVector(currentMatrices[name]);
  }

  const initialLP: Record<string, number> = {};

  for (const c of criteriaNames) {
    initialLP[c] = (localPriorities[c] ?? [])[targetIndex];
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
      initialLocalPriorities: initialLP,
      modifiedMatrices: currentMatrices,
    };
  }

  // Snapshot leader's local priorities as baseline
  const leaderLP: Record<string, number> = {};

  for (const c of criteriaNames) {
    leaderLP[c] = (localPriorities[c] ?? [])[bestIndex];
  }

  const pairwiseCap = computePairwiseCap(localPriorities, currentMatrices, criteriaNames);

  const ctx = {
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    steps: [] as RecommendationResult['steps'],
    lpCap: leaderLP,
    pairwiseCap,
  };

  // Greedy: pick highest-ΔU step among criteria where target < leader's LP
  for (;;) {
    const isEligible = (c: string): boolean => (localPriorities[c] ?? [])[targetIndex] < leaderLP[c];
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
        initialLocalPriorities: initialLP,
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
    initialLocalPriorities: initialLP,
    modifiedMatrices: currentMatrices,
  };
}
