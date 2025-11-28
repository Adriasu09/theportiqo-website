import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type FingerprintStore = {
  deviceId: string;
  setDeviceId: (id: string) => void;
};

export const useFingerprintStore = create<FingerprintStore>()(
  persist(
    (set) => ({
      deviceId: "",
      setDeviceId: (id: string) => set((state) => ({ ...state, deviceId: id })),
    }),
    {
      name: "fingerprint",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
