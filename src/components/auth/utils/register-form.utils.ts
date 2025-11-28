import { useRegisterUserStore } from "@/src/store/register-user.store";
import { RegisterFormType } from "../schemas/register.schema";

export const getInitialFormValues = (
  formDefaultValues: Partial<RegisterFormType>,
): Partial<RegisterFormType> => {
  const accountData = useRegisterUserStore((state) => state);
  
  const keys = Object.keys(formDefaultValues);
  const savedValues: Record<string, any> = {};

  keys.forEach((key) => {
    if (accountData[key as keyof typeof accountData] !== undefined) {
      savedValues[key] = accountData[key as keyof typeof accountData];
    }
  });

  return Object.keys(savedValues).length > 0
    ? { ...formDefaultValues, ...savedValues }
    : formDefaultValues;
};
