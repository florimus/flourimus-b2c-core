import { CreateUserRequest, User } from '@core/types';
import { hashPassword } from '@core/utils/password.utils';
import { randomUUID } from 'crypto';
import roles from '@core/enums/user.roles';
import userHelper from '@helpers/user.helper';

jest.mock('@core/utils/password.utils');
jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('convertToUserFromCreateUserRequest', () => {
  it('should convert CreateUserRequest to User', async () => {
    const createUserRequest: CreateUserRequest = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const hashedPassword = 'hashedPassword123';
    (hashPassword as jest.Mock).mockResolvedValue(hashedPassword);
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
    (randomUUID as jest.Mock).mockReturnValue(mockUUID);

    const expectedUser: User = {
      version: 1,
      _id: mockUUID,
      firstName: createUserRequest.firstName,
      lastName: createUserRequest.lastName,
      email: createUserRequest.email,
      password: hashedPassword,
      role: roles.CUSTOMER,
      isBlocked: false,
      loginType: 'password',
      isActive: true,
    };

    const result = await userHelper.convertToUserFromCreateUserRequest(
      createUserRequest
    );

    expect(result).toEqual(expectedUser);
    expect(hashPassword).toHaveBeenCalledWith(createUserRequest.password);
    expect(randomUUID).toHaveBeenCalled();
  });
});

describe('convertToUserFromEmail', () => {
  it('should convert email to User', () => {
    const email = 'john.doe@example.com';
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
    (randomUUID as jest.Mock).mockReturnValue(mockUUID);

    const expectedUser: User = {
      version: 1,
      _id: mockUUID,
      firstName: 'john.doe',
      lastName: '',
      email,
      role: roles.CUSTOMER,
      isBlocked: false,
      loginType: 'google',
      isActive: true,
    };

    const result = userHelper.convertToUserFromEmail(email);

    expect(result).toEqual(expectedUser);
    expect(randomUUID).toHaveBeenCalled();
  });
});