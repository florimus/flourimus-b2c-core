import { Response } from 'express';

/**
 * Handles exceptions by sending a JSON response with the error details.
 *
 * @param err - The error object, which may include a status code.
 * @param res - The response object used to send the error response.
 *
 * The response will include the error message, status code, and stack trace
 * (if not in production environment).
 */
const handleException = (
  err: Error & { status?: number },
  res: Response
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
};

export default handleException;
