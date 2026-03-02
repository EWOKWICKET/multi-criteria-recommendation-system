/** A square pairwise comparison matrix (PCM) using Saaty scale values */
export type PairwiseMatrix = number[][];

/** Map of criterion name → PCM for alternatives under that criterion */
export type AlternativeMatrices = Record<string, PairwiseMatrix>;

/** Result of the baseline AHP computation */
export interface AhpResult {
  criteriaWeights: number[];
  localPriorities: Record<string, number[]>;
  globalPriorities: { name: string; priority: number }[];
  winner: string;
  consistencyRatios: Record<string, number>;
  isConsistent: boolean;
}
