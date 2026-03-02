import type { AlternativeMatrices } from './ahp.types.js';

/** A single position step on the Saaty scale */
export interface PositionStep {
  stepNumber: number;
  criterion: string;
  comparedTo: string;
  oldValue: number;
  newValue: number;
  localPriorityAfterStep: number;
  globalPriorityAfterStep: number;
}

/** Result returned by any recommendation algorithm */
export interface RecommendationResult {
  originalGlobalPriority: number;
  newGlobalPriority: number;
  leaderGlobalPriority: number;
  isWinner: boolean;
  totalSteps: number;
  steps: PositionStep[];
  modifiedMatrices: AlternativeMatrices;
}
