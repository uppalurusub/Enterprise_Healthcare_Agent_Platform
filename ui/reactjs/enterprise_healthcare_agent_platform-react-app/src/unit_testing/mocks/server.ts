// src/test/mocks/server.ts

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * MSW server instance
 *
 * This server intercepts all HTTP requests during tests
 * and responds using the handlers defined in handlers.ts.
 */
export const server = setupServer(...handlers);

/**
 * Re-export handlers for convenience
 */
export { handlers };