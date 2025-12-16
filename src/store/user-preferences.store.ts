import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserPreferences = {
  language: "en" | "es";
  setLanguage: (lang: "en" | "es") => void;
};

export const useUserPreferencesStore = create<UserPreferences>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (lang: "en" | "es") =>
        set((state) => ({ ...state, language: lang })),
    }),
    {
      name: "user-preferences",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
