import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { PositionStep, RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';
import { isCurrentWinner } from './improve-until-winner.service.js';

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

  const steps: PositionStep[] = [];
  let stepNumber = 0;

  // Phase 1: Match the best local priority per criterion
  for (const criterion of criteriaNames) {
    const lp = localPriorities[criterion] ?? [];
    const maxLocalPriority = Math.max(...lp);

    while ((localPriorities[criterion] ?? [])[targetIndex] < maxLocalPriority) {
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

      if (bestCol === -1) break;

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

      stepNumber++;
      steps.push({
        stepNumber,
        criterion,
        comparedTo: alternativeNames[bestCol],
        oldValue,
        newValue,
        localPriorityAfterStep: (localPriorities[criterion] ?? [])[targetIndex],
        globalPriorityAfterStep: newGlobals[targetIndex],
      });

      if (isCurrentWinner(newGlobals, targetIndex)) {
        return {
          originalGlobalPriority,
          newGlobalPriority: newGlobals[targetIndex],
          leaderGlobalPriority,
          leaderGlobalPriorityAfter: newGlobals[bestIndex],
          isWinner: true,
          totalSteps: steps.length,
          steps,
          modifiedMatrices: currentMatrices,
        };
      }
    }
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
