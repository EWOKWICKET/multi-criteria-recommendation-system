import type { PairwiseMatrix, AlternativeMatrices } from '../../types/index.js';
import type { PositionStep, RecommendationResult } from '../../types/index.js';
import { calculatePriorityVector, calculateGlobalPriorities } from '../baseline/index.js';
import { applySaatyStep, StepDirection, SAATY_SCALE, findClosestSaatyIndex } from '../../utils/index.js';

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

  // Find global winner
  let bestIndex = 0;
  for (let i = 1; i < globalValues.length; i++) {
    if (globalValues[i] > globalValues[bestIndex]) bestIndex = i;
  }
  const leaderGlobalPriority = globalValues[bestIndex];

  // Already the winner
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

  // --- Stage 1: Sanitary Minimum ---
  const stage1Done = runStage1({
    criteriaNames,
    alternativeNames,
    localPriorities,
    currentMatrices,
    criteriaWeights,
    targetIndex,
    bestIndex,
    steps,
    stepCounter: { value: stepNumber },
  });

  stepNumber = steps.length;

  if (!stage1Done) {
    // --- Stage 2: Competitive Advantage ---
    runStage2({
      criteriaNames,
      alternativeNames,
      localPriorities,
      currentMatrices,
      criteriaWeights,
      targetIndex,
      bestIndex,
      steps,
      stepCounter: { value: stepNumber },
    });
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

type StageParams = {
  criteriaNames: string[];
  alternativeNames: string[];
  localPriorities: Record<string, number[]>;
  currentMatrices: Record<string, PairwiseMatrix>;
  criteriaWeights: number[];
  targetIndex: number;
  bestIndex: number;
  steps: PositionStep[];
  stepCounter: { value: number };
};

/**
 * Stage 1: Bring weak criteria up to their average local priority.
 * Picks the weakest criterion each iteration. Stops early if target becomes winner.
 * Returns true if target became the winner during this stage.
 */
function runStage1(params: StageParams): boolean {
  const { criteriaNames, alternativeNames, localPriorities, currentMatrices, criteriaWeights, targetIndex, bestIndex, steps, stepCounter } =
    params;

  while (true) {
    // Find the weakest criterion (largest deficit below average)
    let weakestCriterion: string | null = null;
    let worstDeficit = 0;

    for (const criterion of criteriaNames) {
      const lp = localPriorities[criterion] ?? [];
      const avg = lp.reduce((sum, val) => sum + val, 0) / lp.length;
      const targetLP = lp[targetIndex];
      const deficit = avg - targetLP;

      if (deficit > worstDeficit) {
        worstDeficit = deficit;
        weakestCriterion = criterion;
      }
    }

    if (weakestCriterion === null) break;

    // Apply exactly one step on the weakest criterion
    const applied = applyOneStep({
      criterion: weakestCriterion,
      alternativeNames,
      localPriorities,
      currentMatrices,
      criteriaWeights,
      criteriaNames,
      targetIndex,
      steps,
      stepCounter,
    });

    if (!applied) break;

    // Check early stopping
    const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
    if (newGlobals[targetIndex] >= newGlobals[bestIndex]) {
      return true;
    }
  }

  return false;
}

/**
 * Stage 2: Greedy optimization toward local leaders.
 * Simulates all possible single steps, picks the one with max efficiency (priority growth).
 * Stops when target becomes the winner or no more steps possible.
 */
function runStage2(params: StageParams): void {
  const { criteriaNames, alternativeNames, localPriorities, currentMatrices, criteriaWeights, targetIndex, bestIndex, steps, stepCounter } =
    params;

  while (true) {
    let bestEfficiency = -1;
    let bestCriterion: string | null = null;
    let bestCol = -1;

    const currentGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
    const currentTargetGlobal = currentGlobals[targetIndex];

    // Find the step with maximum efficiency across all criteria
    for (const criterion of criteriaNames) {
      const lp = localPriorities[criterion] ?? [];
      const maxLP = Math.max(...lp);

      if (lp[targetIndex] >= maxLP) continue;

      for (let j = 0; j < alternativeNames.length; j++) {
        if (j === targetIndex) continue;

        const currentVal = currentMatrices[criterion][targetIndex][j];
        const scaleIdx = findClosestSaatyIndex(currentVal);

        if (scaleIdx >= SAATY_SCALE.length - 1) continue;

        // Simulate the step to measure efficiency
        const simMatrix = applySaatyStep({
          matrix: currentMatrices[criterion],
          row: targetIndex,
          col: j,
          direction: StepDirection.Up,
        });

        const simLP = { ...localPriorities };
        simLP[criterion] = calculatePriorityVector(simMatrix);

        const simGlobals = calculateGlobalPriorities(criteriaWeights, simLP, criteriaNames);
        const efficiency = simGlobals[targetIndex] - currentTargetGlobal;

        if (efficiency > bestEfficiency) {
          bestEfficiency = efficiency;
          bestCriterion = criterion;
          bestCol = j;
        }
      }
    }

    if (bestCriterion === null || bestCol === -1) break;

    // Apply the most efficient step
    const applied = applySpecificStep({
      criterion: bestCriterion,
      col: bestCol,
      alternativeNames,
      localPriorities,
      currentMatrices,
      criteriaWeights,
      criteriaNames,
      targetIndex,
      steps,
      stepCounter,
    });

    if (!applied) break;

    // Check early stopping
    const newGlobals = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);
    if (newGlobals[targetIndex] >= newGlobals[bestIndex]) {
      return;
    }
  }
}

type ApplyOneStepParams = {
  criterion: string;
  alternativeNames: string[];
  localPriorities: Record<string, number[]>;
  currentMatrices: Record<string, PairwiseMatrix>;
  criteriaWeights: number[];
  criteriaNames: string[];
  targetIndex: number;
  steps: PositionStep[];
  stepCounter: { value: number };
};

/** Apply one position step on the given criterion, choosing the opponent with lowest scale index. */
function applyOneStep(params: ApplyOneStepParams): boolean {
  const { criterion, alternativeNames, currentMatrices, targetIndex } = params;

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

  return applySpecificStep({ ...params, col: bestCol });
}

type ApplySpecificStepParams = ApplyOneStepParams & { col: number };

/** Apply one position step on the given criterion and column. */
function applySpecificStep(params: ApplySpecificStepParams): boolean {
  const { criterion, col, alternativeNames, localPriorities, currentMatrices, criteriaWeights, criteriaNames, targetIndex, steps, stepCounter } =
    params;

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

  stepCounter.value++;

  const step: PositionStep = {
    stepNumber: stepCounter.value,
    criterion,
    comparedTo: alternativeNames[col],
    oldValue,
    newValue,
    localPriorityAfterStep: (localPriorities[criterion] ?? [])[targetIndex],
    globalPriorityAfterStep: newGlobals[targetIndex],
  };

  steps.push(step);

  return true;
}
