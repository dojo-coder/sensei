import { buildApp } from './app';

const app = buildApp();

app.listen({ port: 3000, host: '0.0.0.0' }).catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
