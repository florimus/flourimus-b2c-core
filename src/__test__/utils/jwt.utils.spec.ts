import {
  TokenTypes,
  generateToken,
  validateToken,
} from '@core/utils/jwt.utils';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import config from '@config';
import jwt from 'jsonwebtoken';

jest.mock('@config', () => ({
  JWT_SECRET: 'testsecret',
  JWT_ACCESS_TOKEN_EXPIRES_IN: '1h',
  JWT_REFRESH_TOKEN_EXPIRES_IN: '7d',
}));

describe('generateToken', () => {
  const payload = { userId: 1 };

  it('should generate a token with the correct payload and expiry for accessToken', () => {
    const tokenType: TokenTypes = 'accessToken';
    const token = generateToken(payload, tokenType);
    const decoded = jwt.verify(token, config.JWT_SECRET!);

    expect(decoded).toMatchObject(payload);
  });

  it('should generate a token with the correct payload and expiry for refreshToken', () => {
    const tokenType: TokenTypes = 'refreshToken';
    const token = generateToken(payload, tokenType);
    const decoded = jwt.verify(token, config.JWT_SECRET!);

    expect(decoded).toMatchObject(payload);
  });
});

describe('generateToken', () => {
  const payload = { userId: 1 };

  it('should generate a token with the correct payload and expiry for accessToken', () => {
    const tokenType: TokenTypes = 'accessToken';
    const token = generateToken(payload, tokenType);
    const decoded = jwt.verify(token, config.JWT_SECRET!);

    expect(decoded).toMatchObject(payload);
  });

  it('should generate a token with the correct payload and expiry for refreshToken', () => {
    const tokenType: TokenTypes = 'refreshToken';
    const token = generateToken(payload, tokenType);
    const decoded = jwt.verify(token, config.JWT_SECRET!);

    expect(decoded).toMatchObject(payload);
  });
});

describe('validateToken', () => {
  const payload = { userId: 1 };
  const token = generateToken(payload, 'accessToken');

  it('should validate a valid token', () => {
    const decoded = validateToken(token);
    expect(decoded).toMatchObject(payload);
  });

  it('should throw UnAuthorized error for expired token', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new jwt.TokenExpiredError('jwt expired', new Date());
    });

    expect(() => validateToken(token)).toThrow(UnAuthorized);
    expect(() => validateToken(token)).toThrow('Token has expired');
  });

  it('should throw UnAuthorized error for invalid token', () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('invalid token');
    });

    expect(() => validateToken(token)).toThrow(UnAuthorized);
    expect(() => validateToken(token)).toThrow('Invalid token');
  });
});
