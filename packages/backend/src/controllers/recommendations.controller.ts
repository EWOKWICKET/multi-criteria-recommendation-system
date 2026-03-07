import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';
import type { RecommendationResult } from '../types/index.js';
import {
  globalLeader as globalLeaderService,
  localLeader as localLeaderService,
  localAverage as localAverageService,
  globalAverage as globalAverageService,
  adaptiveStrategy as adaptiveStrategyService,
} from '../services/recommendations/index.js';
import { logger } from '../services/logger.service.js';

type RecRequest = FastifyRequest<{ Body: RecommendationRequest }>;

function logRecommendation(algorithm: string, request: RecRequest, result: RecommendationResult): void {
  const { alternativeNames, targetAlternativeIndex } = request.body;
  logger.info(
    {
      algorithm,
      target: alternativeNames[targetAlternativeIndex],
      steps: result.totalSteps,
      isWinner: result.isWinner,
    },
    'Recommendation completed'
  );
}

export async function globalLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = globalLeaderService({ ...rest, targetIndex });

  logRecommendation('global-leader', request, result);

  return reply.send(result);
}

export async function localLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = localLeaderService({ ...rest, targetIndex });

  logRecommendation('local-leader', request, result);

  return reply.send(result);
}

export async function globalAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = globalAverageService({ ...rest, targetIndex });

  logRecommendation('global-average', request, result);

  return reply.send(result);
}

export async function localAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = localAverageService({ ...rest, targetIndex });

  logRecommendation('local-average', request, result);

  return reply.send(result);
}

export async function adaptiveStrategy(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = adaptiveStrategyService({ ...rest, targetIndex });

  logRecommendation('adaptive-strategy', request, result);

  return reply.send(result);
}
