import * as z from "zod";

export const WaitingListFormSchema = z.object({
  firstName: z.string("Name is required"),
  lastName: z.string("Name is required"),
  email: z.email("Invalid email address"),
  acceptCommunication: z.boolean(),
});

export type WaitingListFormType = z.infer<typeof WaitingListFormSchema>;
