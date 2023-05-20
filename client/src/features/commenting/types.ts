import {z} from 'zod';

const CommentSchema = z.object({
  user: z.string(),
  id: z.string(),
  content: z.string(),
  children: z.array(z.string()).optional(),
  href: z.string().optional(),
  isRoot: z.boolean().optional()
})

const CommentsResponseSchema = z.array(
  CommentSchema
)

const CommentUpdateFormSchema = z.object({
  user: z.string().min(1, { message: 'User id is required' }),
  id: z.string().optional(),
  content: z.string().min(1, { message: 'Content is required' }),
  children: z.array(z.string()).optional(),
  href: z.string().optional(),
  isRoot: z.boolean().optional()
});


type CommentType = z.infer<typeof CommentSchema>
type CommentsResponseType = z.infer<typeof CommentsResponseSchema>
type CommentUpdateFormType = z.infer<typeof CommentUpdateFormSchema>

export {CommentSchema, CommentType, CommentsResponseSchema, CommentsResponseType, CommentUpdateFormSchema, CommentUpdateFormType}