import { DrizzleAppSchema } from "@powersync/drizzle-driver";
import { missionsTable } from "./tables/mission.table";

export const drizzleSchema = {
  missionsTable,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
