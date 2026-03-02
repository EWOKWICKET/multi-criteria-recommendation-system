import type { FastifyRequest, FastifyReply } from 'fastify';
import type { RecommendationRequest } from '../schemas/index.js';

type RecRequest = FastifyRequest<{ Body: RecommendationRequest }>;

export async function scenario1(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function scenario2(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function scenario3(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function scenario4(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}

export async function scenario5(request: RecRequest, reply: FastifyReply) {
  return reply.status(501).send({ error: 'Not implemented yet' });
}
