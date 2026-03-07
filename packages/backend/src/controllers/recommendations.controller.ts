import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';
import type { RecommendationResult, Action, PositionStep } from '../types/index.js';
import {
  globalLeader as globalLeaderService,
  localLeader as localLeaderService,
  localAverage as localAverageService,
  globalAverage as globalAverageService,
  adaptiveStrategy as adaptiveStrategyService,
} from '../services/recommendations/index.js';
import { logger } from '../services/logger.service.js';

type RecRequest = FastifyRequest<{ Body: RecommendationRequest }>;

function mergeStepsIntoActions(steps: PositionStep[]): Action[] {
  const actions: Action[] = [];

  for (const step of steps) {
    const existing = actions.find((a) => a.criterion === step.criterion && a.comparedTo === step.comparedTo);

    if (existing) {
      existing.newValue = step.newValue;
      existing.steps++;
      existing.localPriorityAfterAction = step.localPriorityAfterStep;
      existing.globalPriorityAfterAction = step.globalPriorityAfterStep;
    } else {
      actions.push({
        criterion: step.criterion,
        comparedTo: step.comparedTo,
        oldValue: step.oldValue,
        newValue: step.newValue,
        steps: 1,
        localPriorityAfterAction: step.localPriorityAfterStep,
        globalPriorityAfterAction: step.globalPriorityAfterStep,
      });
    }
  }

  return actions;
}

function toResponse(result: RecommendationResult): Omit<RecommendationResult, 'steps'> & { actions: Action[] } {
  const { steps, modifiedMatrices, ...rest } = result;

  return { ...rest, actions: mergeStepsIntoActions(steps), modifiedMatrices };
}

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

  return reply.send(toResponse(result));
}

export async function localLeader(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = localLeaderService({ ...rest, targetIndex });

  logRecommendation('local-leader', request, result);

  return reply.send(toResponse(result));
}

export async function globalAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = globalAverageService({ ...rest, targetIndex });

  logRecommendation('global-average', request, result);

  return reply.send(toResponse(result));
}

export async function localAverage(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = localAverageService({ ...rest, targetIndex });

  logRecommendation('local-average', request, result);

  return reply.send(toResponse(result));
}

export async function adaptiveStrategy(request: RecRequest, reply: FastifyReply): Promise<void> {
  const { targetAlternativeIndex: targetIndex, ...rest } = request.body;
  const result = adaptiveStrategyService({ ...rest, targetIndex });

  logRecommendation('adaptive-strategy', request, result);

  return reply.send(toResponse(result));
}
