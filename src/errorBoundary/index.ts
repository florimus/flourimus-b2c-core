import { NextFunction, Request, Response } from 'express';
import handleException from '@core/exceptionHandler';

/**
 * A higher-order function that wraps an asynchronous function and handles any errors that occur during its execution.
 *
 * @param fn - The asynchronous function to be wrapped.
 * @returns A function that takes Express.js request, response, and next function objects, and executes the wrapped function.
 */
const errorHandler =
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      handleException(err, res)
    );
  };

export default errorHandler;
