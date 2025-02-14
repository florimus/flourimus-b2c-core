import { NextFunction, Request, Response } from 'express';
import hasPermission from '../../middleware/permissonValidator';

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
        if (res.locals) {
            res.locals.permisson = 'pdl:r,pll:w,pdp:r,pdo:r';
        }
        const middleware = hasPermission('pdl:r');

        await middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return 403 if user does not have the required permission', async () => {
        if (res.locals) {
            res.locals.permisson = 'pll:w,pdp:r,pdo:r';
        }
        const middleware = hasPermission('pdl:r');

        await middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Forbidden: You do not have permission to access this resource',
        });
        expect(next).not.toHaveBeenCalled();
    });
});