import config from '@config';
import jwt from 'jsonwebtoken';

const expiry = {
  accessToken: config.JWT_ACCESS_TOKEN_EXPIRES_IN || '1h',
  refreshToken: config.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d',
};

export type TokenTypes = keyof typeof expiry;

export const generateToken = (payload: object, tokenType: TokenTypes): string => {
  const secret = config.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in config');
  }

  const expiresIn = expiry[tokenType]; 
  
  return jwt.sign(payload, secret, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
};
