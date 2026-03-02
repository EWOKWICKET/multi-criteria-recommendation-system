import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AhpSolveRequest } from '../schemas/index.js';
import { solveAHP } from '../services/baseline/index.js';

type AhpSolveRequestType = FastifyRequest<{ Body: AhpSolveRequest }>;

export async function solveAhp(request: AhpSolveRequestType, reply: FastifyReply): Promise<void> {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames } = request.body;

  const result = solveAHP({ criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames });

  return reply.send(result);
}
