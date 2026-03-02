import type { FastifyRequest, FastifyReply } from 'fastify';
import type { AhpSolveRequest } from '../schemas/index.js';

export async function solveAhp(
  request: FastifyRequest<{ Body: AhpSolveRequest }>,
  reply: FastifyReply
) {
  // TODO: implement in Phase 2
  return reply.status(501).send({ error: 'Not implemented yet' });
}
