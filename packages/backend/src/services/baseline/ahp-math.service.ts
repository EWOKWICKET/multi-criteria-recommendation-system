import type { PairwiseMatrix, AlternativeMatrices, AhpResult } from '../../types/index.js';

/** Random Index values for matrices of size 1–15 (Saaty scale) */
const RANDOM_INDEX = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.37, 1.41, 1.45, 1.49, 1.51, 1.48, 1.56, 1.57];

const CR_THRESHOLD = 0.1;

/** Column-sum normalization of a square matrix */
export function normalizeMatrix(matrix: PairwiseMatrix): PairwiseMatrix {
  const n = matrix.length;
  const colSums = new Array<number>(n).fill(0);

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      colSums[j] += matrix[i][j];
    }
  }

  return matrix.map((row) => row.map((val, j) => val / colSums[j]));
}

/** Row-average of normalized matrix (approximate eigenvector) */
export function calculatePriorityVector(matrix: PairwiseMatrix): number[] {
  const normalized = normalizeMatrix(matrix);
  const n = normalized.length;

  return normalized.map((row) => row.reduce((sum, val) => sum + val, 0) / n);
}

/**
 * Calculate the Consistency Ratio for a PCM given its priority vector.
 * CR = CI / RI, where CI = (λmax - n) / (n - 1).
 * Returns 0 for matrices of size ≤ 2 (always consistent).
 */
export function calculateConsistencyRatio(matrix: PairwiseMatrix, priorities: number[]): number {
  const n = matrix.length;

  if (n <= 2) {
    return 0;
  }

  // Weighted sum vector: A * w
  const weightedSum = matrix.map((row) => row.reduce((sum, val, j) => sum + val * priorities[j], 0));

  // λmax = average of (weighted sum / priority) for each row
  const lambdaMax = weightedSum.reduce((sum, ws, i) => sum + ws / priorities[i], 0) / n;

  const ci = (lambdaMax - n) / (n - 1);
  const ri = RANDOM_INDEX[n - 1] ?? RANDOM_INDEX[RANDOM_INDEX.length - 1];

  return ri === 0 ? 0 : ci / ri;
}

/** Additive synthesis: u(Aj) = Σ(wk * vjk) */
export function calculateGlobalPriorities(
  weights: number[],
  localPriorities: Record<string, number[]>,
  criteriaNames: string[]
): number[] {
  const altCount = (localPriorities[criteriaNames[0]] ?? []).length;
  const globals = new Array<number>(altCount).fill(0);

  for (let k = 0; k < criteriaNames.length; k++) {
    const lp = localPriorities[criteriaNames[k]] ?? [];

    for (let j = 0; j < altCount; j++) {
      globals[j] += weights[k] * lp[j];
    }
  }

  return globals;
}

type SolveAHPParams = {
  criteriaMatrix: PairwiseMatrix;
  alternativeMatrices: AlternativeMatrices;
  criteriaNames: string[];
  alternativeNames: string[];
};

/** Full AHP pipeline: PCMs → priorities → CR → global ranking */
export function solveAHP({
  criteriaMatrix,
  alternativeMatrices,
  criteriaNames,
  alternativeNames,
}: SolveAHPParams): AhpResult {
  const criteriaWeights = calculatePriorityVector(criteriaMatrix);
  const criteriaCR = calculateConsistencyRatio(criteriaMatrix, criteriaWeights);

  const localPriorities: Record<string, number[]> = {};
  const consistencyRatios: Record<string, number> = { criteria: criteriaCR };
  let allConsistent = criteriaCR <= CR_THRESHOLD;

  for (const name of criteriaNames) {
    const matrix = alternativeMatrices[name] ?? [];
    const priorities = calculatePriorityVector(matrix);
    const cr = calculateConsistencyRatio(matrix, priorities);

    localPriorities[name] = priorities;
    consistencyRatios[name] = cr;

    if (cr > CR_THRESHOLD) {
      allConsistent = false;
    }
  }

  const globalValues = calculateGlobalPriorities(criteriaWeights, localPriorities, criteriaNames);

  const globalPriorities = alternativeNames.map((name, i) => ({
    name,
    priority: globalValues[i],
  }));

  const sorted = [...globalPriorities].sort((a, b) => b.priority - a.priority);

  const result: AhpResult = {
    criteriaWeights,
    localPriorities,
    globalPriorities: sorted,
    winner: sorted[0].name,
    consistencyRatios,
    isConsistent: allConsistent,
  };

  return result;
}
