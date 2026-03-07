import type { PairwiseMatrix } from '../../types/index.js';
import type { PositionStep } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';

/** Tolerance for considering the target "close enough" to be the winner */
export const WINNER_EPSILON = 1e-4;

export function isCloseEnoughToWin(targetGlobal: number, leaderGlobal: number): boolean {
  return targetGlobal >= leaderGlobal - WINNER_EPSILON;
}

/** Check if target is the current winner (or within epsilon of the best) */
export function isCurrentWinner(globals: number[], targetIndex: number): boolean {
  let maxGlobal = -1;

  for (let i = 0; i < globals.length; i++) {
    if (i !== targetIndex && globals[i] > maxGlobal) {
      maxGlobal = globals[i];
    }
  }

  return isCloseEnoughToWin(globals[targetIndex], maxGlobal);
}

type ImproveParams = {
  criteriaNames: string[];
  alternativeNames: string[];
  localPriorities: Record<string, number[]>;
  currentMatrices: Record<string, PairwiseMatrix>;
  criteriaWeights: number[];
  targetIndex: number;
  steps: PositionStep[];
  stepNumber: number;
};

/**
 * Greedy loop: keep applying the most efficient single step across all criteria
 * until the target becomes the winner (within epsilon) or no more steps possible.
 */
export function improveUntilWinner(params: ImproveParams): void {
  const { criteriaNames, alternativeNames, localPriorities, currentMatrices, criteriaWeights, targetIndex, steps } =
    params;

  let stepNumber = params.stepNumber;

  while (true) {
    const currentGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

    if (isCurrentWinner(currentGlobals, targetIndex)) break;

    // Find the step with maximum global priority gain
    let bestEfficiency = -Infinity;
    let bestCriterion: string | null = null;
    let bestCol = -1;

    for (const criterion of criteriaNames) {
      for (let j = 0; j < alternativeNames.length; j++) {
        if (j === targetIndex) continue;

        const currentVal = currentMatrices[criterion][targetIndex][j];
        const scaleIdx = findClosestSaatyIndex(currentVal);

        if (scaleIdx >= SAATY_SCALE.length - 1) continue;

        // Simulate the step
        const simMatrix = applySaatyStep({
          matrix: currentMatrices[criterion],
          row: targetIndex,
          col: j,
          direction: StepDirection.Up,
        });

        const simLP = { ...localPriorities };
        simLP[criterion] = calculatePriorityVector(simMatrix);

        const simGlobals = calculateGlobalPriorities(criteriaWeights, simLP, criteriaNames);
        const efficiency = simGlobals[targetIndex] - currentGlobals[targetIndex];

        if (efficiency > bestEfficiency) {
          bestEfficiency = efficiency;
          bestCriterion = criterion;
          bestCol = j;
        }
      }
    }

    // No improvable cells left
    if (bestCriterion === null || bestCol === -1) break;

    const oldValue = currentMatrices[bestCriterion][targetIndex][bestCol];

    currentMatrices[bestCriterion] = applySaatyStep({
      matrix: currentMatrices[bestCriterion],
      row: targetIndex,
      col: bestCol,
      direction: StepDirection.Up,
    });

    const newValue = currentMatrices[bestCriterion][targetIndex][bestCol];

    localPriorities[bestCriterion] = calculatePriorityVector(currentMatrices[bestCriterion]);

    const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

    stepNumber++;
    steps.push({
      stepNumber,
      criterion: bestCriterion,
      comparedTo: alternativeNames[bestCol],
      oldValue,
      newValue,
      localPriorityAfterStep: (localPriorities[bestCriterion] ?? [])[targetIndex],
      globalPriorityAfterStep: newGlobals[targetIndex],
    });
  }
}
