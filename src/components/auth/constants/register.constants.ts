import * as z from "zod";
import { AddressFormType, PasswordSchema, PersonalDataFormType } from "../schemas/register.schema";
import { NameEmailFormType } from "../schemas/register.schema";

// type AddressFormValues = z.infer<typeof AddressSchema>;
type PasswordFormValues = z.infer<typeof PasswordSchema>;

export const ACCOUNT_DEFAULT_VALUES: NameEmailFormType = {
  firstName: "",
  lastName: "",
  email: "",
  acceptCommunication: true,
  acceptTerms: false,
};

export const PERSONAL_DATA_DEFAULT_VALUES: PersonalDataFormType = {
  phone: "",
  documentType: "DNI",
  documentNumber: "",
};

export const ADDRESS_DEFAULT_VALUES: AddressFormType = {
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