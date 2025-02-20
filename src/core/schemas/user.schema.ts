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

export const LoginUserRequestSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'password is required' })
    .min(8, 'Password must be at least 8 characters long'),
});

export const UserUpdateRequestSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .or(z.literal(''))
    .optional(),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .or(z.literal(''))
    .optional(),
  phone: z
    .union([
      z.null(),
      z.object({
        dialCode: z
          .string()
          .regex(
            /^\+\d{1,3}$/,
            'Dial code must start with + and contain 1-3 digits'
          ),
        number: z
          .string()
          .regex(/^\d{10}$/, 'Number must be exactly 10 digits'),
      }),
    ])
    .optional(),
});

export const ResetPasswordRequestSchema = z.object({
  password: z
    .string({ required_error: 'password is required' })
    .min(8, 'Password must be at least 8 characters long'),
});
