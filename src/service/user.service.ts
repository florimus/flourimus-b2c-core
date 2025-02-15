import { CreateUserRequest, User } from '@core/types';
import Conflict from '@src/errorBoundary/custom/conflict.error';
import { hashPassword } from '@core/utils/password.utils';
import { randomUUID } from 'crypto';
import roles from '@core/enums/user.roles';
import userRepository from '@persistence/repositories/user.repository';

/**
 * Checks if a user with the given email exists in the repository.
 *
 * @param email - The email address of the user to check.
 * @param active - Optional. If provided, checks if the user is active or not.
 * @returns A promise that resolves to a boolean indicating whether the user exists.
 */
const isExistingUser: (
  email: string,
) => Promise<boolean> = async (email) => userRepository.isExistingUser(email);

/**
 * Registers a new user with the provided user creation request.
 *
 * @param createUserRequest - The request object containing user creation details.
 * @returns {User} - A promise that resolves to the created user object.
 */
const registerUser: (
  createUserRequest: CreateUserRequest
) => Promise<User> = async (createUserRequest) => {

  if (await isExistingUser(createUserRequest.email)) {
    throw new Conflict('User with the given email already exists');
  }

  const user: User = {
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
  };
  return await userRepository.createUser(user);
};

export default {
  registerUser,
};
