import * as z from "zod";
import { CreateAccountFormSchema } from "../schemas/account.schema";

type CreateAccountFormValues = z.infer<typeof CreateAccountFormSchema>;

export const CREATE_ACCOUNT_DEFAULT_VALUES: CreateAccountFormValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  documentNumber: "",
  acceptCommunication: true,
  acceptTerms: true,
};