import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AccountFormType } from "../components/auth/schemas/account.schema";

type AccountState = Partial<AccountFormType> & {
  setRegisterData: (data: Partial<AccountFormType>) => void;
};

export const useRegisterUserStore = create<AccountState>()(
  persist(
    (set) => ({
      setRegisterData: (data: Partial<AccountFormType>) =>
        set((state) => ({ ...state, ...data })),
    }),
    {
      name: "register-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
