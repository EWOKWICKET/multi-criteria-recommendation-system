import type { FastifyInstance } from 'fastify';
import { AhpSolveRequestSchema, AhpSolveResponseSchema } from '../schemas/index.js';
import { solveAhp } from '../controllers/index.js';
import { ahpValidationHook } from '../hooks/validation.hook.js';

export async function ahpRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.addHook('preHandler', ahpValidationHook);

  fastify.post('/solve', {
    schema: {
      body: AhpSolveRequestSchema,
      response: { 200: AhpSolveResponseSchema },
    },
    handler: solveAhp,
  });
}
