import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AhpSolveRequest } from '../schemas/index.js';
import { solveAHP } from '../services/baseline/index.js';

type AhpSolveRequestType = FastifyRequest<{ Body: AhpSolveRequest }>;

export async function solveAhp(request: AhpSolveRequestType, reply: FastifyReply): Promise<void> {
  const result = solveAHP(request.body);

  const warnings: string[] = [];

  if (!result.isConsistent) {
    const inconsistent = Object.entries(result.consistencyRatios)
      .filter(([_, cr]) => cr > 0.1)
      .map(([name]) => name);

    warnings.push(`Consistency ratio exceeds 0.1 for: ${inconsistent.join(', ')}. Results may be unreliable.`);
  }

  return reply.send({ ...result, ...(warnings.length > 0 ? { warnings } : {}) });
}
