import { NextFunction, Request, Response } from 'express';
import { ZodSchema, z } from 'zod';
import inspect from '../../middleware/requestInspect';
import statusCodes from '@core/statusCodes';

describe('inspect middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if schema validation passes', () => {
    const schema: ZodSchema = z.object({
      name: z.string(),
    });

    req.body = { name: 'John Doe' };

    const middleware = inspect(schema);
    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 400 if schema validation fails', () => {
    const schema: ZodSchema = z.object({
      name: z.string(),
    });

    req.body = { name: 123 };

    const middleware = inspect(schema);
    middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      error: {
        message: 'invalid_request_body',
        statusCode: 400,
        info: expect.any(Array),
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should format error messages correctly', () => {
    const schema: ZodSchema = z.object({
      name: z.string(),
    });

    req.body = { name: 123 };

    const middleware = inspect(schema);
    middleware(req as Request, res as Response, next);

    const errorDescription = (res.json as jest.Mock).mock.calls[0][0].error
      .info;
    expect(errorDescription).toEqual([
      'Error in field (name): Expected string, received number',
    ]);
  });

  it('should not modify req.body if schema validation fails', () => {
    const schema: ZodSchema = z.object({
      name: z.string(),
    });

    req.body = null;

    const middleware = inspect(schema);
    middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(statusCodes.BAD_REQUEST);
  });
});
