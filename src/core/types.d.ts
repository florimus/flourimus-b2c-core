import { CreateUserRequestSchema } from '@core/schemas/user.schema';
import { z } from 'zod';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *       required:
 *         - id
 *         - name
 *         - email
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
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
