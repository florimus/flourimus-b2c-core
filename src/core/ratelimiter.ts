import rateLimit from 'express-rate-limit';

/**
 * Creates a rate limiter middleware with the specified limit.
 *
 * @param {number} [limit=5] - The maximum number of requests allowed within the windowMs timeframe.
 * @returns {Function} The rate limiter middleware.
 *
 */
const limiter = (limit: number = 5, timeFrame: number = 5) =>
  rateLimit({
    windowMs: timeFrame * 1000,
    max: limit,
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

export default limiter;
