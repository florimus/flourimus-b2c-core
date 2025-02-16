import {
  CreateSSOUserRequest,
  CreateUserRequest,
  LoginSSOUserRequest,
  LoginUserRequest,
  Token,
  User,
} from '@core/types';
import {
  createUserAccessTokenPayload,
  createUserRefreshTokenPayload,
} from '@src/auth/payload.generator';
import Conflict from '@src/errorBoundary/custom/conflict.error';
import Logger from '@core/logger';
import TokenTypes from '@core/enums/token.types';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { comparePassword } from '@core/utils/password.utils';
import decryptGoogleToken from '@src/auth/googleTokenValidator';
import { generateToken } from '@core/utils/jwt.utils';
import userHelper from '@helpers/user.helper';
import userRepository from '@persistence/repositories/user.repository';

/**
 * Checks if a user with the given email exists in the repository.
 *
 * @param email - The email address of the user to check.
 * @param active - Optional. If provided, checks if the user is active or not.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the user exists.
 */
const isExistingUser: (email: string) => Promise<boolean> = async (email) =>
  userRepository.isExistingUser(email);

/**
 * Finds a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns {Promise<User | null>} A promise that resolves to the user if found, or null if not found.
 */
const findUserByEmail: (email: string) => Promise<User | null> = async (
  email
) => userRepository.findUserByEmail(email);

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
    Logger.error('User with the given email already exists');
    throw new Conflict('User with the given email already exists');
  }

  const userRequest: User = await userHelper.convertToUserFromCreateUserRequest(
    createUserRequest
  );

  const user = await userRepository.createUser(userRequest);
  Logger.info('User {} created successfully', user._id);

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

/**
 * Registers a new SSO (Single Sign-On) user using the provided SSO user request.
 *
 * @param {CreateSSOUserRequest} createSSOUserRequest - The request object containing the SSO user details.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} - An object containing the generated access and refresh tokens.
 *
 * @throws {Conflict} - Throws a Conflict error if the Google token decryption fails or if a user with the given email already exists.
 */
const registerSSOUser = async (createSSOUserRequest: CreateSSOUserRequest) => {
  const email = await decryptGoogleToken(createSSOUserRequest.token);

  if (!email) {
    Logger.error('Failed to decrypt the Google token');
    throw new Conflict('Failed to decrypt the Google token');
  }

  if (await isExistingUser(email)) {
    Logger.error('User with the given email already exists');
    throw new Conflict('User with the given email already exists');
  }

  const userRequest: User = userHelper.convertToUserFromEmail(email);

  const user = await userRepository.createUser(userRequest);
  Logger.info('User {} created successfully', user._id);

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

/**
 * Logs in a user using Single Sign-On (SSO) with a Google token.
 *
 * @param {LoginSSOUserRequest} LoginSSOUser - The request object containing the Google token.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} An object containing the access token and refresh token.
 * @throws {Conflict} If the Google token decryption fails or if the user does not exist.
 */
const loginSSOUser = async (LoginSSOUser: LoginSSOUserRequest) => {
  const email = await decryptGoogleToken(LoginSSOUser.token);

  if (!email) {
    Logger.error('Failed to decrypt the Google token');
    throw new Conflict('Failed to decrypt the Google token');
  }

  const user = await findUserByEmail(email);

  if (!user) {
    Logger.error('User with the given email not exists');
    throw new UnAuthorized('User with the given not exists');
  }

  Logger.info('User {} fetched successfully', user._id);

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

/**
 * Logs in a user based on the provided login request.
 *
 * @param {LoginUserRequest} loginUser - The login request containing the user's email and password.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} - An object containing the access token and refresh token if login is successful.
 * @throws {UnAuthorized} - If the user with the given email does not exist or if the password is incorrect.
 * @throws {Conflict} - If the user is registered with Google SSO and cannot log in with a password.
 */
const loginUser = async (loginUser: LoginUserRequest) => {
  const user = await findUserByEmail(loginUser.email);

  if (!user) {
    Logger.error('User with the given email not exists');
    throw new UnAuthorized('User with the given not exists');
  }

  if (user.loginType !== 'password') {
    Logger.error('Google sso user found, cannot login with password strategy');
    throw new Conflict(
      'User registered with google SSO, please try with Google.'
    );
  }

  Logger.info('User {} fetched successfully', user._id);

  const isPasswordMatched = await comparePassword(
    loginUser.password,
    user.password!
  );

  if (isPasswordMatched) {
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
  }
  Logger.error('Password is incorrect');

  throw new UnAuthorized('Password not matched');
};

export default {
  registerUser,
  registerSSOUser,
  loginSSOUser,
  loginUser,
};
