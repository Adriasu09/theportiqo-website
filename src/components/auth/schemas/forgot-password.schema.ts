import * as z from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;