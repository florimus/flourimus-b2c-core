import { Request, Response } from 'express';

import Logger from '@core/logger';
import status from '@statusCodes';
import userService from '@src/service/user.service';

/**
 * @swagger
 *
 * /users/register:
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
 *               $ref: '#/components/schemas/Token'
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
  Logger.info('Received request to register a new user');
  res.status(status.CREATED).json(await userService.registerUser(req.body));
};

/**
 * @swagger
 *
 * /users/register-sso:
 *   post:
 *     summary: Register a new SSO user
 *     description: Register a new SSO user to the b2c platform.
 *     tags:
 *       - User APis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: SSO token
 *     responses:
 *       201:
 *         description: The created SSO user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
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
export const registerSSOUser = async (req: Request, res: Response) => {
  Logger.info('Received request to register a new SSO user');
  res.status(status.CREATED).json(await userService.registerSSOUser(req.body));
};

/**
 * @swagger
 *
 * /users/login-sso:
 *   post:
 *     summary: Login SSO user
 *     description: Login SSO user to the b2c platform.
 *     tags:
 *       - User APis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: SSO token
 *     responses:
 *       200:
 *         description: The created SSO user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
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
export const loginSSOUser = async (req: Request, res: Response) => {
  Logger.info('Received request to login a SSO user');
  res.status(status.OK).json(await userService.loginSSOUser(req.body));
};
