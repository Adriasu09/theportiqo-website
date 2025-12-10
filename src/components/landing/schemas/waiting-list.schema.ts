import * as z from "zod";

export const WaitingListFormSchema = z.object({
  firstName: z.string("required"),
  lastName: z.string("required"),
  email: z.email("invalidEmail"),
  acceptCommunication: z.boolean().refine((val) => val === true, {
    message: "acceptCommunication",
  }),
  acceptPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "acceptPrivacyPolicy",
  }),
});

export type WaitingListFormType = z.infer<typeof WaitingListFormSchema>;
