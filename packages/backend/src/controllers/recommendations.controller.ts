import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';
import {
  globalLeader as globalLeaderService,
  localLeader as localLeaderService,
  localAverage as localAverageService,
  globalAverage as globalAverageService,
  adaptiveStrategy as adaptiveStrategyService,
} from '../services/recommendations/index.js';

type RecRequest = FastifyRequest<{ Body: RecommendationRequest }>;

export async function globalLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;

  return reply.send(globalLeaderService({ ...rest, targetIndex }));
}

export async function localLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;

  return reply.send(localLeaderService({ ...rest, targetIndex }));
}

export async function globalAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;

  return reply.send(globalAverageService({ ...rest, targetIndex }));
}

export async function localAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;

  return reply.send(localAverageService({ ...rest, targetIndex }));
}

export async function adaptiveStrategy(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;

  return reply.send(adaptiveStrategyService({ ...rest, targetIndex }));
}
