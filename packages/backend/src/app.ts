import Fastify, { type FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { registerCors } from './plugins/index.js';
import { registerErrorHandlers } from './hooks/index.js';
import { ahpRoutes, recommendationsRoutes } from './routes/index.js';
import { logger } from './services/logger.service.js';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    loggerInstance: logger,
    disableRequestLogging: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  app.register(registerErrorHandlers);
  app.register(registerCors);
  app.register(
    async (api) => {
      api.register(ahpRoutes, { prefix: '/ahp' });
      api.register(recommendationsRoutes, { prefix: '/recommendations' });
    },
    { prefix: '/api' }
  );

  return app;
}
