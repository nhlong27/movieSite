import { z } from 'zod';
const SignInSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required'
        }),
        password: z.string({
            required_error: 'Password is required'
        })
    })
});
export { SignInSchema };
//# sourceMappingURL=signIn.schema.js.map