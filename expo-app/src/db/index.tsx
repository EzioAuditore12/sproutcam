import { PowerSyncContext, usePowerSync } from "@powersync/react";
import type { PowerSyncDatabase } from "@powersync/react-native";
import type { PowerSyncDatabase as PowerSyncDatabaseWeb } from "@powersync/web";
import { wrapPowerSyncWithDrizzle } from "@powersync/drizzle-driver";
import type { PropsWithChildren } from "react";

import { AppSchema, drizzleSchema } from "./schema";

import { createPowerSyncDatabase } from "./factory";
const dbName = "sproutcam.db";

// Dummy function to extract exact ReturnType for typescript without instantiating early
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _getDb = () => wrapPowerSyncWithDrizzle({} as PowerSyncDatabase, { schema: drizzleSchema });

// We use `any` to allow assigning either the native or web PowerSync Database instance
// since they both implement the core PowerSync interface.
export let powerSyncDb: PowerSyncDatabase | PowerSyncDatabaseWeb;
export let db: ReturnType<typeof _getDb>;

export const setupDatabase = async () => {
  if (powerSyncDb) return;

  powerSyncDb = createPowerSyncDatabase(dbName, AppSchema);

  db = wrapPowerSyncWithDrizzle(powerSyncDb, {
    schema: drizzleSchema,
  });
};

// Call it immediately at the top level
setupDatabase();

export function PowerSyncDatabaseProvider({ children }: PropsWithChildren) {
  return <PowerSyncContext.Provider value={powerSyncDb}>{children}</PowerSyncContext.Provider>;
}

export { usePowerSync };
export type DbType = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];
