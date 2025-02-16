import { NextFunction, Request, Response } from 'express';
import { AccessTokenPayload } from '@core/types';
import Logger from '@core/logger';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { validateToken } from '@core/utils/jwt.utils';

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
