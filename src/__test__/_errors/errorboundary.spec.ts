import { NextFunction, Request, Response } from 'express';
import errorHandler from '../../errorBoundary/index';
import handleException from '@core/exceptionHandler';

jest.mock('@core/exceptionHandler');

describe('errorHandler', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    it('should call the passed function with req, res, and next', async () => {
        const fn = jest.fn().mockResolvedValue('success');
        const wrappedFunction = errorHandler(fn);

        await wrappedFunction(req as Request, res as Response, next);

        expect(fn).toHaveBeenCalledWith(req, res, next);
    });

    it('should handle exceptions and call handleException', async () => {
        const error = new Error('Test error');
        const fn = jest.fn().mockRejectedValue(error);
        const wrappedFunction = errorHandler(fn);

        await wrappedFunction(req as Request, res as Response, next);

        expect(handleException).toHaveBeenCalledWith(error, res);
    });
});