import { createRouteHandler } from 'uploadthing/next';
import { myFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: myFileRouter,
  // Apply an (optional) custom config:
  // config: { ... },
});
