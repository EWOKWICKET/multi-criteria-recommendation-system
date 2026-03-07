import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AhpSolveRequest } from '../schemas/index.js';
import { solveAHP } from '../services/baseline/index.js';
import { logger } from '../services/logger.service.js';

type AhpSolveRequestType = FastifyRequest<{ Body: AhpSolveRequest }>;

export async function solveAhp(request: AhpSolveRequestType, reply: FastifyReply): Promise<void> {
  const { criteriaNames, alternativeNames } = request.body;
  logger.info({ criteria: criteriaNames.length, alternatives: alternativeNames.length }, 'AHP solve request');

  const result = solveAHP(request.body);

  const warnings: string[] = [];

  if (!result.isConsistent) {
    const inconsistent = Object.entries(result.consistencyRatios)
      .filter(([_, cr]) => cr > 0.1)
      .map(([name]) => name);

    warnings.push(`Consistency ratio exceeds 0.1 for: ${inconsistent.join(', ')}. Results may be unreliable.`);
    logger.warn({ matricesLength: inconsistent.length }, 'CR threshold exceeded');
  }

  logger.info(
    {
      winner: result.winner,
      criteria: criteriaNames.length,
      alternatives: alternativeNames.length,
      consistent: result.isConsistent,
    },
    'AHP solved'
  );

  return reply.send({ ...result, ...(warnings.length > 0 ? { warnings } : {}) });
}
