import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  otp: z.string().min(4, "OTP code must be 4 digits"),
  trustDevice: z.boolean().optional(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const loginSchema = LoginFormSchema.pick({
  email: true,
  password: true,
});

export const otpSchema = LoginFormSchema.pick({
  otp: true,
  trustDevice: true,
}); 