import { CreateUserRequest, User, UserView } from '@core/types';
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

describe('convertToUserViewFromUser', () => {
  it('should convert User to UserView', () => {
    const user: User = {
      version: 1,
      _id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashedPassword123',
      role: roles.CUSTOMER,
      isBlocked: false,
      loginType: 'password',
      isActive: true,
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
      metaStatus: 'active',
      phone: { dialCode: '+1', number: '1234567890' },
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin',
    };

    const expectedUserView: UserView = {
      _id: user._id,
      version: user.version,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      loginType: user.loginType,
      isActive: user.isActive,
      createdAt: user.createdAt,
      createdBy: user.createdBy,
      metaStatus: user.metaStatus,
      phone: user.phone,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
    };

    const result = userHelper.convertToUserViewFromUser(user);

    expect(result).toEqual(expectedUserView);
  });
});
