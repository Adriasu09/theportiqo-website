import * as z from "zod";
import { AccountSchema, AddressSchema, PasswordSchema } from "../schemas/account.schema";

type AccountFormValues = z.infer<typeof AccountSchema>;
type AddressFormValues = z.infer<typeof AddressSchema>;
type PasswordFormValues = z.infer<typeof PasswordSchema>;

export const ACCOUNT_DEFAULT_VALUES: AccountFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  documentNumber: "",
  acceptCommunication: true,
  acceptTerms: true,
};

export const ADDRESS_DEFAULT_VALUES: AddressFormValues = {
  address: "",
  postalCode: "",
  city: "",
  province: "",
  country: "",
};

export const PASSWORD_DEFAULT_VALUES: PasswordFormValues = {
  password: "",
  passwordConfirmation: "",
};