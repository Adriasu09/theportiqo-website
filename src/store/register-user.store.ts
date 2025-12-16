import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { RegisterFormType } from "../components/auth/schemas/register.schema";

type AccountState = Partial<RegisterFormType> & {
  setRegisterData: (data: Partial<RegisterFormType>) => void;
};

export const useRegisterUserStore = create<AccountState>()(
  persist(
    (set) => ({
      setRegisterData: (data: Partial<RegisterFormType>) =>
        set((state) => ({ ...state, ...data })),
    }),
    {
      name: "register-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
