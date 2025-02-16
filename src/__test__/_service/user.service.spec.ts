import {
  mockCreateSSOUserRequest,
  mockCreateUserRequest,
  mockCreateUserResponse,
} from '@fixtures/user.service.fixtures';

import Conflict from '@src/errorBoundary/custom/conflict.error';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { comparePassword } from '@core/utils/password.utils';
import decryptGoogleToken from '@src/auth/googleTokenValidator';
import userRepository from '@persistence/repositories/user.repository';
import userService from '@service/user.service';

jest.mock('@persistence/repositories/user.repository');
jest.mock('@helpers/user.helper');
jest.mock('@src/auth/googleTokenValidator');
jest.mock('@core/utils/password.utils', () => ({
  comparePassword: jest.fn(),
}));

describe('registerUser', () => {
  it('should return a successful response', async () => {
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toBeDefined();
  });

  it('should return an access token', async () => {
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 409 error when the user already exists', async () => {
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(true);

    await expect(
      userService.registerUser(mockCreateUserRequest)
    ).rejects.toThrow(Conflict);
  });
});

describe('registerSSOUser', () => {
  it('should return a successful response', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerSSOUser(
      mockCreateSSOUserRequest
    );
    expect(response).toBeDefined();
  });

  it('should return an access token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.createUser as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerSSOUser(mockCreateSSOUserRequest);
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.createUser as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerSSOUser(mockCreateSSOUserRequest);
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 409 error when the user already exists', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(true);

    await expect(userService.registerSSOUser(mockCreateSSOUserRequest))
      .rejects.toThrow(Conflict);
  });

  it('should return a 409 error when the Google token decryption fails', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue(null);

    await expect(userService.registerSSOUser(mockCreateSSOUserRequest))
      .rejects.toThrow(Conflict);
  });
});

describe('loginSSOUser', () => {
  it('should return a successful response', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);

    const response = await userService.loginSSOUser({ token: 'valid-token' });
    expect(response).toBeDefined();
  });

  it('should return an access token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);

    const response = await userService.loginSSOUser({ token: 'valid-token' });
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);

    const response = await userService.loginSSOUser({ token: 'valid-token' });
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 409 error when the Google token decryption fails', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue(null);

    await expect(userService.loginSSOUser({ token: 'invalid-token' }))
      .rejects.toThrow(Conflict);
  });

  it('should return a 401 error when the user does not exist', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(userService.loginSSOUser({ token: 'valid-token' }))
      .rejects.toThrow(UnAuthorized);
  });
});

describe('loginUser', () => {
  it('should return a successful response', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const response = await userService.loginUser({ email: 'test@example.com', password: 'password' });
    expect(response).toBeDefined();
  });

  it('should return an access token', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const response = await userService.loginUser({ email: 'test@example.com', password: 'password' });
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const response = await userService.loginUser({ email: 'test@example.com', password: 'password' });
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 401 error when the user does not exist', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(userService.loginUser({ email: 'test@example.com', password: 'password' }))
      .rejects.toThrow(UnAuthorized);
  });

  it('should return a 409 error when the user is registered with Google SSO', async () => {
    const googleUser = { ...mockCreateUserResponse, loginType: 'google' };
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(googleUser);

    await expect(userService.loginUser({ email: 'test@example.com', password: 'password' }))
      .rejects.toThrow(Conflict);
  });

  it('should return a 401 error when the password is incorrect', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(userService.loginUser({ email: 'test@example.com', password: 'wrong-password' }))
      .rejects.toThrow(UnAuthorized);
  });
});
