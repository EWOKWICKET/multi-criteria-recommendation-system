import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AhpSolveRequest } from '../schemas/index.js';
import { solveAHP } from '../services/baseline/index.js';

export async function solveAhp(request: FastifyRequest<{ Body: AhpSolveRequest }>, reply: FastifyReply) {
  const { criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames } = request.body;
  const result = solveAHP(criteriaMatrix, alternativeMatrices, criteriaNames, alternativeNames);
  return reply.send(result);
}
