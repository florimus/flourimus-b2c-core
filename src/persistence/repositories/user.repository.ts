import { User } from '@core/types';
import UserSchema from '@persistence/schemas/user.schema';

/**
 * Creates a new user in the database.
 *
 * @param {User} user - The user object to be created.
 * @returns {Promise<User>} A promise that resolves to the created user.
 */
const createUser = async (user: User) => {
  return await new UserSchema(user).save() as User;
};

/**
 * Checks if a user with the given email and active status exists in the database.
 *
 * @param email - The email of the user to check.
 * @param isActive - The active status of the user. Defaults to true.
 * @returns {Promise<Boolean>} A promise that resolves to a boolean indicating whether the user exists.
 */
const isExistingUser = async (email: string, isActive: boolean = true) => {
  const userExists = await UserSchema.exists({ email, isActive });
  return userExists !== null;
};

export default {
  createUser,
  isExistingUser,
};
