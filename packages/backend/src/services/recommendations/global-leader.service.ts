import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { PositionStep, RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';

export function globalLeader(
  criteriaMatrix: PairwiseMatrix,
  alternativeMatrices: AlternativeMatrices,
  criteriaNames: string[],
  alternativeNames: string[],
  targetIndex: number
): RecommendationResult {
  const criteriaWeights = calculatePriorityVector(criteriaMatrix);

  // Compute initial local priorities and find global winner
  const localPriorities: Record<string, number[]> = {};
  const currentMatrices: Record<string, PairwiseMatrix> = {};
  for (const name of criteriaNames) {
    currentMatrices[name] = alternativeMatrices[name].map((r) => [...r]);
    localPriorities[name] = calculatePriorityVector(currentMatrices[name]);
  }

  const globalValues = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const originalGlobalPriority = globalValues[targetIndex];

  // Find global winner (exclude target if it happens to be the best)
  let bestIndex = 0;
  for (let i = 1; i < globalValues.length; i++) {
    if (globalValues[i] > globalValues[bestIndex]) bestIndex = i;
  }
  const leaderGlobalPriority = globalValues[bestIndex];

  // If target is already the winner, no steps needed
  if (targetIndex === bestIndex) {
    return {
      originalGlobalPriority,
      newGlobalPriority: originalGlobalPriority,
      leaderGlobalPriority,
      isWinner: true,
      totalSteps: 0,
      steps: [],
      modifiedMatrices: currentMatrices,
    };
  }

  const steps: PositionStep[] = [];
  let stepNumber = 0;

  // For each criterion where target is weaker than the global winner
  for (const criterion of criteriaNames) {
    const targetLP = localPriorities[criterion][targetIndex];
    const leaderLP = localPriorities[criterion][bestIndex];

    if (targetLP >= leaderLP) continue;

    // Iteratively improve target in this criterion's PCM
    while (localPriorities[criterion][targetIndex] < localPriorities[criterion][bestIndex]) {
      // Find the best opponent to improve against (the one where target has the lowest relative score)
      let bestCol = -1;
      let lowestScaleIndex = SAATY_SCALE.length;

      for (let j = 0; j < alternativeNames.length; j++) {
        if (j === targetIndex) continue;
        const currentVal = currentMatrices[criterion][targetIndex][j];
        const scaleIdx = findClosestSaatyIndex(currentVal);
        // Can still step up?
        if (scaleIdx < SAATY_SCALE.length - 1 && scaleIdx < lowestScaleIndex) {
          lowestScaleIndex = scaleIdx;
          bestCol = j;
        }
      }

      // No more steps possible in this criterion
      if (bestCol === -1) break;

      const oldValue = currentMatrices[criterion][targetIndex][bestCol];
      currentMatrices[criterion] = applySaatyStep(currentMatrices[criterion], targetIndex, bestCol, StepDirection.Up);
      const newValue = currentMatrices[criterion][targetIndex][bestCol];

      // Recalculate local priorities for this criterion
      localPriorities[criterion] = calculatePriorityVector(currentMatrices[criterion]);

      // Recalculate global priorities
      const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

      stepNumber++;
      steps.push({
        stepNumber,
        criterion,
        comparedTo: alternativeNames[bestCol],
        oldValue,
        newValue,
        localPriorityAfterStep: localPriorities[criterion][targetIndex],
        globalPriorityAfterStep: newGlobals[targetIndex],
      });
    }
  }

  // Final global priorities
  const finalGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
  const newGlobalPriority = finalGlobals[targetIndex];

  return {
    originalGlobalPriority,
    newGlobalPriority,
    leaderGlobalPriority,
    isWinner: newGlobalPriority >= leaderGlobalPriority,
    totalSteps: steps.length,
    steps,
    modifiedMatrices: currentMatrices,
  };
}
