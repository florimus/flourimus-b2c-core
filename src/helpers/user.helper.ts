import { CreateUserRequest, User } from '@core/types';
import { hashPassword } from '@core/utils/password.utils';
import { randomUUID } from 'crypto';
import roles from '@core/enums/user.roles';

/**
 * Converts a CreateUserRequest object to a User object.
 *
 * @param createUserRequest - The request object containing user details.
 * @returns {Promise<User>} A promise that resolves to a User object.
 */
const convertToUserFromCreateUserRequest = async (
  createUserRequest: CreateUserRequest
): Promise<User> => ({
  version: 1,
  _id: randomUUID(),
  firstName: createUserRequest.firstName,
  lastName: createUserRequest.lastName,
  email: createUserRequest.email,
  password: await hashPassword(createUserRequest.password),
  role: roles.CUSTOMER,
  isBlocked: false,
  loginType: 'password',
  isActive: true,
});

export default {
  convertToUserFromCreateUserRequest,
};
