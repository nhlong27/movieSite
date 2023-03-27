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
    name: z.string({ required_error: 'Name is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password is too short - should be 6 characters minimum'),
    passwordConfirmation: z.string({
      required_error: 'Confirmation password is required',
    }),
    email: z.string({ required_error: 'Email is required' }).email('Not a valid email'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

const SignInForm = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
})

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

type SignUpFormType = z.infer<typeof SignUpForm>
type SignInFormType = z.infer<typeof SignInForm>

export { SignUpForm, SignInForm, SignUpResponse, SignUpResponseType, SignInResponse, SignInResponseType, SignUpFormType, SignInFormType};
