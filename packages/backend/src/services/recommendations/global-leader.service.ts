import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { PositionStep, RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';

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

  // Compute initial local priorities and find global winner
  const localPriorities: Record<string, number[]> = {};
  const currentMatrices: Record<string, PairwiseMatrix> = {};

  for (const name of criteriaNames) {
    currentMatrices[name] = (alternativeMatrices[name] ?? []).map((r) => [...r]);
    localPriorities[name] = calculatePriorityVector(currentMatrices[name]);
  }

  const globalValues = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const originalGlobalPriority = globalValues[targetIndex];

  // Find global winner
  let bestIndex = 0;
  for (let i = 1; i < globalValues.length; i++) {
    if (globalValues[i] > globalValues[bestIndex]) bestIndex = i;
  }
  const leaderGlobalPriority = globalValues[bestIndex];

  // If target is already the winner, no steps needed
  if (targetIndex === bestIndex) {
    const result: RecommendationResult = {
      originalGlobalPriority,
      newGlobalPriority: originalGlobalPriority,
      leaderGlobalPriority,
      isWinner: true,
      totalSteps: 0,
      steps: [],
      modifiedMatrices: currentMatrices,
    };

    return result;
  }

  const steps: PositionStep[] = [];
  let stepNumber = 0;

  // For each criterion where target is weaker than the global winner
  for (const criterion of criteriaNames) {
    const targetLP = (localPriorities[criterion] ?? [])[targetIndex];
    const leaderLP = (localPriorities[criterion] ?? [])[bestIndex];

    if (targetLP >= leaderLP) continue;

    // Iteratively improve target in this criterion's PCM
    while ((localPriorities[criterion] ?? [])[targetIndex] < (localPriorities[criterion] ?? [])[bestIndex]) {
      // Find the best opponent to improve against (lowest relative score)
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
      const localPriorityAfterStep = (localPriorities[criterion] ?? [])[targetIndex];
      const globalPriorityAfterStep = newGlobals[targetIndex];

      const step: PositionStep = {
        stepNumber,
        criterion,
        comparedTo: alternativeNames[bestCol],
        oldValue,
        newValue,
        localPriorityAfterStep,
        globalPriorityAfterStep,
      };

      steps.push(step);
    }
  }

  const finalGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const newGlobalPriority = finalGlobals[targetIndex];

  const result: RecommendationResult = {
    originalGlobalPriority,
    newGlobalPriority,
    leaderGlobalPriority,
    isWinner: newGlobalPriority >= leaderGlobalPriority,
    totalSteps: steps.length,
    steps,
    modifiedMatrices: currentMatrices,
  };

  return result;
}
