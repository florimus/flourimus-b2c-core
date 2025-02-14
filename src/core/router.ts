import { RequestHandler, Router } from 'express';
import errorBoundary from '@src/errorBoundary';

/**
 * Creates a router with methods for adding routes and middleware.
 *
 * @returns An object with methods for adding routes and middleware:
 * - `get(path: string, ...handlers: RequestHandler[])`: Adds a GET route.
 * - `post(path: string, ...handlers: RequestHandler[])`: Adds a POST route.
 * - `put(path: string, ...handlers: RequestHandler[])`: Adds a PUT route.
 * - `delete(path: string, ...handlers: RequestHandler[])`: Adds a DELETE route.
 * - `patch(path: string, ...handlers: RequestHandler[])`: Adds a PATCH route.
 * - `use(path: string, ...handlers: RequestHandler[])`: Adds middleware.
 * - `getRouter()`: Returns the underlying router instance.
 */
const createRouter = () => {
  const router: Router = Router();

  const addRoute = (
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    path: string,
    ...handlers: RequestHandler[]
  ) => {
    router[method](path, ...handlers.map((handler) => errorBoundary(handler)));
  };

  return {
    get: (path: string, ...handlers: RequestHandler[]) =>
      addRoute('get', path, ...handlers),

    post: (path: string, ...handlers: RequestHandler[]) =>
      addRoute('post', path, ...handlers),
    put: (path: string, ...handlers: RequestHandler[]) =>
      addRoute('put', path, ...handlers),
    delete: (path: string, ...handlers: RequestHandler[]) =>
      addRoute('delete', path, ...handlers),
    patch: (path: string, ...handlers: RequestHandler[]) =>
      addRoute('patch', path, ...handlers),
    use: (path: string, ...handlers: RequestHandler[]) => {
      router.use(path, ...handlers.map((handler) => errorBoundary(handler)));
    },
    getRouter: () => router,
  };
};

export default createRouter;
