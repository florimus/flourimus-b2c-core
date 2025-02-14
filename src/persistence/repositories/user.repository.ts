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

export default {
  createUser,
};
