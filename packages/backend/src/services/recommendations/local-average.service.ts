import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { PositionStep, RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';
import { isCurrentWinner, improveUntilWinner } from './improve-until-winner.service.js';

type LocalAverageParams = {
  criteriaMatrix: PairwiseMatrix;
  alternativeMatrices: AlternativeMatrices;
  criteriaNames: string[];
  alternativeNames: string[];
  targetIndex: number;
};

export function localAverage({
  criteriaMatrix,
  alternativeMatrices,
  criteriaNames,
  alternativeNames,
  targetIndex,
}: LocalAverageParams): RecommendationResult {
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

  // Phase 1: Match the average local priority per criterion
  for (const criterion of criteriaNames) {
    const lp = localPriorities[criterion] ?? [];
    const avg = lp.reduce((acc, val) => acc + val, 0) / lp.length;

    while ((localPriorities[criterion] ?? [])[targetIndex] < avg) {
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

  // Phase 2: If still not winner, keep improving greedily
  improveUntilWinner({
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    steps,
    stepNumber: steps.length,
  });

  const finalGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const newGlobalPriority = finalGlobals[targetIndex];

  return {
    originalGlobalPriority,
    newGlobalPriority,
    leaderGlobalPriority,
    leaderGlobalPriorityAfter: finalGlobals[bestIndex],
    isWinner: isCurrentWinner(finalGlobals, targetIndex),
    totalSteps: steps.length,
    steps,
    modifiedMatrices: currentMatrices,
  };
}
