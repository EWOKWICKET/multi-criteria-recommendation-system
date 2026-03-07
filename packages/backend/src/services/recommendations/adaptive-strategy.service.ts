import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { PositionStep, RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';
import { isCurrentWinner } from './improve-until-winner.service.js';

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

  const steps: PositionStep[] = [];
  let stepNumber = 0;

  const ctx: StageContext = {
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    bestIndex,
    steps,
  };

  // Stage 1: Match the global leader's local priorities
  const stage1Won = runGlobalLeaderStage(ctx, stepNumber);
  stepNumber = steps.length;

  // Stage 2: If still not winner, match local leaders (max local priority per criterion)
  if (!stage1Won) {
    runLocalLeaderStage(ctx, stepNumber);
  }

  const finalGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

  return {
    originalGlobalPriority,
    newGlobalPriority: finalGlobals[targetIndex],
    leaderGlobalPriority,
    leaderGlobalPriorityAfter: finalGlobals[bestIndex],
    isWinner: isCurrentWinner(finalGlobals, targetIndex),
    totalSteps: steps.length,
    steps,
    modifiedMatrices: currentMatrices,
  };
}

type StageContext = {
  criteriaNames: string[];
  alternativeNames: string[];
  localPriorities: Record<string, number[]>;
  currentMatrices: Record<string, PairwiseMatrix>;
  criteriaWeights: number[];
  targetIndex: number;
  bestIndex: number;
  steps: PositionStep[];
};

/**
 * Stage 1: Match the global leader's local priorities per criterion.
 * Returns true if target became the winner during this stage.
 */
function runGlobalLeaderStage(ctx: StageContext, stepNumber: number): boolean {
  const { criteriaNames, localPriorities, criteriaWeights, targetIndex, bestIndex, steps } = ctx;

  for (const criterion of criteriaNames) {
    while ((localPriorities[criterion] ?? [])[targetIndex] < (localPriorities[criterion] ?? [])[bestIndex]) {
      const applied = applyOneStep(criterion, ctx, stepNumber);
      if (!applied) break;

      stepNumber = steps.length;

      const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
      if (isCurrentWinner(newGlobals, targetIndex)) return true;
    }
  }

  return false;
}

/**
 * Stage 2: Match the local leader (max local priority) per criterion.
 * Returns true if target became the winner during this stage.
 */
function runLocalLeaderStage(ctx: StageContext, stepNumber: number): boolean {
  const { criteriaNames, localPriorities, criteriaWeights, targetIndex, steps } = ctx;

  for (const criterion of criteriaNames) {
    const lp = localPriorities[criterion] ?? [];
    const maxLocalPriority = Math.max(...lp);

    while ((localPriorities[criterion] ?? [])[targetIndex] < maxLocalPriority) {
      const applied = applyOneStep(criterion, ctx, stepNumber);
      if (!applied) break;

      stepNumber = steps.length;

      const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
      if (isCurrentWinner(newGlobals, targetIndex)) return true;
    }
  }

  return false;
}

/**
 * Apply one position step on the given criterion, choosing the opponent with the lowest scale index.
 */
function applyOneStep(criterion: string, ctx: StageContext, stepNumber: number): boolean {
  const { alternativeNames, localPriorities, currentMatrices, criteriaWeights, criteriaNames, targetIndex, steps } = ctx;

  let bestCol = -1;
  let lowestScaleIndex = SAATY_SCALE.length;

  for (let j = 0; j < alternativeNames.length; j++) {
    if (j === targetIndex) continue;

    const currentVal = currentMatrices[criterion][targetIndex][j];
    const scaleIdx = findClosestSaatyIndex(currentVal);

    if (scaleIdx < SAATY_SCALE.length - 1 && scaleIdx < lowestScaleIndex) {
      lowestScaleIndex = scaleIdx;
      bestCol = j;
    }
  }

  if (bestCol === -1) return false;

  const oldValue = currentMatrices[criterion][targetIndex][bestCol];

  currentMatrices[criterion] = applySaatyStep({
    matrix: currentMatrices[criterion],
    row: targetIndex,
    col: bestCol,
    direction: StepDirection.Up,
  });

  const newValue = currentMatrices[criterion][targetIndex][bestCol];

  localPriorities[criterion] = calculatePriorityVector(currentMatrices[criterion]);

  const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

  steps.push({
    stepNumber: stepNumber + 1,
    criterion,
    comparedTo: alternativeNames[bestCol],
    oldValue,
    newValue,
    localPriorityAfterStep: (localPriorities[criterion] ?? [])[targetIndex],
    globalPriorityAfterStep: newGlobals[targetIndex],
  });

  return true;
}
