import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { useEffect, useRef } from "react";
import { AppStateStatus } from "react-native";

import { syncDatabase } from "@/db/sync";
import { useAppState } from "@/hooks/use-app-state";

export const BACKGROUND_SYNC_TASK = "background-sync";

// Must be called in the global scope
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  try {
    console.log(`[Background Sync] Running at ${new Date().toISOString()}`);
    await syncDatabase.pullChanges();
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("[Background Sync] Failed:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

// Helper to easily register the task within your React components
export async function registerBackgroundSyncTask() {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
    if (!isRegistered) {
      await BackgroundTask.registerTaskAsync(BACKGROUND_SYNC_TASK);
      console.log("[Background Sync] Task registered");
    }
  } catch (err) {
    console.error("[Background Sync] Registration failed:", err);
  }
}

const POLLING_INTERVAL_MS = 1000 * 60 * 10; // e.g., run every 10 minutes while app is open

export function useSyncEngine(enabled: boolean = false) {
  const isSyncing = useRef(false);
  const pendingSyncRef = useRef(false);
  const enabledRef = useRef(enabled);
  const runForegroundSyncRef = useRef<(() => Promise<void>) | null>(null);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    runForegroundSyncRef.current = async () => {
      if (!enabledRef.current || isSyncing.current) return;

      try {
        isSyncing.current = true;
        console.log(`[Foreground Sync] Running at ${new Date().toISOString()}`);
        await syncDatabase.pullChanges();
      } catch (error) {
        console.error("[Foreground Sync] Failed:", error);
      } finally {
        isSyncing.current = false;

        if (pendingSyncRef.current) {
          pendingSyncRef.current = false;
          void runForegroundSyncRef.current?.();
        }
      }
    };
  }, []);

  // 1. Run sync immediately when app comes to the foreground
  useAppState((status: AppStateStatus) => {
    if (status === "active") {
      if (isSyncing.current) {
        pendingSyncRef.current = true;
        return;
      }

      void runForegroundSyncRef.current?.();
    }
  });

  // 2. Set up polling interval & register background task when enabled
  useEffect(() => {
    if (!enabled) return; // Only sync if enabled

    // Register the background (suspended/closed) task
    registerBackgroundSyncTask();

    // Trigger an initial foreground sync
    void runForegroundSyncRef.current?.();

    // Setup an interval to sync continuously while the app remains open
    const intervalId = setInterval(() => {
      void runForegroundSyncRef.current?.();
    }, POLLING_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled]);
}
