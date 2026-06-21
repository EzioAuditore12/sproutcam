import { useQuery } from "@tanstack/react-query";
import { syncDatabase } from "@/db/sync";

const POLLING_INTERVAL_MS = 1000 * 60 * 10; // run every 10 minutes

export function useSyncEngine(enabled: boolean = false) {
  useQuery({
    queryKey: ["sync-engine"],
    queryFn: async () => {
      console.log(`[Web Sync] Running at ${new Date().toISOString()}`);
      await syncDatabase.pullChanges();
      return true;
    },
    enabled: enabled,
    refetchInterval: POLLING_INTERVAL_MS,
    refetchOnWindowFocus: true,
  });
}
