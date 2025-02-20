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

/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Login user to the b2c platform.
 *     tags:
 *       - User APis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: The logged in user
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
export const loginUser = async (req: Request, res: Response) => {
  Logger.info('Received request to login a user');
  res.status(status.OK).json(await userService.loginUser(req.body));
};

/**
 * @swagger
 *
 * /users/my-info:
 *   get:
 *     summary: Get my info
 *     description: Retrieve information about the authenticated user.
 *     tags:
 *       - User APis
 *     responses:
 *       200:
 *         description: The authenticated user's information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserView'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "unauthorized"
 *               statusCode: 401
 *               info: []
 */
export const myInfo = async (_req: Request, res: Response) => {
  Logger.info('Received request to get my info');
  res.status(status.OK).json(await userService.myInfo(res.locals.email));
};

/**
 * @swagger
 *
 * /users/:id/status:
 *   get:
 *     summary: Update user's status
 *     description: Update users status
 *     tags:
 *       - User APis
 *     responses:
 *       200:
 *         description: Updated user's status
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "User is Activated/Suspended"
 *               isActive: true/false
 *               version: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "unauthorized"
 *               statusCode: 401
 *               info: []
 */
export const userStatusUpdate = async (req: Request, res: Response) => {
  Logger.info('Received request to update user status');
  res
    .status(status.OK)
    .json(await userService.userStatusUpdate(req.params.id, res.locals.email));
};

/**
 * @swagger
 *
 * /users/:id:
 *   get:
 *     summary: Get user info
 *     description: Retrieve information about the user with id.
 *     tags:
 *       - User APis
 *     responses:
 *       200:
 *         description: The user's information with id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserView'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "unauthorized"
 *               statusCode: 401
 *               info: []
 */
export const getUserInfo = async (req: Request, res: Response) => {
  Logger.info('Received request to view user info');
  res.status(status.OK).json(await userService.getUserInfo(req.params.id));
};

/**
 * @swagger
 *
 * /users/my-info:
 *   post:
 *     summary: Update user info
 *     description: Update information about the user.
 *     tags:
 *       - User APis
 *     responses:
 *       200:
 *         description: The user's information will be updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserView'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "unauthorized"
 *               statusCode: 401
 *               info: []
 */
export const updateUserInfo = async (req: Request, res: Response) => {
  Logger.info('Received request to update user info');
  res
    .status(status.OK)
    .json(
      await userService.updateUserInfo(
        req.params.id,
        req.body,
        res.locals.email
      )
    );
};

/**
 * @swagger
 *
 * /users:
 *   put:
 *     summary: Update current user info
 *     description: Update information about the authenticated user.
 *     tags:
 *       - User APis
 *     responses:
 *       200:
 *         description: The authenticated user's information will be updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserView'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "unauthorized"
 *               statusCode: 401
 *               info: []
 */
export const updateMyInfo = async (req: Request, res: Response) => {
  Logger.info('Received request to update my info');
  res
    .status(status.OK)
    .json(await userService.updateMyInfo(res.locals.id, req.body));
};

/**
 * @swagger
 *
 * /users/forgot-password:
 *   get:
 *     summary: Forgot password api
 *     description: API for forgot password token generation
 *     tags:
 *       - User APis
 *     responses:
 *       200:
 *         description: Reset password token generated.
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "Password reset link send to user's email"
 *               version: 1
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               message: "unauthorized"
 *               statusCode: 401
 *               info: []
 */
export const forgotPassword = async (req: Request, res: Response) => {
  Logger.info('Received request to forgot password');
  res
    .status(status.OK)
    .json(await userService.forgotPassword(res.locals.id));
};

export const resetPassword = async (req: Request, res: Response) => {
  Logger.info('Received request to reset password');
  res
    .status(status.OK)
    .json(await userService.resetPassword(req.params.token, req.body));
};
