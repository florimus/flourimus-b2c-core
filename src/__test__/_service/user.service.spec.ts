import {
  mockCreateUserRequest,
  mockCreateUserResponse,
} from '@fixtures/user.service.fixtures';

import Conflict from '@src/errorBoundary/custom/conflict.error';
import userRepository from '@persistence/repositories/user.repository';
import userService from '@service/user.service';

jest.mock('@persistence/repositories/user.repository');
jest.mock('@helpers/user.helper');

describe('registerUser', () => {
  it('should return a successful response', async () => {

    (userRepository.createUser as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toBeDefined();
  });

  it('should return a access token', async () => {

    (userRepository.createUser as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {

    (userRepository.createUser as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 409 error when the user already exists', async () => {
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(true);
  
    await expect(userService.registerUser(mockCreateUserRequest))
      .rejects.toThrow(Conflict);
  });  
});
