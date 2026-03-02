import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { registerCors } from './plugins/index.js';
import { ahpRoutes, recommendationsRoutes } from './routes/index.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  app.register(registerCors);
  app.register(ahpRoutes, { prefix: '/api/ahp' });
  app.register(recommendationsRoutes, { prefix: '/api/recommendations' });

  return app;
}
