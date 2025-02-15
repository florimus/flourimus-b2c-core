import { User } from '@core/types';
import UserSchema from '@persistence/schemas/user.schema';

/**
 * Creates a new user in the database.
 *
 * @param {User} user - The user object to be created.
 * @returns {Promise<User>} A promise that resolves to the created user.
 */
const createUser = async (user: User) => {
  return (await new UserSchema(user).save()) as User;
};

/**
 * Checks if a user with the given email in the database.
 *
 * @param email - The email of the user to check.
 * @returns {Promise<Boolean>} A promise that resolves to a boolean indicating whether the user exists.
 */
const isExistingUser = async (email: string) => {
  const userExists = await UserSchema.exists({ email: { $eq: email } });
  return userExists !== null;
};

/**
 * Finds a user by their email address.
 *
 * @param email - The email address of the user to find.
 * @returns {Promise<User>} A promise that resolves to the user document if found, or null if not found.
 */
const findUserByEmail = async (email: string) => {
  return (await UserSchema.findOne({ email: { $eq: email } })) as User;
};

export default {
  createUser,
  isExistingUser,
  findUserByEmail,
};
