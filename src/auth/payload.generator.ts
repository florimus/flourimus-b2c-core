import { AccessTokenPayload, RefreshTokenPayload, User } from '@core/types';
import TokenTypes from '@core/enums/token.types';

/**
 * Generates the payload for a user's access token.
 *
 * @param user - The user object containing user details.
 * @returns {AccessTokenPayload} The payload for the access token.
 */
export const createUserAccessTokenPayload = (
  user: User
): AccessTokenPayload => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    type: TokenTypes.accessToken,
  };
};

/**
 * Generates the payload for a user's refresh token.
 *
 * @param user - The user object containing user details.
 * @returns {RefreshTokenPayload} The payload for the refresh token, including the user's ID and token type.
 */
export const createUserRefreshTokenPayload = (
  user: User
): RefreshTokenPayload => {
  return {
    _id: user._id,
    type: TokenTypes.refreshToken,
  };
};
