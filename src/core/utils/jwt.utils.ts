import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import config from '@config';
import jwt from 'jsonwebtoken';

const expiry = {
  accessToken: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
  refreshToken: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
};

export type TokenTypes = keyof typeof expiry;

/**
 * Generates a JSON Web Token (JWT) for the given payload and token type.
 *
 * @param payload - The payload to be included in the JWT.
 * @param tokenType - The type of token to be generated, which determines the expiration time.
 * @returns {string} The generated JWT as a string.
 */
export const generateToken = (
  payload: object,
  tokenType: TokenTypes
): string => {
  const secret = config.JWT_SECRET!;

  const expiresIn = expiry[tokenType];

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
};

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET!);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnAuthorized('Token has expired');
    }
    throw new UnAuthorized('Invalid token');
  }
};
