import type { AlternativeMatrices } from './ahp.types.js';

/** A single position step on the Saaty scale */
export type PositionStep = {
  stepNumber: number;
  criterion: string;
  comparedTo: string;
  oldValue: number;
  newValue: number;
  localPriorityAfterStep: number;
  globalPriorityAfterStep: number;
};

/** Merged steps for the same criterion + comparedTo pair */
export type Action = {
  criterion: string;
  comparedTo: string;
  oldValue: number;
  newValue: number;
  steps: number;
  localPriorityAfterAction: number;
  globalPriorityAfterAction: number;
};

/** Result returned by any recommendation algorithm */
export type RecommendationResult = {
  originalGlobalPriority: number;
  newGlobalPriority: number;
  leaderGlobalPriority: number;
  leaderGlobalPriorityAfter: number;
  isWinner: boolean;
  totalSteps: number;
  steps: PositionStep[];
  modifiedMatrices: AlternativeMatrices;
};
