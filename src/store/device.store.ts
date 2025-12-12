import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FingerprintStore = {
  deviceId: string;
  deviceLanguage?: string;
  hasManuallySelectedLanguage: boolean;
  setDeviceId: (id: string) => void;
  setDeviceLanguage: (language: string, isManual?: boolean) => void;
};

export const useDeviceStore = create<FingerprintStore>()(
  persist(
    (set) => ({
      deviceId: "",
      deviceLanguage: "",
      hasManuallySelectedLanguage: false,
      setDeviceId: (id: string) => set((state) => ({ ...state, deviceId: id })),
      setDeviceLanguage: (language: string, isManual = false) =>
        set((state) => ({ ...state, deviceLanguage: language, hasManuallySelectedLanguage: isManual })),
    }),
    {
      name: "device",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
