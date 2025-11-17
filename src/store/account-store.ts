import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AccountFormType } from "../components/auth/schemas/account.schema";

type AccountState = Partial<AccountFormType> & {
  setAccountData: (data: Partial<AccountFormType>) => void;
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      setAccountData: (data: Partial<AccountFormType>) =>
        set((state) => ({ ...state, ...data })),
    }),
    {
      name: "account-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
