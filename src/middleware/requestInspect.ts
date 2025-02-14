import { NextFunction, Request, Response } from 'express';
import { ZodIssue, ZodSchema } from 'zod';
import statusCodes from '@core/statusCodes';

export const formatErrorMessage = (errors: ZodIssue[]) => {
  return errors.map((error: ZodIssue) => {
    return `Error in field (${error.path.join('.')}): ${error.message}`;
  });
};

const inspect =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      const error_description = formatErrorMessage(result.error.errors);
      res.status(statusCodes.BAD_REQUEST).json({
        error: {
          message: 'invalid_request_body',
          statusCode: 400,
          info: error_description,
        },
      });
      return;
    }

    req.body = result.data;
    next();
  };

export default inspect;
