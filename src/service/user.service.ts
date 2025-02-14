import { CreateUserRequest, User } from '@core/types';

/**
 * Registers a new user with the provided user creation request.
 *
 * @param createUserRequest - The request object containing user creation details.
 * @returns {User} - A promise that resolves to the created user object.
 */
const registerUser: (
  createUserRequest: CreateUserRequest
) => Promise<User> = async (createUserRequest) => {
  const dummyUser: User = {
    id: 1,
    name: createUserRequest.name,
    email: createUserRequest.email,
    password: createUserRequest.password,
    role: 'user',
  };
  return dummyUser;
};

export default {
  registerUser,
};
