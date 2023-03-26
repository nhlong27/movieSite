import { z } from 'zod';

const UserSchema = z.object({
  body: z
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
    }),
});

const UserSignInSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

// const typeEnum = z.enum(['info', 'avatar', 'password']);

const InfoSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Not a valid email').optional(),
  }),
});

const AvatarSchema = z.object({
  body: z.object({
    avatar_url: z.string().optional(),
  }),
});

const ConfirmPasswordSchema = z.object({
  body: z
    .object({
      newPassword: z
        .string({ required_error: 'Password is required' })
        .min(6, 'Password is too short - should be 6 characters minimum'),
      confirmPassword: z.string({
        required_error: 'Confirmation password is required',
      }),
    })
    .refine((data) => data.newPassword !== data.confirmPassword, {
      message: 'Choose a different password',
      path: ['passwordCreation'],
    }),
});

const UserUpdateSchema = z.union([InfoSchema, AvatarSchema, ConfirmPasswordSchema]);

const UserDeactivateSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Confirmation password is required' }),
  }),
});

type UserType = Omit<z.infer<typeof UserSchema>, 'passwordConfirmation'>;

type UserSignInType = z.infer<typeof UserSignInSchema>;

type UserUpdateType = z.infer<typeof UserUpdateSchema>;

type InfoType = z.infer<typeof InfoSchema>
type AvatarType = z.infer<typeof AvatarSchema>
type ConfirmPasswordType = z.infer<typeof ConfirmPasswordSchema>

type UserDeactivateType = z.infer<typeof UserDeactivateSchema>;

export {
  UserSchema,
  UserUpdateSchema,
  UserSignInSchema,
  UserType,
  UserSignInType,
  UserUpdateType,
  UserDeactivateSchema,
  UserDeactivateType,
  InfoType,
  AvatarType,
  ConfirmPasswordType,
};
