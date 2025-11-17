import * as z from "zod";

export const AccountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  documentNumber: z.string().min(1, "Document number is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
  acceptCommunication: z.boolean().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const accountSchema = AccountFormSchema.pick({
  name: true,
  lastName: true,
  email: true,
  phone: true,
  documentNumber: true,
  acceptCommunication: true,
  acceptTerms: true,
});
