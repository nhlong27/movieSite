import { z } from 'zod';

const commentPayload = {
  body: z.object({
    user: z.string(),
    id: z.string().optional(),
    content: z.string(),
    href: z.string().optional(),
    children: z.array(z.string()).optional(),
    isRoot: z.boolean().optional(),
  }),
};

const params = {
  params: z.object({
    id: z.string({ required_error: 'Item Id is required' }),
  }),
};

const CommentSchema = z.object({
  ...commentPayload,
});

const CommentDeleteSchema = z.object({
  ...params,
});

const CommentUpdateSchema = z.object({
  ...params,
  ...commentPayload,
});

type CommentType = z.infer<typeof CommentSchema>;
type CommentUpdateType = z.infer<typeof CommentUpdateSchema>;
type CommentDeleteType = z.infer<typeof CommentDeleteSchema>;

export {
  CommentDeleteSchema,
  CommentDeleteType,
  CommentSchema,
  CommentType,
  CommentUpdateSchema,
  CommentUpdateType,
};
