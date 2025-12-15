import * as z from "zod";

export const WaitingListFormSchema = z.object({
  firstName: z.string().min(1, "required"),
  lastName: z.string().min(1, "required"),
  email: z.email("invalidEmail"),
  acceptCommunication: z.boolean().refine((val) => val === true, {
    message: "acceptCommunication",
  }),
  acceptPrivacyPolicy: z.boolean().refine((val) => val === true, {
    message: "acceptPrivacyPolicy",
  }),
});

export type WaitingListFormType = z.infer<typeof WaitingListFormSchema>;
