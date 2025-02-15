import {
  mockCreateSSOUserRequest,
  mockCreateUserRequest,
  mockCreateUserResponse,
} from '@fixtures/user.service.fixtures';

import Conflict from '@src/errorBoundary/custom/conflict.error';
import decryptGoogleToken from '@src/auth/googleTokenValidator';
import userRepository from '@persistence/repositories/user.repository';
import userService from '@service/user.service';

jest.mock('@persistence/repositories/user.repository');
jest.mock('@helpers/user.helper');
jest.mock('@src/auth/googleTokenValidator');

describe('registerUser', () => {
  it('should return a successful response', async () => {
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toBeDefined();
  });

  it('should return a access token', async () => {
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
