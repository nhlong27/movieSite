import {z} from 'zod';

const UserSchema = z.object({
  body: z.object({
    name: z.string({required_error: "Name is required"}),
    password: z.string({required_error: "Password is required"}).min(6, "Password is too short - should be 6 characters minimum"),
    passwordConfirmation: z.string({
      required_error: "Confirmation password is required"
    }),
    email: z.string({required_error: "Email is required"}).email("Not a valid email")
}).refine((data)=>data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
}),
})

type UserType = Omit<z.infer<typeof UserSchema>, "passwordConfirmation">

export {UserSchema, UserType};