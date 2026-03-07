import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

function resolveEnvFile(): string | undefined {
  let dir = resolve(fileURLToPath(import.meta.url), '..');

  while (dir !== resolve(dir, '..')) {
    const candidate = resolve(dir, '.env');
    if (existsSync(candidate)) return candidate;
    dir = resolve(dir, '..');
  }

  return undefined;
}

const envPath = resolveEnvFile();
if (envPath) dotenv.config({ path: envPath });
