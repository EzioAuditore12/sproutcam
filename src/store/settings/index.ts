import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { SettingStore } from "./type";
import { zustandStorage } from "../storage";

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      isOnboardingCompleted: false,
    }),
    {
      name: "device-settings",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
