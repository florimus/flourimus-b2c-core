import { CreateSSOUserRequestSchema, CreateUserRequestSchema } from '@core/schemas/user.schema';
import TokenTypes from '@core/enums/token.types';
import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name (optional)
 *         email:
 *           type: string
 *           description: The user's email
 *         phone:
 *           type: object
 *           properties:
 *             dialCode:
 *               type: string
 *               description: The phone dial code
 *             number:
 *               type: string
 *               description: The phone number
 *           description: The user's phone number (optional)
 *         password:
 *           type: string
 *           description: The user's password (optional)
 *         role:
 *           type: string
 *           description: The user's role
 *         isBlocked:
 *           type: boolean
 *           description: Whether the user is blocked
 *         loginType:
 *           type: string
 *           enum: [password, google]
 *           description: The login type
 *         token:
 *           type: string
 *           description: The user's token (optional)
 *         version:
 *           type: number
 *           description: The version of the user
 *         isActive:
 *           type: boolean
 *           description: Whether the user is active
 *       required:
 *         - version
 *         - _id
 *         - firstName
 *         - email
 *         - role
 *         - isBlocked
 *         - loginType
 *         - isActive
 */
export interface User extends CommonTypes {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: {
    dialCode: string;
    number: string;
  };
  password?: string;
  role: string;
  isBlocked: boolean;
  loginType: 'password' | 'google';
  token?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       required:
 *         - name
 *         - email
 *         - password
 */
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export interface AccessTokenPayload {
  _id: string;
  email: string;
  role: string;
  type: TokenTypes.accessToken;
} 

export interface RefreshTokenPayload {
  _id: string;
  type: TokenTypes.refreshToken;
} 

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The access token
 *         refreshToken:
 *           type: string
 *           description: The refresh token
 *       required:
 *         - accessToken
 *         - refreshToken
 */
export interface Token {
  accessToken: string;
  refreshToken: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateSSOUserRequest:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: google-auth-token
 *       required:
 *         - token
 */
export type CreateSSOUserRequest = z.infer<typeof CreateSSOUserRequestSchema>;

interface CommonTypes {
  version?: number;
  isActive?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  metaStatus?: string;
}
