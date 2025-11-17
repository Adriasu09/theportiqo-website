import { useAccountStore } from "@/src/store/account-store";
import { AccountFormType } from "../schemas/account.schema";

export const getInitialFormValues = (
  formDefaultValues: Partial<AccountFormType>,
): Partial<AccountFormType> => {
  const accountData = useAccountStore((state) => state);
  
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
