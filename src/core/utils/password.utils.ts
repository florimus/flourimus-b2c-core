import bcrypt from 'bcrypt';
import runtimeConfig from '@config';

const SALT_ROUNDS = Number(runtimeConfig.SALT_ROUNDS!);

/**
 * Hashes a password using bcrypt.
 *
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain text password with a hashed password.
 *
 * @param password - The plain text password to compare.
 * @param hash - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
