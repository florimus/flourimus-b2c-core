import { Request, Response } from 'express';

import Logger from '@core/logger';
import status from '@statusCodes';
import userService from '@src/service/user.service';

/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Register a new customer
 *     description: Register a new customer to the b2c platform.
 *     tags:
 *       - User APis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "invalid_request_body"
 *               statusCode: 400
 *               info: []
 */
export const registerUser = async (req: Request, res: Response) => {
  Logger.info('Received request to register a new user: {}', JSON.stringify(req.body));
  res.status(status.CREATED).json(await userService.registerUser(req.body));
};
