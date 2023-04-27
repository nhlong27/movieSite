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

const ShowQueryResponse = z.object({
  user: z.string({required_error:"User Id not found."}),
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  media_type: z.string().optional(),
  season_number: z.number().optional(),
  id: z.string({required_error: "Show Id not found"}),
  status: z.string().optional(),
  isFavorited: z.boolean().optional(),
  score: z.number().optional(),
  createdAt: z.string({required_error:"Create time not found."}),
  updatedAt: z.string({required_error:"Update time not found."})
});
const ShowUpdateForm = z.object({
  title: z.string().optional(),
  name: z.string().optional(),
  poster_path: z.string().nullable().optional(),
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
