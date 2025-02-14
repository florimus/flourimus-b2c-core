import { CreateUserRequest, User } from '@core/types';
import { randomUUID } from 'crypto';
import userRepository from '@persistence/repositories/user.repository';

/**
 * Registers a new user with the provided user creation request.
 *
 * @param createUserRequest - The request object containing user creation details.
 * @returns {User} - A promise that resolves to the created user object.
 */
const registerUser: (
  createUserRequest: CreateUserRequest
) => Promise<User> = async (createUserRequest) => {
  const user: User = {
    version: 1,
    _id: randomUUID(),
    firstName: createUserRequest.name,
    email: createUserRequest.email,
    role: 'CUSTOMER',
    isBlocked: false,
    loginType: 'password',
  };
  return await userRepository.createUser(user);
};

export default {
  registerUser,
};
