import cors from '@fastify/cors';
import type { FastifyInstance } from 'fastify';

export async function registerCors(fastify: FastifyInstance): Promise<void> {
  await fastify.register(cors, {
    origin: true,
  });
}
