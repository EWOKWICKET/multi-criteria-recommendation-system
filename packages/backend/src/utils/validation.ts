type AhpInput = {
  criteriaMatrix: number[][];
  alternativeMatrices: Record<string, number[][]>;
  criteriaNames: string[];
  alternativeNames: string[];
};

type RecommendationInput = AhpInput & {
  targetAlternativeIndex: number;
};

function isSquareMatrix(matrix: number[][], expectedSize: number): boolean {
  if (matrix.length !== expectedSize) return false;

  return matrix.every((row) => row.length === expectedSize);
}

export function validateAhpInput(input: AhpInput): string | null {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames } = input;
  const nCriteria = criteriaNames.length;
  const nAlternatives = alternativeNames.length;

  if (!isSquareMatrix(criteriaMatrix, nCriteria)) {
    return `Criteria matrix must be ${nCriteria}x${nCriteria} (matching ${nCriteria} criteria)`;
  }

  for (const name of criteriaNames) {
    const matrix = alternativeMatrices[name];
    if (!matrix) {
      return `Missing alternative matrix for criterion "${name}"`;
    }
    if (!isSquareMatrix(matrix, nAlternatives)) {
      return `Alternative matrix for "${name}" must be ${nAlternatives}x${nAlternatives} (matching ${nAlternatives} alternatives)`;
    }
  }

  return null;
}

export function validateRecommendationInput(input: RecommendationInput): string | null {
  const ahpError = validateAhpInput(input);
  if (ahpError) return ahpError;

  if (input.targetAlternativeIndex >= input.alternativeNames.length) {
    return `targetAlternativeIndex (${input.targetAlternativeIndex}) is out of bounds. Must be less than ${input.alternativeNames.length}`;
  }

  return null;
}
