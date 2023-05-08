import { z } from 'zod';

const SignUpResponse = z.object({
  _id: z.string({ required_error: 'Id is not in response' }),
  email: z.string().email('Email is not in response'),
  name: z.string({ required_error: 'Name is not in response' }),
  createdAt: z.string({ required_error: 'Create date is not in response' }),
  updatedAt: z.string({ required_error: 'Update date is not in response' }),
});

const SignUpForm = z
  .object({
    name: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password is too short - should be 6 characters minimum' }),
    passwordConfirmation: z.string().min(1, { message: 'This field has to be filled' }),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled' })
      .email('This is not a valid email'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

const SignInForm = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
});

const SignInResponse = z.object({
  _id: z.string({ required_error: 'Id is not in response' }),
  email: z.string().email('Email is not in response'),
  name: z.string({ required_error: 'Name is not in response' }),
  createdAt: z.string({ required_error: 'Create date is not in response' }),
  updatedAt: z.string({ required_error: 'Update date is not in response' }),
  avatar: z.string().optional(),
});

type SignUpResponseType = z.infer<typeof SignUpResponse>;

type SignInResponseType = z.infer<typeof SignInResponse>;

type SignUpFormType = z.infer<typeof SignUpForm>;
type SignInFormType = z.infer<typeof SignInForm>;

export {
  SignUpForm,
  SignInForm,
  SignUpResponse,
  SignUpResponseType,
  SignInResponse,
  SignInResponseType,
  SignUpFormType,
  SignInFormType,
};
