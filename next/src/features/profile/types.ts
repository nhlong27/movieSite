import { z } from 'zod';

const UserUpdateResponse = z.object({
  _id: z.string({ required_error: 'Id is not in response' }),
  email: z.string().email('Email is not in response'),
  name: z.string({ required_error: 'Name is not in response' }),
  createdAt: z.string({ required_error: 'Create date is not in response' }),
  updatedAt: z.string({ required_error: 'Update date is not in response' }),
  avatar: z.string().optional(),
});

const UserQueryResponse = z.object({
  _id: z.string({ required_error: 'Id is not in response' }),
  email: z.string().email('Email is not in response'),
  name: z.string({ required_error: 'Name is not in response' }),
  createdAt: z.string({ required_error: 'Create date is not in response' }),
  updatedAt: z.string({ required_error: 'Update date is not in response' }),
  avatar: z.string().optional(),
});

const UserInfoUpdateForm = z.object({
  name: z.string().min(1, { message: 'Username is required' }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
});

const UserAvatarUpdateForm = z.object({
  avatar_url: z.string().min(1, { message: 'File path is required' }),
});

const UserPasswordUpdateForm = z
  .object({
    newPassword: z
      .string().min(1, { message: 'New password is required' })
      .min(6, 'Password is too short - should be 6 characters minimum'),
    confirmPassword: z.string().min(1, {message: 'Type your old password to confirm'}),
  })
  .refine((data) => data.newPassword !== data.confirmPassword, {
    message: 'Password is the same as your old one. Choose a different password',
    path: ['confirmPassword'],
  });

const UserDeactivateForm = z.object({
  password: z.string().min(1, { message: 'Type your password to confirm' }),
});

const ShowQueryResponse = z.object({
  user: z.string({ required_error: 'User Id not found.' }),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  media_type: z.string().optional(),
  season_number: z.number().optional(),
  id: z.string({ required_error: 'Show Id not found' }),
  status: z.string().optional(),
  isFavorited: z.boolean().optional(),
  score: z.number().optional(),
  createdAt: z.string({ required_error: 'Create time not found.' }),
  updatedAt: z.string({ required_error: 'Update time not found.' }),
});
const ShowUpdateForm = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  media_type: z.string().optional(),
  season_number: z.number().optional(),
  status: z.string().optional(),
  isFavorited: z.boolean().optional(),
  score: z.number().optional(),
});

const MultipleShowsQueryResponse = z.array(ShowQueryResponse);

type MultipleShowsQueryResponseType = z.infer<typeof MultipleShowsQueryResponse>;

type ShowQueryResponseType = z.infer<typeof ShowQueryResponse>;

type UserInfoUpdateFormType = z.infer<typeof UserInfoUpdateForm>;
type UserAvatarUpdateFormType = z.infer<typeof UserAvatarUpdateForm>;
type UserPasswordUpdateFormType = z.infer<typeof UserPasswordUpdateForm>;

type UserDeactivateFormType = z.infer<typeof UserDeactivateForm>;

type UserUpdateResponseType = z.infer<typeof UserUpdateResponse>;

type UserQueryResponseType = z.infer<typeof UserQueryResponse>;

type ShowUpdateFormType = z.infer<typeof ShowUpdateForm>;

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
  UserQueryResponseType,
  MultipleShowsQueryResponse,
  MultipleShowsQueryResponseType,
  ShowQueryResponseType,
  ShowQueryResponse,
  ShowUpdateForm,
  ShowUpdateFormType,
};
