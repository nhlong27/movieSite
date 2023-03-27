import { z } from 'zod';

const UserUpdateResponse = z.object({
  _id: z.string({ required_error: 'Id is not in response' }),
  email: z.string().email('Email is not in response'),
  name: z.string({ required_error: 'Name is not in response' }),
  createdAt: z.string({ required_error: 'Create date is not in response' }),
  updatedAt: z.string({ required_error: 'Update date is not in response' }),
  avatar: z.string().optional()
});

const UserQueryResponse = z.object({
  _id: z.string({ required_error: 'Id is not in response' }),
  email: z.string().email('Email is not in response'),
  name: z.string({ required_error: 'Name is not in response' }),
  createdAt: z.string({ required_error: 'Create date is not in response' }),
  updatedAt: z.string({ required_error: 'Update date is not in response' }),
  avatar: z.string().optional()
});

const UserInfoUpdateForm = z.object({
  name: z.string().optional(),
  email: z.string().email('Not a valid email').optional(),
});

const UserAvatarUpdateForm = z.object({
  avatar_url: z.string({ required_error: 'Avatar file is required' }),
});

const UserPasswordUpdateForm = z
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
  });

const UserDeactivateForm = z.object({
  password: z.string({ required_error: 'Confirmation password is required' }),
});

type UserInfoUpdateFormType = z.infer<typeof UserInfoUpdateForm>;
type UserAvatarUpdateFormType = z.infer<typeof UserAvatarUpdateForm>;
type UserPasswordUpdateFormType = z.infer<typeof UserPasswordUpdateForm>;

type UserDeactivateFormType = z.infer<typeof UserDeactivateForm>;

type UserUpdateResponseType = z.infer<typeof UserUpdateResponse>;

type UserQueryResponseType = z.infer<typeof UserQueryResponse>;



export {
  UserInfoUpdateForm,
  UserInfoUpdateFormType,
  UserAvatarUpdateForm,
  UserAvatarUpdateFormType,
  UserPasswordUpdateForm,
  UserPasswordUpdateFormType,
  UserDeactivateForm,
  UserDeactivateFormType,
  UserUpdateResponse,
  UserUpdateResponseType,
  UserQueryResponse,
  UserQueryResponseType
};
