import { NextFunction, Request, Response } from 'express';
import Logger from '@core/logger';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { User } from '@core/types';
import userService from '@service/user.service';

const requestUserValidator = async (
  req: Request,
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
