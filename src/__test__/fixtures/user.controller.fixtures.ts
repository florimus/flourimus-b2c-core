import { Response } from 'express';
import { User } from '@core/types';

export const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;

export const dummyUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  password: 'password',
  role: 'user',
};
