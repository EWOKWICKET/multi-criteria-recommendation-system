import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';
import { globalLeader as globalLeaderService, localLeader as localLeaderService } from '../services/recommendations/index.js';

type RecRequest = FastifyRequest<{ Body: RecommendationRequest }>;

export async function globalLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames, targetAlternativeIndex } = request.body;

  const result = globalLeaderService({
    criteriaMatrix,
    alternativeMatrices,
    criteriaNames,
    alternativeNames,
    targetIndex: targetAlternativeIndex,
  });

  return reply.send(result);
}

export async function localLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames, targetAlternativeIndex } = request.body;

  const result = localLeaderService({
    criteriaMatrix,
    alternativeMatrices,
    criteriaNames,
    alternativeNames,
    targetIndex: targetAlternativeIndex,
  });

  return reply.send(result);
}

export async function globalAverage(_request: RecRequest, reply: FastifyReply): Promise<void> {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function localAverage(_request: RecRequest, reply: FastifyReply): Promise<void> {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function adaptiveStrategy(_request: RecRequest, reply: FastifyReply): Promise<void> {
  return reply.status(501).send({ error: 'Not implemented yet' });
}
