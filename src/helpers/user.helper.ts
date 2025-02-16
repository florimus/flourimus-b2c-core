import { CreateUserRequest, User, UserView } from '@core/types';
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

/**
 * Extracts the username from an email address.
 *
 * @param email - The email address to extract the username from.
 * @returns The username part of the email address.
 */
const getUsernameFromEmail = (email: string): string => {
  return email.split('@')[0];
};

/**
 * Converts an email address to a User object.
 *
 * @param email - The email address to convert.
 * @returns {User} A User object with the provided email and default values for other properties.
 */
const convertToUserFromEmail = (
  email: string
): User => ({
  version: 1,
  _id: randomUUID(),
  firstName: getUsernameFromEmail(email),
  lastName: '',
  email,
  role: roles.CUSTOMER,
  isBlocked: false,
  loginType: 'google',
  isActive: true,
});

/**
 * Converts a User object to a UserView object.
 *
 * @param user - The User object to convert.
 * @returns {UserView} A UserView object with selected properties from the User object.
 */
const convertToUserViewFromUser = (user: User): UserView => {
  return {
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
};

export default {
  convertToUserFromCreateUserRequest,
  convertToUserFromEmail,
  convertToUserViewFromUser
};
