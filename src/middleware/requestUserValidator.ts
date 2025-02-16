import { NextFunction, Request, Response } from 'express';
import Logger from '@core/logger';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { User } from '@core/types';
import userService from '@service/user.service';

/**
 * Middleware to validate the user from the request.
 * 
 * This middleware checks if the email is present in the response locals.
 * If the email is not found, it logs an error and throws an UnAuthorized error.
 * It then fetches the user information using the email.
 * If the user is not found, it logs an error and throws an UnAuthorized error.
 * If the user is found, it sets the user's role and _id in the response locals.
 * Finally, it calls the next middleware in the stack.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * 
 * @throws {UnAuthorized} If the email is not found in the token or the user does not exist.
 */
const requestUserValidator = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {

  const email = res.locals.email;

  if (!email) {
    Logger.error('Email not found in token');
    throw new UnAuthorized('Valid JWT token needed to access this api');
  }

  const user: User = await userService.myInfo(email);

  if (!user) {
    Logger.error('User with the given email not exists');
    throw new UnAuthorized('User with the given not exists');
  }

  res.locals.role = user.role;
  res.locals._id = user._id;

  next();
};

export default requestUserValidator;
