import { CreateUserRequest, Token, User } from '@core/types';
import {
  createUserAccessTokenPayload,
  createUserRefreshTokenPayload,
} from '@src/auth/payload.generator';
import Conflict from '@src/errorBoundary/custom/conflict.error';
import TokenTypes from '@core/enums/token.types';
import { generateToken } from '@core/utils/jwt.utils';
import userHelper from '@helpers/user.helper';
import userRepository from '@persistence/repositories/user.repository';

/**
 * Checks if a user with the given email exists in the repository.
 *
 * @param email - The email address of the user to check.
 * @param active - Optional. If provided, checks if the user is active or not.
 * @returns A promise that resolves to a boolean indicating whether the user exists.
 */
const isExistingUser: (email: string) => Promise<boolean> = async (email) =>
  userRepository.isExistingUser(email);

/**
 * Registers a new user with the provided user creation request.
 *
 * @param createUserRequest - The request object containing user creation details.
 * @returns {Token} - A promise that resolves to the created token object.
 */
const registerUser: (
  createUserRequest: CreateUserRequest
) => Promise<Token> = async (createUserRequest) => {
  if (await isExistingUser(createUserRequest.email)) {
    throw new Conflict('User with the given email already exists');
  }

  const userRequest: User = await userHelper.convertToUserFromCreateUserRequest(
    createUserRequest
  );

  const user = await userRepository.createUser(userRequest);

  return {
    accessToken: generateToken(
      createUserAccessTokenPayload(user),
      TokenTypes.accessToken
    ),
    refreshToken: generateToken(
      createUserRefreshTokenPayload(user),
      TokenTypes.refreshToken
    ),
  };
};

export default {
  registerUser,
};
