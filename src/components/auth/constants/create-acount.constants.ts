import * as z from "zod";
import { AccountFormSchema } from "../schemas/account.schema";

export const accountSchema = AccountFormSchema.pick({
    name: true,
    lastName: true,
    email: true,
    phone: true,
    documentNumber: true,
    acceptCommunication: true,
    acceptTerms: true,
  });

type AccountFormValues = z.infer<typeof accountSchema>;

export const CREATE_ACCOUNT_DEFAULT_VALUES: AccountFormValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  documentNumber: "",
  acceptCommunication: true,
  acceptTerms: true,
};