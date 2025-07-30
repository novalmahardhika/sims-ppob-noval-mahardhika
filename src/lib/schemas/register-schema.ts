import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    first_name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmation_password: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmation_password, {
    path: ['confirmation_password'],
    message: "Passwords don't match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const registerDefaultValues: RegisterSchemaType = {
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirmation_password: ''
}