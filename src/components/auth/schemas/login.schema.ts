import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;