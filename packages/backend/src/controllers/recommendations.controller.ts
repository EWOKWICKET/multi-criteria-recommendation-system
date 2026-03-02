import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';
import {
  globalLeader as globalLeaderService,
  localLeader as localLeaderService,
  localAverage as localAverageService,
  globalAverage as globalAverageService,
} from '../services/recommendations/index.js';

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

export async function globalAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames, targetAlternativeIndex } = request.body;

  const result = globalAverageService({
    criteriaMatrix,
    alternativeMatrices,
    criteriaNames,
    alternativeNames,
    targetIndex: targetAlternativeIndex,
  });

  return reply.send(result);
}

export async function localAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames, targetAlternativeIndex } = request.body;

  const result = localAverageService({
    criteriaMatrix,
    alternativeMatrices,
    criteriaNames,
    alternativeNames,
    targetIndex: targetAlternativeIndex,
  });

  return reply.send(result);
}

export async function adaptiveStrategy(_request: RecRequest, reply: FastifyReply): Promise<void> {
  return reply.status(501).send({ error: 'Not implemented yet' });
}
