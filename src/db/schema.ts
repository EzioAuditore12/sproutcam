import { DrizzleAppSchema } from "@powersync/drizzle-driver";

import { missionsTable } from "./tables/mission.table";
import { detectionsTable } from "./tables/detection.table";
import { rewardsTable } from "./tables/rewards.table";
import { missionProgressTable } from "./tables/mission-progress.table";

export const drizzleSchema = {
  missionsTable,
  missionProgressTable,
  detectionsTable,
  rewardsTable,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);
