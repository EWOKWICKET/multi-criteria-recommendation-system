import { Type, type Static } from '@sinclair/typebox';

const PairwiseMatrix = Type.Array(Type.Array(Type.Number()));

export const AhpSolveRequestSchema = Type.Object({
  criteriaMatrix: PairwiseMatrix,
  alternativeMatrices: Type.Record(Type.String(), PairwiseMatrix),
  criteriaNames: Type.Array(Type.String(), { minItems: 1 }),
  alternativeNames: Type.Array(Type.String(), { minItems: 2 }),
});

export type AhpSolveRequest = Static<typeof AhpSolveRequestSchema>;

export const AhpSolveResponseSchema = Type.Object({
  criteriaWeights: Type.Array(Type.Number()),
  localPriorities: Type.Record(Type.String(), Type.Array(Type.Number())),
  globalPriorities: Type.Array(
    Type.Object({
      name: Type.String(),
      priority: Type.Number(),
    })
  ),
  winner: Type.String(),
  consistencyRatios: Type.Record(Type.String(), Type.Number()),
  isConsistent: Type.Boolean(),
  warnings: Type.Optional(Type.Array(Type.String())),
});
