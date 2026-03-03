import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AhpSolveRequest } from '../schemas/index.js';
import type { RecommendationRequest } from '../schemas/index.js';
import { validateAhpInput, validateRecommendationInput } from '../utils/index.js';

export async function ahpValidationHook(
  request: FastifyRequest<{ Body: AhpSolveRequest }>,
  reply: FastifyReply
): Promise<void> {
  const error = validateAhpInput(request.body);

  if (error) {
    return reply.status(400).send({ error: 'Validation error', message: error });
  }
}

export async function recommendationValidationHook(
  request: FastifyRequest<{ Body: RecommendationRequest }>,
  reply: FastifyReply
): Promise<void> {
  const error = validateRecommendationInput(request.body);

  if (error) {
    return reply.status(400).send({ error: 'Validation error', message: error });
  }
}
