import * as z from "zod";

export const ForgotPasswordFormSchema = z.object({
  email: z.email("invalidEmail"),
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;