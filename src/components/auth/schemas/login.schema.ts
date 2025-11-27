import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  device_type: z.enum(["web", "ios", "android", "backoffice"]),
  device_fingerprint: z.string(),
  otp_code: z.string().min(1, "OTP code is required"),
  remember_device: z.boolean().optional(),
});

export const LoginFormSchema = LoginSchema.pick({
  email: true,
  password: true,
  device_type: true,
  device_fingerprint: true,
});

export const OtpFormSchema = LoginSchema.pick({
  email: true,
  otp_code: true,
  device_fingerprint: true,
  remember_device: true,
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type OtpFormType = z.infer<typeof OtpFormSchema>;