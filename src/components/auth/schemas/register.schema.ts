import * as z from "zod";

export const RegisterFormSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  passwordConfirmation: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  acceptCommunication: z.boolean().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  phone: z.string().min(9, "Phone number is required"),
  documentType: z.enum(["DNI", "NIE", "PASSPORT"]),
  documentNumber: z.string().min(1, "Document number is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
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