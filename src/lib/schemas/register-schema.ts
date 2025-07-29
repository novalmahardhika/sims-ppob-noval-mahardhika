import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmationPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmationPassword, {
    path: ['confirmationPassword'],
    message: "Passwords don't match",
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const registerDefaultValues: RegisterSchemaType = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmationPassword: ''
}