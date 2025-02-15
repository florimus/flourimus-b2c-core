import { TokenTypes, generateToken } from '../../core/utils/jwt.utils';
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