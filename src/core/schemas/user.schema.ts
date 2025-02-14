import { z } from 'zod';

export const CreateUserRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(2, 'Invalid email format')
});
