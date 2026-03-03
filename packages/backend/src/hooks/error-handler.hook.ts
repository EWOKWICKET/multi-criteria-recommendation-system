import type { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export async function registerErrorHandlers(app: FastifyInstance): Promise<void> {
  app.setNotFoundHandler((_request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(404).send({ error: 'Route not found' });
  });

  app.setErrorHandler((error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
    const statusCode = error.statusCode ?? 500;

    if (error.validation) {
      return reply.status(400).send({
        error: 'Validation error',
        message: error.message,
      });
    }

    app.log.error(error);

    return reply.status(statusCode).send({
      error: statusCode >= 500 ? 'Internal server error' : error.message,
    });
  });
}
