import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { router } from "expo-router";

import type { SettingStore } from "./type";
import { zustandStorage } from "../storage";

import { authClient } from "../../lib/auth";
import { powerSyncDb } from "@/db";

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
        set({ lastSyncedAt: lastSyncedAt?.getTime() ?? 0 });
      },

      async logout() {
        const { setLastSyncedAt } = get();

        setLastSyncedAt(undefined);

        await authClient.signOut();

        await powerSyncDb.disconnectAndClear();

        router.replace("/(auth)/login");
      },
    }),
    {
      name: "device-settings",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
