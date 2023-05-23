import { z } from 'zod';
const commentPayload = {
    body: z.object({
        user: z.string(),
        mediaId: z.string(),
        userName: z.string(),
        avatar: z.string().optional(),
        id: z.string().optional(),
        content: z.string(),
        href: z.string().optional(),
        children: z.array(z.string()).optional(),
        isRoot: z.boolean().optional(),
    }),
};
const chunkParams = {
    params: z.object({
        mediaId: z.string({ required_error: 'Media Id is required' }),
    }),
};
const params = {
    params: z.object({
        id: z.string({ required_error: 'Item Id is required' }),
    }),
};
const CommentSchema = z.object({
    ...chunkParams,
    ...commentPayload,
});
const CommentDeleteSchema = z.object({
    ...params,
});
const CommentUpdateSchema = z.object({
    ...params,
    ...commentPayload,
});
export { CommentDeleteSchema, CommentSchema, CommentUpdateSchema, };
//# sourceMappingURL=comment.schema.js.map