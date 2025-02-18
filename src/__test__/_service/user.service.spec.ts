import {
  mockCreateSSOUserRequest,
  mockCreateUserRequest,
  mockCreateUserResponse,
} from '@fixtures/user.service.fixtures';

import BadRequest from '@src/errorBoundary/custom/badrequest.error';
import Conflict from '@src/errorBoundary/custom/conflict.error';
import NotFound from '@src/errorBoundary/custom/notFound.error';
import UnAuthorized from '@src/errorBoundary/custom/unauthorized.error';
import { comparePassword } from '@core/utils/password.utils';
import decryptGoogleToken from '@src/auth/googleTokenValidator';
import userHelper from '@helpers/user.helper';
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
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerSSOUser(
      mockCreateSSOUserRequest
    );
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.createUser as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(false);

    const response = await userService.registerSSOUser(
      mockCreateSSOUserRequest
    );
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 409 error when the user already exists', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.isExistingUser as jest.Mock).mockResolvedValue(true);

    await expect(
      userService.registerSSOUser(mockCreateSSOUserRequest)
    ).rejects.toThrow(Conflict);
  });

  it('should return a 409 error when the Google token decryption fails', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue(null);

    await expect(
      userService.registerSSOUser(mockCreateSSOUserRequest)
    ).rejects.toThrow(Conflict);
  });
});

describe('loginSSOUser', () => {
  it('should return a successful response', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );

    const response = await userService.loginSSOUser({ token: 'valid-token' });
    expect(response).toBeDefined();
  });

  it('should return an access token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );

    const response = await userService.loginSSOUser({ token: 'valid-token' });
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );

    const response = await userService.loginSSOUser({ token: 'valid-token' });
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 409 error when the Google token decryption fails', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue(null);

    await expect(
      userService.loginSSOUser({ token: 'invalid-token' })
    ).rejects.toThrow(Conflict);
  });

  it('should return a 401 error when the user does not exist', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      userService.loginSSOUser({ token: 'valid-token' })
    ).rejects.toThrow(UnAuthorized);
  });

  it('should return a 401 error when the user is suspended', async () => {
    (decryptGoogleToken as jest.Mock).mockResolvedValue('test@example.com');
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue({
      ...mockCreateUserResponse,
      isActive: false
    });

    await expect(
      userService.loginSSOUser({ token: 'valid-token' })
    ).rejects.toThrow(UnAuthorized);
  });

});

describe('loginUser', () => {
  it('should return a successful response', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const response = await userService.loginUser({
      email: 'test@example.com',
      password: 'password',
    });
    expect(response).toBeDefined();
  });

  it('should return an access token', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const response = await userService.loginUser({
      email: 'test@example.com',
      password: 'password',
    });
    expect(response).toHaveProperty('accessToken');
  });

  it('should return a refresh token', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (comparePassword as jest.Mock).mockResolvedValue(true);

    const response = await userService.loginUser({
      email: 'test@example.com',
      password: 'password',
    });
    expect(response).toHaveProperty('refreshToken');
  });

  it('should return a 401 error when the user does not exist', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      userService.loginUser({ email: 'test@example.com', password: 'password' })
    ).rejects.toThrow(UnAuthorized);
  });

  it('should return a 409 error when the user is registered with Google SSO', async () => {
    const googleUser = { ...mockCreateUserResponse, loginType: 'google' };
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(googleUser);

    await expect(
      userService.loginUser({ email: 'test@example.com', password: 'password' })
    ).rejects.toThrow(Conflict);
  });

  it('should return a 401 error when the password is incorrect', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (comparePassword as jest.Mock).mockResolvedValue(false);

    await expect(
      userService.loginUser({
        email: 'test@example.com',
        password: 'wrong-password',
      })
    ).rejects.toThrow(UnAuthorized);
  });

  it('should return a 401 error when the user is suspended', async () => {
    const googleUser = { ...mockCreateUserResponse, loginType: 'google', isActive: false };
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(googleUser);

    await expect(
      userService.loginUser({ email: 'test@example.com', password: 'password' })
    ).rejects.toThrow(UnAuthorized);
  });
});

describe('myInfo', () => {
  it('should return user information successfully', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userHelper.convertToUserViewFromUser as jest.Mock).mockReturnValue({
      id: 'user-id',
      email: 'test@example.com',
    });

    const response = await userService.myInfo('test@example.com');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('id', 'user-id');
    expect(response).toHaveProperty('email', 'test@example.com');
  });

  it('should return a 401 error when the user does not exist', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(userService.myInfo('test@example.com')).rejects.toThrow(
      UnAuthorized
    );
  });
});

describe('userStatusUpdate', () => {
  it('should throw bad request error if id not found', async () => {
    await expect(userService.userStatusUpdate()).rejects.toThrow(BadRequest);
  });

  it('should throw notfound error if user not found with id', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(null);

    await expect(userService.userStatusUpdate('invalid-id')).rejects.toThrow(
      NotFound
    );
  });

  it('should save and return response correctly', async () => {
    (userRepository.findUserByEmail as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.findUserById as jest.Mock).mockResolvedValue({
      ...mockCreateUserResponse,
      isActive: false,
      version: 2,
    });

    const response = await userService.userStatusUpdate('valid-id');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('isActive');
    expect(response).toHaveProperty('version');
  });
});

describe('userStatusUpdate', () => {
  it('should throw bad request error if id not found', async () => {
    await expect(userService.userStatusUpdate()).rejects.toThrow(BadRequest);
  });

  it('should throw notfound error if user not found with id', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue(null);

    await expect(userService.userStatusUpdate('invalid-id')).rejects.toThrow(
      NotFound
    );
  });

  it('should save and return response correctly', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userRepository.updateUserById as jest.Mock).mockResolvedValue({
      ...mockCreateUserResponse,
      isActive: false,
      version: 2,
    });

    const response = await userService.userStatusUpdate('valid-id');
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('isActive');
    expect(response).toHaveProperty('version');
  });

  it('should activate a suspended user', async () => {
    const suspendedUser = { ...mockCreateUserResponse, isActive: false };
    (userRepository.findUserById as jest.Mock).mockResolvedValue(
      suspendedUser
    );
    (userRepository.updateUserById as jest.Mock).mockResolvedValue({
      ...suspendedUser,
      isActive: true,
      version: 2,
    });

    const response = await userService.userStatusUpdate('valid-id');
    expect(response).toHaveProperty('message', 'User is Activated');
    expect(response).toHaveProperty('isActive', true);
    expect(response).toHaveProperty('version', 2);
  });

  it('should suspend an active user', async () => {
    const activeUser = { ...mockCreateUserResponse, isActive: true };
    (userRepository.findUserById as jest.Mock).mockResolvedValue(activeUser);
    (userRepository.updateUserById as jest.Mock).mockResolvedValue({
      ...activeUser,
      isActive: false,
      version: 2,
    });

    const response = await userService.userStatusUpdate('valid-id');
    expect(response).toHaveProperty('message', 'User is Suspended');
    expect(response).toHaveProperty('isActive', false);
    expect(response).toHaveProperty('version', 2);
  });
});

describe('getUserInfo', () => {
  it('should return user information successfully', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue(
      mockCreateUserResponse
    );
    (userHelper.convertToUserViewFromUser as jest.Mock).mockReturnValue({
      id: 'user-id',
      email: 'test@example.com',
    });

    const response = await userService.getUserInfo('valid-id');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('id', 'user-id');
    expect(response).toHaveProperty('email', 'test@example.com');
  });

  it('should throw bad request error if id not found', async () => {
    await expect(userService.getUserInfo(null as unknown as string)).rejects.toThrow(BadRequest);
  });

  it('should throw notfound error if user not found with id', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue(null);

    await expect(userService.getUserInfo('invalid-id')).rejects.toThrow(
      NotFound
    );
  });
});

describe('updateUserInfo', () => {
  it('should throw bad request error if id not found', async () => {
    await expect(userService.updateUserInfo(null as unknown as string, {})).rejects.toThrow(BadRequest);
  });

  it('should throw notfound error if user not found with id', async () => {
    (userRepository.findUserById as jest.Mock).mockResolvedValue(null);

    await expect(userService.updateUserInfo('invalid-id', {})).rejects.toThrow(NotFound);
  });

  it('should update user information successfully', async () => {
    const updatedUser = {
      ...mockCreateUserResponse,
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
      version: 2,
    };
    (userRepository.findUserById as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.updateUserById as jest.Mock).mockResolvedValue(updatedUser);
    (userHelper.convertToUserViewFromUser as jest.Mock).mockReturnValue({
      id: 'user-id',
      email: 'test@example.com',
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
    });

    const response = await userService.updateUserInfo('valid-id', {
      firstName: 'UpdatedFirstName',
      lastName: 'UpdatedLastName',
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id', 'user-id');
    expect(response).toHaveProperty('email', 'test@example.com');
    expect(response).toHaveProperty('firstName', 'UpdatedFirstName');
    expect(response).toHaveProperty('lastName', 'UpdatedLastName');
  });

  it('should update user phone number successfully', async () => {
    const updatedUser = {
      ...mockCreateUserResponse,
      phone: { dialCode: '+1', number: '1234567890' },
      version: 2,
    };
    (userRepository.findUserById as jest.Mock).mockResolvedValue(mockCreateUserResponse);
    (userRepository.updateUserById as jest.Mock).mockResolvedValue(updatedUser);
    (userHelper.convertToUserViewFromUser as jest.Mock).mockReturnValue({
      id: 'user-id',
      email: 'test@example.com',
      phone: { dialCode: '+1', number: '1234567890' },
    });

    const response = await userService.updateUserInfo('valid-id', {
      phone: { dialCode: '+1', number: '1234567890' },
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty('id', 'user-id');
    expect(response).toHaveProperty('email', 'test@example.com');
    expect(response).toHaveProperty('phone', { dialCode: '+1', number: '1234567890' });
  });
});
