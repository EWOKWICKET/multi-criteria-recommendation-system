import type { FastifyInstance } from 'fastify';
import { RecommendationRequestSchema, RecommendationResponseSchema } from '../schemas/index.js';
import { globalLeader, localLeader, globalAverage, localAverage, adaptiveStrategy } from '../controllers/index.js';

export async function recommendationsRoutes(fastify: FastifyInstance): Promise<void> {
  const schema = {
    body: RecommendationRequestSchema,
    response: { 200: RecommendationResponseSchema },
  };

  fastify.post('/global-leader', { schema, handler: globalLeader });
  fastify.post('/local-leader', { schema, handler: localLeader });
  fastify.post('/global-average', { schema, handler: globalAverage });
  fastify.post('/local-average', { schema, handler: localAverage });
  fastify.post('/adaptive-strategy', { schema, handler: adaptiveStrategy });
}
