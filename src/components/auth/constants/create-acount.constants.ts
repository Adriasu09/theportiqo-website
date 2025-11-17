import * as z from "zod";
import { accountSchema } from "../schemas/account.schema";

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