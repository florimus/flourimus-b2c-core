import { NextFunction, Request, Response } from 'express';
import { AccessTokenPayload } from '@core/types';
import Logger from '@core/logger';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { validateToken } from '@core/utils/jwt.utils';

/**
 * Middleware to validate the JWT token from the request headers.
 * 
 * This middleware checks for the presence of an authorization header
 * and verifies that it contains a valid JWT token. If the token is valid,
 * it extracts the email from the token payload and attaches it to the 
 * response locals. If the token is invalid or missing, it throws an 
 * UnAuthorized error.
 * 
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack.
 * 
 * @throws {UnAuthorized} If the authorization header is missing or the token is invalid.
 */
const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    Logger.error('Invalid token');
    throw new UnAuthorized('Valid JWT token needed to access this api');
  }

  const token = authHeader.split(' ')?.[1];

  const payload = validateToken(token) as AccessTokenPayload;

  if (!payload?.email) {
    throw new UnAuthorized('Incorrect token.');
  }

  res.locals.email = payload.email;

  next();
};

export default tokenValidator;
