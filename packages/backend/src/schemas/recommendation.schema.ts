import { Type, type Static } from '@sinclair/typebox';

const PairwiseMatrix = Type.Array(Type.Array(Type.Number()));

export const RecommendationRequestSchema = Type.Object({
  criteriaMatrix: PairwiseMatrix,
  alternativeMatrices: Type.Record(Type.String(), PairwiseMatrix),
  criteriaNames: Type.Array(Type.String(), { minItems: 1 }),
  alternativeNames: Type.Array(Type.String(), { minItems: 2 }),
  targetAlternativeIndex: Type.Integer({ minimum: 0 }),
});

export type RecommendationRequest = Static<typeof RecommendationRequestSchema>;

const PositionStepSchema = Type.Object({
  stepNumber: Type.Integer(),
  criterion: Type.String(),
  comparedTo: Type.String(),
  oldValue: Type.Number(),
  newValue: Type.Number(),
  localPriorityAfterStep: Type.Number(),
  globalPriorityAfterStep: Type.Number(),
});

export const RecommendationResponseSchema = Type.Object({
  originalGlobalPriority: Type.Number(),
  newGlobalPriority: Type.Number(),
  leaderGlobalPriority: Type.Number(),
  isWinner: Type.Boolean(),
  totalSteps: Type.Integer(),
  steps: Type.Array(PositionStepSchema),
  modifiedMatrices: Type.Record(Type.String(), PairwiseMatrix),
});

export type RecommendationResponse = Static<typeof RecommendationResponseSchema>;
