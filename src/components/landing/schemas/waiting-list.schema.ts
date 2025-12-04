import * as z from "zod";

export const WaitingListFormSchema = z.object({
  firstName: z.string("required"),
  lastName: z.string("required"),
  email: z.email("invalidEmail"),
  acceptCommunication: z.boolean(),
});

export type WaitingListFormType = z.infer<typeof WaitingListFormSchema>;
