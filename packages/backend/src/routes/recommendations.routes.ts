import type { FastifyInstance } from 'fastify';
import { RecommendationRequestSchema, RecommendationResponseSchema } from '../schemas/index.js';
import { scenario1, scenario2, scenario3, scenario4, scenario5 } from '../controllers/index.js';

export async function recommendationsRoutes(fastify: FastifyInstance) {
  const schema = {
    body: RecommendationRequestSchema,
    response: { 200: RecommendationResponseSchema },
  };

  fastify.post('/scenario-1', { schema, handler: scenario1 });
  fastify.post('/scenario-2', { schema, handler: scenario2 });
  fastify.post('/scenario-3', { schema, handler: scenario3 });
  fastify.post('/scenario-4', { schema, handler: scenario4 });
  fastify.post('/scenario-5', { schema, handler: scenario5 });
}
