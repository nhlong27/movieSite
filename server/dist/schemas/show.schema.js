import { z } from 'zod';
const payload = {
    body: z.object({
        user: z.string().optional(),
        title: z.string().optional(),
        name: z.string().optional(),
        poster_path: z.string().optional(),
        media_type: z.string().optional(),
        season_number: z.number().optional(),
        id: z.string().optional(),
        status: z.string().optional(),
        isFavorited: z.boolean().optional(),
        score: z.number().optional(),
    }),
};
const params = {
    params: z.object({
        id: z.string({ required_error: 'Item Id is required' }),
    }),
};
const ShowSchema = z.object({
    ...payload,
});
const ShowGetSchema = z.object({
    ...params,
});
const ShowDeleteSchema = z.object({
    ...params,
});
const ShowUpdateSchema = z.object({
    ...payload,
    ...params,
});
export { ShowSchema, ShowDeleteSchema, ShowUpdateSchema, ShowGetSchema, };
//# sourceMappingURL=show.schema.js.map