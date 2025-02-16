import { NextFunction, Request, Response } from 'express';
import Logger from '@core/logger';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { User } from '@core/types';
import requestUserValidator from '../../middleware/requestUserValidator';
import userService from '@service/user.service';

jest.mock('@core/logger');
jest.mock('@service/user.service');

describe('requestUserValidator', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            locals: {}
        };
        next = jest.fn();
    });

    it('should throw UnAuthorized error if email is not found in token', async () => {
        res.locals = res.locals || {};
        res.locals.email = undefined;

        await expect(requestUserValidator(req as Request, res as Response, next)).rejects.toThrow(UnAuthorized);
        expect(Logger.error).toHaveBeenCalledWith('Email not found in token');
    });

    it('should throw UnAuthorized error if user does not exist', async () => {
        res.locals = res.locals || {};
        res.locals = res.locals || {};
        res.locals = res.locals || {};
        res.locals.email = 'test@example.com';
        (userService.myInfo as jest.Mock).mockResolvedValue(null);

        await expect(requestUserValidator(req as Request, res as Response, next)).rejects.toThrow(UnAuthorized);
        expect(Logger.error).toHaveBeenCalledWith('User with the given email not exists');
    });

    it('should set res.locals.role and res.locals._id if user exists', async () => {
        const user: User = { _id: '123', role: 'admin', email: 'test@example.com', firstName: 'Test', isBlocked: false, loginType: 'password' };
        res.locals!.email = 'test@example.com';
        (userService.myInfo as jest.Mock).mockResolvedValue(user);

        await requestUserValidator(req as Request, res as Response, next);

        expect(res.locals!.role).toBe(user.role);
        expect(res.locals!._id).toBe(user._id);
        expect(next).toHaveBeenCalled();
    });
});