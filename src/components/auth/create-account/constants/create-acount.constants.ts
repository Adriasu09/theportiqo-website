import { CreateAccountFormSchema } from "../schemas/create-account.schema";
import * as z from "zod";

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