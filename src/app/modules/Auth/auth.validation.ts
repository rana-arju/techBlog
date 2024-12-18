import { z } from 'zod';

const registrationValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8),
    isBlocked: z.boolean().default(false).optional(),
    role: z.enum(['admin', 'user']).default('user').optional(),
  }),
});
const loginValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const authValidation = {
  registrationValidation,
  loginValidation,
};
