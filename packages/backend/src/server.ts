import { buildApp } from './app.js';

const app = buildApp();

const PORT = Number(process.env['PORT']) || 3000;
const HOST = process.env['HOST'] || '0.0.0.0';

app.listen({ port: PORT, host: HOST }, (err): void => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
