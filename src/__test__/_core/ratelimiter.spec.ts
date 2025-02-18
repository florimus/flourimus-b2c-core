import limiter from '@core/ratelimiter';
import rateLimit from 'express-rate-limit';
import statusCodes from '@core/statusCodes';

jest.mock('express-rate-limit');

describe('Rate Limiter Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a rate limiter with default values', () => {
        limiter();

        expect(rateLimit).toHaveBeenCalledWith({
            windowMs: 5 * 1000,
            max: 5,
            message: {
                message: 'Too many attempts, please try again later.',
                statusCode: statusCodes.TOO_MANY_REQUEST,
            },
            standardHeaders: false,
            legacyHeaders: false,
        });
    });

    it('should create a rate limiter with custom values', () => {
        limiter(10, 60);

        expect(rateLimit).toHaveBeenCalledWith({
            windowMs: 60 * 1000,
            max: 10,
            message: {
                message: 'Too many attempts, please try again later.',
                statusCode: statusCodes.TOO_MANY_REQUEST,
            },
            standardHeaders: false,
            legacyHeaders: false,
        });
    });
});