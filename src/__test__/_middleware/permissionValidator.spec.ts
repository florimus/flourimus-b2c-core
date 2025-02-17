import { NextFunction, Request, Response } from 'express';
import hasPermission from '../../middleware/permissionValidator';

jest.mock('@src/auth/permissions.json', () => ({
  admin: ['read', 'write'],
  user: ['read'],
}));

describe('hasPermission Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      locals: {},
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if user has the required permission', async () => {
    if (res?.locals) {
      res.locals.role = 'admin';
    }
    const middleware = hasPermission('write');

    await middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return 403 if user does not have the required permission', async () => {
    if (res?.locals) {
      res.locals.role = 'user';
    }
    const middleware = hasPermission('write');

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Forbidden: You do not have permission to access this resource',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if role is not defined in res.locals', async () => {
    const middleware = hasPermission('read');

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Forbidden: You do not have permission to access this resource',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if role does not exist in permissionFile', async () => {
    if (res?.locals) {
      res.locals.role = 'guest';
    }
    const middleware = hasPermission('read');

    await middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Forbidden: You do not have permission to access this resource',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
