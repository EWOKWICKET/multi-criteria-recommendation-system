import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';
import { globalLeader as globalLeaderService } from '../services/recommendations/index.js';

type RecRequest = FastifyRequest<{ Body: RecommendationRequest }>;

export async function globalLeader(request: RecRequest, reply: FastifyReply) {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames, targetAlternativeIndex } = request.body;

  const result = globalLeaderService(
    criteriaMatrix,
    alternativeMatrices,
    criteriaNames,
    alternativeNames,
    targetAlternativeIndex
  );

  return reply.send(result);
}

export async function localLeader(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function globalAverage(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function localAverage(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function adaptiveStrategy(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}
