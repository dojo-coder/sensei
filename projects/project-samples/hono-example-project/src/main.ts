import { serve } from '@hono/node-server';
import { app } from './app';

const port = 3000;

serve({ fetch: app.fetch, port, hostname: '0.0.0.0' });

console.log(`Hono Items API listening on http://localhost:${port}`);
