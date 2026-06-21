import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { SettingStore } from "./type";
import { zustandStorage } from "../storage";

export const useSettingStore = create<SettingStore>()(
  persist(
    (set, get) => ({
      isOnboardingCompleted: false,
      lastSyncedAt: 0,

      setOnBoardingCompleted() {
        set({ isOnboardingCompleted: true });
      },

      getLastSyncedAt(): Date | undefined {
        const { lastSyncedAt } = get();

        if (lastSyncedAt === 0) return undefined;

        return new Date(lastSyncedAt);
      },

      setLastSyncedAt(lastSyncedAt) {
        set({ lastSyncedAt: lastSyncedAt.getTime() });
      },
    }),
    {
      name: "device-settings",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
