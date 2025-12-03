import * as z from "zod";

export const RegisterFormSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
  email: z.email("invalidEmail"),
  password: z
    .string()
    .min(8, "atLeast8Chars")
    .regex(/[A-Z]/, "atLeastOneUppercase")
    .regex(/[0-9]/, "atLeastOneNumber"),
  passwordConfirmation: z
    .string()
    .min(8, "atLeast8Chars")
    .regex(/[A-Z]/, "atLeastOneUppercase")
    .regex(/[0-9]/, "atLeastOneNumber"),
  acceptCommunication: z.boolean().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "acceptTerms",
  }),
  phone: z.string().min(9, "validPhone"),
  documentType: z.enum(["DNI", "NIE", "PASSPORT"]),
  documentNumber: z.string().min(1, "required"),
  address: z.string().min(1, "required"),
  postalCode: z.string().min(1, "required"),
  city: z.string().min(1, "required"),
  province: z.string().min(1, "required"),
  country: z.string().min(1, "required"),
});

export const NameEmailSchema = RegisterFormSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  acceptCommunication: true,
  acceptTerms: true,
});

export const PasswordSchema = RegisterFormSchema.pick({
  password: true,
  passwordConfirmation: true,
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
});

export const PersonalDataSchema = RegisterFormSchema.pick({
  phone: true,
  documentType: true,
  documentNumber: true,
});

export const AddressSchema = RegisterFormSchema.pick({
  address: true,
  postalCode: true,
  city: true,
  province: true,
  country: true,
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
export type NameEmailFormType = z.infer<typeof NameEmailSchema>;
export type PersonalDataFormType = z.infer<typeof PersonalDataSchema>;
export type AddressFormType = z.infer<typeof AddressSchema>;