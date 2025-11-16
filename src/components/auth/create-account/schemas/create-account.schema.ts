import * as z from "zod";

export const CreateAccountFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  documentNumber: z.string().min(1, "Document number is required"),
  acceptCommunication: z.boolean().optional(),
  acceptTerms: z.boolean(),
});
