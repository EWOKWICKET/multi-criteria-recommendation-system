import type { FastifyInstance } from 'fastify';
import { ahpRoutes } from './ahp.routes.js';
import { recommendationsRoutes } from './recommendations.routes.js';

export async function allRoutes(app: FastifyInstance): Promise<void> {
  app.register(ahpRoutes, { prefix: '/ahp' });
  app.register(recommendationsRoutes, { prefix: '/recommendations' });
}
