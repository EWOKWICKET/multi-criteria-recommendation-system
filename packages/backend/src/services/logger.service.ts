import { fileURLToPath } from 'node:url';
import path from 'node:path';
import type { FastifyBaseLogger } from 'fastify';
import pino from 'pino';

const isProduction = process.env['NODE_ENV'] === 'production';
const logFile = process.env['LOG_FILE'];
const projectRoot = path.resolve(fileURLToPath(import.meta.url), '../../../../..');

function buildTransport(): pino.TransportMultiOptions {
  const targets: pino.TransportTargetOptions[] = [
    { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } },
  ];

  if (isProduction && logFile) {
    const logPath = path.join(projectRoot, 'logs', logFile);
    targets.push({ target: 'pino/file', options: { destination: logPath, mkdir: true } });
  }

  return { targets };
}

export const logger: FastifyBaseLogger = pino({
  level: process.env['LOG_LEVEL'] || 'info',
  transport: buildTransport(),
});
