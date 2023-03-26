import { z } from 'zod';
const UpdateSchema = z.object({
    body: z.union([
        z.object({
            name: z.string().optional(),
            email: z.string().email().optional().nullable(),
            avatar: z.string().optional()
        }),
        z.object({
            name: z.string().optional(),
            email: z.string().email().optional().nullable(),
            newPassword: z.string({ required_error: "Password is required" }).min(6, "Password is too short - should be 6 characters minimum"),
            confirmPassword: z.string({
                required_error: "Confirmation password is required"
            }),
        })
    ])
});
export { UpdateSchema };
//# sourceMappingURL=update.schema.js.map