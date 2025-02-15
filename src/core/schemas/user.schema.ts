import { z } from 'zod';

export const CreateUserRequestSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
      ),
  })
  .superRefine((data, ctx) => {
    const { firstName, email, password } = data;

    if (password.toLowerCase().includes(firstName.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain first name',
        path: ['password'],
      });
    }

    if (password.toLowerCase().includes(email.split('@')[0].toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password should not contain email username',
        path: ['password'],
      });
    }
  });

export const CreateSSOUserRequestSchema = z.object({
  token: z.string({ required_error: 'Token is required' }),
});

export const LoginSSOUserRequestSchema = z.object({
  token: z.string({ required_error: 'Token is required' }),
});
