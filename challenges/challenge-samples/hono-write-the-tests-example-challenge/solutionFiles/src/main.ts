import { serve } from '@hono/node-server';
import { app } from './app';

serve({ fetch: app.fetch, port: 3000, hostname: '0.0.0.0' });
